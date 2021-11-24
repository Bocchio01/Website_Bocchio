<template>
  <div class="Default">
    <cHeader @toParent="handler" />
    <cSlogan />
    <Nuxt />
    <cFooter />

    <lazy-cBackground />
    <lazy-cLogin :showLogin="toggle_login" @toParent="handler" />
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