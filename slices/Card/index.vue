<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
    getSliceComponentProps<Content.CardSlice>([
        "slice",
        "index",
        "slices",
        "context",
    ]),
);
</script>

<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
        <PrismicRichText :field="item.title" wrapper="h1" />
        <PrismicRichText :field="item.description" wrapper="p" />
        <PrismicImage :field="item.image" />
        <PrismicLink :field="item.link">Link</PrismicLink>
    </section>
</template>
