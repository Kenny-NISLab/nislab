<template>
  <Section class="projects">
    <Title :title="`Projects`" :sub-title="`研究プロジェクト`" />
    <article ref="content" class="projects__content content">
      <div v-html="$md.render(body)"></div>
    </article>
    <ReturnPage text="Research" slug="/research" />
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
        'fields.slug': 'projects',
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
.projects {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
