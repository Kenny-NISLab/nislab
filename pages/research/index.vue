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
          title: '研究テーマ',
          subTitle: 'Theme',
          description:
            'ITS・Network・IoTなど、当研究室で扱う研究分野について紹介します。',
          link: '/research/theme',
          img: {
            src: '/images/simulator.webp',
            alt: '研究テーマ',
          },
        },
        {
          title: '研究資金',
          subTitle: 'Funds',
          description:
            '当研究室が獲得している競争的研究資金について紹介します。',
          link: '/research/funds',
          img: {
            src: '/images/hololens.webp',
            alt: '研究資金',
          },
        },
        {
          title: '研究プロジェクト',
          subTitle: 'Projects',
          description: '共同研究などのプロジェクトについて紹介します。',
          link: '/research/projects',
          img: {
            src: '/images/drone.webp',
            alt: '研究プロジェクト',
          },
        },
      ],
    }
  },

  head() {
    return {
      title: 'Research - NISLAB',
    }
  },
}
</script>
