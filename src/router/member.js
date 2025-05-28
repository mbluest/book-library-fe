const member = [
    {
        path: '/create-member',
        name: 'CreateMember',
        role: [0],
        component: () => import(/* webpackChunkName: "about" */ '../views/member/CreateMemberView.vue')
    },
    {
        path: '/',
        name: "Login",
        role: [0],
        component: () => import(/* webpackChunkName: "about" */ '../views/member/LoginView.vue')
    },
    {
        path: '/profile-member',
        name: 'ProfileMember',
        role: [1, 2],
        component: () => import(/* webpackChunkName: "about" */ '../views/member/MemberView.vue')
    },
    {
        path: '/member-all',
        name: 'MemberAllView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/member/MemberAllView.vue')
    },
    {
        path: '/member/edit/:accountId',
        name: 'MemberEditView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/member/MemberEditView.vue')
    },
]

export default member;