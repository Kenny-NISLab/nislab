<template>
  <Section class="disclaimer">
    <Title :title="`Disclaimer`" :sub-title="`免責事項`" />
    <article class="disclaimer__content content">
      <p>
        当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めておりますが、
        誤情報が入り込んだり、情報が古くなったりすることもあり、必ずしもその内容の正確性および完全性を保証するものではございません．当該情報に基づいて被ったいかなる損害について、一切責任を負うものではございませんのであらかじめご了承ください．
      </p>

      <p>
        当サイトから移動された先のホームページは、当サイトが管理、運営するものではございません．移動先サイトで提供される情報の真偽、サービス等につきましても一切の責任も負いませんのでご了承ください．なお、予告なしに内容が変更または廃止される場合がございます．
      </p>

      <p>
        当サイトに記載されている内容の著作権や肖像権等は、各権利所有者に帰属します．また当該掲載情報の
        無断転載
        、複製、販売等の一切を固く禁じております．転載する際には、お問い合わせよりご連絡いただけますよう宜しくお願い致します．
      </p>
      <p>以上</p>
    </article>
    <ReturnPage />
  </Section>
</template>

<script>
import { Section, Title, ReturnPage } from '~/components/utility/index'

export default {
  components: {
    Section,
    Title,
    ReturnPage,
  },
  head() {
    return {
      title:
        '免責事項 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '免責事項 - NISLAB | 同志社大学ネットワーク情報システム研究室（佐藤研究室）',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.disclaimer {
  width: $slim-content-width;
  max-width: 90%;

  &__content {
    margin-top: 4rem;
  }
}
</style>
