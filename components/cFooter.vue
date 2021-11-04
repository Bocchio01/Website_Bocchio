<template>
  <footer>
    <p>Puoi trovarmi anche qui</p>
    <div>
      <a
        href="https://github.com/Bocchio01"
        rel="nofollow noopener noreferrer"
        target="_blank"
      ></a>
      <a
        href="https://t.me/Bocchio01"
        rel="nofollow noopener noreferrer"
        target="_blank"
      ></a>
      <a
        href="https://www.instagram.com/bocchio_01/"
        rel="nofollow noopener noreferrer"
        target="_blank"
      ></a>
    </div>
    <p>Tommaso Bocchietti © {{ year }}</p>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    width: 100%;
    border: var(--border_setting);
    background-color: var(--background_color);
    -webkit-border-radius: var(--header_border_radius);
    -moz-border-radius: var(--header_border_radius);
    border-radius: var(--header_border_radius);
    z-index: 2;
    padding-block: 20px;
    > p {
      color: var(--text_color);
      font-weight: bold;
      font-family: var(--Special_font);
      font-size: var(--footer_font_size);
      width: fit-content;
      &:nth-last-child(1) {
        color: #a2a2a2;
        border-top: var(--border_setting);
        border-top-color: black;
      }
    }
    > div > a {
      width: 50px;
      height: 50px;
      display: inline-block;
      border-radius: 50%;
      border: var(--border_setting);
      margin: 10px;

      &:hover {
        transform: scale(1.1);
      }
      &:focus {
        border: 3px solid var(--main_color);
      }
      &:nth-child(1) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/GitHub.png')
          no-repeat;
        background-size: contain;
      }
      &:nth-child(2) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/Telegram.png')
          no-repeat;
        background-size: contain;
      }
      &:nth-child(3) {
        background: url('https://res.cloudinary.com/bocchio/image/upload/v1632947036/Instagram.png')
          no-repeat;
        background-size: contain;
      }
    }
  }
}

@media (max-width: 570px) {
  :root {
    --footer_font_size: 18px;
  }
  .Default footer > div > a {
    width: 40px;
    height: 40px;
  }
}
</style>