<template>
  <div id="particle-container">
    <div class="particle" v-for="n in 100" :key="n"></div>
  </div>
</template>

<script>
export default {
  name: 'cBackground',
  mounted() {
    window.onscroll = () => {
      this.$store.commit('set_show', ['submenu', false])
      this.$store.commit('set_show', ['mainmenu', false])
      try {
        document.getElementById('menu-btn').checked = false
      } catch (error) {}
    }
  },
}
</script>

<style lang="scss">
#particle-container {
  position: fixed;
  top: 0px;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-color: var(--background_color_body);

  > div {
    position: absolute;
    border-radius: 50%;
    background: var(--background_color);
  }
}

@for $i from 1 through 100 {
  @keyframes particle-animation-#{$i} {
    100% {
      transform: translate3d(
        (random(100) * 1vw),
        (random(100) * 1vh),
        (random(100) * 1px)
      );
    }
  }

  .particle:nth-child(#{$i}) {
    animation: particle-animation-#{$i} 100s infinite;
    $size: random(5) + 1 + px;
    opacity: random(100) * 0.01;
    height: $size;
    width: $size;
    animation-delay: -$i * 0.2s;
    transform: translate3d(
      (random(100) * 1vw),
      (random(100) * 1vh),
      (random(100) * 1px)
    );
  }
}
</style>