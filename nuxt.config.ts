// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    modules: [
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/robots',
    ],

    colorMode: {
        classSuffix: '',
        preference: 'system',
        fallback: 'dark',
    },

    css: ['~/assets/css/global.css'],

    image: {
        cloudinary: {
            baseURL: 'https://res.cloudinary.com/bocchio/image/upload',
        },
        presets: {
            default: {
                modifiers: {
                    format: 'webp',
                    // quality: 80,
                    // fit: 'cover',
                },
            },
        },
    },

    content: {
        highlight: {
            theme: 'github-dark'
        },
        markdown: {
            anchorLinks: false
        }
    },

    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        }
    },


    i18n: {
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
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',  // recommended
        },
    },


    typescript: {
        shim: false
    },

    experimental: {
        watcher: "chokidar",
    },

    vue: {
        compilerOptions: {
            isCustomElement: tag => false//['lite-youtube'].includes(tag),
        },
    },
})
