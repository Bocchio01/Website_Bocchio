<template>
  <div class="sloganBase" v-bind:class="[isHome ? 'sloganHome' : 'sloganNotHome']">
    {{ sloganMsg }}
  </div>
</template>

<script>
export default {
  name: 'CSlogan',
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
    color: var(--Color_Hover);
    z-index: 1;
    font-family: var(--Font_Special);

    &.sloganNotHome {
      margin: 27px auto;
      font-size: var(--Size_Text_Slogan);
    }

    &.sloganHome {
      padding: 20px;
      font-size: 130px;
      min-height: calc(100vh - var(--Size_Text_Slogan));
      padding-bottom: 50px;
    }
  }
}

@media (max-width: 1200px) {
  :root {
    --Size_Text_Slogan: 60px;
  }
  .Default div.sloganBase.sloganHome {
    font-size: 90px;
  }
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Slogan: 35px;
  }
  .Default div.sloganBase.sloganHome {
    font-size: 60px;
  }
}
</style>
