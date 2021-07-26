# NISLAB HP

同志社大学 ネットワーク情報システム研究室の HP (<https://nislab.doshisha.ac.jp>) です。

もともとは WordPress で動いていたものを、 `Nuxt.js(Vue.js)` ・ `contentful` にマイグレーションしました。

## 構成（2021 年 7 月時点）

- AWS Lightsail (Static IP を割り当て、大学へ DNS 申請をしています。)
- Node.js
- Apache
- Let's Encrypt
- Nuxt.js (Vue.js)
- contentful

---

## インフラ・サーバ周り（特に更新の必要はないため、ほぼ作業ログ）

Amazon Linux 2 を利用しています。ディストリビューションに応じてコマンドを読み替えてください。

AWS Lightsail（EC2）上で Apache が動いています。

サーバレスで公開したいところですが、大学側のドメイン（DNS）が A レコードしか登録申請することができないため、泣く泣くウェブサーバを立てて公開しています。

HTTPS 化については、Let's Encrypt を利用しており、Cron で証明書発行を自動化しています。

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

Apache を再起動します。

```sh
sudo systemctl restart httpd
```

### 6. SSG

```sh
cd /var/www/html/nislab/

yarn generate
```

### 7. Redirect 設定

元々、 `https://nislab.doshisha.ac.jp/class` には佐藤先生が授業で利用するファイル群が保管されていましたが、 <http://cs.nislab.io/class> に移設しました。

そこで、元々のURLを叩いた時にリダイレクトされるように設定します。

```sh
# /etc/httpd/conf/httpd.conf

+ Redirect/classhttp://cs.nislab.io/class
```

### 8. TLS (HTTPS) 化

> <https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html>

調査の結果、 AWS の ACM を利用するのは難しいため、 Let's Encrypt を利用して HTTPS 化を行いました。

基本は AWS のドキュメント通りにやればできます。

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

# "Enter email address (used for urgent renewal and security notices)" というプロンプトが表示されたら、連絡先住所を入力し、Enter キーを押します。

# プロンプトが表示されたら Let's Encrypt のサービス利用規約に同意します。

# EFF のメーリングリストに登録するための承認で、「Y」または「N」と入力して Enter キーを押します。

# Certbot に、VirtualHost ブロックで入力した共通名およびサブジェクト代替名 (SAN) が表示されますので、「2」を入力して Enter キーを押します。
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

GitHub Actions を用いて Lightsail インスタンスにビルドしたファイル群をデプロイしています。

詳しくは、 `.github/workflows/deploy.yml` を読んでください。

簡単に説明すると、

1. Lightsail（EC2）内の `/var/www/html/nislab/` に移動
2. Shell Script を実行（リビルド）

というものです。

トリガーは、 `GitHub の main ブランチに push された時` と、 `Contenful で記事が公開・更新・削除` された時です。

HP の更新が完了すると、 Slack に通知が届くようになっています。

---

## Nuxt.js を編集したい方向け

## Create `.env` File

```.env
NUXT_ENV_SPACE_ID=""
NUXT_ENV_CTF_ACCESS_TOKEN=""
NUXT_ENV_BASE_URL=""
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
# $ yarn build
# $ yarn start
```
