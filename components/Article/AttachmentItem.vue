<script setup lang="ts">

import type { AttachmentItem, PrevNextItem } from '~/types'

defineProps<{
    item: AttachmentItem,
}>()

const { t } = useI18n()

</script>

<template>
    <div class="wrap document">
        <p>{{ item.name }}</p>

        <img :src="(useAsset(`/png/AttachmentIcon/${item.name}.png`) as string)" :alt="item.name + ' icon'" />

        <a :href="item.url" class="link_hidden" target="_blank" rel="nofollow noopener noreferrer">
            <div class="button">{{ t('button') }}</div>
        </a>

    </div>
</template>

<i18n lang="json">
{
    "it": {
        "button": "Apri risorsa"
    },
    "en": {
        "button": "Open resource"
    }
}
</i18n>