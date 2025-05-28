const history = [
    {
        path: '/history',
        name: 'HistoryView',
        role: [1,2],
        component: () => import(/* webpackChunkName: "about" */ '../views/history/HistoryView.vue')
    },
]

export default history;