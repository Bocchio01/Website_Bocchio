<script setup>

const top = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
    <button @click="top" class="ToTop"><span>&#8686;</span></button>
</template>


<style lang="scss">
button.ToTop {
    position: fixed;
    right: 15px;
    bottom: 15px;
    margin-block: 0px;
    margin-right: 0px;
    padding-inline: 20px;
    font-size: calc(1.5 * var(--Size_Text_Wrap));

    >span {
        font-weight: bold;
    }
}

@media (max-width: 750px) {
    button.ToTop {
        position: sticky;
        right: 0px;
        bottom: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        padding-inline: 16px;
        font-size: var(--Size_Text_Wrap);
    }
}
</style>
