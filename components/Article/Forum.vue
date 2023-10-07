<script setup lang="ts">

import type { Forum } from '~/types'

const { path } = useRoute()
const { t } = useI18n()

const { data: forum, error, pending, refresh } = await useFetch('http://localhost:5000/BWS/Main.php', {
    method: 'POST',
    body: JSON.stringify({
        action: "ForumGetPost",
        data: {
            url: path,
        }
    }),
    // pick: ['Data'],
    // credentials: "include",
})

const ForumDeletePost = (post) => {
    const id: number = parseInt(post.id_post)

    const { data: forum } = useFetch(() => 'http://localhost:5000/BWS/Main.php', {
        method: 'POST',
        body: JSON.stringify({
            action: "ForumDeletePost",
            data: {
                url: path,

                selected_post: {
                    id_post: id,
                }
            }
        }),
    })
}

</script>

<template>
    <div>
        <h2>Forum</h2>
        <p v-if="!id_user">{{ t('header.0') }}</p>
        <p v-else-if="!posts">{{ t('header.1') }}</p>
        <p v-else>{{ t('header.2') }}</p>

        <span v-if="pending">Loading...</span>
        <!-- <button @click="refresh()">Refresh</button> -->

        <div v-if="forum.Data.isForum">
            <div class="wrap post" v-for="(post, index) in forum.Data.Posts" :key="index"
                :response="post.id_post == post.refer ? 0 : 1">
                <div class="info">
                    <div class="user">
                        <p>{{ post.nickname }}</p>
                        <img :src="(useAsset('/png/Avatar' + post.avatar) as string)" alt="User avatar" />
                    </div>
                    <p>{{ post.creation_date }}</p>
                    <p v-if="post.last_modify">{{ post.last_modify }}</p>

                    <div class="button_controll">
                        <!-- <button @click="action(post, 'ForumModifyPost')">{{ $t('cForum.button.modify') }}</button> -->
                        <button @click="ForumDeletePost(post)">('cForum.button.delete')</button>
                        <!-- <button v-if="post.id_post == post.refer" @click="action(post, 'ForumAwnserPost')">{{
                            $t('cForum.button.reply') }}</button> -->
                    </div>

                </div>
                <div class="divisore"></div>
                <div class="text">
                    <div v-html="post.message"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "it": {
        "header": [
            "Per partecipare alla discussione devi essere loggato al sito. Clicca su 'Area personale' dal menu in testa alla pagina per accedere.",
            "Nessuno ha ancora aperto una discussione relativa all'articolo. Per farlo, utilizza il box qui sotto!",
            "Di seguito la discussione relativa all'articolo. Scorri in fondo alla pagina per dire la tua a riguardo!"
        ],
        "button": {
            "modify": "Modifica",
            "delete": "Elimina",
            "reply": "Replica",
            "submit": "Invia il post"
        },
        "writearea": {
            "tooltiptext": "Effettua il Login per poter partecipare alla discussione",
            "h2": "Scrivi il tuo post!",
            "p": "Utilizza normale linguaggio HTML se vuoi inserire elementi quali immagini, elenchi puntati o altro."
        },
        "DeletePost": {
            "h2": "Eliminare il post?",
            "p": "Se decididi eliminare il post non potrai più recuperarlo."
        },
        "ModifyPost": {
            "h2": "Modificare il post?",
            "p": "Scrivi nello spazio di seguito il tuo messaggio.br />Utilizza normale linguaggio HTML se vuoi inserire elementi quali immagini, elenchi puntati o altro."
        },
        "AwnserPost": {
            "h2": "Replicare al post?",
            "p": "Scrivi nello spazio di seguito il tuo messaggio.br />Utilizza normale linguaggio HTML se vuoi inserire elementi quali immagini, elenchi puntati o altro."
        }
    },
    "en": {
        "header": [
            "In order to partecipate to the discussion, you have to be Logged. Click on 'Personal Area' from the main menu on top of the page.",
            "Nobody has open a discussion about the article yet. If you want to, use the box below",
            "Below the discussion about the article. Scroll to the bottom of the page if you want to add your opinion!"
        ],
        "button": {
            "modify": "Modify",
            "delete": "Delete",
            "reply": "Reply",
            "submit": "Submit the post"
        },
        "writearea": {
            "tooltiptext": "Do Login if you want to partecipate in the discussion",
            "h2": "Write your post!",
            "p": "If you have to insert special element like images, ordered list or other, use normal HTML syntax."
        },
        "DeletePost": {
            "h2": "Delete the post?",
            "p": "If you decide to delete the post, you wont be able to restore it."
        },
        "ModifyPost": {
            "h2": "Modify the post?",
            "p": "Write your message below.br />If you have to insert special element like images, ordered list or other, use normal HTML syntax."
        },
        "AwnserPost": {
            "h2": "Reply to the post?",
            "p": "Write your message below.br />If you have to insert special element like images, ordered list or other, use normal HTML syntax."
        }
    }
}
</i18n>


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