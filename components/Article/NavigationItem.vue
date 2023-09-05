<script setup lang="ts">

import type { PrevNextItem } from '~/types'

defineProps<{
    item: PrevNextItem | null,
    type: 'prev' | 'next' | 'portal'
}>()

const localePath = useLocalePath()

</script>

<template>
    <div class="wrap document" v-if="item">
        <p>{{ item.title }}</p>

        <prose-img v-if="item.img" :src="item.img.src" :alt="item.img.src" :provider="item.img.provider"></prose-img>

        <NuxtLink :to="localePath(item._path.replace('/en', ''))" class="link_hidden">
            <div class="button">
                <span v-if="type == 'prev'">&#8617;</span>
                <span v-if="type == 'portal'">&#8605;</span>
                <span v-if="type == 'next'">&#8618;</span>
            </div>
        </NuxtLink>
    </div>
</template>