<script setup lang="ts">

import type { AttachmentItem, PrevNextItem } from '~/types'

defineProps<{
    items: AttachmentItem[] | undefined | null,
}>()

const { t } = useI18n()

</script>

<template>
    <div v-if="items" class="wrap navigation" style="flex: 1 1 250px">

        <h2>{{ t('attachment') }}</h2>

        <div>
            <ArticleAttachmentItem v-for="item in items" :item="item" :key="item.name"></ArticleAttachmentItem>
        </div>

    </div>
</template>

<i18n lang="json">
{
    "it": {
        "attachment": "Guarda gli allegati"
    },
    "en": {
        "attachment": "See the attachments"
    }
}
</i18n>