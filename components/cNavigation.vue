<template>
  <div class="wrap navigation">
    <h2>Naviga nel sito</h2>
    <div>
      <div v-if="prev">
        <p>
          <span>&#8617;</span> Articolo precedente <br />
          <NuxtLink :to="prev.slug"> {{ prev.title }} </NuxtLink>
        </p>
      </div>
      <div v-if="next">
        <p>
          Articolo successivo <span> &#8618; </span> <br />
          <NuxtLink :to="next.slug"> {{ next.title }} </NuxtLink>
        </p>
      </div>
    </div>
    <br />
    <p>
      <a href="#">Torna in cima</a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
<style lang="scss">
.wrap.navigation {
  > h2 {
    margin-top: 0px;
  }
  > div {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;

    > div:nth-child(1) {
      text-align: right;
    }
  }
  > p {
    text-align: center;
    > a {
      cursor: pointer;
      color: var(--text_color);
      padding-block: 5px;
      padding-inline: 30%;
      background-color: var(--background_color);
      border: var(--border_setting);
      border-radius: var(--header_border_radius);
      &:hover {
        background-color: var(--link_hover_color);
        color: var(--text_color);
      }
    }
  }
  span {
    font-weight: bold;
  }
}
</style>