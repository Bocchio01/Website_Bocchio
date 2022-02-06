<template>
  <div class="sloganBase" :class="isHome ? 'sloganHome' : 'sloganNotHome'">
    {{ sloganMsg }}
  </div>
</template>

<script>
export default {
  props: {
    sloganMsg: {
      type: String,
      default: "What's Next?",
    },
  },

  computed: {
    isHome() {
      return this.$route.path == '/'
    },
  },
}
</script>

<style lang="scss">
.Default {
  div.sloganBase {
    width: 100%;
    text-shadow: -10px 10px 15px rgba(#fff, 0.5);
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
      height: calc(100vh - var(--Size_Text_Slogan));
      padding: 20px 15px 50px 25px;
      --Font_Size_Slogan_Home: 160px;
      font-size: 160px;
      animation: 3.5s linear 0s forwards;
      animation-name: none;
    }
  }
}

@media (max-width: 1200px) {
  :root {
    --Size_Text_Slogan: 60px;
  }
  .Default div.sloganBase.sloganHome {
    --Font_Size_Slogan_Home: 120px;
    font-size: 120px;
  }
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Slogan: 35px;
  }
  .Default div.sloganBase.sloganHome {
    --Font_Size_Slogan_Home: 65px;
    font-size: 65px;
  }
}

@keyframes login {
  0% {
    opacity: 1;
    font-size: 1px;
  }
  30% {
    font-size: var(--Font_Size_Slogan_Home);
  }
  90% {
    font-size: calc(0.8 * var(--Font_Size_Slogan_Home));
    opacity: 0;
  }
  95% {
    font-size: var(--Font_Size_Slogan_Home);
  }
  96% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    font-size: var(--Font_Size_Slogan_Home);
  }
}
</style>
