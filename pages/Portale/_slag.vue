<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
import getSiteMeta from "@/assets/js/getSiteMeta.js";

export default {
  layout: 'blank',
  async asyncData({ $content, params }) {
    const [article] = await $content({ deep: true })
      .where({ title: params.slag })
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { article }
  },
  head() {
    return {
      title: 'Bocchio | Portale: ' +  this.article.title,
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
          href: `https://bocchionuxt.netlify.app/Portale/${this.$route.params.slag}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'game',
        title: this.article.title,
        description: this.article.description,
        url: `/Portale/${this.$route.params.slag}`,
        mainImage: this.article.img.src,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>