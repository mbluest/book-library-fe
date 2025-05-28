<template>
    <v-card>
        <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
        <v-card-title class="text-h5 justify-center">Book List</v-card-title>
        <v-text-field class="ma-2" v-model="search" label="Search" variant="outlined"/>
        <v-data-table :headers="headers" :items="books" class="elevation-1" :search="search" >
            <template v-slot:item="row">
                <tr v-if="row.item.available > 0" class="row-hovered" @click="viewDetail(row.item.id)" style="cursor: pointer;">
                    <td><img :src="row.item.imageUrl" alt="Image" width="100" heigth="200" class="pa-2"/></td>
                    <td >{{ row.item.title }}</td>
                    <td>{{ row.item.author }}</td>
                    <td>{{ row.item.publishingYear }}</td>
                    <td>{{ row.item.category }}</td>
                </tr>
                <tr v-else class="strikethrough" @click="viewDetail(row.item.id)" style="cursor: pointer;">
                    <td><img :src="row.item.imageUrl" alt="Image" width="100" heigth="200" class="pa-2"/></td>
                    <td >{{ row.item.title }}</td>
                    <td>{{ row.item.author }}</td>
                    <td>{{ row.item.publishingYear }}</td>
                    <td>{{ row.item.category }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import BookRepositoryNetwork from '@/repository/BookRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'BookView',
    components: {
        AlertMessage
    },
    data() {
        return {
            search: '',
            headers: [
                { title: 'Cover', key: 'imageUrl', align: 'center' },
                { title: 'Title', key: 'title', align: 'center'  },
                { title: 'Author', key: 'author', align: 'center'  },
                { title: 'Year', key: 'publishingYear', align: 'center'  },
                { title: 'Category', key: 'category', align: 'center'  },
            ],
            books: [],
            alert: {
            visible: false,
            type: "info",
            message: "",
        },
        };
    },
    async mounted() {
        await this.getAllBooks();
    },
    methods: {
        async getAllBooks(){
            const response = await BookRepositoryNetwork.getAllBooks();
            if(response.code === "200") {
                this.books = response.data;
            } else {
                this.errorMessage = response.message;
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = this.errorMessage;
            }
        },
        viewDetail(book) {
            this.$router.push({ name: 'BookDetailView', params: { bookId: book } });
        },
    },
    
};
</script>
<style scoped>
.strikethrough td {
  text-decoration: line-through;
  opacity: 0.5;
}
.row-hovered:hover {
  background-color: rgba(0, 0, 0, 0.05); /* or any effect you want */
  transition: background-color 0.3s ease;
}
</style>