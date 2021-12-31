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
    </div>
    <cWrap
      v-for="(portale, index) in portali"
      :obj="portale"
      :key="index"
      :useTag="false"
      :title="title_to_view"
      msg="Vai al portale"
    />
  </div>
</template>


<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  async asyncData({ $content }) {
    const portali = await $content('portale')
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { portali }
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
      title: 'Elenco Portali',
      meta: [...this.meta],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + '/portale/',
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'website',
        title: 'Elenco Portali',
        description: "Pagina di elenco dei portali del sito Bocchio's WebSite",
        url: '/portale/',
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>