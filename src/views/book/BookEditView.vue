<template>
    <div>
        <v-card class="pa-6">
        <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
        <v-card-title class="text-h5 justify-center">Edit Books</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="doEditBook" ref="form">
            <v-text-field v-model="form.title" label="Title" required variant="outlined" />
            <v-text-field v-model="form.imageUrl" label="Image Url" required variant="outlined" />
            <v-autocomplete v-model="selectedCategory" :items="optionCategory" item-title="category" item-value="category" label="Choose Category" multiple clearable variant="outlined"/>
            <v-text-field v-model="form.publishingYear" label="Publishing Year" type="number" required variant="outlined" />
            <v-autocomplete v-model="selectedAuthor" :items="optionAuthor" item-title="name" item-value="name" label="Choose Author" multiple clearable variant="outlined"/>
            <v-textarea v-model="form.description" label="Description" variant="outlined" />
            <v-text-field v-model="form.total" label="Total" type="number" variant="outlined" />
            <v-text-field v-model="form.available" label="Available" type="number" variant="outlined"/>
            <v-btn type="submit" color="primary" class="mt-4" block>Update</v-btn>
            </v-form>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'BookEditView',
    components: {
        AlertMessage
    },
    data() {
        return {
            id: this.$route.params.bookId,
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
        }
    },
    async mounted() {
        await this.doFirst();
    },
    methods: {
        async doFirst() {
            await this.doGetCategories();
            await this.doGetAuthors();
            await this.doGetBookById();
        },
        async doGetBookById() {
            let response = await BookRepositoryNetwork.getBookById({id:this.id});
            if (response.code === "200") {
                this.form = response.data;
                let setCategory = response.data.category.split(' | ')
                let setAuthor = response.data.author.split(' | ')
                this.selectedCategory = setCategory;
                this.selectedAuthor = setAuthor;
            } else {
                this.alert.visible = true;
                this.alert.type = 'error';
                this.alert.message = response.message;
            }
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
        async doEditBook() {
            let response = await BookRepositoryNetwork.editBook(this.form, this.selectedCategory, this.selectedAuthor)
            if (response.code === "200") {
                this.alert.visible = true;
                this.alert.type = 'success';
                this.alert.message = response.message;
            } else {
                this.alert.visible = true;
                this.alert.type = 'error';
                this.alert.message = response.message;
            }
            this.scrollToTop()
            await this.doFirst();
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
}
</script>