<template>
  <article>
    <CHeadBase v-if="article" :title="article.title" :description="article.description" type="article" />
    <nuxt-content class="wrap" :document="article" />
    <CToTop />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const slug = params.slug || 'chi sono'
    const article = await $content(app.i18n.locale + '/mix', slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })

    return { article }
  },
}
</script>
