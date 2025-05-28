<template>
    <div class="d-flex justify-center align-center"
    style="height: 100vh;">
        <v-card width="50%">
            <AlertMessage v-model="alert.visible" 
            :type="alert.type" 
            :message="alert.message" />
            <v-card-title class="justify-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin" ref="form">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        prepend-icon="mdi-account"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        required>
                    </v-text-field>
                    <v-btn type="submit" color="primary" block>Login</v-btn>
                </v-form>
                <div class="mt-4">
                    <span>Don't have an account?</span>
                        <v-btn
                        variant="text"
                        color="primary"
                        class="text-caption"
                        @click="goToRegister">
                            Create New Account
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
import MemberRepositoryNetwork from '@/repository/MemberRepositoryNetwork';
// import Http from '@/plugins/Http';
import AlertMessage from '@/components/AlertMessage.vue';

  export default {
    name: "LoginView",
    components: {
        AlertMessage
    },
    data() {
      return {
        username: "",
        password: "",
        alert: {
            visible: false,
            type: "info",
            message: "Please enter your credentials to login.",
        },
      };
    },
    methods: {
        buildPayload(nickname, password){
            let payload = {
                nickname,
                password,
                isHashPassword: false
            }
            return payload
        },
        async handleLogin() {
            let response = await MemberRepositoryNetwork.login(this.buildPayload(this.username, this.password))
            if(response.code === "200"){
                this.$store.dispatch("login", response.data);
                this.errorMessage = response.message;
                this.alert.visible = true;
                this.alert.type = "success";
                this.alert.message = this.errorMessage;
                this.$router.push({ name: "BookView" });
            }else{
                this.errorMessage = response.message || "Login failed. Please try again.";
                this.alert.visible = true;
                this.alert.type = "error";
                this.alert.message = this.errorMessage;
            }
        },
        goToRegister(){
            this.$router.push({ name: "CreateMember" });
        },
    },
  };
</script>
  