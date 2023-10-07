<script setup lang="ts">

useHead({
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    titleTemplate: title => `${title} | Bocchio's WebSite`,
})

</script>

<template>
    <div>
        <Header />
        <Slogan />

        <NuxtPage />

        <Footer />

        <Background />
    </div>
</template>



<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
