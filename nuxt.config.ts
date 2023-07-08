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

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData(source: string, fp: string) {
            // All scss files ending with imports.scss will not re-import additionalData
            if (fp.endsWith('variables.scss')) return source;
            return `@import "@/assets/css/variables.scss"; ${source}`
          }
        },
      },
    },
  },

  css: [
    '~/assets/css/global.scss',
    '~/assets/css/portali.scss',
    '~/assets/css/wrap.scss',
    '~/assets/css/miscellaneous.scss'
  ],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
  ],

  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
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

  i18n: {
    /* module options */
    baseUrl: process.env.NUXT_PUBLIC_HOST_URL,
    lazy: true,
    langDir: 'lang',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', dir: 'ltr' },
    ],
    strategy: 'prefix_except_default',
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
