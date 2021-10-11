<template>
  <div>
    <CMenuScelta @toParent="handler" v-if="showMenu" :tags="tags_array" />
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
export default {
  async asyncData({ $content, params }) {
    var tags_array = []
    const articles = await $content(params.slug, { deep: true })
      .only(['title', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
    articles.forEach(function (element) {
      element.path = '/' + params.slug + '/' + element.title
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
    if (this.$route.params.slug == 'Articolo')
      this.msg_link = "Vai all'articolo"
    else {
      this.msg_link = 'Vai al portale'
      this.type_of_link = 'a'
    }
  },
}
</script>