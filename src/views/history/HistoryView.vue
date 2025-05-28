<template>
    <div>
        <v-card>
            <v-tabs v-model="tab" align-tabs="center">
                <v-tab value="history">History</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="history">
                    <div v-if="data.length > 0">
                        <v-text-field v-model="search" label="Search" prepend-icon="mdi-magnify" clear-icon="ma-2 pr-4" clearable/>
                        <v-data-table :headers="headers" :items="data" class="elevation-1" :search="search">
                            <template v-slot:item="row">
                                <tr>
                                    <td class="pa-2"><img :src="row.item.book.imageUrl" alt="Image" width="100" heigth="200"/></td>
                                    <td >{{ row.item.book.title }}</td>
                                    <td >{{ row.item.status }}</td>
                                    <td >{{ row.item.notes }}</td>
                                    <td >{{ row.item.createdDate }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </div>
                    <div v-else>
                        <div>
                            No Data Available
                        </div>
                    </div>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>

        
    </div>
</template>

<script>
import HistoryRepositoryNetwork from '@/repository/HistoryRepositoryNetwork';

export default {
  name: 'HistoryView',
  data() {
    return {
      data: [],
      search: '',
      tab: 'history',
      role: this.$store.state.role,
      accountId: this.$store.state.accountId,
      alert: {
        visible: false,
        type: "info",
        message: "Loading history...",
      },
      headers: [
                { title: 'Cover', key: 'book.imageUrl', align: 'center' },
                { title: 'Title', key: 'book.title', align: 'center'  },
                { title: 'Status', key: 'status', align: 'center'  },
                { title: 'Notes', key: 'notes', align: 'center'  },
                { title: 'Time', key: 'createdDate', align: 'center'  },
            ],
    };
  },
  async mounted() {
    await this.doFirst()
  },
  methods: {
    async doFirst(){
        await this.getHistory();
    },
    async getHistory(){
        let response = await HistoryRepositoryNetwork.getHistoryByUser({accountId: this.accountId})
        if(response.code === "200"){
            this.data = response.data;
        } else {
            this.alert.visible = true;
            this.alert.type = "error";
            this.alert.message = response.message || "Failed to load history.";
        }
    },
    formatDate(date){
        return new Date(date).toLocaleString()
    },
  },
};
</script>