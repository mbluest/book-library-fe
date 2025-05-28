<template>
    <v-tabs v-model="activeTab" align-tabs="center">
        <v-tab :key="tab" v-for="tab in tabsFiltered" @click="doRoute(tab.route)">
          {{ tab.title }}
        </v-tab>
    </v-tabs>
  </template>
  
<script>
import RoleManagement from '@/util/RoleManagement';

  export default {
    name: 'AppTopNav',
    props: {
      roleUser: {
        type: String,
        default: ''
      }
    },
    watch: {
      roleUser:{
        immediate: true,
        handler(newVal) {
          this.userAdmin = RoleManagement.isAdmin(newVal);
          this.doFilterTabs();
        }
      }
    },
    data() {
      return {
        activeTab: 0,
        tabs: [
          { title: 'Book', route: 'BookView', isAdmin: false },
          { title: 'Admin', route: 'AdminView', isAdmin: true},
          { title: 'History', route: 'HistoryView', isAdmin: false},
          { title: 'Profile', route: 'ProfileMember', isAdmin: false}
        ],
        tabsFiltered: [],
        userAdmin: false,
      };
    },
    methods: {
      doRoute(route) {
        this.$router.push({ name: route });
      },
      doFilterTabs() {
        if (!this.userAdmin) {
          this.tabsFiltered = this.tabs.filter(tab => !tab.isAdmin);
        } else {
          this.tabsFiltered = this.tabs;
        }
        this.setActiveTabFromRoute()
      },
      setActiveTabFromRoute() {
        const currentRouteName = this.$route.name;
        const index = this.tabsFiltered.findIndex(tab => tab.route === currentRouteName);
        this.activeTab = index !== -1 ? index : 0;
      }
    },
  };
  </script>
  