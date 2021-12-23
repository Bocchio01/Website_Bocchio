<template>
  <div class="Portale">
    <Nuxt />
    <!-- <lazy-cLogin :showLogin="toggle_login" @toParent="handler"/> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle_login: false,
    }
  },
  methods: {
    handler(value) {
      this.toggle_login = value
    },
  },
}
</script>