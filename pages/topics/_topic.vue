<template>
  <Section>
    <div class="topic">
      <div class="topic__header">
        <h2 class="topic__title">{{ post.post.fields.title }}</h2>
        <p class="topic__date">{{ post.post.fields.date }}</p>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <article
        ref="content"
        class="topic__content content"
        v-html="$md.render(post.post.fields.body)"
      />
      <article class="topic__around">
        <article v-if="nextPost.nextPost" class="-left">
          <h3 class="topic__aroundTitle">← 次の記事</h3>
          <Card
            :id="nextPost.nextPost.sys.id"
            :title="nextPost.nextPost.fields.title"
            :date="nextPost.nextPost.fields.date"
            :img="nextPost.nextPost.fields.headerImage"
          />
        </article>
        <article v-if="previousPost.previousPost" class="-right">
          <h3 class="topic__aroundTitle -r">前の記事 →</h3>
          <Card
            :id="previousPost.previousPost.sys.id"
            :title="previousPost.previousPost.fields.title"
            :date="previousPost.previousPost.fields.date"
            :img="previousPost.previousPost.fields.headerImage"
          />
        </article>
      </article>
      <ReturnPage text="記事一覧へ" slug="/topics" />
    </div>
  </Section>
</template>

<script>
import { Section, ReturnPage } from '~/components/utility/index'
import { Card } from '~/components/common/index'

import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    Section,
    Card,
    ReturnPage,
  },
  async asyncData({ params }) {
    const post = await client
      .getEntry(params.topic)
      .then((post) => {
        return {
          post,
        }
      })
      .catch()
    const previousPost = await client
      .getEntries({
        content_type: 'posts',
        order: '-fields.date',
        'fields.date[lt]': post.post.fields.date,
        limit: 1,
      })
      .then((previousPost) => {
        return {
          previousPost: previousPost.items[0],
        }
      })
      .catch()
    const nextPost = await client
      .getEntries({
        content_type: 'posts',
        order: 'fields.date',
        'fields.date[gt]': post.post.fields.date,
        limit: 1,
      })
      .then((nextPost) => {
        return {
          nextPost: nextPost.items[0],
        }
      })
      .catch()
    return { post, previousPost, nextPost }
  },
  head({ $config }) {
    return {
      title:
        this.post.post.fields.title +
        ' - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: $config.baseURL + '/topics/' + this.post.post.sys.id,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.post.post.fields.title +
            ' - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.post.fields.headerImage.fields
            ? 'https:' + this.post.post.fields.headerImage.fields.file.url
            : $config.baseURL + '/nislab-ogp.png',
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
.topic {
  width: $content-width;
  max-width: 90%;
  margin: 0 auto;

  &__header {
    display: grid;
    grid-template-columns: 10fr 1fr;
    align-items: center;

    @include mq(tab) {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    font-size: 2rem;
    word-break: keep-all;
  }

  &__content {
    padding-bottom: 4rem;
    margin: 2rem 0 4rem 0;
    border-bottom: 1px solid #000;
  }

  &__around {
    position: relative;
    height: 300px;

    .-right {
      position: absolute;
      top: 0;
      right: 0;

      @include mq(tab) {
        position: relative;
        margin-top: 2rem;
      }
    }

    @include mq(tab) {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: auto;
    }
  }

  &__aroundTitle {
    margin-bottom: 1rem;

    &.-r {
      text-align: right;
    }
  }
}
</style>
