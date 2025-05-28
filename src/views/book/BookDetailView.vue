<template>
    <div
      class="d-flex justify-center align-center"
      style="min-height: 100vh;"
    >
      <v-card width="800" class="pa-6">
        <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
        <v-card-title class="text-h5 justify-center">{{ data.title }}</v-card-title>
        <v-card-text>
            <img :src="data.imageUrl" alt="Image" width="400" heigth="400"/>
        </v-card-text>
        <v-card-text>
            <div><strong>Title:</strong> {{ data.title }}</div>
            <div><strong>Author:</strong> {{ data.author }}</div>
            <div><strong>Category:</strong> {{ data.category }}</div>
            <div><strong>Publishing Year:</strong> {{ data.publishingYear }}</div>
            <div><strong>Description:</strong><br /> <span>{{ data.description }}</span></div>
            <div><strong>Available:</strong> {{ data.available > 0 ? 'Yes' : 'No' }}</div>
        </v-card-text>
        <v-row v-if="canBook" class="no-gutters justify-center pa-2 align-center">
            <v-btn type="submit" color="primary" block @click="doBorrow">Borrow</v-btn>
        </v-row>
        <v-row class="no-gutters justify-center pa-2 align-center" v-if="needReturn">
            <span color="red">You have already borrowed this book, please return it first.</span>
        </v-row>
      </v-card>
    </div>
</template>

<script>
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'BookDetailView',
    components: {
        AlertMessage
    },
    async mounted(){
        await this.doFirst();
    },
    data() {
        return {
            canBook: false,
            needReturn: false,
            bookId: this.$route.params.bookId,
            accountId: this.$store.state.accountId,
            data:{
                title: 'Book',
                imageUrl: '',
                category: '',
                publishingYear: 0,
                author: '',
                available:0,
            },
            alert: {
                visible: false,
                type: "info",
                message: "Please enter your credentials to login.",
            },
        }
    },
    methods: {
        async doFirst(){
            await this.getBookDetail();
            await this.checkUserBooking();
        },
        async checkUserBooking(){
            let response = await BookRepositoryNetwork.checkUserBooking({
                idBook: this.bookId,
                accountId: this.accountId
            });
            if(response.code === "200") {
                if(response.data){
                    if(response.data === 'COMPLETED' || response.data === 'CANCELED'){
                        this.canBook = true;
                    }else{
                        if(response.data === 'APPROVED'){
                            this.needReturn = true;
                        }
                        this.canBook = false;
                    }
                }else{
                    this.canBook = true;
                }
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        async getBookDetail() {
            let response = await BookRepositoryNetwork.getBookById({id: this.bookId});
            if(response.code === "200") {
                this.data = response.data;
                if(this.data.available > 0) {
                    this.canBook = true;
                } else {
                    this.canBook = false;
                }
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        async doBorrow(){
            let response = await BookRepositoryNetwork.doBooking({
                idBook: this.bookId,
                accountId: this.accountId
            })
            if(response.code === "200") {
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
            this.scrollToTop()
            await this.doFirst()
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