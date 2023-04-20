<script setup lang="ts">
  import type { Article, PrevNext, Sections } from '~/types'

  const { path } = useRoute()

  const { data: article } = await useAsyncData(path.replace(/\/$/, ''), () =>
    queryContent<Article>('it/article/2021/').where({ _path: path }).findOne()
  )

  console.log('path', path)
  console.log('article', article)

  const { data } = await useAsyncData('prev-next', () =>
    queryContent<PrevNext>('it/article/2021/')
      .where({ published: { $ne: false }, featured: { $ne: true } })
      .sort({ date: -1 })
      .only(['_path', 'title'])
      .findSurround(path)
  )
  const [prev, next] = data.value || []
  const section: Sections = 'articles'
  const title: string = article.value?.title || ''
  const description: string = article.value?.description || ''
  const image: string = article.value?.image || ''
  const ogImage: string = article.value?.ogImage || ''

  useHead({
    title: article.value?.title || '',
    meta: [
      { name: 'description', content: description },
      {
        name: 'description',
        content: description,
      },
      // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
      { property: 'og:site_name', content: 'Debbie Codes' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://debbie.codes',
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: ogImage || image,
      },
      // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
      { name: 'twitter:site', content: '@debs_obrien' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:url',
        content: 'https://debbie.codes',
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: ogImage || image,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://debbie.codes/${path}`,
      },
    ],
  })
</script>

<template>
  <main>
    <!-- <CHeadBase
      v-if="article"
      :title="article.title"
      :description="article.description"
      type="article"
    /> -->
    <article v-if="article !== null">
      <ContentRenderer :value="article.value" class="wrap">
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
      <!-- <CNavigation v-if="navdata" :data="navdata" /> -->
      <!-- <CForum /> -->
    </article>
    <CToTop />
  </main>
</template>
