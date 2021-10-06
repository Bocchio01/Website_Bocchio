<template>
  <div class="nuxt-content navigation">
    <h2 style="margin-top: 0px">Naviga nel sito</h2>
    <div class="wrap">
      <div style="text-align:right" v-if="prev">
        <p>
          <span>&#8617;</span> Articolo precedente <br />
          <NuxtLink :to="prev.slug"> {{ prev.title }} </NuxtLink>
        </p>
      </div>
      <div v-if="next">
        <p>
          Articolo successivo <span> &#8618; </span> <br />
          <NuxtLink :to="next.slug"> {{ next.title }} </NuxtLink>
        </p>
      </div>
    </div>
    <br>
    <p style="text-align:center">
      <a class="a_button" href="#">Torna in cima</a>
    </p>
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