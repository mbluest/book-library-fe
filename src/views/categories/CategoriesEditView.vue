<template>
    <div>
        <v-card>
            <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
            <v-card-title>
                <h1>Edit Category</h1>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="doEditCategory" ref="form">
                    <v-text-field v-model="form.category" label="Category" required variant="outlined" readonly/>
                    <v-textarea v-model="form.description" label="Description" variant="outlined"/>
                    <v-btn type="submit" color="primary" class="mt-4" block>Update</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';

export default {
    name: 'CategoriesEditView',
    components: {
        AlertMessage
    },
    data() {
        return {
            id: this.$route.params.categoryId,
            form: {
                category: '',
                description: '',
            },
            alert: {
                visible: false,
                type: "info",
                message: "",
            },
        }
    },
    async mounted(){
        await this.doFirst();
    },
    methods:{
        async doFirst(){
            await this.getCategoryById();
        },
        async getCategoryById(){
            let response = await BookRepositoryNetwork.getCategoryById({id: this.id});
            if(response.code === "200"){
                this.form = response.data
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        async doEditCategory(){
            let response = await BookRepositoryNetwork.editCategories(this.form)
            if(response.code === "200"){
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
            await this.doFirst();
        }
    }
}
</script>