<template>
  <Section class="research">
    <Title :title="`Research`" :sub-title="`研究内容`" />
    <article class="research__content">
      <section
        v-for="(research, index) in researches"
        :key="index"
        class="research__section"
      >
        <div class="research__card">
          <h3 class="research__title">
            {{ research.title }} | {{ research.subTitle }}
          </h3>
          <p class="research__text">
            {{ research.description }}
          </p>
          <MoreButton class="research__button" :link-to="research.link" />
        </div>
        <img
          :src="research.img.src"
          :alt="research.img.alt"
          class="research__img"
        />
      </section>
    </article>
    <ReturnPage />
  </Section>
</template>

<script>
import {
  Section,
  Title,
  MoreButton,
  ReturnPage,
} from '~/components/utility/index'

export default {
  components: {
    Section,
    Title,
    MoreButton,
    ReturnPage,
  },
  data() {
    return {
      researches: [
        {
          title: 'ITS',
          subTitle: 'Intelligent Transport Systems',
          description:
            'ITS（Intelligent Transport Systems：高度道路交通システム）とは，情報通信技術を用いて「人」と「道路」と「車両」を一体のシステムとして構築し，交通事故，渋滞，環境汚染などの道路交通の問題解決や運転支援，情報提供などの道路交通の利便性の向上を図るものです．当研究室では，主に交通流（走行調停），ダイナミックマップ，時空間グリッド予約，セキュリティに関する研究を行なっています．',
          link: '/research/its',
          img: {
            src: '/images/simulator.webp',
            alt: 'ドライビングシュミレーター',
          },
        },
        {
          title: 'Network',
          subTitle: 'Network Architecture',
          description:
            'インターネット上にはテキストや画像，動画だけでなく，コンピュータ同士の情報のやりとりなど，多様なトラフィックが流れ，その量は日々増加しています．このトラフィックを安定して収容するだけでなく，ユーザやサービスの様々なニーズに合わせて柔軟に対応できるネットワークアーキテクチャの実現が求められています．そのために，ネットワークプロトコルの効率化やネットワーク仮想化による動的なネットワーク制御などの研究を行っています．',
          link: '/research/network-architecture',
          img: {
            src: '/images/hololens.webp',
            alt: 'ホロレンズを装着する学生',
          },
        },
        {
          title: 'IoT',
          subTitle: 'Internet of Things',
          description:
            'IoTとは「Internet of Things」の略であり，「モノのインターネット」と呼ばれており，従来インターネットに接続されていなかったモノ（家電製品，電子機器，車両など）がネットワークに接続することで，サーバやクラウド上でデータの処理，収集，分析が可能になります．当研究室では，車両に関してはもちろん，ホームネットワークやドローンなど，IoT技術について幅広く研究が行われています．',
          link: '/research/iot',
          img: {
            src: '/images/drone.webp',
            alt: '研究室内を飛ぶドローン',
          },
        },
      ],
    }
  },
  head() {
    return {
      title:
        '研究内容 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '研究内容 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.research {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }

  &__section {
    position: relative;
    height: 500px;
    margin-bottom: 128px;

    @include mq(tab) {
      height: 640px;
    }
  }

  &__card {
    position: absolute;
    top: 200px;
    right: 0;
    z-index: 2;
    width: 710px;
    max-width: 100%;
    padding: 1rem 2rem;
    background-color: #fff;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    border-radius: 0 0 10px 0;
  }

  &__title {
    margin-bottom: 1rem;
    font-family: $font-set-en;
    font-size: 1.5rem;
  }

  &__text {
    margin-bottom: 2rem;
    font-weight: 300;
  }

  &__button {
    float: right;
  }

  &__img {
    width: 710px;
    height: 340px;
    background-color: #ccc;
    object-fit: cover;
    border-radius: 10px 0 10px 0;
  }

  &__section:nth-child(even) {
    .research {
      &__card {
        left: 0;
        border-right: 0;
        border-left: 2px solid #000;
        border-radius: 0 0 0 10px;
      }

      &__img {
        float: right;
        border-radius: 0 10px 0 0;
      }
    }
  }
}
</style>
