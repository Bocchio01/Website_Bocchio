import getSiteMeta from './assets/js/getSiteMeta.js'

const meta = getSiteMeta()

export default {
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Bocchio - %s',
    title: 'Home',
    htmlAttrs: {
      lang: 'it',
    },
    meta: [{ charset: 'utf-8' }, { name: 'author', content: 'Tommaso Bocchietti' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: process.env.HOST_URL,
      },
    ],
    ...meta,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/global.css', '@/assets/css/portali.scss', '@/assets/css/wrap.scss', '@/assets/css/miscellaneous.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/leaflet.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/dotenv'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/composition-api/module',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
  },
  // loadingIndicator: '~/components/loading.html',

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/bocchio/image/upload',
    },
  },

  pwa: {
    icon: {
      purpose: 'any',
    },
    manifest: {
      name: "Bocchio's WebSite",
      short_name: "Bocchio's WebSite",
      description:
        "Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all'ingegneria.",
      background_color: '#ffffff',
      theme_color: '#000000',
      lang: 'it',
      useWebmanifestExtension: true,
    },
  },

  generate: {
    fallback: true,
  },

  sitemap: {
    hostname: process.env.HOST_URL,
    gzip: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const Articoli = await $content('articolo', { deep: true }).only(['slug']).fetch()
      const Portali = await $content('portale').only(['slug']).fetch()
      const Mix = await $content('mix').only(['slug']).fetch()

      var link_Articoli = Articoli.map((articolo) => '/articolo/' + articolo.slug)
      var link_Portali = Portali.map((portale) => '/portale/' + portale.slug)
      var link_Mix = Mix.map((mix) => '/mix/' + mix.slug)
      return [].concat(link_Articoli, link_Portali, link_Mix)
    },
  },

  env: {
    HOST_URL: process.env.HOST_URL,
    UTILS_SITE: process.env.UTILS_SITE,
    IS_DEV: process.env.IS_DEV,
  },

  router: {
    middleware: 'stats',
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: process.env.HOST_URL + '/sitemap.xml',
  },
}
