<template>
  <main>
    <cHeadBase v-if="article" :title="article.title" :description="article.description" type="article" />
    <nuxt-content class="wrap" :document="article" />
    <cNavigation v-if="navdata" :data="navdata" />
    <cForum />
    <cToTop />
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const [article] = await $content('articolo', { deep: true })
      .where({ slug: params.slug })
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
      })

    if (!article) throw { statusCode: 404 }

    const [prev1, next1] = await $content('articolo', { deep: true })
      .where({ published: { $ne: process.env.SEE_UNPUBLISHED || false } })
      .only(['title', 'slug', 'img'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    const navdata = { prev: prev1, next: next1, portal: { urlPortal: article.portalurl, img: article.img } }

    return {
      article,
      navdata,
    }
  },
}
</script>
