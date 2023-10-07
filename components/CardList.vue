<script setup lang="ts">

import type { BaseCard } from '~/types'

const props = defineProps<{
    list: Array<BaseCard>
    messageLink: string
    tagsSelected?: Array<string> | null
    titleInput?: string
}>()

const { list, messageLink, tagsSelected, titleInput } = toRefs(props)

function showCard(Card: BaseCard) {

    if (tagsSelected?.value !== null && tagsSelected?.value.length > 0 && Card.tag !== undefined) {
        if (!tagsSelected?.value.some(tag => Card.tag?.includes(tag))) return false
    }

    if (titleInput?.value !== null && titleInput.value !== '') {
        if (!Card.title.toLowerCase().includes(titleInput?.value.toLowerCase())) return false
    }

    return true
}

</script>

<template>
    <div>
        <div v-for="item of list" :key="item._path" v-show="showCard(item)">
            <Card :item="item" :message-link="messageLink" />
        </div>
    </div>
</template>

