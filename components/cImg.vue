<template>
  <div v-bind:class="[espansione ? 'embedded_img' : 'media']" @click="expand">
    <img :src="s" v-bind:alt="[a ? a : c]"/>
    <p>{{ c }}</p>
  </div>
</template>

<script>
export default {
  props: ['s', 'a', 'c'],
  data() {
    return {
      espansione: false
    }
  },
  methods:
  {
    expand() {
this.espansione = !this.espansione
    }
  }
}
</script>