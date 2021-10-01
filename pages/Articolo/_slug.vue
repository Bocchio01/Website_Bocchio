<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const [article] = await $content({ deep: true })
      .where({ title: params.slug })
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { article }
  }
}
</script>

<style>
@import url('@/assets/css/wrap.css');
.nuxt-content a {
  text-decoration: underline;
  font-weight: bold;
}

.nuxt-content code {
  overflow-wrap: anywhere;
  display: inline-block;
  background-color: #b3b3b38c;
  border: 3px solid darkgray;
  border-radius: 5px;
  padding-inline: 5px;
  font-weight: bold;
  font-size: calc(0.7 * var(--paragraph_size));
}

.nuxt-content a:hover {
  color: var(--link_hover_color);
}

.nuxt-content h2 {
  margin-top: 50px;
  border-bottom: 1px solid #a2a2a2;
  font-size: calc(1.5 * var(--paragraph_size));
  font-family: var(--Base_font);
}
</style>