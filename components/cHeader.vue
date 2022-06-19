<template>
  <header>
    <div>
      <div>
        <router-link :to="localePath('/')" custom v-slot="{ navigate }">
          <div class="logo" @click="navigate"></div>
        </router-link>
        <nuxt-link :to="localePath('/')">Tommaso Bocchietti</nuxt-link>
      </div>

      <div>
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn" @click="Menu_click" @keyup.enter="Menu_click" tabindex="0">
          <span class="navicon"></span>
        </label>
        <nuxt-link class="lang-icon-main" :to="switchLocalePath($t('cHeader.switch.iso'))">
          <img style="" :src="require('~/assets/png/Lang/' + $t('cHeader.switch.img'))"
            :alt="'Flag ' + $t('cHeader.switch.iso')" />
        </nuxt-link>
      </div>
    </div>
    <ul :style="!showMenu ? 'max-height: 0px' : 'max-height: 1000px'">
      <li>
        <nuxt-link :to="localePath('/article/')">{{ $t('cHeader.links.0') }}</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('/portal/')">{{ $t('cHeader.links.1') }}</nuxt-link>
      </li>

      <li>
        <a @click="SubMenu_click" @keyup.enter="SubMenu_click" :class="{ hover: showSubMenu }" tabindex="0"
          style="cursor: pointer">Mix</a>
        <ul class="dropdown-content" :class="!showSubMenu ? 'hide' : ''">
          <li>
            <nuxt-link :to="localePath('/mix/who-am-i')">{{ $t('cHeader.links.2') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/mix/what-s-the-aim')">{{ $t('cHeader.links.3') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/mix/to-the-adventure')">{{ $t('cHeader.links.4') }}</nuxt-link>
          </li>
          <li>
            <a href="#" @click="$store.commit('toggle_show', 'login')">{{ $t('cHeader.links.5') }}</a>
          </li>
        </ul>
      </li>

      <li class="lang-icon-sub">
        <nuxt-link :to="switchLocalePath($t('cHeader.switch.iso'))">
          <img :src="require('~/assets/png/Lang/' + $t('cHeader.switch.img'))"
            :alt="'Flag ' + $t('cHeader.switch.iso')" />
        </nuxt-link>
      </li>
    </ul>

  </header>
</template>

<script>
export default {
  computed: {
    showMenu: {
      get() {
        return this.$store.state.show.mainmenu
      },
      set(value) {
        this.$store.commit('set_show', ['mainmenu', value])
      },
    },
    showSubMenu: {
      get() {
        return this.$store.state.show.submenu
      },
      set(value) {
        this.$store.commit('set_show', ['submenu', value])
      },
    },
  },

  mounted() {
    window.onscroll = () => {
      if (this.$store.state.show.submenu || this.$store.state.show.mainmenu) {
        this.$store.commit('set_show', ['submenu', false])
        this.$store.commit('set_show', ['mainmenu', false])
        try {
          document.getElementById('menu-btn').checked = false
        } catch (error) { }
      }
    }
  },

  methods: {
    Menu_click() {
      this.showMenu = !this.showMenu
      this.showSubMenu = false
    },
    SubMenu_click() {
      this.showSubMenu = !this.showSubMenu
    },
  },
  watch: {
    $route() {
      document.getElementById('menu-btn').checked = false
      this.showMenu = false
      this.showSubMenu = false
    },
  },
}
</script>

<style lang="scss">
.Default {

  header,
  .dropdown-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
    padding-inline: 15px;
    border: var(--Border_Settings_Wrap);
    border-radius: var(--Border_Radius_Header);
    color: var(--Color_Text);
    background-color: var(--Color_Text_BG);
    transition: all 0.1s ease-in;
  }

  .hide {
    max-height: 0px !important;
    opacity: 0;
    visibility: hidden;
  }

  header {
    a {
      color: var(--Color_Text);

      display: block;
      margin: 15px 15px;
      font-weight: bold;
      font-family: var(--Font_Special);
      font-size: var(--Size_Text_Header);

      &:hover,
      &.hover {
        color: var(--Color_Hover);
      }
    }

    >div {
      display: flex;
      justify-content: space-between;

      >div {
        display: flex;
        align-items: center;
      }

      >div>.menu-btn {
        display: none;

        &:checked~.menu-icon {
          >.navicon {
            background: transparent;

            &::after,
            &::before {
              top: 0;
            }

            &::before {
              transform: rotate(-45deg);
            }

            &::after {
              transform: rotate(45deg);
            }
          }
        }
      }

      >div>.menu-icon {
        display: none;
        cursor: pointer;
        padding: 30px;

        >.navicon {
          align-self: center;
          background: var(--Color_Text);
          height: 2px;
          position: relative;
          transition: all 0.2s ease-out;
          width: 18px;

          &::after,
          &::before {
            background: var(--Color_Text);
            content: '';
            height: 100%;
            position: absolute;
            transition: all 0.2s ease-out;
            width: 100%;
          }

          &::before {
            top: 6px;
          }

          &::after {
            top: -6px;
          }
        }
      }

      >div>.lang-icon-main {
        display: none;
        cursor: pointer;
        margin: 0px;
        margin-right: 7px;

        >img {
          height: calc(1.7 * var(--Size_Text_Header));
          vertical-align: middle
        }
      }
    }

    .lang-icon-sub {
      img {
        height: calc(1.7 * var(--Size_Text_Header))
      }

      height: 0
    }

    ul {
      transition: all 0.2s ease-in;
      display: flex;
      list-style-type: none;
      padding: 0px;
    }

    .dropdown-content {
      max-height: 290px;
      display: block;
      position: absolute;
      right: 0px;
      width: auto;
      justify-content: center;
    }
  }
}

@media (max-width: 1200px) {
  .Default {
    header {
      display: block;

      >div>div>.menu-icon {
        display: inline-flex;
      }

      >div>div>.lang-icon-main {
        display: inline-flex;
      }

      ul {
        display: block;
        overflow: hidden;

        // transition: max-height 0.3s ease-out;
        >li {
          text-align: center;
        }
      }

      .lang-icon-sub {
        display: none
      }

      .dropdown-content {
        position: relative;
        margin: 15px 15px;
      }
    }
  }
}

@media (max-width: 750px) {
  .Default header * {
    transition: none !important;
  }
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Header: 19px;
  }

  .Default {
    header>div>.menu-icon {
      padding: 15px;
    }
  }
}
</style>
