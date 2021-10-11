<template>
  <article>
    <header>
      <div>
        <h1>{{ article.title }}</h1>
        <img :src="article.img.src" :alt="article.img.alt" />
      </div>
      <h3>{{ article.paragraph }}</h3>
      <div class="o_separator"></div>
    </header>
    <nuxt-content :document="article" />
    <footer>
      <div class="o_separator"></div>

      <div class="link">
        <NuxtLink to="/Home">Torna alla Home</NuxtLink>
        <p>|</p>
        <NuxtLink to="/Elenco/Portale">Torna all'elenco dei portali</NuxtLink>
      </div>
      <p class="copyright">Tommaso Bocchietti © {{ year }}</p>
    </footer>
  </article>
</template>

<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

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
  },
  head() {
    return {
      title: 'Bocchio | Portale: ' + this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tag ? this.article.tag.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Tommaso Bocchietti' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tag ? this.article.tag.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://bocchionuxt.netlify.app/Portale/${this.$route.params.slag}`,
        },
      ],
    }
  },
  created() {
    this.year = new Date().getFullYear()
  },
  computed: {
    meta() {
      const metaData = {
        type: 'game',
        title: this.article.title,
        description: this.article.description,
        url: `/Portale/${this.$route.params.slag}`,
        mainImage: this.article.img.src,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>

<style>

header {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-inline: 10px;
}
header div {
  align-items: center;
  display: flex;
  min-width: fit-content;
  margin-inline: auto;
  column-gap: 10px;
  justify-content: center;
}
header div img {
  height: 40px;
}

header h1 {
  font-size: var(--app_title_size);
  font-family: var(--Special_font);
}

header h3 {
  font-size: var(--app_paragraph_size);
}

footer {
  width: 100%;
  padding-bottom: 10px;
  padding-inline: 10px;
  text-align: center;
  font-weight: bold;
}
footer .link {
  font-size: var(--app_paragraph_size);
  display: flex;
  flex-direction: row;
  justify-content: center;
}
footer .link a {
  padding-inline: 10px;
  text-decoration: underline;
  z-index: 5;
}
footer .link a:hover {
  color: var(--link_hover_color);
}

footer .copyright {
  color: #a2a2a2;
  font-family: var(--Special_font);
  font-size: var(--app_title_size);
  display: flex;
  justify-content: center;
}
</style>