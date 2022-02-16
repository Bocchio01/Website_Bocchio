<template>
  <div class="wrap forum" v-if="forum">
    <h2>{{ $t('cForum.header.h2') }}</h2>
    <p v-if="!id_user">{{ $t('cForum.header.p.0') }}</p>
    <p v-else-if="!posts">{{ $t('cForum.header.p.1') }}</p>
    <p v-else>{{ $t('cForum.header.p.2') }}</p>

    <div class="wrap post" v-for="(post, index) in posts" :key="index" :response="post.id_post == post.refer ? 0 : 1">
      <div class="info">
        <div class="user">
          <p>{{ post.nickname }}</p>
          <img :src="require('@/assets/png/Avatar' + post.avatar)" alt="User avatar" />
        </div>
        <p>{{ post.creation_date }}</p>
        <p v-if="post.modified_date">{{ post.modified_date }}</p>
        <div class="button_controll">
          <button v-if="id_user == post.id_user && id_user" @click="action(post, 'ForumModifyPost')">{{ $t('cForum.button.modify') }}</button>
          <button v-if="id_user == post.id_user && id_user" @click="action(post, 'ForumDeletePost')">{{ $t('cForum.button.delete') }}</button>
          <button v-else-if="post.id_post == post.refer && id_user" @click="action(post, 'ForumAwnserPost')">{{ $t('cForum.button.reply') }}</button>
        </div>
      </div>
      <div class="divisore"></div>
      <div class="text">
        <div v-html="post.message"></div>
      </div>
    </div>

    <div class="wrap write tooltip">
      <span class="tooltiptext" v-show="!id_user" @click="$store.commit('toggle_show', 'login')">
        <mark>{{ $t('cForum.writearea.tooltiptext') }}</mark>
      </span>

      <div>
        <h2>{{ $t('cForum.writearea.h2') }}</h2>
        <p>{{ $t('cForum.writearea.p') }}</p>
        <textarea id="text_area" rows="10" name="message" required v-model="new_post"></textarea>
        <button @click=";(foo.action = 'ForumNewPost'), confirmaction()">{{ $t('cForum.button.submit') }}</button>
      </div>
    </div>

    <div class="msg_bg" v-show="foo.status" @click.self="foo.status = false">
      <div class="wrap popup">
        <div v-if="foo.action == 'ForumDeletePost'">
          <h2>{{ $t('cForum.DeletePost.h2') }}</h2>
          <div class="wrap write">
            <p>{{ $t('cForum.DeletePost.p') }}</p>
            <textarea rows="10" name="message" required disabled v-model="selected_post.message"></textarea>
            <button @click="confirmaction()">{{ $t('cForum.button.delete') }}</button>
          </div>
        </div>

        <div v-else-if="foo.action == 'ForumModifyPost'">
          <h2>{{ $t('cForum.ModifyPost.h2') }}</h2>
          <div class="wrap write">
            <p v-html="$t('cForum.ModifyPost.p')"></p>
            <textarea rows="10" name="message" required v-model="selected_post.message"></textarea>
            <button @click="confirmaction()">{{ $t('cForum.button.modify') }}</button>
          </div>
        </div>

        <div v-else-if="foo.action == 'ForumAwnserPost'">
          <h2>{{ $t('cForum.AwnserPost.h2') }}</h2>
          <div class="wrap write">
            <p v-html="$t('cForum.AwnserPost.p')"></p>
            <textarea rows="10" name="message" required v-model="new_post"></textarea>
            <button @click="confirmaction()">{{ $t('cForum.button.reply') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sendRequest from '@/assets/js/sendRequest.js'

export default {
  data() {
    return {
      posts: null,
      forum: true,
      foo: {
        status: false,
        action: 'ForumGetPost',
      },
      selected_post: {},
      new_post: '',
    }
  },
  computed: {
    id_user: {
      get() {
        return this.$store.state.user.id
      },
    },
    currentUrl: {
      get() {
        return this.$route.fullPath
      },
    },
  },

  mounted() {
    this.confirmaction()
  },

  methods: {
    action(post, type) {
      this.selected_post = Object.assign({}, post)
      this.selected_post.message = this.selected_post.message.replaceAll('<br />', '\n')
      this.foo.action = type
      this.foo.status = true
    },

    confirmaction() {
      this.foo.status = false
      sendRequest({
        action: this.foo.action,
        data: JSON.stringify({
          selected_post: this.selected_post,
          url: this.currentUrl,
          id_user: this.id_user,
          new_post: this.new_post,
        }),
      })
        .then((res) => {
          this.forum = res.Data.isForum
          this.posts = res.Data.Posts
          this.new_post = ''
        })
        .catch((res) => this.$store.commit('auth_error', res.Log))
    },
  },
}
</script>

<style lang="scss">
.forum {
  padding: var(--Padding_Wrap_Min);
  .write {
    padding: var(--Padding_Wrap_Min);
    width: 100%;
    h2 {
      margin-top: 0px;
    }
    textarea {
      width: 100%;
      margin-top: 10px;
      resize: none;
      line-height: 1.6;
    }
    button {
      width: 100%;
    }
    .tooltiptext {
      margin-left: -15px;
      margin-top: -15px;
      border-radius: var(--Border_Radius_Wrap);
    }
  }

  .post {
    padding: var(--Padding_Wrap_Min);
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: left;
    column-gap: 20px;
    row-gap: 10px;
    width: 100%;
    > .info {
      text-align: center;
      > .button_controll {
        display: flex;
        flex-wrap: wrap;
        column-gap: 10px;
        > button {
          margin-block: 5px;
          flex-basis: 100px;
          flex-grow: 1;
        }
      }
      > .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > p {
          font-size: calc(1.2 * var(--Size_Text_Wrap));

          font-weight: bold;
        }
        > img {
          height: 100px;
          width: 100px;
        }
      }
      > p {
        font-size: calc(0.8 * var(--Size_Text_Wrap));
      }
    }
    > .text {
      width: 100%;
      margin-top: 10px;
      img,
      iframe,
      svg {
        margin-inline: auto;
        margin-block: 10px;
        display: block;
        max-height: 300px;
        max-width: 100%;
        border-radius: 10px;
      }
    }
    &.subpost {
      margin-right: 0px;
      width: 80%;
    }
    &[response='1'] {
      flex-direction: row-reverse;
      justify-content: right;
      margin-right: 0px;
      width: 80%;
    }
  }
  .divisore {
    border-right: var(--Border_Settings_Wrap);
  }

  @media (max-width: 750px) {
    .post {
      flex-direction: column !important;

      > .info {
        > .user {
          > img {
            height: 50px;
            width: 50px;
          }
        }
      }
      > .text {
        margin-top: 0px;
        img {
          max-height: 150px;
        }
      }
    }
  }
}
</style>
