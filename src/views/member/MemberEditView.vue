<template>
    <div
    class="d-flex justify-center align-center"
    style="min-height: 100vh;"
  >
    <v-card width="600" class="pa-6">
      <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
      <v-card-title class="text-h5 justify-center">Edit Member</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-text-field v-model="accountId" label="AccountId" required disabled variant="outlined"/>
          <v-text-field v-model="form.name" label="Name" required variant="outlined"/>
          <v-text-field v-model="form.nickname" label="Nickname" variant="outlined"/>
          <v-text-field v-model="form.email" label="Email" type="email" required variant="outlined"/>
          <v-text-field v-model="form.password" label="Password" type="password" required variant="outlined"/>
          <v-select v-model="form.role" :items="roles" label="Role" item-title="label" item-value="value" required variant="outlined"/>
          <v-text-field v-model="form.phone" label="Phone Number" variant="outlined"/>
          <v-text-field v-model="form.birthDay" label="Birth Day" type="date" variant="outlined"/>
          <v-textarea v-model="form.address" label="Address" variant="outlined"/>
          <v-btn type="submit" color="primary" class="mt-4" block>Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import MemberRepositoryNetwork from '@/repository/MemberRepositoryNetwork';

export default {
  name: 'MemberEditView',
  components: {
    AlertMessage
  },
  data() {
    return {
      accountId: this.$route.params.accountId,
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
  async mounted(){
    await this.doFirst();
  },
  methods: {
    async doFirst() {
      let response = await MemberRepositoryNetwork.getProfile({accountId: this.accountId});
      if (response.code === "200") {
        this.form = response.data;
      } else {
        this.alert.visible = true;
        this.alert.type = "error";
        this.alert.message = response.message || "Failed to load member details.";
      }
    },
    async handleSubmit() {
      let response = await MemberRepositoryNetwork.editMember(this.form)
      if (response.code === "200") {
        this.alert.visible = true;
        this.alert.type = "success";
        this.alert.message = "Member updated successfully.";
        // this.$router.push({ name: 'MemberAllView' });
      } else {
        this.alert.visible = true;
        this.alert.type = "error";
        this.alert.message = response.message || "Failed to update member.";
      }
      this.scrollToTop()
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