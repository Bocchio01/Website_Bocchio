<script setup lang="ts">

import type { PrevNextItem } from '~/types'

defineProps<{
    prev: PrevNextItem | undefined | null,
    next: PrevNextItem | undefined | null,
    portal: PrevNextItem | undefined | null,
}>()

const { t } = useI18n()

</script>

<template>
    <div v-if="prev || portal || next" class="wrap navigation" style="flex: 5 1 300px">

        <h2>{{ t('navigation') }}</h2>

        <div>
            <articleNavigationItem v-if="prev" :item="prev" type="prev"></articleNavigationItem>
            <articleNavigationItem v-if="portal" :item="portal" type="portal"></articleNavigationItem>
            <articleNavigationItem v-if="next" :item="next" type="next"></articleNavigationItem>
        </div>

    </div>
</template>

<i18n lang="json">
{
    "it": {
        "navigation": "Naviga tra gli articoli"
    },
    "en": {
        "navigation": "Navigate between articles"
    }
}
</i18n>


<style lang="scss">
.wrap.nav_container {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    align-items: stretch;
    justify-content: center;
    padding: 0px;
    background: none;
    border: none;
    column-gap: 25px;
    row-gap: 25px;
    margin-block: 25px;
}

.wrap.navigation {
    padding: var(--Padding_Wrap_Min);
    margin-block: 0px;

    >div {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;

        >.document {
            margin-inline: auto;
            text-align: center;
            margin: 10px;
            padding: var(--Padding_Wrap_Min);
            width: fit-content;

            >p {
                font-weight: bold;
            }

            .media {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            img {
                border-radius: 20px;
                background-color: white;
                margin-top: 10px;
                max-height: 150px;
                max-width: 150px;
            }

            &:hover {
                transform: scale(1.05);
                background-color: gray;

                >.link_hidden {
                    visibility: visible;
                }
            }
        }
    }
}

@media (max-width: 750px) {
    .wrap.navigation>div>.document img {
        max-height: 75px;
        max-width: 75px;
    }
}
</style>