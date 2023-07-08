<script setup>
const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation()
})
</script>

<template>
    <main class="text-left">
      <nav>
        <a href="" v-for="el in navigation">{{el}}</a>
      </nav>
    </main>
</template>
