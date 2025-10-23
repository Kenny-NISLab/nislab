# NISLAB HP

同志社大学ネットワーク情報システム研究室の HP（ https://nislab.doshisha.ac.jp ）です．

2021 年頃以前は WordPress で研究室サイトが管理されており，2021 年に`Nuxt.js(Vue.js)`と`Contentful`に移行されました．

そして，2025 年の 10 月頃に，SEO 対策なども含めた大型更新を行っております．

2025 年以前の詳細は，最後の「2025 年以前の README の内容」から確認可能です。

## 構成（2021 年 7 月時点）

- GitHub
  - Actions (Secrets)
- AWS Lightsail
  - Apache
  - Let's Encrypt
  - Node.js
  - Nuxt.js (Vue.js)
- Contentful

### 構成について

AWS Lightsail 上で Apache が動いており，静的な IP アドレスを割り当て，大学へ DNS 申請をしています．

AWS 等を使ってサーバーレスなどスマートに作れそうですが，どうやら大学側のドメイン (DNS) に A レコードしか登録申請することが出来ず，（つまり静的な IP アドレスが必要で，）泣く泣くこのような形になっているみたいです．

多分もっとスマートなやり方はありますが，2025 年現在，記事数が膨大になってきて移行が大変なため，構成は変更しない形にしています．

また，HTTPS 化については，Let's Encrypt を利用しており，Cron で証明書発行を自動化されています．

### 更新時のフロー (CI/CD)

Contentful での更新や，リポジトリへの Push があった際は，GitHub Actions が動作するようになっており，Lightsail インスタンスにビルドしたファイル群をデプロイしています．

詳細は，`.github/workflows/deploy.yml` にありますが，主な流れとしては，

1. Contentful / リポジトリの更新をフックに GitHub Actions のビルド・デプロイ用の Job が始動
2. GitHub Actions 内でページのビルドが開始
3. ビルド成果物を Lightsail へコピー

というものです．

トリガーは， `GitHub の main ブランチに push された時` と， `Contenful で記事が公開・更新・削除` された時です．

HP の更新が完了すると， Slack に通知が届くようになっています．

## Lightsail 上でサーバーを構築するフロー

### 1. Web サーバ構築まで

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html>

```sh
sudo yum update -y

sudo yum install -y httpd

sudo systemctl start httpd    # Apache の起動

sudo systemctl enable httpd   # インスタンスを再起動しても Apache が起動するように
```

### 2. Node.js / Yarn / Forever のインストール

> <https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html>

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

npm install -g yarn

npm install -g forever
```

### 3. Web ページの静的ファイル用のディレクトリ作成

```sh
sudo chmod -R 777 /var/www/html/

mkdir /var/www/html
```

### 4. ルートディレクトリの確認

おそらくデフォルトでいいですが，一応．

`cat /etc/httpd/conf/httpd.conf` 等で表示，

```sh
# /etc/httpd/conf/httpd.conf

DocumentRoot "/var/www/html"
```

があるか確認，なければ vi 等で変更し，保存後，`sudo systemctl restart httpd` で Apache を再起動．

### 5. Redirect 設定

元々、 `https://nislab.doshisha.ac.jp/class` に授業用のファイル群が保管されていましたが，http://cs.nislab.io/class に移設しました．

そこで、元々の URL を叩いた時にリダイレクトされるように設定します．

```sh
# /etc/httpd/conf/httpd.conf

# ファイル末尾への追加でOKです．
+ Redirect /class http://cs.nislab.io/class
```

### 6. TLS (HTTPS) 化

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html>

調査の結果、 AWS の ACM を利用するのは難しいため、 Let's Encrypt を利用して HTTPS 化を行いました．

基本は AWS のドキュメント通りにやればできます．

```sh
sudo yum update -y

sudo yum install -y mod_ssl

cd /etc/pki/tls/certs
sudo ./make-dummy-cert localhost.crt
```

```sh
# /etc/httpd/conf.d/ssl.conf

# 下記の行をコメントアウトします
SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
```

```sh
sudo systemctl restart httpd
```

```sh
sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/

sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm

sudo yum-config-manager --enable epel*

sudo yum repolist all
```

```sh
# /etc/httpd/conf/httpd.conf

# Listen 80 ディレクティブを見つけて、その後ろに下記を追加する
<VirtualHost *:80>
  DocumentRoot "/var/www/html"
  ServerName "doshisha.ac.jp"
  ServerAlias "nislab.doshisha.ac.jp"
</VirtualHost>
```

```sh
sudo systemctl restart httpd
```

