<template>
  <Section class="advisor">
    <Title :title="`Advisor`" :sub-title="`教員`" />
    <article ref="content" class="advisor__content content">
      <div v-html="$md.render(body)" />
    </article>
    <ReturnPage />
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
        'fields.slug': 'advisor',
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
        '教員 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '教員 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
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
.advisor {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
