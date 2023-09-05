import type { Sections } from '~/types'

export function buildHeadObj(title: string, description: string, section: Sections) {

    const ogImagePath = 'https://bocchio.dev/.netlify/functions/og-image'
    const theme = section === 'portal' ? 'dark' : 'light'

    const { path } = useRoute()
    const { locale } = useI18n()
    const ogImage = ogImagePath + '?title=' + title + '&theme=' + theme

    return {
        htmlAttrs: {
            lang: locale.value,
        },
        title: title || 'Bocchio\'s WebSite',
        meta: [
            {
                name: 'description',
                content: description,
            },
            { property: 'og:site_name', content: 'Bocchio\'s WebSite' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            {
                property: 'og:url',
                content: 'https://bocchio.dev',
            },
            {
                property: 'og:title',
                content: title,
            },
            {
                property: 'og:description',
                content: description,
            },
            {
                property: 'og:image',
                content: ogImage,
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:url',
                content: 'https://bocchio.dev',
            },
            {
                name: 'twitter:title',
                content: title,
            },
            {
                name: 'twitter:description',
                content: description,
            },
            {
                name: 'twitter:image',
                content: ogImage,
            },
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://bocchio.dev${path.replace(/\/$/, '')}`,
            },
        ],
    }
}