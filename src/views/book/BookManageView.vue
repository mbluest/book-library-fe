<template>
    <div>
        <v-card>
            <v-card-title>
                <h1>Books Management</h1>
            </v-card-title>
            <v-row class="no-gutters">
                <v-col cols="12" class="text-right mr-2">
                    <v-btn
                        color="success"
                        @click="doAdd()">
                        <span class="text-capitalize">Add Books</span>
                    </v-btn>
                </v-col>    
            </v-row>
            <AlertMessage v-model="alert.visible" 
                :type="alert.type" 
                :message="alert.message" />
            <v-card-text>
                <v-text-field v-model="search" label="Search" class="mb-4" variant="outlined"/>
                <v-data-table :headers="headers" :items="books" class="elevation-1" :search="search">
                    <template v-slot:item="{ item }">
                        <tr class="row-hovered">
                            <td><img :src="item.imageUrl" alt="Image" width="100" heigth="200" class="pa-2"/></td>
                            <td >{{ item.title }}</td>
                            <td>{{ item.author }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.publishingYear }}</td>
                            <td>{{ item.available }}</td>
                            <td>{{ item.total }}</td>
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
  name: 'BookManageView',
  components: {
    AlertMessage
  },
  data() {
    return {
        books:[],
        search: '',
        alert: {
            visible: false,
            type: '',
            message: ''
        },
        headers: [
            { title: 'Cover', key: 'imageUrl', align: 'center', sortable: false },
            { title: 'Title', key: 'title', align: 'center' },
            { title: 'Author', key: 'author', align: 'center' },
            { title: 'Category', key: 'category', align: 'center' },
            { title: 'Year', key: 'publishingYear', align: 'center' },
            { title: 'Available', key: 'available', align: 'center' },
            { title: 'Total', key: 'total', align: 'center' },
            { title: '', key:'actions', align: 'center', sortable: false }
        ],
    };
  },
  async mounted(){
    await this.doFirst()
  },
  methods: {
    async doFirst(){
        await this.getAllBooks();
    },
    async getAllBooks() {
      const response = await BookRepositoryNetwork.getAllBooks();
      if (response.code === "200") {
        this.books = response.data;
      } else {
        this.alert.visible = true;
        this.alert.type = "error";
        this.alert.message = response.message;
      }
    },
    doAdd() {
      this.$router.push({ name: 'BookCreateView' });
    },
    doEdit(id) {
      this.$router.push({ name: 'BookEditView', params: { bookId: id } });
    }
  },
};
</script>