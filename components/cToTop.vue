<template>
  <button @click="top" class="ToTop"><span>&#8686;</span></button>
</template>
<script>
export default {
  methods: {
    top() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
<style lang="scss">
button.ToTop {
  position: fixed;
  right: 15px;
  bottom: 15px;
  margin-block: 0px;
  margin-right: 0px;
  padding-inline: 20px;
  font-size: calc(1.5 * var(--paragraph_size));
  > span {
    font-weight: bold;
  }
}

@media (max-width: 750px) {
  button.ToTop {
    position: sticky;
    right: 0px;
    bottom: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    padding-inline: 16px;
    font-size: var(--paragraph_size);
  }
}
</style>