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
    <p v-show="!tags_selected.length">Seleziona un argomento.</p>
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

<style lang="scss">
nav {
  display: block;
  width: 100%;
  font-size: var(--paragraph_size);

  > div {
    padding-inline: 10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--app_row_column_gap);
    row-gap: var(--app_row_column_gap);
    flex: auto;
    > p {
      cursor: pointer;
      font-weight: bold;
    }
  }
  > p {
    text-align: center;
  }
}

.Default {
  nav {
    > div {
      justify-content: center;
      > p {
        padding: 5px 10px;
        font-family: var(--Special_font);
        border-radius: var(--header_border_radius);
        color: var(--text_color);
        background-color: var(--background_color);
      }
      > p.active {
        background-color: var(--link_hover_color);
      }
    }
    > p {
      color: var(--background_color);
      font-family: var(--text_font);
      padding: var(--padding_articles);
    }
  }
}

.Portale {
  nav {
    border-radius: var(--header_border_radius);
    border: var(--app_border_setting);
    background-color: var(--Nav_color);
    > div {
      justify-content: space-evenly;
      > p {
        text-decoration: underline;
      }
    }
  }
}
</style>