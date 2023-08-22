// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    // The private keys which are only available server-side
    apiKey: 'apiKey',
    dbxClientSecret: 'dbxClientSecret',
    dbxRefreshToken: 'dbxRefreshToken',
    // Keys within public are also exposed client-side
    public: {
      hostUrl: 'https://bocchio.dev',
      utilsSite: 'https://bocchioutils.altervista.org',
      isDev: false,
    }
  },

  // alias: {
  //   'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
  //   'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
  //   'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  // },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/image',
    // '@nuxtjs/tailwindcss',
  ],

  css: ['@/assets/css/global.css'],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },

  // css: [
  //   '@/assets/style/variables.scss',
  //   '@/assets/style/_global.scss',
  //   '@/assets/style/_portali.scss',
  //   '@/assets/style/_wrap.scss',
  //   '@/assets/style/_miscellaneous.scss'
  // ],

  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
      anchorLinks: false
    },
    highlight: {
      // Theme used in all color schemes.
      // theme: 'github-light'
      // OR
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.dark`
        dark: 'github-light',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/bocchio/image/upload',
    },
  },

  i18n: {
    /* module options */
    baseUrl: process.env.NUXT_PUBLIC_HOST_URL,
    lazy: true,
    langDir: 'lang',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', dir: 'ltr' },
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      // alwaysRedirect: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
  },


  // spaLoadingTemplate: 'app/spa-loading-template.html',
  // ssr: false,


  // devtools: { enabled: true },

  typescript: {
    shim: false
  },

  experimental: {
    watcher: "chokidar",
  }
})
