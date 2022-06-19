<template>
  <div class="msg_bg" :class="[$store.state.show.login ? 'visible' : 'hidden']" @click.self="CloseLogin()">
    <div class="wrap popup">
      <h1>{{ $t('cLogin.title') }}</h1>

      <CMenuScelta @toParent="handler" :tags="tags_array" :multiple="false" :start="[tags_array[0]]" />
      <p>{{ $store.state.status }}</p>
      <div>
        <div v-show="tags_to_view[0] || tags_to_view[1]" class="tooltip">
          <span class="tooltiptext" v-show="user.id">
            <mark> {{ $t('cLogin.tooltiptext.0') }} </mark>
          </span>
          <div v-show="tags_to_view[0]">
            <h2>{{ $t('cLogin.sign_up.h2') }}</h2>
            <p>{{ $t('cLogin.sign_up.p') }}</p>
          </div>
          <div v-show="tags_to_view[1]">
            <h2>{{ $t('cLogin.login.h2') }}</h2>
            <p>{{ $t('cLogin.login.p') }}</p>
          </div>

          <div v-show="tags_to_view[0]">
            <label for="nickname">Nickname</label>
            <input id="nickname" type="text" :value="user.nickname" @input="updateVal($event, 'nickname')" required placeholder="Es: Bocchio01" />
          </div>

          <div v-show="tags_to_view[0] || tags_to_view[1]">
            <label for="email">E-mail</label>
            <input id="email" type="email" :value="user.email" @input="updateVal($event, 'email')" required placeholder="Es: webmaster@bocchio.dev" />
          </div>

          <div style="margin-bottom: 0" v-show="tags_to_view[0] || tags_to_view[1]">
            <label for="password" style="display: unset">
              Password
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                style="height: calc(7px + var(--Size_Text_Wrap)); vertical-align: top; cursor: pointer; margin-right: 5px"
                @click="ShowPassword()"
              >
                <path
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </label>
            <input id="password" type="password" :value="user.password" @input="updateVal($event, 'password')" minlength="5" required placeholder="Es: *password segreta*" />
          </div>

          <div style="margin-top: 0; color: #a2a2a2" v-show="tags_to_view[1]">
            <p>
              {{ $t('cLogin.login.forgotpassword.0') }}
              <a :href="utils_site + '/BWS/site/?l=' + $i18n.locale + '&action=ForgotPassword'" target="_blank" rel="nofollow noopener noreferrer" style="color: #a2a2a2">{{
                $t('cLogin.login.forgotpassword.1')
              }}</a>
            </p>
          </div>

          <div v-show="tags_to_view[1]">
            <label for="autologin">
              <input type="checkbox" id="autologin" :checked="user.autologin" @click="updateVal(!user.autologin, 'autologin')" style="width: unset; margin: 0px 5px" />
              {{ $t('cLogin.login.rememberme') }}
            </label>
          </div>
          <div v-show="tags_to_view[0]">
            <button type="submit" @click="$store.dispatch('UserSignup')">{{ $t('cLogin.button.sign_up') }}</button>
          </div>
          <div v-show="tags_to_view[1]">
            <button type="submit" @click="$store.dispatch('UserLogin')">{{ $t('cLogin.button.login') }}</button>
          </div>
        </div>

        <div v-show="tags_to_view[2]" class="tooltip">
          <span class="tooltiptext" v-show="!$store.state.user.id">
            <mark> {{ $t('cLogin.tooltiptext.1') }} </mark>
          </span>

          <h2>{{ $t('cLogin.settings_user.h2') }}</h2>
          <p>{{ $t('cLogin.settings_user.p') }}</p>
          <p style="color: #a2a2a2">
            {{ $t('cLogin.settings_user.modifypassword.0') }}
            <a :href="utils_site + '/BWS/site/?l=' + $i18n.locale + '&action=ModifyPassword'" target="_blank" rel="nofollow noopener noreferrer" style="color: #a2a2a2">{{
              $t('cLogin.settings_user.modifypassword.1')
            }}</a>
          </p>

          <div class="inline">
            <label for="mod_nickname">Nickname</label>
            <input id="mod_nickname" type="text" :value="user.nickname" @input="updateVal($event, 'nickname')" placeholder="Es: Bocchio01" />
            <button style="visibility: hidden; height: 0px; padding-block: 0px">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <div class="inline">
            <label for="mod_lang">{{ $t('cLogin.settings_user.lang.label') }}</label>

            <nuxt-link style="text-align: center" :to="switchLocalePath($t('cLogin.settings_user.lang.switch.iso'))">
              <img :src="require('~/assets/png/Lang/' + $t('cLogin.settings_user.lang.switch.img'))" :alt="'Flag ' + $t('cLogin.settings_user.lang.switch.iso')" />
            </nuxt-link>

            <button style="visibility: hidden; height: 0px; padding-block: 0px">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <div class="inline">
            <label for="avatar">Avatar</label>
            <img id="avatar" :src="require('@/assets/png/Avatar' + user.preferences.avatar)" alt="AvatarSelected" @click="show_avatar = !show_avatar" />

            <button @click="updateVal('/icon.png', 'preferences.avatar')">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <div id="avatar_container" v-show="show_avatar" @click="show_avatar = false">
            <!-- <h2>{{ $t('cLogin.settings_user.avatar.woman') }}</h2> -->
            <div>
              <img
                v-for="(img, index) in images_woman"
                :key="index"
                :src="require('@/assets/png/Avatar/Woman/' + img)"
                alt="AvatarWoman"
                @click="updateVal('/Woman/' + img, 'preferences.avatar')"
              />
            </div>
            <!-- <h2>{{ $t('cLogin.settings_user.avatar.man') }}</h2> -->
            <div>
              <img
                v-for="(img, index) in images_man"
                :key="index"
                :src="require('@/assets/png/Avatar/Man/' + img)"
                alt="AvatarMan"
                @click="updateVal('/Man/' + img, 'preferences.avatar')"
              />
            </div>
          </div>

          <label for="mod_newsletter">
            <input
              type="checkbox"
              id="mod_newsletter"
              :checked="user.preferences.newsletter"
              @click="updateVal(!user.preferences.newsletter, 'preferences.newsletter')"
              style="width: unset; margin: 0px 5px"
            />
            {{ $t('cLogin.settings_user.newsletter') }}
          </label>

          <hr style="margin-bottom: 30px" />

          <h2>{{ $t('cLogin.settings_site.h2') }}</h2>
          <p>{{ $t('cLogin.settings_site.p') }}</p>

          <div class="inline no-button">
            <label>{{ $t('cLogin.settings_site.theme.0') }}</label>
            <div>
              <div @click="updateVal('light', 'preferences.theme')">
                <input id="light" type="radio" :checked="user.preferences.theme == 'light'" />
                <label for="light"> <span></span> {{ $t('cLogin.settings_site.theme.2') }} </label>
              </div>
              <div @click="updateVal('dark', 'preferences.theme')">
                <input id="dark" type="radio" :checked="user.preferences.theme == 'dark'" />
                <label for="dark"> <span></span> {{ $t('cLogin.settings_site.theme.1') }} </label>
              </div>
            </div>

            <button @click="updateVal('light', 'preferences.theme')">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <div class="inline">
            <label for="color">{{ $t('cLogin.settings_site.color') }}</label>
            <input id="color" type="color" :value="user.preferences.color" @input="updateVal($event, 'preferences.color')" />
            <button @click="updateVal('#ff9800', 'preferences.color')">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <div class="inline">
            <label for="font_size">{{ $t('cLogin.settings_site.font') }}</label>
            <input id="font_size" type="range" min="-5" max="5" :value="user.preferences.font" @input="updateVal($event, 'preferences.font')" />
            <button @click="updateVal(0, 'preferences.font')">{{ $t('cLogin.button.to_default') }}</button>
          </div>

          <hr style="margin-bottom: 35px" />

          <button type="submit" @click="$store.commit('UserLogout')">{{ $t('cLogin.button.logout') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags_to_view: [false, false, false],
      show_avatar: false,
      images_man: [],
      images_woman: [],
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      },
    },
    utils_site: {
      get() {
        return process.env.UTILS_SITE
      },
    },
    tags_array: {
      get() {
        return Object.values(this.$t('cLogin.tags_array'))
      },
    },
  },
  mounted() {
    document.getElementById('autologin').checked = JSON.parse(localStorage.getItem('autologin'))
    this.images_man = require
      .context('@/assets/png/Avatar/Man/', false, /\.png$/)
      .keys()
      .map((s) => s.slice(2))

    this.images_woman = require
      .context('@/assets/png/Avatar/Woman/', false, /\.png$/)
      .keys()
      .map((s) => s.slice(2))
  },

  methods: {
    updateVal(e, target) {
      this.$store.commit('update_user', { e, target })
    },

    handler(value) {
      this.tags_to_view = this.tags_array.map((el) => value.includes(el))
    },

    CloseLogin() {
      this.$store.commit('toggle_show', 'login')
      if (this.user.id) this.$store.dispatch('UserUpdate')
      if (this.user.preferences.autologin == false) localStorage.removeItem('token')
    },

    UserLogin() {
      localStorage.setItem('autologin', document.getElementById('autologin').checked)
    },

    ShowPassword() {
      if (document.getElementById('password').type == 'password') document.getElementById('password').type = 'text'
      else document.getElementById('password').type = 'password'
    },
  },

  watch: {
    user: {
      handler(val) {
        document.documentElement.style.setProperty('--Size_Variable', val.preferences.font + 'px')
        document.documentElement.style.setProperty('--Color_Main', val.preferences.color)

        if (val.preferences.theme == 'dark') {
          document.documentElement.style.setProperty('--black', 'white')
          document.documentElement.style.setProperty('--white', 'black')
        } else {
          document.documentElement.style.setProperty('--black', 'black')
          document.documentElement.style.setProperty('--white', 'white')
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.wrap.popup {
  margin: auto;
  max-width: 700px;
  max-height: calc(100vh - 100px);
  overflow-y: overlay;

  * {
    margin-block: 0;
    margin-inline: auto;
  }

  > nav > div > p {
    font-family: var(--Font_Base) !important;
  }

  label {
    display: block;
  }

  div {
    margin-block: 10px;
  }

  button {
    padding: 7px;
    &[type='submit'] {
      margin-top: 20px;
      width: 100%;
      padding: 10px;
      &:hover,
      &:focus {
        width: 95%;
      }
    }
  }

  div.inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    justify-content: space-between;
    * {
      margin: 0px;
      width: revert;
    }
    > :nth-child(1) {
      width: 100px;
    }
    > :nth-child(2):not(img) {
      width: 100%;
      max-width: 250px;
    }
  }

  input {
    width: 100%;
    transition: padding 0.2s linear;
    &[type='text'],
    &[type='email'],
    &[type='password'] {
      &:hover,
      &:focus {
        border-color: var(--Color_Main);
        outline: none;
        padding: 5px;
      }
    }
  }

  #avatar_container {
    border: var(--Border_Settings_Wrap);
    border-radius: var(--Border_Radius_Wrap);
    padding: 5px;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  img {
    width: 75px;
    height: 75px;
    margin-inline: auto;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;

    &:hover,
    &:focus {
      opacity: 0.8;
      border-color: var(--Color_Main);
      outline: none;
      padding: 5px;
    }
  }
}

@media (max-width: 600px) {
  .wrap.popup {
    div.inline {
      flex-direction: column;
      width: 80%;
      > *:not(img) {
        width: 100% !important;
        max-width: unset !important;
      }
    }
  }
}
</style>
