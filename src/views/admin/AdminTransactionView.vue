<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="5">
                        <v-text-field v-model="filter.title" label="Title" variant="outlined"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field v-model="filter.memberName" label="Member Name" variant="outlined"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field v-model="filter.forStartDate" type="date" label="Start Date" variant="outlined"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field v-model="filter.forEndDate" type="date" label="End Date" variant="outlined"/>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            class="ma-2 text-capitalize"
                            color="primary"
                            @click="doFilter" block>
                            Filter
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>
        <v-card class="mt-4">
            <v-text-field v-model="search" label="Search" variant="outlined"/>
            <v-data-table :headers="headers" :items="data" class="elevation-1" :search="search" height="800px">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.id }}</td>
                        <td>{{ row.item.member.accountId }} - {{ row.item.member.name }}</td>
                        <td>
                            <v-row class="align-center no-gutters justify-center pa-2">
                                <img :src="row.item.book.imageUrl" alt="Image" width="50" heigth="50" class="pa-2"/>
                                {{ row.item.book.title }}
                            </v-row>
                        </td>
                        <td>{{ row.item.status }}</td>
                        <td>{{ formatDate(row.item.createdDate) }}</td>
                        <td>{{ row.item.admin?.accountId }} - {{ row.item.admin?.name }}</td>
                        <td>
                            <v-row v-if="isCanApproveOrReject(row.item.status)" class="no-gutters justify-center ma-2 pa-2 align-center">
                                <v-btn
                                    class="ma-2 text-capitalize"
                                    color="primary"
                                    @click="openDialog(row.item.id, 'Approve')">
                                    Approve
                                </v-btn>
                                <v-btn
                                    class="ma-2 text-capitalize"
                                    color="error"
                                    @click="openDialog(row.item.id, 'Reject')">
                                    Reject
                                </v-btn>
                            </v-row>
                            <v-row v-if="isCanReturn(row.item.status)" class="no-gutters justify-center pa-2 align-center">
                                <v-btn
                                    class="ma-2 text-capitalize"
                                    color="warning"
                                    @click="openDialog(row.item.id, 'Return')">
                                    Return
                                </v-btn>
                            </v-row>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <action-dialog-comment
            v-model="dialog.dialogVisible"
            :title="dialog.dialogTitle"
            :txtButton="dialog.dialogButtonText"
            @submit="handleAction(dialog.selectedAction, dialog.selectedId, $event)"
            @close="dialogVisible = false" />
    </div>
</template>

<script>
import TransactionRepositoryNetwork from '@/repository/TransactionRepositoryNetwork';
import ActionDialogComment from '@/components/ActionDialogComment.vue';

export default {
  name: 'AdminTransactionView',
    components: {
        ActionDialogComment
    },
  data() {
    return {
      filter: {
        title: "",
        memberName: "",
        forStartDate: null,
        forEndDate: null,
      },
      search: '',
      alert: {
        visible: false,
        type: "info",
        message: "Admin transaction view loaded.",
      },
      headers: [
        { title: 'Transaction ID', key: 'id', align: 'center' },
        { title: 'Member', key:"memberInfo", align: 'center' },
        { title: 'Book', key:"title", align: 'center' },
        { title: 'Status', key: 'status', align: 'center' },
        { title: 'Request Date', key: 'createdDate', align: 'center' },
        { title: 'Admin', key:"adminInfo", align: 'center' },
        { title: '', align: 'center' }
      ],
      data: [],
      dialog:{
        dialogTitle:"",
        dialogButtonText:"",
        dialogVisible: false,
        selectedAction: "",
        selectedId: null
      }
    };
  },
  async mounted(){
    await this.doFirst();
  },
  methods: {
    async doFirst() {
        await this.getTransactions();
    },
    async doFilter(){
        await this.getTransactions();
    },
    async getTransactions(){
        let response = await TransactionRepositoryNetwork.getAllTransaction(this.filter);
        if(response.code === "200"){
            this.data = response.data.map(item => ({
                ...item,
                memberInfo: `${item.member.accountId} - ${item.member.name}`,
                adminInfo: item.admin ? `${item.admin.accountId} - ${item.admin.name}`:null,
            }));
        }else{
            this.data = [];
        }
    },
    formatDate(date){
        return new Date(date).toLocaleString()
    },
    isCanApproveOrReject(status){
        return status === "PENDING";
    },
    isCanReturn(status){
        return status === "APPROVED";
    },
    buildPayload(id, comment){
        return{
            id,
            notes: comment
        }
    },
    async handleAction(action, transactionId, comment) {
        if (action === 'Approve') {
            await this.doApprove(this.buildPayload(transactionId, comment));
        } else if (action === 'Reject') {
            await this.doReject(this.buildPayload(transactionId, comment));
        } else if (action === 'Return') {
            await this.doReturn(this.buildPayload(transactionId, comment));
        }
        this.scrollToTop();
        await this.doFirst();
    },
    async doApprove(payload){
        let response = await TransactionRepositoryNetwork.approveBooking(payload);
        if(response.code === "200"){
            this.alert.visible = true;
            this.alert.type = "success";
            this.alert.message = response.message;
        } else {
            this.alert.visible = true;
            this.alert.type = "error";
            this.alert.message = response.message;
        }
    },
    async doReject(payload){
        let response = await TransactionRepositoryNetwork.rejectBooking(payload);
        if(response.code === "200"){
            this.alert.visible = true;
            this.alert.type = "success";
            this.alert.message = response.message;
        } else {
            this.alert.visible = true;
            this.alert.type = "error";
            this.alert.message = response.message;
        }
    },
    async doReturn(payload){
        let response = await TransactionRepositoryNetwork.returningBook(payload);
        if(response.code === "200"){
            this.alert.visible = true;
            this.alert.type = "success";
            this.alert.message = response.message;
        } else {
            this.alert.visible = true;
            this.alert.type = "error";
            this.alert.message = response.message;
        }
    },
    openDialog(id, action) {
        this.dialog.dialogTitle = `${action} Book Transaction`;
        this.dialog.selectedAction = action;
        this.dialog.selectedId = id;
        this.dialog.dialogVisible = true;
        this.dialog.dialogButtonText = action
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