```sh
sudo yum install -y certbot python2-certbot-apache

sudo certbot

# "Enter email address (used for urgent renewal and security notices)" というプロンプトが表示されたら、連絡先住所を入力し、Enter キーを押します．

# プロンプトが表示されたら Let's Encrypt のサービス利用規約に同意します．

# EFF のメーリングリストに登録するための承認で、「Y」または「N」と入力して Enter キーを押します．

# Certbot に、VirtualHost ブロックで入力した共通名およびサブジェクト代替名 (SAN) が表示されますので、「2」を入力して Enter キーを押します．
```

```sh
# /etc/crontab

# 下記のような行を追加する
39      1,13    *       *       *       root    certbot renew --no-self-upgrade
```

```sh
sudo systemctl restart crond
```

### 7. (必要かはわからないが) 設定変更

```sh
# /etc/letsencrypt/options-ssl-apache.conf

<VirtualHost *:443>
  DocumentRoot "/var/www/html"
  ServerName "doshisha.ac.jp"
  ServerAlias "nislab.doshisha.ac.jp"
  SSLCertificateFile /etc/letsencrypt/live/nislab.doshisha.ac.jp/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/nislab.doshisha.ac.jp/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```

## Nuxt.js を自前の環境で動かしたい場合

以下「2025 年以前の README の内容」の「Nuxt.js を編集したい方向け」をご確認ください．

## 2025 年以前の README の内容

<details>

<summary>古い情報</summary>

# NISLAB HP

