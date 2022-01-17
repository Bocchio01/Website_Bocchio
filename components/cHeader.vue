<template>
  <header>
    <div>
      <div>
        <router-link to="/" custom v-slot="{ navigate }">
          <div class="logo" @click="navigate"></div>
        </router-link>
        <nuxt-link to="/">Tommaso Bocchietti</nuxt-link>
      </div>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn" @click="Menu_click" @keyup.enter="Menu_click" tabindex="0">
        <span class="navicon"></span>
      </label>
    </div>
    <ul :style="!showMenu ? 'max-height: 0px' : 'max-height: 500px'">
      <li><nuxt-link to="/articolo/">Articoli</nuxt-link></li>
      <li><nuxt-link to="/portale/">Portali</nuxt-link></li>
      <li>
        <a @click="SubMenu_click" @keyup.enter="SubMenu_click" :class="{ hover: showSubMenu }" tabindex="0" style="cursor: pointer">Mix</a>
        <ul class="dropdown-content" :class="!showSubMenu ? 'hide' : ''">
          <li><nuxt-link to="/mix/chi sono/">Chi sono?</nuxt-link></li>
          <li>
            <nuxt-link to="/mix/qual é lo scopo/">Qual è lo scopo?</nuxt-link>
          </li>
          <li>
            <a href="#" @click="$store.commit('toggle_show', 'login')">Area personale</a>
          </li>
        </ul>
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
    > div {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
      }
      > .menu-btn {
        display: none;
        &:checked ~ .menu-icon {
          > .navicon {
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
      > .menu-icon {
        display: none;
        cursor: pointer;
        padding: 30px;
        > .navicon {
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
    }

    ul {
      transition: all 0.2s ease-in;
      display: flex;
      list-style-type: none;
      padding: 0px;
    }
    .dropdown-content {
      max-height: 220px;
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
      > div > .menu-icon {
        display: inline-flex;
      }
      ul {
        display: block;
        overflow: hidden;
        // transition: max-height 0.3s ease-out;
        > li {
          text-align: center;
        }
      }
      .dropdown-content {
        position: relative;
        margin: 15px 15px;
      }
    }
  }
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Header: 19px;
  }
  .Default {
    header > div > .menu-icon {
      padding: 15px;
    }
  }
}
</style>
