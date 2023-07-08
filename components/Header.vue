<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => { return (locales.value).filter(i => i.code !== locale.value) })

</script>


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
                    <img style="" :src="useAsset('/png/Lang/' + $t('cHeader.switch.img'))"
                        :alt="'Flag ' + $t('cHeader.switch.iso')" rel="nofollow noopener noreferrer" />
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
                <nuxt-link :to="localePath('/mix/')">{{ $t('cHeader.links.2') }}</nuxt-link>
            </li>

            <li class="lang-icon-sub">
                <!-- <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{locale.name}}</NuxtLink> -->

                <nuxt-link :to="switchLocalePath($t('cHeader.switch.iso'))">
                    <img :src="useAsset('/png/Lang/' + $t('cHeader.switch.img'))" :alt="'Flag ' + $t('cHeader.switch.iso')"
                        rel="nofollow noopener noreferrer" />
                </nuxt-link>
            </li>
        </ul>

    </header>
</template>



<style lang="scss">
header,
.dropdown-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
    padding-inline: 15px;
    border: $Border_Settings_Wrap;
    border-radius: $Border_Radius_Header;
    color: $Color_Text;
    background-color: $Color_Text_BG;
    transition: all 0.1s ease-in;
}

.hide {
    max-height: 0px !important;
    opacity: 0;
    visibility: hidden;
}

header {
    a {
        color: $Color_Text;

        display: block;
        margin: 15px 15px;
        font-weight: bold;
        font-family: $Font_Special;
        font-size: $Size_Text_Header;

        &:hover,
        &.hover {
            color: $Color_Hover;
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
                background: $Color_Text;
                height: 2px;
                position: relative;
                transition: all 0.2s ease-out;
                width: 18px;

                &::after,
                &::before {
                    background: $Color_Text;
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
                height: calc(1.7 * $Size_Text_Header);
                vertical-align: middle
            }
        }
    }

    .lang-icon-sub {
        img {
            height: calc(1.7 * $Size_Text_Header);
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

@media (max-width: 1200px) {
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

@media (max-width: 750px) {
    header * {
        transition: none !important;
    }
}

@media (max-width: 570px) {
    :root {
        --Size_Text_Header: 19px;
    }

    header>div>.menu-icon {
        padding: 15px;
    }
}
</style>
