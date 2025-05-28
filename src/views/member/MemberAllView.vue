<template>
    <div>
        <v-card>
            <alert-message
                v-model="alert.visible"
                :type="alert.type"
                :message="alert.message" />
            <v-card-title class="text-h5 justify-center">Member Management</v-card-title>
            <v-text-field class="ma-2" v-model="search" label="Search" variant="outlined"/>
            <v-data-table :search="search" :headers="headers" :items="data" class="elevation-1">
                <template v-slot:item="row">
                    <tr class="row-hovered">
                        <td>{{ row.item.accountId }}</td>
                        <td>{{ row.item.name }}</td>
                        <td>{{ row.item.nickname }}</td>
                        <td>{{ row.item.email }}</td>
                        <td>{{ row.item.phone }}</td>
                        <td>{{ row.item.birthDay }}</td>
                        <td>{{ row.item.address }}</td>
                        <td>
                            <v-row v-if="row.item.isActive == 1" class="no-gutters justify-center pa-2 align-center">
                                <v-btn
                                    color="success"
                                    @click="doNonActive(row.item.accountId)">
                                    <span class="text-capitalize">Active</span>
                                </v-btn>
                            </v-row>
                            <v-row v-else class="no-gutters justify-center pa-2 align-center text-capitalize">
                                <v-btn
                                    color="error"
                                    @click="doActive(row.item.accountId)">
                                    <span class="text-capitalize">Non-Active</span>
                                </v-btn>
                            </v-row>
                        </td>
                        <td>
                            <v-row class="no-gutters justify-center pa-2 align-center text-capitalize">
                                <v-btn
                                    color="primary"
                                    @click="doEdit(row.item.accountId)">
                                    <span class="text-capitalize">Edit</span>
                                </v-btn>
                            </v-row>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import MemberRepositoryNetwork from '@/repository/MemberRepositoryNetwork';

export default {
    name: 'MemberAllView',
    components: {
        AlertMessage
    },
    data() {
        return {
            search: '',
            headers: [
                { title: 'Account ID', key: 'accountId', align: 'center' },
                { title: 'Name', key: 'name', align: 'center' },
                { title: 'Nickname', key: 'nickname', align: 'center' },
                { title: 'Email', key: 'email', align: 'center' },
                { title: 'Phone Number', key: 'phone', align: 'center' },
                { title: 'Birth Day', key: 'birthDay', align: 'center' },
                { title: 'Address', key: 'address', align: 'center' },
                { title: 'Status', key: 'isActive', align: 'center' },
                { title: '', sortable: false, align: 'center' },
            ],
            data: [],
            alert: {
                visible: false,
                type: "info",
                message: "Please enter",
            }
        };
    },
    async mounted(){
        await this.doFirst()
    },
    methods: {
        async doFirst(){
            let response = await MemberRepositoryNetwork.getAllMembers();
            if (response.code === "200") {
                this.data = response.data;
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        buildPayloadActive(accountId){
            return {
                accountId,
                status: 1,
            }
        },
        async doActive(accountId) {
            let response = await MemberRepositoryNetwork.activeMember(this.buildPayloadActive(accountId));
            if(response.code === "200") {
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
                await this.doFirst();
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        async doNonActive(accountId) {
            let response = await MemberRepositoryNetwork.removeMember(null, {accountId});
            if(response.code === "200") {
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = response.message;
                await this.doFirst();
            } else {
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = response.message;
            }
        },
        doEdit(accountId) {
            this.$router.push({ name: 'MemberEditView', params: { accountId } });
        },
    },
};
</script>

<style>
</style>