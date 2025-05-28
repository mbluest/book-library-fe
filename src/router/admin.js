const admin = [
    {
        path: '/admin',
        name: 'AdminView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminView.vue')
    },
]

export default admin;