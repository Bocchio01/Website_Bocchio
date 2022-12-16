<template>
  <footer>
    <p>{{ $t('cFooter.0') }}</p>
    <div>
      <a href="https://github.com/Bocchio01" rel="nofollow noopener noreferrer" target="_blank"></a>
      <a href="https://t.me/Bocchio01" rel="nofollow noopener noreferrer" target="_blank"></a>
      <a href="https://www.instagram.com/bocchio_01/" rel="nofollow noopener noreferrer" target="_blank"></a>
      <a href="mailto:webmaster@bocchio.dev" rel="nofollow noopener noreferrer" target="_blank"></a>
    </div>
    <a href="https://www.iubenda.com/privacy-policy/87953468" title="Privacy Policy" target="_blank">Privacy Policy</a>
    <p @click="$store.commit('toggle_show', 'login')">{{ $t('cFooter.1') }}</p>
    <div class="copyright">
      <p>Tommaso Bocchietti © {{ year }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  created() {
    this.year = new Date().getFullYear()
  },
}
</script>

<style lang="scss">
.Default {
  footer {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    width: 100%;
    margin: auto;
    padding-block: 20px;
    font-family: var(--Font_Special);
    font-size: var(--Size_Text_Footer);
    font-weight: bold;
    border: var(--Border_Settings_Wrap);
    border-radius: var(--Border_Radius_Header);
    background-color: var(--Color_Text_BG);

    >p,
    >a {
      color: var(--Color_Text);
      font-size: medium;
      cursor: pointer;
      z-index: 10;
    }

    >div>a {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin: 10px;
      border: var(--Border_Settings_Wrap);
      border-radius: 50%;
      background-size: contain !important;
      background-color: white !important;

      &:hover {
        transform: scale(1.1);
      }

      &:focus {
        border: 3px solid var(--Color_Main);
      }

      &:nth-child(1) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/GitHub.png') no-repeat;
      }

      &:nth-child(2) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/Telegram.png') no-repeat;
      }

      &:nth-child(3) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/Instagram.png') no-repeat;
      }

      &:nth-child(4) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1636151722/Email.png') no-repeat;
      }
    }

    >div.copyright {
      border-top: var(--Border_Settings_Wrap);
      color: #a2a2a2;
      border-top-color: var(--Color_Text);
    }
  }
}

@media (max-width: 570px) {
  :root {
    --Size_Text_Footer: 18px;
  }

  .Default footer>div>a {
    width: 40px;
    height: 40px;
  }
}
</style>
