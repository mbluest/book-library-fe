const book = [
    {
        path: '/books',
        name: 'BookView',
        role: [1,2],
        component: () => import(/* webpackChunkName: "about" */ '../views/book/BookView.vue')
    },
    {
        path: '/books/:bookId',
        name: 'BookDetailView',
        role: [1,2],
        component: () => import(/* webpackChunkName: "about" */ '../views/book/BookDetailView.vue')
    },
    {
        path: '/books/management',
        name: 'BookManageView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/book/BookManageView.vue')
    },
    {
        path: '/books/management/create',
        name: 'BookCreateView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/book/BookCreateView.vue')
    },
    {
        path: '/books/management/edit/:bookId',
        name: 'BookEditView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/book/BookEditView.vue')
    },
    {
        path: '/categories',
        name: 'CategoriesView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/categories/CategoriesView.vue')
    },
    {
        path: '/categories/edit/:categoryId',
        name: 'CategoriesEditView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/categories/CategoriesEditView.vue')
    },
    {
        path: '/categories/create',
        name: 'CreateCategoriesView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/categories/CreateCategoriesView.vue')
    },
    {
        path: '/author',
        name: 'AuthorView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/author/AuthorView.vue')
    },
    {
        path: '/author/create',
        name: 'CreateAuthorView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/author/CreateAuthorView.vue')
    },
    {
        path: '/author/edit/:authorId',
        name: 'AuthorEditView',
        role: [1],
        component: () => import(/* webpackChunkName: "about" */ '../views/author/AuthorEditView.vue')
    },
]

export default book;