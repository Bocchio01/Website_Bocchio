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
      lang: 'it'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'Tommaso Bocchietti' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: 'https://bocchionuxt.netlify.app/'
      },
      { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' }
    ],
    ...meta
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css',
    '@/assets/css/portali.scss',
    '@/assets/css/wrap.scss',
    '@/assets/css/miscellaneous.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/leaflet.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-font-loader', '@nuxtjs/dotenv'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/composition-api/module',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false
  },
  // loadingIndicator: '~/components/loading.html',

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL
    }
  },

  pwa: {
    icon: {
      purpose: 'any'
    },
    manifest: {
      name: "Bocchio's WebSite",
      short_name: "Bocchio's WebSite",
      description:
        'Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione alla fisica.',
      Color_Text_BG: '#000000',
      theme_color: '#000000',
      lang: 'it',
      useWebmanifestExtension: true
    }
  },

  generate: {
    fallback: true
  },

  sitemap: {
    hostname: process.env.HOST_URL,
    gzip: true,
    exclude: []
  },

  fontLoader: {
    url: {
      google:
        'https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap',
      local:
        'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap'
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
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: process.env.HOST_URL + '/sitemap.xml'
  }
}
