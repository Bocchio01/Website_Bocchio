<script setup lang="ts">

defineProps<{
    tags?: Array<string>,
}>()

const { t } = useI18n()

const emit = defineEmits(['titleInput', 'tagsSelected'])


function titleInputHandler(value: string) {
    emit('titleInput', value)
}

function tagsSelectedHandler(value: Array<string>) {
    emit('tagsSelected', value)
}

</script>


<template>
    <div class="searchBar wrap">
        <navTitleInput style="flex: 1 1 200px" @titleInput="titleInputHandler" />
        <hr v-if="tags" />
        <div v-if="tags" style="flex: 4 1 400px">
            <label>{{ t('0') }}</label>
            <TagsMenuButtons @tagsSelected="tagsSelectedHandler" :tags="tags" :multiple="false" :start="[]" />
        </div>
    </div>
</template>

<i18n lang="json">
{
    "it": [
        "Ricerca per tag (#)",
    ],
    "en": [
        "Search by tag (#)",
    ]
}
</i18n>

<style lang="scss">
.searchBar {
    display: flex;
    padding: 15px;
    justify-content: center;
    align-items: stretch;
    row-gap: 20px;
    column-gap: 20px;

    >div {
        label {
            font-weight: bold;
            display: block;
            width: 100%;
            color: var(--Color_Text);
            font-size: calc(1.2 * var(--Size_Text_Wrap));
        }

        input,
        nav {
            width: 100%;
            margin-block: 10px;
        }

        input {
            font-family: var(--Font_Base);
            padding: 5px 10px;
            border: 2px solid var(--Color_Main);
            border-radius: var(--Border_Radius_Header);
            color: var(--Color_Text);
            background-color: var(--Color_Text_BG);
            outline: none;
            font-size: calc(1.22 * var(--Size_Text_Wrap));
        }
    }
}

@media (max-width: 1000px) {
    .searchBar {
        display: block;

        hr {
            margin-block: 10px;
        }
    }
}
</style>