同志社大学 ネットワーク情報システム研究室の HP (<https://nislab.doshisha.ac.jp>) です．

もともとは WordPress で動いていたものを、 `Nuxt.js(Vue.js)` ・ `contentful` にマイグレーションしました．

## 構成（2021 年 7 月時点）

- AWS Lightsail (Static IP を割り当て、大学へ DNS 申請をしています．)
- Node.js
- Apache
- Let's Encrypt
- Nuxt.js (Vue.js)
- contentful

---

## インフラ・サーバ周り（特に更新の必要はないため、ほぼ作業ログ）

Amazon Linux 2 を利用しています．ディストリビューションに応じてコマンドを読み替えてください．

AWS Lightsail（EC2）上で Apache が動いています．

サーバレスで公開したいところですが、大学側のドメイン（DNS）が A レコードしか登録申請することができないため、泣く泣くウェブサーバを立てて公開しています．

HTTPS 化については、Let's Encrypt を利用しており、Cron で証明書発行を自動化しています．

### 1. Web サーバ構築まで

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html>

```sh
sudo yum update -y

sudo yum install -y httpd

sudo systemctl start httpd    # Apache の起動

sudo systemctl enable httpd   # インスタンスを再起動しても Apache が起動するように
```

### 2. git のインストール

```sh
sudo yum install -y git
```

### 3. Node.js / Yarn / Forever のインストール

> <https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html>

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

npm install -g yarn
```

### 4. リポジトリのクローン

```sh
sudo chmod -R 777 /var/www/html/

cd /var/www/html/

git clone https://github.com/Kenny-NISLab/nislab
```

```sh
# /var/www/html/nislab/.env

NUXT_ENV_SPACE_ID=""
NUXT_ENV_CTF_ACCESS_TOKEN=""
NUXT_ENV_BASE_URL=""
```

### 5. ルートディレクトリの変更

```sh
# /etc/httpd/conf/httpd.conf

- DocumentRoot "/var/www/html"
+ DocumentRoot "/var/www/html/nislab/dist"
```

Apache を再起動します．

```sh
sudo systemctl restart httpd
```

### 6. スワップ領域の設定

コンテンツの量が増えてきたためビルド時にメモリが足らない場合が出てきました．
なので、スワップ領域を設定します．

```sh
# 設定の確認
free -m

# スワップファイルの設定 (4GB)
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

# アクセス権限付与
sudo chmod 600 /swapfile

# スワップ領域の有効化
sudo mkswap /swapfile
sudo swapon /swapfile

# スワップ有効化の確認
sudo swapon --show

# 永続化
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 7. SSG

```sh
cd /var/www/html/nislab/

yarn generate
```

### 8. Redirect 設定

元々、 `https://nislab.doshisha.ac.jp/class` には佐藤先生が授業で利用するファイル群が保管されていましたが、 <http://cs.nislab.io/class> に移設しました．

そこで、元々の URL を叩いた時にリダイレクトされるように設定します．

```sh
# /etc/httpd/conf/httpd.conf

# ファイル末尾への追加でOKです．
+ Redirect /class http://cs.nislab.io/class
```

### 9. TLS (HTTPS) 化

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html>

調査の結果、 AWS の ACM を利用するのは難しいため、 Let's Encrypt を利用して HTTPS 化を行いました．

基本は AWS のドキュメント通りにやればできます．

```sh
sudo yum update -y

sudo yum install -y mod_ssl

cd /etc/pki/tls/certs
sudo ./make-dummy-cert localhost.crt
```

```sh
# /etc/httpd/conf.d/ssl.conf

# 下記の行をコメントアウトします
SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
```

```sh
sudo systemctl restart httpd
```

```sh
sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/

sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm

sudo yum-config-manager --enable epel*

sudo yum repolist all
```

```sh
# /etc/httpd/conf/httpd.conf

# Listen 80 ディレクティブを見つけて、その後ろに下記を追加する
<VirtualHost *:80>
  DocumentRoot "/var/www/html/nislab/dist"
  ServerName "doshisha.ac.jp"
  ServerAlias "nislab.doshisha.ac.jp"
</VirtualHost>
```

```sh
sudo systemctl restart httpd
```

```sh
sudo yum install -y certbot python2-certbot-apache

sudo certbot

# "Enter email address (used for urgent renewal and security notices)" というプロンプトが表示されたら、連絡先住所を入力し、Enter キーを押します．

# プロンプトが表示されたら Let's Encrypt のサービス利用規約に同意します．

# EFF のメーリングリストに登録するための承認で、「Y」または「N」と入力して Enter キーを押します．

# Certbot に、VirtualHost ブロックで入力した共通名およびサブジェクト代替名 (SAN) が表示されますので、「2」を入力して Enter キーを押します．
```

```sh
# /etc/crontab

# 下記のような行を追加する
39      1,13    *       *       *       root    certbot renew --no-self-upgrade
```

```sh
sudo systemctl restart crond
```

---

## CI/CD

GitHub Actions を用いて Lightsail インスタンスにビルドしたファイル群をデプロイしています．

詳しくは、 `.github/workflows/deploy.yml` を読んでください．

簡単に説明すると、

1. Lightsail（EC2）内の `/var/www/html/nislab/` に移動
2. Shell Script を実行（リビルド）

というものです．

トリガーは、 `GitHub の main ブランチに push された時` と、 `Contenful で記事が公開・更新・削除` された時です．

HP の更新が完了すると、 Slack に通知が届くようになっています．

---

## Nuxt.js を編集したい方向け

### Create `.env` File

```.env
NUXT_ENV_SPACE_ID=""
NUXT_ENV_CTF_ACCESS_TOKEN=""
NUXT_ENV_BASE_URL=""
```

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
# $ yarn build
# $ yarn start
```

### ディレクトリ構成

基本的なディレクトリ構成は[公式ドキュメント](https://ja.nuxtjs.org/docs/2.x/get-started/directory-structure)を参考にしてください．
以下に編集が必要になる可能性があるものを抜粋します．

```bash
├── assets
│   ├── _sass # グローバルCSS
│   └── images # 画像ファイル
├── components
│   ├── assets # SVG画像
│   ├── common # 一般的なコンポーネント
│   ├── layout # レイアウト関係
│   └── utility # 汎用コンポーネント
├── layout # レイアウト用
├── pages # 各ページ
└── static # 外部から読み込む可能性のある画像等
```

### スタイルの編集

グローバル CSS 及び各コンポーネントやページでの scoped css は Sass(SCSS)で記述しています．

#### グローバル CSS

assets/\_sass 内ではサイト全体で必要なスタイリングなどを行なっています．以下に各ファイルの詳細を記述します．

```bash
├── foundation
│   ├── mixin
│   │   ├── _fontsize.scss # フォントサイズ設定用mixin
│   │   └── _media-query.scss # メディアクエリ用mixin
│   ├── _base.scss # サイトのベース&contentful記事用
│   ├── _function.scss # 関数登録用
│   ├── _reset.scss # ブラウザのスタイルリセット用
│   └── _setting.scss # カラーやコンテンツ幅などの設定用
└── common.scss # import用
```

基本的にページ全体に関するスタイルの変更を行いたい場合にはこれらを編集してください．大体は\_base.scss か\_setting.scss になると思います．

#### scoped css

各コンポーネント及びページのスタイリングは各ファイル内で scoped として記述しています．スタイルが必要な際にはそれらを編集してください．一応 BEM っぽい設計になっています．

### コンテンツの編集

Web サイトのコンテンツを編集したい際は基本的に components か pages の中から必要なものを見つけ編集してください．各記事、研究業績などの contentful で管理しているものに関しては contentful から直接変更を行なってください．

</details>
