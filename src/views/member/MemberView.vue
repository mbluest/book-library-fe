<template>
    <div
      class="d-flex justify-center align-center"
      style="min-height: 100vh;"
    >
      <v-card width="600" class="pa-6">
        <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
        <v-card-title class="text-h5 justify-center">Profile Member</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="form.accountId" label="Account ID" readonly variant="outlined"/>
            <v-text-field v-model="form.name" label="Name" readonly variant="outlined"/>
            <v-text-field v-model="form.nickname" label="Nickname" readonly variant="outlined"/>
            <v-text-field v-model="form.email" label="Email" type="email" readonly variant="outlined"/>
            <v-text-field v-model="form.phone" label="Phone Number" readonly variant="outlined"/>
            <v-text-field v-model="form.birthDay" label="Birth Day" type="date" readonly variant="outlined"/>
            <v-textarea v-model="form.address" label="Address" readonly variant="outlined"/>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
<script>
import MemberRepositoryNetwork from '@/repository/MemberRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

  export default {
    name: 'MemberView',
    components: {
        AlertMessage
    },
    async mounted(){
        await this.doGetMember();
    },
    data() {
      return {
        form: {
          name: '',
          nickname: '',
          email: '',
          password: '',
          phone: '',
          birthDay: '',
          address: '',
        },
        alert: {
            visible: false,
            type: "info",
            message: "Please enter your credentials to login.",
        },
      };
    },
    methods: {
      async doGetMember() {
        const accountId = this.$store.state.accountId;
        let response = await MemberRepositoryNetwork.getProfile({accountId});
        if (response.code === "200") {
            this.form = response.data
        } else {
            this.errorMessage = response.message;
            this.alert.visible = true;
            this.alert.type = "error";
            this.alert.message = this.errorMessage;
        }
      },
    },
  };
  </script>
  