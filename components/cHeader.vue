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
      <label
        class="menu-icon"
        for="menu-btn"
        @click="Menu_click"
        @keyup.enter="Menu_click"
        tabindex="0"
      >
        <span class="navicon"></span>
      </label>
    </div>
    <ul :style="{ 'max-height': [showMenu ? '500px' : '0px'] }">
      <li><nuxt-link to="/elenco/articolo">Articoli</nuxt-link></li>
      <li><nuxt-link to="/elenco/portale">Portali</nuxt-link></li>
      <li>
        <a
          @click="SubMenu_click"
          @keyup.enter="SubMenu_click"
          :class="{ hover: showSubMenu }"
          tabindex="0"
          style="cursor: pointer"
          >Mix</a
        >
        <ul class="dropdown-content" v-show="showSubMenu">
          <li><nuxt-link to="/articolo/chi sono">Chi sono?</nuxt-link></li>
          <li>
            <nuxt-link to="/articolo/qual é lo scopo"
              >Qual è lo scopo?</nuxt-link
            >
          </li>
          <li>
            <a
              href="#"
              @click="
                $emit('toParent', true)
                Menu_click()
              "
              >Area personale</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      showSubMenu: false,
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
      color: var(--text_color);
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-inline: 15px;
    z-index: 2;
    background-color: var(--background_color);
    border: var(--border_setting);
    border-radius: var(--header_border_radius);
    -webkit-border-radius: var(--header_border_radius);
    -moz-border-radius: var(--header_border_radius);
  }

  header {
    a {
      color: var(--text_color);

      display: block;
      margin: 15px 15px;
      font-weight: bold;
      font-family: var(--Special_font);
      font-size: var(--header_font_size);
      &:hover,
      &.hover {
        color: var(--link_hover_color);
      }
    }
    > div {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        > .logo {
          height: calc(2.5 * var(--header_font_size));
          width: calc(2.5 * var(--header_font_size));
          cursor: pointer;

          background-color: var(--main_color);
          -webkit-mask: url(/Lampadina_ingranaggi.svg) no-repeat center;
          mask: url(/Lampadina_ingranaggi.svg) no-repeat center;
          &:hover ~ a {
            color: var(--link_hover_color);
          }
        }
      }
      > .menu-btn {
        display: none;
        &:checked ~ .menu-icon {
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
      > .menu-icon {
        display: none;
        cursor: pointer;
        padding: 30px;
        > .navicon {
          align-self: center;
          background: #333;
          height: 2px;
          position: relative;
          transition: all 0.2s ease-out;
          width: 18px;
          &::after,
          &::before {
            background: #333;
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
      display: flex;
      list-style-type: none;
      padding: 0px;
    }
    .dropdown-content {
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
        transition: max-height 0.3s ease-out;
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
    --header_font_size: 19px;
  }
  .Default {
    header > div > .menu-icon {
      padding: 15px;
    }
  }
}
</style>