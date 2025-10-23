<template>
  <Section class="iot">
    <Title :title="`IoT`" :sub-title="`Internet of Things`" />
    <!-- eslint-disable vue/no-v-html -->
    <article ref="content" class="iot__content content">
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
        'fields.slug': 'iot',
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
        'IoT - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'IoT - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.NUXT_ENV_BASE_URL + '/images/drone.webp',
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
.iot {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
