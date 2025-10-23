<template>
  <article>
    <Section class="publications">
      <Title :title="`Publications`" :sub-title="`研究業績`" />
      <!-- eslint-disable vue/no-v-html -->
      <article class="publications__content content">
        <h3 class="publications__title">{{ publication.fields.title }}</h3>
        <div v-html="$md.render(publication.fields.body)" />
      </article>
      <ReturnPage />
    </Section>
    <Section :bg="`#eee`">
      <h3 class="publications__listTitle">研究業績一覧</h3>
      <PublicationsList />
    </Section>
  </article>
</template>

<script>
import { PublicationsList } from '~/components/common/index'
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    PublicationsList,
    Section,
    Title,
    ReturnPage,
  },
  async asyncData({ params }) {
    const publication = await client
      .getEntries({
        content_type: 'publications',
        'fields.slug': params.publication,
      })
      .then((res) => {
        return res.items[0]
      })
      .catch()
    const publications = await client
      .getEntries({
        content_type: 'publications',
        order: '-fields.date',
      })
      .then((res) => {
        return res.items
      })
      .catch()
    return { publications, publication }
  },
  head({ $config }) {
    return {
      title:
        this.publication.fields.title +
        ' - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: $config.baseURL + this.$route.path.substr(1),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.publication.fields.title +
            ' - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.publications {
  &__title {
    margin-bottom: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
  }

  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 0;
  }

  &__listTitle {
    margin-bottom: 2.5rem;
    font-size: 1.25rem;
    text-align: center;
  }
}
</style>
