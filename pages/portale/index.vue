<template>
  <div>
    <CHeadBase title="Sezione portali" description="Pagina di elenco dei portali del sito Bocchio's WebSite" />

    <CSearch @toParent="handler" />
    <CWrap v-for="(portale, index) in portali" :key="index" :obj="portale" :search_title="title_to_view" msg="Vai al portale" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const portali = await $content('portale')
      .where({ published: { $ne: process.env.IS_DEV || false } })
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch(() => {
        throw { statusCode: 404 }
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
      this.title_to_view = value.title
    },
  },
}
</script>
