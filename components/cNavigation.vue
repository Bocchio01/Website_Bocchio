<template>
  <div class="wrap navigation">
    <h2>Naviga nel sito</h2>
    <div>
      <p v-if="prev">
        <span>&#8617;</span> Articolo precedente <br />
        <NuxtLink :to="prev.slug"> {{ prev.title }} </NuxtLink>
      </p>
      <p v-if="next">
        Articolo successivo <span> &#8618; </span> <br />
        <NuxtLink :to="next.slug"> {{ next.title }} </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
<style lang="scss">
.wrap.navigation {
  > div {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
    > p > span {
      font-weight: bold;
    }
    > p:nth-child(1) {
      text-align: right;
    }
  }
}
</style>