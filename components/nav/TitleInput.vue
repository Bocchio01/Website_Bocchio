<script setup lang="ts">

const { t } = useI18n()

const emit = defineEmits(['titleInput'])

const inputString = ref('')

watch(inputString, () => {
    emit('titleInput', inputString.value)
})

</script>

<template>
    <!-- <div style="flex: 1 1 200px"> -->
    <div>
        <label>{{ t('0') }}</label>
        <input id="search" type="search" v-model="inputString" :placeholder="t('1')" autocomplete="new-password" />
    </div>
</template>

<i18n lang="json">
{
    "it": [
        "Ricerca per titolo",
        "Titolo..."
    ],
    "en": [
        "Search by title",
        "Title..."
    ]
}
