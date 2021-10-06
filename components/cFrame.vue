<template>
  <div class="media">
    <iframe
      width="560"
      height="315"
      :src="s"
      v-bind:title="[a ? a : c]"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <p>{{ c }}</p>
  </div>
</template>

<script>
export default {
  props: ['s', 'a', 'c'],
}
</script>