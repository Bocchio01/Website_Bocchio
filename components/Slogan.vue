<script setup lang="ts">

const localePath = useLocalePath()
const route = useRoute()

const isHomePage = computed(() => {
  return route.path == localePath('/')
})

</script>

<template>
  <div class="sloganBase" :class="isHomePage ? 'sloganHome' : 'sloganNotHome'">
    Get Things Done!
  </div>
</template>


<style lang="scss">
$Font_Size_Slogan_Home: 160px;

@mixin updateSloganStyles {
  $Size_Text_Slogan: 60px;

  div.sloganBase.sloganHome {
    font-size: 120px;
  }
}


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
    text-shadow: -5px 5px 20px rgba(#fff, 0.5);
    margin: 27px auto;
    font-size: var(--Size_Text_Slogan);
  }

  &.sloganHome {
    text-shadow: -7px 7px 20px rgba(#fff, 0.5);
    height: calc(100vh - var(--Size_Text_Slogan));
    padding: 50px;
    $Font_Size_Slogan_Home: 160px;
    font-size: 160px;
    animation: 3.5s linear 0s forwards;
    animation-name: none;
  }
}

@media (max-width: 1200px) {
  @include updateSloganStyles;
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Slogan: 35px;
  }

  div.sloganBase.sloganHome {
    $Font_Size_Slogan_Home: 65px;
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
    font-size: calc(0.8 * $Font_Size_Slogan_Home);
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