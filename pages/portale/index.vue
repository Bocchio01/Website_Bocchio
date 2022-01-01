<template>
  <div>
    <cHeadBase
      title="Elenco Portali"
      description="Pagina di elenco dei portali del sito Bocchio's WebSite"
    />

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
export default {
  async asyncData({ $content }) {
    const portali = await $content('portale')
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
      })

    portali.forEach(function (element) {
      element.path = '/portale/' + element.slug + '/'
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
}
</script>