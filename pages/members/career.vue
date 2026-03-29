<template>
  <Section class="career">
    <Title :title="`Career`" :sub-title="`就職先`" />
    <article ref="content" class="career__content content">
      <div v-html="$md.render(body)"></div>
    </article>
    <ReturnPage text="メンバー一覧へ" slug="/members" />
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
        'fields.slug': 'career',
        limit: 1,
      })
      .then((res) => {
        return {
          body: res.items[0].fields.body,
        }
      })
      .catch()
  },
}
</script>

<style lang="scss" scoped>
.career {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
