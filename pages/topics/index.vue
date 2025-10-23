<template>
  <Section>
    <Title :title="`Topics`" :sub-title="`記事一覧`" />
    <v-app class="topics topics__cards">
      <v-container fluid>
        <v-row align="center" justify="center" class="topics__search">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="filterQuery.title"
              label="検索"
              placeholder="キーワードを入力"
              outlined
              @change="handleChangeQuery"
            ></v-text-field>
          </v-col>
          <v-col cols="5" sm="2" offset-sm="1">
            <v-select
              v-model="filterQuery.years"
              :items="years"
              label="投稿年度"
              @change="handleChangeQuery"
            />
          </v-col>
          <v-col cols="5" sm="2" offset="1">
            <v-select
              v-model="filterQuery.categories"
              :items="categories"
              label="カテゴリ"
              @change="handleChangeQuery"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn @click="reset">リセット</v-btn>
        </v-row>
      </v-container>
      <article class="topics__items">
        <Card
          v-for="post in displayedPosts"
          :id="post.sys.id"
          :key="post.sys.id"
          :title="post.fields.title"
          :date="post.fields.date"
          :img="post.fields.headerImage"
        />
      </article>
      <v-row v-if="hasMore" justify="center" class="topics__more">
        <v-btn @click="loadMore">もっと見る</v-btn>
      </v-row>
      <p v-if="filteredPosts.length === 0" class="topics__error">
        表示できる投稿がありません
      </p>
    </v-app>
    <ReturnPage />
  </Section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { Card } from '~/components/common/index'

export default {
  components: {
    Section,
    Title,
    ReturnPage,
    Card,
  },
  data() {
    return {
      filterQuery: {
        title: '',
        years: '',
        categories: '',
      },
      initialItems: 12,
      itemsToShow: 12,
    }
  },
  head() {
    return {
      title:
        '記事一覧 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '記事一覧 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['filteredPosts']),
    years() {
      return this.$store.state.years
    },
    categories() {
      return this.$store.state.categories
    },
    displayedPosts() {
      return this.filteredPosts.slice(0, this.itemsToShow)
    },
    hasMore() {
      return this.filteredPosts.length > this.itemsToShow
    },
  },
  mounted() {
    this.itemsToShow = this.initialItems
    this.setFilterQuery(this.filterQuery)
  },
  methods: {
    ...mapMutations(['setFilterQuery']),
    handleChangeQuery() {
      this.itemsToShow = this.initialItems
      this.setFilterQuery(this.filterQuery)
    },
    reset() {
      this.filterQuery.title = ''
      this.filterQuery.categories = ''
      this.filterQuery.years = ''
      this.itemsToShow = this.initialItems
      this.setFilterQuery(this.filterQuery)
    },
    loadMore() {
      this.itemsToShow += this.initialItems
    },
  },
}
</script>

<style lang="scss" scoped>
.topics {
  &__cards {
    margin-top: 4rem;
  }

  &__search {
    width: 720px;
    max-width: 90%;
    margin: 0 auto;
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 64px 32px;
    justify-items: center;
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 4rem;
  }

  &__more {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  &__error {
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>

<style>
.v-application a {
  color: #000 !important;
}
</style>
