// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in', // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in', // default
    },
  },

  modules: [
    '@nuxt/image-edge',
    '@nuxt/content',
    // '@nuxtjs/robots',
  ],

  css: [
    // '~/node_modules/lite-youtube-embed/src/lite-yt-embed.css',
    '~/assets/css/global.css',
    '~/assets/css/portali.scss',
    '~/assets/css/wrap.scss',
    '~/assets/css/miscellaneous.scss',
  ],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/bocchio/image/upload',
    },

    // presets: {
    //   blog: {
    //     modifiers: {
    //       format: 'webp',
    //       fit: 'cover',
    //       quality: '80',
    //     },
    //   },
    // },
  },
  // content: {
  //   highlight: {
  //     theme: 'github-dark',
  //   },
  // },
  // nitro: {
  //   prerender: {
  //     routes: ['/sitemap.xml'],
  //   },
  // },
  // build: {
  //   transpile: ['lite-youtube'],
  // },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => ['lite-youtube'].includes(tag),
  //   },
  // },
})
