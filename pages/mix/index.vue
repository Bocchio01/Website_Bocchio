<template>
  <div>
    <CHeadBase :title="$t('portal.title')" :description="$t('portal.description')" />
    <CSearch @toParent="handler" />
    <CWrap v-for="(portale, index) in portali" :key="index" :obj="portale" :search_title="title_to_view"
      :msg="$t('portal.msg')" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, error }) {
    const portali = await $content(app.i18n.locale + '/mix')
      .where({ published: { $ne: process.env.IS_DEV || false } })
      .sortBy('createdAt', 'asc')
      .fetch()
      .catch(() => {
        error({ statusCode: 404 })
      })
    portali.forEach((element) => {
      element.path = '/mix/' + element.slug + '/'
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
