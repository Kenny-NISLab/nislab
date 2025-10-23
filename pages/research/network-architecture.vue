<template>
  <Section class="networkArchitecture">
    <Title :title="`Network`" :sub-title="`Network Architecture`" />
    <!-- eslint-disable vue/no-v-html -->
    <article ref="content" class="networkArchitecture__content content">
      <div v-html="$md.render(body)" />
    </article>
    <ReturnPage text="研究一覧へ" slug="/research" />
  </Section>
</template>

<script>
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    Section,
    Title,
    ReturnPage,
  },
  async asyncData() {
    return await client
      .getEntries({
        content_type: 'pages',
        'fields.slug': 'network-architecture',
        limit: 1,
      })
      .then((res) => {
        return {
          body: res.items[0].fields.body,
        }
      })
      .catch()
  },
  head() {
    return {
      title:
        'Network Architecture - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'Network Architecture - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.NUXT_ENV_BASE_URL + '/images/hololens.webp',
        },
      ],
    }
  },
  mounted() {
    const content = this.$refs.content
    content.addEventListener('click', this.handleImageClick)
  },
  beforeDestroy() {
    const content = this.$refs.content
    content.removeEventListener('click', this.handleImageClick)
  },
  methods: {
    handleImageClick(event) {
      if (event.target.tagName === 'IMG') {
        const imageUrl = event.target.src
        window.open(imageUrl, '_blank')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.networkArchitecture {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
