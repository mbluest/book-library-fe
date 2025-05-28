<template>
  <div
    class="d-flex justify-center align-center"
    style="min-height: 100vh;"
  >
    <v-card width="600" class="pa-6">
      <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
      <v-card-title class="text-h5 justify-center">Create Member</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-text-field v-model="form.name" label="Name" required />
          <v-text-field v-model="form.nickname" label="Nickname" />
          <v-text-field v-model="form.email" label="Email" type="email" required />
          <v-text-field v-model="form.password" label="Password" type="password" required />
          <v-select v-model="form.role" :items="roles" label="Role" item-title="label" item-value="value" required/>
          <v-text-field v-model="form.phone" label="Phone Number" />
          <v-text-field v-model="form.birthDay" label="Birth Day" type="date" />
          <v-textarea v-model="form.address" label="Address" />

          <v-btn type="submit" color="primary" class="mt-4" block>Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MemberRepositoryNetwork from '@/repository/MemberRepositoryNetwork';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'CreateMemberView',
  components: {
        AlertMessage
    },
  data() {
    return {
      form: {
        role: '',
        name: '',
        nickname: '',
        email: '',
        password: '',
        phone: '',
        birthDay: '',
        address: '',
      },
      roles: [
        {label: 'Member', value: '2'},
        {label: 'Admin', value: '1,2'},
      ],
      alert: {
            visible: false,
            type: "info",
            message: "Please enter your credentials to login.",
        },
    };
  },
  methods: {
    async handleSubmit() {
      let response = await MemberRepositoryNetwork.createMember(this.form);
      if (response.code === "200") {
        this.$router.push({ name: 'Login' });
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
