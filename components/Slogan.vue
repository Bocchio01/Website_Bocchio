<script setup lang="ts">

const localePath = useLocalePath()
const route = useRoute()

const isHomePage = computed(() => {
    return route.path == localePath('/')
})

</script>

<template>
    <div>
        <!-- <svg width="100%" height="100vh" viewBox="0 0 500 500">
            <g transform="translate(250, 250)">
                <path id="curve" fill="transparent" d="M 70 85 C 25 60 25 140 70 115 L 130 85 C 175 60 175 140 130 115 Z">
                </path>
                <text width="100%">
                    <textPath class="sloganBase" alignment-baseline="middle" xlink:href="#curve" id="text-path"
                        start-offset="100">
                        Get Things Done!
                    </textPath>
                </text>
            </g>
        </svg> -->
        <div class="sloganBase" :class="isHomePage ? 'sloganHome' : 'sloganNotHome'">
            Get Things Done!
        </div>
    </div>
</template>


<style lang="scss">
$Font_Size_Slogan_Home: 160px;

#curve {
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(10.0);
    -ms-transform: scale(10.0);
    -webkit-transform: scale(10.0);
}

text {
    fill: orange;
    font-size: 50px;
    font-family: 'Roboto', sans-serif;
}

.sloganBase {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--Color_Hover);
    z-index: 1;
    font-family: var(--Font_Special);
    animation: moveText 10s linear infinite;

    &.sloganNotHome {
        text-shadow: -5px 5px 20px rgba(#fff, 0.5);
        margin: 27px auto;
        font-size: var(--Size_Text_Slogan);
    }

    &.sloganHome {
        text-shadow: -7px 7px 20px rgba(#fff, 0.5);
        height: calc(100vh - var(--Size_Text_Slogan));
        padding: 50px;
        font-size: 160px;
        animation: 3.5s linear 0s forwards;
        animation-name: login;
    }
}

@media (max-width: 1200px) {
    $Size_Text_Slogan: 60px;

    .sloganBase.sloganHome {
        font-size: 120px;
    }
}

@media (max-width: 570px) {
    :root {
        --Size_Text_Slogan: 35px;
    }

    .sloganBase.sloganHome {
        $Font_Size_Slogan_Home: 65px;
        font-size: 65px;
    }
}

@keyframes login {
    0% {
        opacity: 1;
        font-size: 1px;
    }

    30% {
        font-size: $Font_Size_Slogan_Home;
    }

    90% {
        font-size: calc(0.8 * $Font_Size_Slogan_Home);
        opacity: 0;
    }

    95% {
        font-size: $Font_Size_Slogan_Home;
    }

    96% {
        opacity: 1;
    }

    99% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        font-size: $Font_Size_Slogan_Home;
    }
}
</style>