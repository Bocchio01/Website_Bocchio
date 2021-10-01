<template>
  <nav>
    <div>
      <p
        @click="addOrRemove(tag)"
        v-for="(tag, index) in tags"
        :key="index"
        v-bind:class="{ active: isActive[tag] }"
      >
        {{ tag }}
      </p>
    </div>
    <p class="fallback" v-show="!tags_selected.length">Seleziona un argomento.</p>
  </nav>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default() {
        return [
          'Programmazione',
          'Meccanica',
          'Fisica',
          'Matematica',
          'Orienteering',
        ]
      },
    },
  },
  data() {
    return {
      tags_selected: [],
      isActive: Object.assign(...this.tags.map((k) => ({ [k]: false }))),
    }
  },
  methods: {
    addOrRemove(tag_clicked) {
      var index = this.tags_selected.indexOf(tag_clicked)

      if (index === -1) {
        this.tags_selected.push(tag_clicked)
        this.isActive[tag_clicked] = true
      } else {
        this.tags_selected.splice(index, 1)
        this.isActive[tag_clicked] = false
      }
      this.$emit('toParent', this.tags_selected)
    },
  },
}
</script>

<style>
nav {
  display: block;
  width: 100%;
}

nav div {
  display: flex;
  flex: auto;
  row-gap: 15px;
  column-gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

nav div p {
  font-weight: bold;
  font-family: var(--Special_font);
  font-size: var(--paragraph_size);
  cursor: pointer;

  border-radius: var(--header_border_radius);
  z-index: 1;
  color: var(--text_color);
  background-color: var(--background_color);
  padding: 5px 10px;
}

nav .active {
  background-color: var(--link_hover_color);
}

nav .fallback {
  text-align: center;
  color: var(--background_color);
  font-size: var(--paragraph_size);
  font-family: var(--text_font);
  padding: var(--padding_articles);
}
</style>