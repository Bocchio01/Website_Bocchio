<template>
  <div>
    <!-- <cMenuScelta @toParent="handler" :tags="tags_array" /> -->
    <cWrap
      v-for="(article, index) in articles"
      :obj="article"
      :key="index"
      :useTag="false"
      msg="Vai al portale"
    />
  </div>
</template>


<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  async asyncData({ $content }) {
    var tags_array = []
    const articles = await $content('portale', { deep: true })
      .only(['title', 'slug', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    articles.forEach(function (element) {
      element.path = '/portale/' + element.slug + '/'
    })
    tags_array = tags_array.filter(function (item, pos) {
      return tags_array.indexOf(item) == pos
    })
    return { articles, tags_array }
  },
  data() {
    return {
      tags_to_view: [],
    }
  },
  methods: {
    handler(value) {
      this.tags_to_view = value
    },
  },

  head() {
    return {
      title: 'Bocchio | Elenco Portali',
      meta: [
        ...this.meta,
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + '/articolo',
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'site',
        title: 'Bocchio | Elenco Portali',
        description: "Pagina di elenco dei portali del sito Bocchio's WebSite",
        url: '/articolo',
      }
      return getSiteMeta(metaData)
    },
  }
}
</script>