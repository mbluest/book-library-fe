<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row class="ma-2">
                    <v-col cols="3">
                        <v-btn
                            color="success"
                            @click="doManageBooks">
                            Manage Books
                        </v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn
                            color="secondary"
                            @click="doManageAuthors">
                            Manage Authors
                        </v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn
                            color="warning"
                            @click="doManageCategories">
                            Manage Categories
                        </v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn
                            color="error"
                            @click="doManageMembers">
                            Manage Member
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card class="mt-4">
                <v-tabs v-model="tab" align-tabs="center">
                <v-tab value="transaction">Transaction</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="transaction">
                        <admin-transaction-view/>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import AdminTransactionView from '@/views/admin/AdminTransactionView.vue';

export default {
  name: 'AdminView',
  components: {
    AdminTransactionView,
  },
  data() {
    return {
        tab: 'transaction',
        alert: {
            visible: false,
            type: "info",
            message: "Admin view loaded.",
        },
    };
  },
  methods: {
    doManageBooks() {
      this.$router.push({ name: 'BookManageView' });
    },
    doManageMembers(){
        this.$router.push({ name: 'MemberAllView' });
    },
    doManageCategories() {
        this.$router.push({ name: 'CategoriesView' });
    },
    doManageAuthors(){
        this.$router.push({ name: 'AuthorView' });
    }
  },
};
</script>