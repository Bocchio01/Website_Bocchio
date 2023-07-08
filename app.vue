<script setup>

const config = useRuntimeConfig()

const Description = 'Tommaso Bocchietti. Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all\'ingegneria.'
const Title = 'Home'
const Url = config.public.hostUrl
const Card = Url + '/.netlify/functions/og-image?title=' + (Title == 'Home' ? 'Bocchio\'s WebSite' : Title) + '&theme=' + (Url.indexOf('/portal/') > 0 ? 'dark' : 'light')

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: Title,
  titleTemplate: title => title !== Title ? `${title} · Bocchio` : title,
  meta: [
    {
      name: 'description',
      content: Description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    {
      property: 'og:title',
      content: Title,
    },
    {
      property: 'twitter:title',
      content: Title,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'og:description',
      content: Description,
    },
    {
      name: 'twitter:description',
      content: Description,
    },
    {
      property: 'og:image',
      content: Card,
    },
    {
      name: 'twitter:image',
      content: Card,
    },
    {
      property: 'og:image:alt',
      content: Title,
    },
    {
      name: 'twitter:image:alt',
      content: Title,
    },
    {
      property: 'og:url',
      content: Url,
    },
    {
      name: 'twitter:url',
      content: Url,
    },
    {
      property: 'og:site_name',
      content: Url
    },
    {
      property: 'og:type',
      content: 'website'
    },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'canonical',
      href: Url,
    },
    // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css' },
  ],
})
</script>

<template>
  <div>
    <Header />
    <Slogan />

    <NuxtPage />

    <Footer />

    <Background />
  </div>
</template>