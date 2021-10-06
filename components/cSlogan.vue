<template>
  <div
    class="sloganBase"
    v-bind:class="[isHome ? 'sloganHome' : 'sloganNotHome']"
  >
    {{ sloganMsg }}
  </div>
</template>

<script>
export default {
  name: 'cSlogan',
  props: {
    sloganMsg: {
      type: String,
      default: "What's Next?",
    },
  },

  computed: {
    isHome() {
      if (this.$route.path == '/Home') {
        return true
      }
      return false
    },
  },
}
</script>