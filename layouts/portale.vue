<template>
  <div class="Portale">
    <Nuxt />
    <lazy-cLogin :showLogin="false" @toParent="handler"/>
  </div>
</template>