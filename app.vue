<script setup>

const config = useRuntimeConfig()

const description = 'Tommaso Bocchietti. Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all\'ingegneria.'
const ogTitle = 'Home'
const mySite = 'https://bocchio.dev'

const twitterDescription = description

const twitterCard = buildOgImagePath(ogTitle, 'article')

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: ogTitle,
  titleTemplate: title => `${title} | Bocchio's WebSite`,
  meta: [
    {
      name: 'description',
      content:
        description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: mySite,
    },
    {
      property: 'og:title',
      content: ogTitle
      ,
    },
    {
      property: 'og:description',
      content:
        description,
    },
    {
      property: 'og:image',
      content: twitterCard,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: mySite,
    },
    {
      name: 'twitter:title',
      content: ogTitle,
    },
    {
      name: 'twitter:description',
      content: twitterDescription,
    },
    {
      name: 'twitter:image',
      content: twitterCard,
    },

  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'canonical',
      href: mySite,
    },
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