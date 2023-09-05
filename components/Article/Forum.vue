<script setup lang="ts">

const { path } = useRoute()

const posts = await $fetch('http://localhost:5000/BWS/Main.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'content-type',
    },
    body: JSON.stringify({
        action: "ForumGetPost",
        data: {
            url: path,
        }
    }),
    credentials: 'include'
}).then((res) => {
    res.json()
    console.log(res)
}).catch((res) => {
    console.log(res)
})

console.log(posts)


</script>

<template>
    <div class="wrap forum">
        <h2>Forum</h2>
    </div>
</template>


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

        >.info {
            text-align: center;

            >.button_controll {
                display: flex;
                flex-wrap: wrap;
                column-gap: 10px;

                >button {
                    margin-block: 5px;
                    flex-basis: 100px;
                    flex-grow: 1;
                }
            }

            >.user {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                >p {
                    font-size: calc(1.2 * var(--Size_Text_Wrap));

                    font-weight: bold;
                }

                >img {
                    height: 100px;
                    width: 100px;
                }
            }

            >p {
                font-size: calc(0.8 * var(--Size_Text_Wrap));
            }
        }

        >.text {
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

            >.info {
                >.user {
                    >img {
                        height: 50px;
                        width: 50px;
                    }
                }
            }

            >.text {
                margin-top: 0px;

                img {
                    max-height: 150px;
                }
            }
        }
    }
}
</style>