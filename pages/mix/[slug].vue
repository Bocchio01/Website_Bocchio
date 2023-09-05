<script setup lang="ts">

import type { Mix, Sections } from '~/types'

const { path } = useRoute()

const { data: mix } = await useAsyncData('mix-content',
    () => queryContent<Mix>()
        .where({ _path: buildFullPath() })
        .findOne(),
)

const title: string = mix.value?.title || ''
const description: string = mix.value?.description || ''
const section: Sections = 'mix'

useHead(buildHeadObj(title, description, section))

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
