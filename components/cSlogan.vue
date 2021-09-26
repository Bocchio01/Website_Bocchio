<template>
  <div class="sloganBase" v-bind:class="[isHome ? 'sloganHome' : 'sloganNotHome']">{{ sloganMsg }}</div>
</template>

<script>
export default {
  name: "cSlogan",
  props: {
      sloganMsg: {
        type: String,
        default: "What's Next?"
      }
    },

  computed: {
    isHome() {
      if (this.$route.path == "/Home") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.sloganBase {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--orange);
  z-index: 1;
}

.sloganNotHome {
  margin: 27px auto 0px auto;
  font-size: var(--header_height);
}

.sloganHome {
  padding: 20px;
  font-size: var(--max_font_size);
  min-height: calc(100vh - var(--header_height));
  padding-bottom: 50px;
}

@media (max-width: 1200px) {
  .sloganNotHome {
    font-size: 60px;
  }
  .sloganHome {
    font-size: 90px;
  }
}

@media (max-width: 570px) {
  .sloganNotHome {
    font-size: 35px !important;
  }
  .sloganHome {
    font-size: 35px;
  }
}
</style>
