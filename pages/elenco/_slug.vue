<template>
  <div>
    <cMenuScelta @toParent="handler" v-if="showMenu" :tags="tags_array" />
    <cWrap
      v-for="(article, index) in articles"
      :key="index"
      :obj="article"
      :useTag="showMenu"
      :tags="tags_to_view"
      :msg="msg_link"
      :type="type_of_link"
    />
  </div>
</template>


<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  async asyncData({ $content, params }) {
    var tags_array = []
    const articles = await $content(params.slug, { deep: true })
      .only(['title', 'slug', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    articles.forEach(function (element) {
      element.path = '/' + params.slug + '/' + element.slug
      if (element.tag) tags_array = tags_array.concat(element.tag)
    })
    tags_array = tags_array.filter(function (item, pos) {
      return tags_array.indexOf(item) == pos
    })
    return { articles, tags_array }
  },
  data() {
    return {
      msg_link: '',
      tags_to_view: [],
      showMenu: false,
      type_of_link: 'nuxt-link',
    }
  },
  methods: {
    handler(value) {
      this.tags_to_view = value
    },
  },
  mounted() {
    if (this.tags_array.length > 0) this.showMenu = true
    if (this.$route.params.slug == 'articolo')
      this.msg_link = "Vai all'articolo"
    else {
      this.msg_link = 'Vai al portale'
      this.type_of_link = 'a'
    }
  },
  head() {
    return {
      title: 'Bocchio | Elenco ' + (this.$route.params.slug == 'articolo' ? 'Articoli' : 'Portali'),
      meta: [
        ...this.meta,
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + `/elenco/${this.$route.params.slug}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'site',
        title: 'Elenco ' + (this.$route.params.slug == 'articolo' ? 'Articoli' : 'Portali'),
        description: 'Pagina di elenco del sito Bocchio WebSite, tipologia elemento ' + this.$route.params.slug,
        url: `/elenco/${this.$route.params.slug}`,
      }
      return getSiteMeta(metaData)
    },
  }
}
</script>