<template>
  <article>
    <CHeadBase v-if="article" :title="article.title" :description="article.description" type="article" />
    <nuxt-content class="wrap" :document="article" />
    <CNavigation :data="null" />
    <CForum />
    <CToTop />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const article = await $content(app.i18n.locale + '/mix', params.slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })

    if (!article) throw { statusCode: 404 }

    return { article }
  },
}
</script>
