<template>
  <div>
    <CHeadBase :title="$t('article.title')" :description="$t('article.description')" />
    <CSearch @toParent="handler" :tags="tags_array" />
    <CWrap v-for="(article, index) in articles" :key="index" :obj="article" :tags="tags_to_view"
      :search_title="title_to_view" :msg="$t('article.msg')" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, error }) {
    var tags_array = []
    const articles = await $content(app.i18n.locale + '/article', { deep: true })
      .where({ published: { $ne: process.env.IS_DEV || false } })
      .only(['title', 'slug', 'paragraph', 'img', 'tag'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })

    articles.forEach((element) => {
      element.path = '/article/' + element.slug + '/'
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
