<template>
    <div>
        <v-card class="pa-6">
        <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
        <v-card-title class="text-h5 justify-center">Add Author</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="doAddAuthor" ref="form">
            <v-text-field v-model="form.name" label="Name" required variant="outlined" />
            <v-textarea v-model="form.bio" label="Biography" variant="outlined" />
            <v-btn type="submit" color="primary" class="mt-4" block>Submit</v-btn>
            </v-form>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';

export default {
    name: 'CreateAuthorView',
    components: {
        AlertMessage
    },
    data() {
        return {
            form: {
                name: '',
                bio: '',
            },
            authors: [],
            alert: {
                visible: false,
                type: "info",
                message: "",
            },
        };
    },
    methods: {
        async doAddAuthor() {
            let response = await BookRepositoryNetwork.addAuthor(this.form);
            if (response.code === "200") {
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