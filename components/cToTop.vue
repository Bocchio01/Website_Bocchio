<template>
  <button @click="top" id="ToTop"><span>&#8686;</span></button>
</template>
<script>
export default {
  methods: {
    top() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
<style lang="scss">
button#ToTop {
  font-size: calc(1.5 * var(--paragraph_size));

  margin: 0px;
  position: fixed;
  right: 15px;
  bottom: 15px;
  padding-inline: 20px;
  > span {
    font-weight: bold;
  }
}

@media (max-width: 750px) {
  button#ToTop {
    font-size: var(--paragraph_size);
    right: 5px;
    bottom: 5px;
    padding-inline: 16px;
  }
}
</style>