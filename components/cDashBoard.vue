<template>

    <div v-if="data.length">
        <div class="affianca" v-for="(section, main_index) in data" :key="main_index">
            <div class="box" v-for="(el, sub_index) in section" :key="sub_index">

                <h2>{{ el.title[$i18n.locale] }}</h2>
                <table v-if="el.type == 'table' && el.baseTab && SUDO == false">
                    <thead>
                        <tr>
                            <th v-if="el.baseTab.includes(key)"
                                v-for="(key, index) in Object.keys(el.locale[$i18n.locale])" :key="index">
                                {{ el.locale[$i18n.locale][key] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in el.data" :key="index">
                            <td v-for="(key, index) in el.baseTab" :key="index">
                                {{ row[key] }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table v-else-if="el.type == 'table' && SUDO == false">
                    <thead>
                        <tr>
                            <th v-for="(key, index) in Object.keys(el.data[0])" :key="index">
                                {{ el.locale[$i18n.locale][key] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in el.data" :key="index">
                            <td v-for="(cell, index) in row" :key="index">
                                {{ cell }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table v-else-if="el.type == 'table' && el.sudoTab && SUDO == true">
                    <thead>
                        <tr>
                            <th v-for="(key, index) in el.sudoTab" :key="index">
                                {{ el.locale[$i18n.locale][key] }}
                            </th>
                            <th v-for="(key, index) in el.controls" :key="key">
                                {{ el.locale[$i18n.locale][key] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in el.data" :key="index"
                            :class="[editOn == el.table + '.' + row['id'] ? 'focusOn' : '']">
                            <td v-for="(key, index) in el.sudoTab" :key="index" @click.self="editOn = null"
                                @dblclick.prevent="editOn = el.table + '.' + row['id']">
                                <input v-if="editOn == el.table + '.' + row['id']" type="text" :value="row[key]"
                                    :id="el.table + '.' + row['id'] + '.' + key">
                                <p v-else>{{ row[key] }}</p>
                            </td>
                            <td v-if="el.controls.includes('modify')">
                                <button @click="sendModify(el.table + '.' + row['id'], el.sudoTab)"> {{
                                    el.locale[$i18n.locale]['modify']
                                }}</button>
                            </td>
                            <td v-if="el.controls.includes('delete')">
                                <button @click="sendDelete(el.table + '.' + row['id'])"> {{
                                    el.locale[$i18n.locale]['delete']
                                }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-else-if="el.type == 'graph'">
                    <img :src="el.url" :alt="el.title">
                </div>

                <div v-else>
                    <h2>Errore</h2>
                    <p>Questa tabella non prevede la modalità SUDO.</p>
                </div>

            </div>
        </div>
    </div>


</template>

<script>

export default {
    props: {
        data: [],
        SUDO: false,
    },
    data() {
        return {
            editOn: null
        }
    },
    methods: {

        sendModify(id, tab) {
            console.log(id, tab)
            if (id, tab) {
                this.editOn = null
                this.$emit('Modify', id, tab)
            }
        },

        sendDelete(id) {
            if (id) {
                this.$emit('Delete', id)
            }
        }
    },
}

</script>

<style lang="scss">
tr.focusOn {
    background-color: var(--Color_Main) !important;
    opacity: 0.8;

    input {
        width: -webkit-fill-available;
        background-color: white;
    }
}
</style>