<template>
    <div>
        <v-card>
            <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
            <v-card-title>
                <h1>Edit Author</h1>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="doEditAuthor" ref="form">
                    <v-text-field v-model="form.name" label="Name" required variant="outlined" readonly/>
                    <v-textarea v-model="form.bio" label="Biography" variant="outlined"/>
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
    name: 'AuthorEditView',
    components: {
        AlertMessage
    },
    data() {
        return {
            authorId: this.$route.params.authorId,
            form: {
                name: '',
                bio: '',
            },
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
        async doFirst(){
            await this.getAuthorById();
        },
        async getAuthorById() {
            let response = await BookRepositoryNetwork.getAuthorById({id: this.authorId})
            if (response.code === "200") {
                this.form = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        async doEditAuthor(){
            let response = await BookRepositoryNetwork.editAuthor(this.form);
            if (response.code === "200") {
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
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