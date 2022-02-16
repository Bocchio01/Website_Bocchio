<template>
  <nav>
    <div>
      <p tabindex="0" @click="addOrRemove(tag)" @keyup.enter="addOrRemove(tag)" v-for="(tag, index) in tags" :key="index" v-bind:class="{ active: isActive[tag] }">{{ tag }}</p>
    </div>
    <!-- <p v-show="!tags_selected.length">Seleziona un argomento.</p> -->
  </nav>
</template>

<script>
export default {
  props: {
    tags: { type: Array, require: true },
    multiple: { type: Boolean, default: true },
    start: { type: Array },
  },

  data() {
    return {
      tags_selected: [],
      isActive: Object.assign(...this.tags.map((k) => ({ [k]: false }))),
    }
  },

  mounted() {
    if (this.start) {
      this.start.forEach((el) => {
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
    },
  },
}
</script>

<style lang="scss">
nav {
  display: block;
  width: 100%;
  font-size: calc(1.2 * var(--Size_Text_Wrap));

  > div {
    padding-inline: 10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--Margin_Gap);
    row-gap: calc(0.5 * var(--Margin_Gap));
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
    font-size: calc(0.5 * var(--Size_Title));

    > div {
      justify-content: center;
      max-width: 70%;
      margin-inline: auto;
      > p {
        // font-family: var(--Font_Special);
        font-family: var(--Font_Base);

        padding: 5px 10px;
        border: 2px solid var(--Color_Main);
        border-radius: var(--Border_Radius_Header);
        color: var(--Color_Text);
        background-color: var(--Color_Text_BG);
        &.active,
        &:hover {
          background-color: var(--Color_Hover);
        }
      }
    }
    > p {
      color: var(--Color_Text_BG);
      padding: var(--Padding_Wrap);
      display: none;
    }
  }
}

.Portale {
  nav {
    border-radius: var(--Border_Radius_Header);
    border: var(--Border_Settings_Button);
    background-color: var(--Color_Main);
    margin-bottom: var(--Margin_Gap);
    > div {
      justify-content: space-evenly;
      > p {
        font-family: var(--Font_Base);

        text-decoration: underline;
        padding-inline: 10px;
        &.active,
        &:hover {
          border-radius: var(--Border_Radius_Header);
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
