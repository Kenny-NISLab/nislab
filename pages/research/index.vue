<template>
  <Section class="research">
    <Title :title="`Research`" :sub-title="`研究`" />

    <article class="research__content">
      <section
        v-for="(research, index) in researches"
        :key="index"
        class="research__item"
      >
        <h3 class="research__title">
          {{ research.title }} | {{ research.subTitle }}
        </h3>

        <p class="research__text">
          {{ research.description }}
        </p>

        <MoreButton :link-to="research.link" />
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
          title: 'Theme',
          subTitle: '研究テーマ',
          description:
            'ITS・Network・IoTなど、当研究室で扱う研究分野について紹介します。',
          link: '/research/theme',
        },
        {
          title: 'Funds',
          subTitle: '研究資金',
          description:
            '当研究室が獲得している競争的研究資金について紹介します。',
          link: '/research/funds',
        },
        {
          title: 'Projects',
          subTitle: '研究プロジェクト',
          description: '共同研究などのプロジェクトについて紹介します。',
          link: '/research/projects',
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

<style lang="scss" scoped>
.research {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
    text-align: center;
  }

  &__item {
    padding-bottom: 2rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid #ccc;
  }

  &__title {
    margin-bottom: 1rem;
    font-family: $font-set-en;
    font-size: 1.5rem;
  }

  &__text {
    margin-bottom: 1rem;
    font-weight: 300;
  }
}
</style>
