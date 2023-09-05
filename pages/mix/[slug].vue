<script setup lang="ts">

import type { Mix, Sections } from '~/types'

const { path } = useRoute()

const { data: mix } = await useAsyncData('mix-content',
  () => queryContent<Mix>()
    .where({ _path: buildFullPath() })
    .findOne(),
)

const section: Sections = 'mix'

const title: string = mix.value?.title || ''
const description: string = mix.value?.description || ''
const image: string = mix.value?.img.src || ''
const ogImage: string = buildOgImagePath(title, section)

useHead({
  title: mix.value?.title || '',
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
      href: `https://debbie.codes/`,
    },
  ],
})
</script>

<template>
  <main>

    <article v-if="mix !== null">
      <ContentRenderer :value="mix" class="wrap">
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </article>

    <!-- <CNavigation v-if="navdata" :data="navdata" /> -->
    <!-- <CForum /> -->
    <ToTop />
  </main>
</template>
