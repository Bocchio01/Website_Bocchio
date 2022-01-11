<template>
  <article>
    <cHeadBase
      v-if="article"
      :title="article.title"
      :description="article.description"
      type="article"
    />
    <nuxt-content class="wrap" :document="article" />
    <cNavigation
      v-if="article"
      :navdata="{ prev: prev, next: next }"
      :portal="{ urlPortal: article.portalurl, img: article.img }"
    />
    <cForum />
    <cToTop />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const [article] = await $content('articolo')
      .where({ slug: params.slug })
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
      })

    if (!article) throw { statusCode: 404 }

    const [prev, next] = await $content('articolo')
      .only(['title', 'slug', 'img'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  }
}
</script>