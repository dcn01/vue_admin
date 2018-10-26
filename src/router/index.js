import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve),
        meta: { title: '404' },
        hidden:true
    },
    {
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve),
        meta: { title: '403' },
        hidden: true
    },
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve),
        hidden:true
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '个人信息' },
        redirect: '/dashboard',
        children:[
            {
                path: '/dashboard',
                component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                meta: { title: '个人信息' }
            },

        ]
    },

];

export const asyncRouterMap = [
    {
        path: '/password',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                meta: { title: '密码管理',roles:['admin']}
            }
        ]
    },

    {
        path: '/tabs',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: 'tab选项卡' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Tabs.vue'], resolve),
                meta: { title: 'tab选项卡' }
            }

        ]
    },
    {
        path: '/form',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '表单相关' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                meta: { title: '基本表单' }
            },
            {
                path: 'page',
                component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                meta: { title: '三级菜单' },
                children:[
                    {
                        path: 'editor',
                        component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                        meta: { title: '富文本编辑器' }
                    },
                    {
                        path: 'markdown',
                        component: resolve => require(['../components/page/Markdown.vue'], resolve),
                        meta: { title: 'markdown编辑器' }
                    }
                ]
            },
            {
                path: 'upload',
                component: resolve => require(['../components/page/Upload.vue'], resolve),
                meta: { title: '文件上传' }
            }

        ]
    },
    {
        path: '/icon',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自定义图标' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Icon.vue'], resolve),
                meta: { title: '自定义图标' }
            }

        ]
    },

    {
        path: '/charts',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: 'schart图表' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                meta: { title: 'schart图表' }
            }

        ]
    },
    {
        path: '/drag',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '拖拽列表' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/DragList.vue'], resolve),
                meta: { title: '拖拽列表' }
            }

        ]
    },

    {
        path: '/permission',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '权限管理' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Permission.vue'], resolve),
                meta: { title: '权限测试',roles:['admin'] }
            },
            {
                path: '404',
                component: resolve => require(['../components/page/404.vue'], resolve),
                meta: { title: '404' }
            }

        ]
    },

    {
        path: '*',
        redirect: '/404'
    }
];

export default new Router({
    routes:constantRouterMap
})
