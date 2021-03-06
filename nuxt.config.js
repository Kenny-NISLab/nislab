import { createClient } from './plugins/contentful.js'
const client = createClient()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NISLAB',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '同志社大学 ネットワーク情報システム研究室',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.NUXT_ENV_BASE_URL,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'NISLAB',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'NISLAB',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '同志社大学ネットワーク情報システム研究室',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.NUXT_ENV_BASE_URL + 'nislab-ogp.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    script: [
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-NDLRBPBQJZ',
      },
      {
        src: '/static/gtag.js',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,700|Quicksand:400,700&display=swap&subset=japanese',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/static/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/static/favicon-16x16.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/static/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/static/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/_sass/common.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [{ src: '~/plugins/swiper', mode: 'client' }],
  plugins: [{ src: '~/plugins/swiper', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/moment
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://vuetifyjs.com
    '@nuxtjs/vuetify',
    '@nuxtjs/markdownit',
  ],

  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: false,
    use: [
      [
        'markdown-it-link-attributes',
        {
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        },
      ],
    ],
  },

  styleResources: {
    scss: ['@/assets/_sass/*.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  moment: {
    locales: ['ja'],
  },
  // loading: '~/components/Loading.vue',

  generate: {
    fallback: true,
    routes() {
      const posts = client
        .getEntries({
          content_type: 'posts',
        })
        .then((entries) => {
          return entries.items.map((entry) => {
            return {
              route: `topics/${entry.sys.id}`,
              payload: entry,
            }
          })
        })
      const publications = client
        .getEntries({
          content_type: 'publications',
        })
        .then((entries) => {
          return entries.items.map((entry) => {
            return {
              route: `publications/${entry.fields.slug}`,
              payload: entry,
            }
          })
        })
      return Promise.all([posts, publications]).then((values) => {
        return [...values[0], ...values[1]]
      })
    },
  },
  publicRuntimeConfig: {
    baseURL: process.env.NUXT_ENV_BASE_URL,
  },
  loading: '~/components/utility/Loading.vue',
}
