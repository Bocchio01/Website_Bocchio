<template>
  <main>
    <CHeadBase v-if="article" :title="article.title" :description="article.description" type="article" />
    <nuxt-content class="wrap" :document="article" />
    <CNavigation v-if="navdata" :data="navdata" />
    <CForum />
    <CToTop />
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const [article] = await $content(app.i18n.locale + '/article', { deep: true })
      .where({ slug: params.slug })
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })

    if (!article) throw { statusCode: 404 }

    const [prev, next] = await $content(app.i18n.locale + '/article', { deep: true })
      .where({ published: { $ne: process.env.IS_DEV || false } })
      .only(['title', 'slug', 'img'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    const navdata = { prev: prev, next: next, portal: { urlPortal: article.portalurl, img: article.img } }

    return {
      article,
      navdata,
    }
  },
}
</script>
