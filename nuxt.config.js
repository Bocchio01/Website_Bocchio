import getSiteMeta from './assets/js/getSiteMeta.js';

const meta = getSiteMeta();

export default {
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Bocchio's WebSite",
    htmlAttrs: {
      lang: 'it'
    },
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'author', content: 'Tommaso Bocchietti' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: 'https://bocchionuxt.netlify.app/' },
      { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css',
    '@/assets/css/portali.scss',
    '@/assets/css/wrap.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-font-loader',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
    'nuxt-leaflet',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //analyze: true,
  },
  ssr: false,
  loadingIndicator: '~/components/loading.html',

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL
    }
  },

  pwa: {
    icon: {
      purpose: 'any',
    },
    manifest: {
      name: 'Sito personale di Tommaso Bocchietti',
      short_name: "Bocchio's WebSite",
      description: "Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione alla fisica fino all'orienteering.",
      background_color: "#000000",
      theme_color: "#000000",
      lang: 'it',
      useWebmanifestExtension: false
    }

  },

  generate: {
    fallback: true,

    async routes() {
      const static_routes = ['/elenco/articolo', '/elenco/portale']
      const { $content } = require('@nuxt/content')
      const Articoli = await $content('articolo', { deep: true }).only(['slug']).fetch()
      const Portali = await $content('portale', { deep: true }).only(['slug']).fetch()
      const Mix = await $content('mix', { deep: true }).only(['slug']).fetch()
      const Generici = await $content().only(['slug']).fetch()

      var link_Articoli = Articoli.map(articolo => '/articolo/' + articolo.slug + '/')
      var link_Portali = Portali.map(portale => '/portale/' + portale.slug + '/')
      var link_Mix = Mix.map(mix => '/articolo/' + mix.slug + '/')
      var link_Generici = Generici.map(generico => '/articolo/' + generico.slug + '/')

      return static_routes.concat(link_Articoli, link_Portali, link_Mix, link_Generici)
    }

  },

  sitemap: {
    hostname: process.env.HOST_URL,
    gzip: true,
    exclude: [],

  },

  fontLoader: {
    url: {
      local: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap',
      google: 'https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Permanent+Marker&display=swap'
    },
    prefetch: true,
    preconnect: true
  },

  env: {
    HOST_URL: process.env.HOST_URL,
    CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
    UTILS_SITE: process.env.UTILS_SITE
  },

  router: {
    middleware: 'stats'
  }
}
