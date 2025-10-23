<template>
  <Section class="contact">
    <Title :title="`Contact`" :sub-title="`お問い合わせ`" />
    <!-- eslint-disable vue/no-v-html -->
    <article ref="content" class="contact__content content">
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
        'fields.slug': 'contact',
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
        'お問い合わせ - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'お問い合わせ - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
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
.contact {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
