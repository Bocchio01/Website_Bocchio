<script setup lang="ts">

import type { BaseCard } from '~/types'

defineProps<{
    list: Array<BaseCard>
    messageLink: string
}>()

</script>

<template>
    <ul>
        <li v-for="item of list" :key="item._path">
            <Card :item="item" :message-link="messageLink" />
        </li>
    </ul>
</template>

