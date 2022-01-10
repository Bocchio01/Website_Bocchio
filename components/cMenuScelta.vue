<template>
  <nav>
    <div>
      <p
        tabindex="0"
        @click="addOrRemove(tag)"
        @keyup.enter="addOrRemove(tag)"
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
          'Orienteering'
        ]
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    start: {
      type: Array
    }
  },
  data() {
    return {
      tags_selected: [],
      isActive: Object.assign(...this.tags.map(k => ({ [k]: false })))
    }
  },
  mounted() {
    if (this.start) {
      this.start.forEach(el => {
        this.isActive[el] = true
        this.tags_selected.push(el)
      })
      this.$emit('toParent', this.tags_selected)
    }
  },
  methods: {
    addOrRemove(tag_clicked) {
      if (this.multiple) {
        var index = this.tags_selected.indexOf(tag_clicked)

        if (index === -1) {
          this.tags_selected.push(tag_clicked)
          this.isActive[tag_clicked] = true
        } else {
          this.tags_selected.splice(index, 1)
          this.isActive[tag_clicked] = false
        }
      } else {
        this.isActive[this.tags_selected[0]] = false
        this.isActive[tag_clicked] = true
        this.tags_selected = []
        this.tags_selected.push(tag_clicked)
      }

      this.$emit('toParent', this.tags_selected)
    }
  }
}
</script>

<style lang="scss">
nav {
  display: block;
  width: 100%;
  font-size: calc(1.2 * var(--paragraph_size));

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
    font-size: calc(0.5 * var(--title_size));

    > div {
      justify-content: center;
      max-width: 70%;
      margin-inline: auto;
      > p {
        // font-family: var(--Special_font);
        font-family: var(--Base_font);

        padding: 5px 10px;
        border: 2px solid var(--main_color);
        border-radius: var(--header_border_radius);
        color: var(--text_color);
        background-color: var(--background_color);
        &.active,
        &:hover {
          background-color: var(--link_hover_color);
        }
      }
    }
    > p {
      color: var(--background_color);
      padding: var(--padding_articles);
      display: none;
    }
  }
}

.Portale {
  nav {
    border-radius: var(--header_border_radius);
    border: var(--app_border_setting);
    background-color: var(--Nav_color);
    margin-bottom: var(--app_row_column_gap);
    > div {
      justify-content: space-evenly;
      > p {
        font-family: var(--Base_font);

        text-decoration: underline;
        padding-inline: 10px;
        &.active,
        &:hover {
          border-radius: var(--header_border_radius);
          background-color: rgb(0, 0, 0, 0.2);
        }
      }
    }
    > p {
      display: none;
    }
  }
}
</style>