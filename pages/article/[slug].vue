<script setup lang="ts">

import type { Article, Sections, PrevNextItem } from '~/types'

const { data: article } = await useAsyncData('article-content',
    () => queryContent<Article>()
        .where({ _path: buildFullPath() })
        .findOne()
)

const { data: prev_next } = await useAsyncData('prev-next',
    () => queryContent<PrevNextItem>()
        .sort({ date: -1 })
        .where({ _path: { $ne: 'index' } })
        .findSurround(buildFullPath()),
)

const [prev, next] = prev_next.value || []

const portal: PrevNextItem | null = (article.value !== null && article.value.portalurl !== undefined) ?
    {
        title: article.value.title,
        img: article.value.img,
        _path: article.value.portalurl,
    } : null

const title: string = article.value?.title || ''
const description: string = article.value?.description || ''
const section: Sections = 'article'

useHead(buildHeadObj(title, description, section))

</script>

<template>
    <main>

        <article v-if="article !== null">
            <ContentRenderer :value="article" class="wrap">
                <template #empty>
                    <p>No content found.</p>
                </template>
            </ContentRenderer>
        </article>

        <div class="wrap nav_container" v-if="article !== null">
            <articleAttachment :items="article.attachments" />
            <articleNavigation :prev="prev" :next="next" :portal="portal" />
        </div>
        <div class="wrap forum" v-if="article !== null">
            <articleForum />
        </div>
        <ToTop />
    </main>
</template>
