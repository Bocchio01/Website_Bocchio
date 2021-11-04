<template>
  <article>
    <header>
      <div>
        <h1>{{ article.title }}</h1>
        <nuxt-img
          v-if="article.img.src.indexOf('http') == -1"
          provider="cloudinary"
          :src="article.img.src"
          width="40"
          height="40"
          v-bind:alt="article.img.src ? article.img.src : article.img.alt"
        />
        <img
          v-else
          :src="article.img.src"
          :alt="article.img.alt"
          width="40"
          height="40"
        />
      </div>
      <h3 v-html="article.paragraph.join('<br>')"></h3>
    </header>

    <nuxt-content :document="article" />

    <footer>
      <div>
        <NuxtLink to="/">Torna alla Home</NuxtLink>
        <p>|</p>
        <NuxtLink to="/elenco/portale">Torna all'elenco dei portali</NuxtLink>
      </div>
      <p>Tommaso Bocchietti © {{ year }}</p>
    </footer>
  </article>
</template>

<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

export default {
  layout: 'portale',
  async asyncData({ $content, params }) {
    const [article] = await $content({ deep: true })
      .where({ slug: params.slag })
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
        { name: 'twitter:label1', content: 'Created by' },
        { name: 'twitter:data1', content: 'Tommaso Bocchietti' },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.HOST_URL + `/portale/${this.$route.params.slag}`,
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
        url: `/portale/${this.$route.params.slag}`,
        mainImage: this.article.img.src,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>

<style lang="scss">
.Portale {
  header,
  footer {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    > div {
      display: flex;
      align-items: center;
      column-gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  header {
    margin-top: 10px;
    > div {
      > h1 {
        font-size: var(--header_font_size);
        font-family: var(--Special_font);
      }
      > img {
        height: 40px;
      }
    }
    > h3 {
      font-size: var(--paragraph_size);
    }
  }

  footer {
    > div {
      > a {
        text-decoration: underline;
        &:hover {
          color: var(--link_hover_color);
        }
      }
      * {
        z-index: 5;
        font-size: var(--paragraph_size);
      }
    }
    > p {
      color: #a2a2a2;
      font-family: var(--Special_font);
      font-size: var(--footer_font_size);
    }
  }
}
</style>