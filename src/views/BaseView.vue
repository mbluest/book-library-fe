<template>
  <v-app>
    <v-app-bar app color="info" dark>
      <v-container class="d-flex justify-space-between align-center">
        <div>
          <h1 @click="goHome">B00K</h1>
        </div>
        <app-top-nav :role-user="roleUser" v-if="isLogin"/>
        <div>
          <v-btn plain @click="doLogout" v-if="isLogin">
            <strong>Logout</strong>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view :key="$route.path"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppTopNav from '@/views/AppTopNav.vue';

export default {
  name: 'BaseView',
  components: {
    AppTopNav
  },
  computed:{
    isLogin(){
      return this.$store.state.login;
    },
    roleUser() {
      return this.$store.state.role;
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
    goHome() {
      if (this.isLogin) {
        this.$router.push({ name: 'ProfileMember' });
      } else {
        this.$router.push({ name: 'Login' });
      }
    }
  }
}
</script>
