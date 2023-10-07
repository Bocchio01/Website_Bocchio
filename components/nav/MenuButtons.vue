<script setup lang="ts">

const props = defineProps<{
    tags: Array<string>,
    multiple: boolean,
    start: Array<string>,
}>()

const emit = defineEmits(['tagsSelected'])

const { tags, multiple, start } = toRefs(props)

const tags_selected = ref<Array<string>>([])
const isActive = ref<Object>(Object.assign({}, ...tags.value.map((k) => ({ [k]: false }))))

watch(tags_selected, () => {
    emit('tagsSelected', tags_selected.value.map((tag) => tag))
})

const addOrRemove = (tag_clicked: string) => {
    if (multiple.value) {
        const index = tags_selected.value.indexOf(tag_clicked)

        // if (index === -1) {
        //     tags_selected.value.push(tag_clicked)
        //     isActive.value[tag_clicked] = true
        // } else {
        //     tags_selected.value.splice(index, 1)
        //     isActive.value[tag_clicked] = false
        // }
    } else {
        // isActive.value[tags_selected.value[0]] = false
        // isActive.value[tag_clicked] = true
        tags_selected.value = []
        tags_selected.value.push(tag_clicked)
    }

}

</script>

<template>
    <nav>
        <div>
            <p tabindex="0" @click="addOrRemove(tag)" @keyup.enter="addOrRemove(tag)" v-for="(tag, index) in tags"
                :key="index">{{ tag }}</p>
        </div>
    </nav>
</template>

<!-- <script>

  mounted() {
    if (this.start) {
      this.start.forEach((el) => {
        this.isActive[el] = true
        this.tags_selected.push(el)
      })
      this.$emit('tagsSelected', this.tags_selected)
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
</script> -->

<style lang="scss">
nav {
    display: block;
    width: 100%;
    font-size: calc(1.2 * var(--Size_Text_Wrap));

    >div {
        padding-inline: 10px;
        display: flex;
        flex-wrap: wrap;
        column-gap: var(--Margin_Gap);
        row-gap: calc(0.5 * var(--Margin_Gap));
        flex: auto;

        >p {
            cursor: pointer;
            font-weight: bold;
        }
    }

    >p {
        text-align: center;
    }
}

.Default {
    nav {
        font-size: calc(0.5 * var(--Size_Title));

        >div {
            justify-content: center;
            max-width: 70%;
            margin-inline: auto;

            >p {
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

        >p {
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

        >div {
            justify-content: space-evenly;

            >p {
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

        >p {
            display: none;
        }
    }
}
</style>
