<template>
  <div>
    <CHeadBase title="Sezione articoli" description="Pagina di elenco degli articoli del sito Bocchio's WebSite" />
    <CSearch @toParent="handler" :tags="tags_array" />
    <CWrap v-for="(article, index) in articles" :key="index" :obj="article" :tags="tags_to_view" :search_title="title_to_view" msg="Vai all'articolo" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    var tags_array = []
    const articles = await $content('articolo', { deep: true })
      .where({ published: { $ne: process.env.IS_DEV || false } })
      .only(['title', 'slug', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
      })

    articles.forEach((element) => {
      element.path = '/articolo/' + element.slug + '/'
      if (element.tag) tags_array = tags_array.concat(element.tag)
    })
    tags_array = tags_array.filter((item, pos) => {
      return tags_array.indexOf(item) == pos
    })
    return { articles, tags_array }
  },

  data() {
    return {
      tags_to_view: [],
      title_to_view: '',
    }
  },

  methods: {
    handler(value) {
      this.tags_to_view = value.tags
      this.title_to_view = value.title
    },
  },
}
</script>
