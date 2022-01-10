<template>
  <article>
    <cHeadBase
      v-if="article"
      :title="article.title"
      :description="article.description"
      type="article"
    />
    <nuxt-content class="wrap" :document="article" />
    <!-- <cNavigation
      v-if="article"
      :navdata="{ prev: prev, next: next }"
      :portal="{ urlPortal: article.portalurl, img: article.img }"
    />
    <cForum /> -->
    <cToTop />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || 'chi sono'
    const article = await $content('mix', slug)
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
      })

    return { article }
  }
}
</script>