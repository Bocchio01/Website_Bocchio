<template>
  <div>
    <div class="searchBar wrap">
      <div style="flex: 1 1 200px">
        <label>Ricerca per titolo</label>
        <input
          type="search"
          v-model="title_to_view"
          placeholder="Titolo.."
          autocomplete="new-password"
        />
      </div>
      <hr>
      <div style="flex: 4 1 400px">
        <label>Ricerca per tag (#)</label>
        <cMenuScelta @toParent="handler" :tags="tags_array" />
      </div>
    </div>
    <cWrap
      v-for="(article, index) in articles"
      :obj="article"
      :key="index"
      :useTag="true"
      :tags="tags_to_view"
      :title="title_to_view"
      msg="Vai all'articolo"
    />
  </div>
</template>


<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  async asyncData({ $content }) {
    var tags_array = []
    const articles = await $content('articolo', { deep: true })
      .only(['title', 'slug', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    articles.forEach(function (element) {
      element.path = '/articolo/' + element.slug + '/'
      if (element.tag) tags_array = tags_array.concat(element.tag)
    })
    tags_array = tags_array.filter(function (item, pos) {
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
      this.tags_to_view = value
    },
  },

  head() {
    return {
      title: 'Elenco Articoli',
      meta: [...this.meta],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + '/articolo/',
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'website',
        title: 'Elenco Articoli',
        description:
          "Pagina di elenco degli articoli del sito Bocchio's WebSite",
        url: '/articolo/',
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>