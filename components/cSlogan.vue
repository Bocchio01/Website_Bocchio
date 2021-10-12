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
      if (this.$route.path == '/') {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss">
.Default {
  div.sloganBase {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--link_hover_color);
    z-index: 1;
    font-family: var(--Special_font);

    &.sloganNotHome {
      margin: 27px auto;
      font-size: var(--slogan_font_size);
    }

    &.sloganHome {
      padding: 20px;
      font-size: 130px;
      min-height: calc(100vh - var(--slogan_font_size));
      padding-bottom: 50px;
    }
  }
}

@media (max-width: 1200px) {
  :root {
    --slogan_font_size: 60px;
  }
  .Default div.sloganBase.sloganHome {
    font-size: 90px;
  }
}

@media (max-width: 570px) {
  :root {
    --slogan_font_size: 35px;
  }
  .Default div.sloganBase.sloganHome {
    font-size: var(--slogan_font_size);
  }
}
</style>