import getSiteMeta from './assets/js/getSiteMeta.js'

const meta = getSiteMeta()

export default {
  target: 'static',
  ssr: true,

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
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css' },
    ],
    ...meta,
  },

  css: ['@/assets/css/global.css', '@/assets/css/portali.scss', '@/assets/css/wrap.scss', '@/assets/css/miscellaneous.scss'],

  plugins: ['~/plugins/leaflet.client.js', '~/plugins/i18n.js'],

  components: true,

  modules: ['@nuxtjs/i18n', '@nuxtjs/pwa', '@nuxt/content', '@nuxtjs/composition-api/module', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap'],

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
    },
  },

  build: {
    analyze: false,
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/bocchio/image/upload',
    },
  },

  i18n: {
    baseUrl: process.env.HOST_URL,
    langDir: 'i18n/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', dir: 'ltr' },
    ],
    parsePages: false,
    lazy: true,
    defaultLocale: 'en',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'it',
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
        "Tommaso Bocchietti. More than a simple portfolio: a complete tuor through Bocchio's mind and interests. Articles, portals and WebApps that goes from programming to engineering.",
      background_color: '#000',
      theme_color: '#000',
      lang: 'en',
      useWebmanifestExtension: true,
    },
  },

  generate: {
    fallback: true,
  },

  sitemap: {
    hostname: process.env.HOST_URL,
    gzip: true,
    trailingSlash: true,
    i18n: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const Articoli = await $content('', { deep: true }).only(['path', 'updatedAt']).fetch()
      const routes = Articoli.map((route) => {
        if (route.path.indexOf('article') > -1) {
          let indexes = []
          for (let index = 0; index < route.path.length; index++) {
            if (route.path[index] === '/') {
              indexes.push(index)
            }
          }
          route.path = route.path.substring(0, indexes[2]) + route.path.substring(indexes[3])
        }

        if (route.path.indexOf('/en/') == 0) {
          route.url = `${route.path.slice(3)}/`
          route.links = [
            {
              lang: 'en',
              url: route.url,
            },
            {
              lang: 'it',
              url: '/it' + route.url,
            },
          ]
          route.locale = 'en'
        } else {
          route.url = `${route.path}/`
          route.links = [
            {
              lang: 'en',
              url: route.url.slice(3),
            },
            {
              lang: 'it',
              url: route.url,
            },
          ]
          route.locale = 'it'
        }
        route.lastmod = route.updatedAt
        return route
      })

      return routes
    },
  },

  env: {
    HOST_URL: process.env.HOST_URL,
    UTILS_SITE: process.env.UTILS_SITE,
    API_KEY: process.env.API_KEY,
    IS_DEV: process.env.IS_DEV,
    DBX_CLIENT_SECRET: process.env.DBX_CLIENT_SECRET,
    DBX_REFRESH_TOKEN: process.env.DBX_REFRESH_TOKEN,
  },

  router: {
    middleware: 'statistics',
    trailingSlash: true,
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: process.env.HOST_URL + '/sitemap.xml',
  },
}
