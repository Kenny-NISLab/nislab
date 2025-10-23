<template>
  <article>
    <Section class="publications">
      <Title :title="`Publications`" :sub-title="`研究業績`" />
      <PublicationsList class="publications__list" />
    </Section>
  </article>
</template>

<script>
import { PublicationsList } from '~/components/common/index'
import { Section, Title } from '~/components/utility/index'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    PublicationsList,
    Section,
    Title,
  },
  async asyncData() {
    return await client
      .getEntries({
        content_type: 'publications',
        order: '-fields.date',
      })
      .then((res) => {
        return {
          publications: res.items,
        }
      })
      .catch()
  },
  head() {
    return {
      title:
        '研究業績 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '研究業績 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.publications {
  &__list {
    margin: 4rem auto 0 !important;
  }
}
</style>
