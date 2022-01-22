<template>
  <CHeadBase v-if="portale" :title="portale.title" :description="portale.description" />
</template>

<script>
export default {
  data() {
    return {
      portale: {},
    }
  },

  async fetch() {
    const slug = this.$route.name.slice(8)
    this.portale = await this.$content('portale', slug).fetch()
  },
}
</script>
