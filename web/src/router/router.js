import Main from '@/views/main/main.vue';
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () =>
        import('@/views/login/login.vue')
};


export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import('@/views/error-page/500.vue')
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'test',
        meta: {
            title: '测试'
        },
        name: 'test_index',
        component: () =>
            import('@/views/test.vue')
    }, {
        path: 'ownspace',
        meta: {
            title: '个人中心'
        },
        name: 'ownspace_index',
        component: () =>
            import('@/views/own-space/own-space.vue')
    }, {
        path: 'home',
        meta: {
            title: '首页'
        },
        name: 'home_index',
        component: () =>
            import('@/views/home/home.vue')
    }
    ]
};

export const menuRouter = [
    {
        path: '/project',
        show: true,
        icon: 'project',
        meta: {
            title: '项目管理'
        },
        roles: ['admin', 'general'],
        name: 'project',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '项目管理'
            },
            name: 'project_index',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/project/project.vue')
        }]
    },
    {
        path: '/interface',
        show: true,
        icon: 'control',
        meta: {
            title: '接口管理'
        },
        name: 'interface',
        roles: ['admin', 'general'],
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '接口管理'
            },
            name: 'interface_index',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/interface/interface.vue')
        },{
            show: false,
            path: 'add',
            meta: {
                title: '添加接口'
            },
            name: 'interface_add',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/interface/interface_add_edit.vue')
        },{
            show: false,
            path: 'edit',
            meta: {
                title: '编辑接口'
            },
            name: 'interface_edit',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/interface/interface_add_edit.vue')
        },{
            show: false,
            path: 'success',
            meta: {
                title: '提示'
            },
            name: 'interface_success',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/interface/interface_success.vue')
        },{
            show: false,
            path: 'postman',
            meta: {
                title: '接口测试'
            },
            name: 'interface_postman',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/interface/interface_postman.vue')
        }]
    },
    {
        path: '/export',
        show: true,
        icon: 'export',
        meta: {
            title: '导出管理'
        },
        roles: ['admin', 'general'],
        name: 'export',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '导出管理'
            },
            name: 'export_index',
            roles: ['admin', 'general'],
            component: () =>
                import('@/views/export/export.vue')
        }]
    },
    {
        path: '/user',
        show: true,
        icon: 'team',
        meta: {
            title: '用户管理'
        },
        name: 'user',
        roles: ['admin'],
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '用户管理'
            },
            name: 'user_index',
            roles: ['admin'],
            component: () =>
                import('@/views/user/user.vue')
        }]
    },
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...menuRouter,
    page500,
    page403,
    page404
];