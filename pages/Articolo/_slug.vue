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

    if (article == undefined) {
      return console.log({ statusCode: 404, message: 'Article not found' })
    }

    return { article }
  },

head() {
  return {
    title: "Bocchio | " + this.article.title,
    meta: [
      {
        hid: "og:description",
        name: "og:description",
        content: this.article.description,
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "article",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: `https://bobross.com/articles/${this.$route.params.slug}`,
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: `https://bobross.com/articles/${this.$route.params.slug}`,
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: this.article.title,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: this.article.description,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: this.article.image,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: this.article.image,
      },
      {
        property: "article:published_time",
        content: this.article.createdAt,
      },
      {
        property: "article:modified_time",
        content: this.article.updatedAt,
      },
      {
        property: "article:tag",
        content: this.article.tags ? this.article.tags.toString() : "",
      },
      { name: "twitter:label1", content: "Written by" },
      { name: "twitter:data1", content: "Bob Ross" },
      { name: "twitter:label2", content: "Filed under" },
      {
        name: "twitter:data2",
        content: this.article.tags ? this.article.tags.toString() : "",
      },
    ],
    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: `https://bobross.com/articles/${this.$route.params.slug}`,
      },
    ],
  };
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