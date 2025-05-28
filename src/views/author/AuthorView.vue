<template>
    <v-card>
            <v-card-title>
                <h1>Author Management</h1>
            </v-card-title>
            <v-row class="no-gutters">
                <v-col cols="12" class="text-right mr-2">
                    <v-btn
                        color="secondary"
                        @click="doAdd()">
                        <span class="text-capitalize">Add Author</span>
                    </v-btn>
                </v-col>    
            </v-row>
            <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
            <v-card-text>
                <v-data-table :headers="headers" :items="authors" class="elevation-1">
                    <template v-slot:item="{ item }">
                        <tr class="row-hovered">
                            <td>{{ item.name }}</td>
                            <td>{{ item.bio }}</td>
                            <td>
                                <v-row class="no-gutters">
                                    <v-btn
                                        color="primary"
                                        @click="doEdit(item.id)">
                                        <span class="text-capitalize">Edit</span>
                                    </v-btn>
                                </v-row>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';

export default {
    name: 'AuthorView',
    components: {
        AlertMessage
    },
    data() {
        return {
            search: '',
            headers: [
                { title: 'Name', key: 'name', align: 'center' },
                { title: 'Biography', key: 'bio', align: 'center' },
                { title: '', sortable: false, align: 'center' },
            ],
            authors: [],
            alert: {
                visible: false,
                type: "info",
                message: "",
            },
        };
    },
    async mounted() {
        await this.doFirst();
    },
    methods: {
        async doFirst() {
            await this.getAllAuthors();
        },
        async getAllAuthors() {
            let response = await BookRepositoryNetwork.getAuthors();
            if (response.code === "200") {
                this.authors = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        doAdd() {
            this.$router.push({ name: 'CreateAuthorView' });
        },
        doEdit(authorId) {
            this.$router.push({ name: 'AuthorEditView', params: { authorId } });
        }
    }
};
</script>