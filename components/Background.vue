<template>
    <div id="particle-container">
        <div class="particle" v-for="n in 100" :key="n"></div>
    </div>
</template>

<style lang="scss">
#particle-container {
    position: fixed;
    z-index: -1;
    top: 0px;
    width: 100%;
    height: 100vh;
    background-color: var(--Color_Body_BG);

    >div {
        position: absolute;
        border-radius: 50%;
        background: var(--Color_Body_Star);
    }
}

@for $i from 1 through 100 {
    @keyframes particle-animation-#{$i} {
        100% {
            transform: translate3d((random(100) * 1vw), (random(100) * 1vh), (random(100) * 1px));
        }
    }

    .particle:nth-child(#{$i}) {
        animation: particle-animation-#{$i} 100s infinite;
        $size: random(5)+1+px;
        opacity: random(100) * 0.01;
        height: $size;
        width: $size;
        animation-delay: -$i * 0.2s;
        transform: translate3d((random(100) * 1vw), (random(100) * 1vh), (random(100) * 1px));
    }
}
</style>
