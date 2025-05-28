<template>
    <div>
        <v-card class="pa-6">
        <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
        <v-card-title class="text-h5 justify-center">Add Books</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="doAddBooks" ref="form">
            <v-text-field v-model="form.title" label="Title" required variant="outlined" />
            <v-text-field v-model="form.imageUrl" label="Image Url" required variant="outlined" />
            <v-autocomplete v-model="selectedCategory" :items="optionCategory" item-title="category" item-value="category" label="Choose Category" multiple clearable variant="outlined"/>
            <v-text-field v-model="form.publishingYear" label="Publishing Year" type="number" required variant="outlined" />
            <v-autocomplete v-model="selectedAuthor" :items="optionAuthor" item-title="name" item-value="name" label="Choose Author" multiple clearable variant="outlined"/>
            <v-textarea v-model="form.description" label="Description" variant="outlined" />
            <v-text-field v-model="form.total" label="Total" type="number" variant="outlined" />
            <v-text-field v-model="form.available" label="Available" type="number" variant="outlined"/>
            <v-btn type="submit" color="primary" class="mt-4" block>Submit</v-btn>
            </v-form>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'BookCreateView',
    components: {
        AlertMessage
    },
    data() {
        return {
            form: {
                title: '',
                imageUrl: '',
                publishingYear: null,
                description: '',
                total: 0,
                available: 0,
                category: [],
                author: [],
            },
            optionCategory: [],
            optionAuthor: [],
            selectedCategory: [],
            selectedAuthor: [],
            alert: {
                visible: false,
                type: '',
                message: ''
            },
        };
    },
    async mounted(){
        await this.doFirst();
    },
    methods: {
        async doFirst() {
            await this.doGetCategories();
            await this.doGetAuthors();
        },
        async doGetCategories() {
            let response = await BookRepositoryNetwork.getAllCategories()
            if (response.code === "200") {
                this.optionCategory = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = 'error';
                this.alert.message = response.message;
            }
        },
        async doGetAuthors() {
            let response = await BookRepositoryNetwork.getAuthors()
            if (response.code === "200") {
                this.optionAuthor = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = 'error';
                this.alert.message = response.message;
            }
        },
        async doAddBooks(){
            let response = await BookRepositoryNetwork.addBook(this.form, this.selectedCategory, this.selectedAuthor)
            if(response.code === "200") {
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
            this.$refs.form.reset();
            this.scrollToTop();
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};
</script>