<template>
  <article>
    <nuxt-content class="wrap" :document="article" />
    <cNavigation :prev="prev" :next="next" v-if="prev || next" />
    <cToTop />
  </article>
</template>

<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  async asyncData({ $content, params }) {
    const [article] = await $content({ deep: true })
      .where({ slug: params.slug })
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    const [prev, next] = await $content('articolo', { deep: true })
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  head() {
    return {
      title: 'Bocchio | Articolo: ' + this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tag ? this.article.tag.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Tommaso Bocchietti' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tag ? this.article.tag.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + `/articolo/${this.$route.params.slag}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `/articolo/${this.$route.params.slug}`,
        mainImage: process.env.CLOUDINARY_BASE_URL + this.article.img.src,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>