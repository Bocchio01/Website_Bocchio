// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    // The private keys which are only available server-side
    apiKey: 'apiKey',
    dbxClientSecret: 'dbxClientSecret',
    dbxRefreshToken: 'dbxRefreshToken',
    // Keys within public are also exposed client-side
    public: {
      hostUrl: '/api',
      utilsSite: '/api',
      isDev: true,
    }
  },

  // alias: {
  //   'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
  //   'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
  //   'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  // },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'author', content: 'Tommaso Bocchietti' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      // script: [
      //   // <script src="https://myawesome-lib.js"></script>
      //   { src: 'https://awesome-lib.js' }
      // ],
      // link: [
      //   // <link rel="stylesheet" href="https://myawesome-lib.css">
      //   { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      // ],
      // // please note that this is an area that is likely to change
      // style: [
      //   // <style type="text/css">:root { color: red }</style>
      //   { children: ':root { color: red }', type: 'text/css' }
      // ],
      // noscript: [
      //   // <noscript>JavaScript is required</noscript>
      //   { children: 'JavaScript is required' }
      // ]
    }
  },

  css: [
    '@/assets/css/global.scss',
    '@/assets/css/portali.scss',
    '@/assets/css/wrap.scss',
    '@/assets/css/miscellaneous.scss'
  ],


  modules: [
    '@nuxt/content'
  ],
  // content: {
  //   // https://content.nuxtjs.org/api/configuration
  // },

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
