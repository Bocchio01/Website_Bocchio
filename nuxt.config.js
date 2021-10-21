import getSiteMeta from './assets/js/getSiteMeta.js';

const meta = getSiteMeta();

export default {
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Bocchio WebSite',
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Permanent+Marker&display=swap' },
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
    '@/modules/generator.ts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/composition-api/module',
    'nuxt-leaflet',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  ssr: false,
  loadingIndicator: '~/components/loading.html',

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
    fallback: true
  },
}
