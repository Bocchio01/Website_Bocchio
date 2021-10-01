<template>
  <article>
    <nuxt-content class="" :document="article" />
  </article>
</template>

<script>
export default {
  layout: 'blank',
  async asyncData({ $content, params }) {
    const [article] = await $content({ deep: true })
      .where({ title: params.slag })
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { article }
  }
}
</script>