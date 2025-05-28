<template>
    <div>
        <v-card>
            <v-card-title>
                <h1>Categories Management</h1>
            </v-card-title>
            <v-row class="no-gutters">
                <v-col cols="12" class="text-right mr-2">
                    <v-btn
                        color="warning"
                        @click="doAdd()">
                        <span class="text-capitalize">Add Categories</span>
                    </v-btn>
                </v-col>    
            </v-row>
            <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
            <v-card-text>
                <v-text-field v-model="search" label="Search" class="mb-4" variant="outlined"/>
                <v-data-table :headers="headers" :items="categories" class="elevation-1" :search="search">
                    <template v-slot:item="{ item }">
                        <tr class="row-hovered">
                            <td>{{ item.category }}</td>
                            <td>{{ item.description }}</td>
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
    </div>
</template>

<script>
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'CategoriesView',
    components: {
        AlertMessage
    },
    data() {
        return {
            search: '',
            headers: [
                { title: 'Category', key: 'category', align: 'center' },
                { title: 'Description', key: 'description', align: 'center' },
                { title: '', key:'actions', align: 'center', sortable: false }
            ],
            categories: [],
            alert: {
                visible: false,
                type: "info",
                message: "Loading categories...",
            },
        }
    },
    async mounted() {
        await this.doFirst();
    },
    methods: {
        async doFirst(){
            await this.getAllCategories();
        },
        async getAllCategories(){
            let response = await BookRepositoryNetwork.getAllCategories();
            if (response.code === "200") {
                this.categories = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        doEdit(categoryId) {
            this.$router.push({ name: 'CategoriesEditView', params: { categoryId } });
        },
        doAdd(){
            this.$router.push({ name: 'CreateCategoriesView' });
        }
    }
}
</script>