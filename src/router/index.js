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
        meta: { title: '个人信息',icon: 'el-icon-lx-home' },
        redirect: '/dashboard',
        children:[
            {
                path: '/dashboard',
                component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                meta: { title: '个人信息' ,icon: 'el-icon-lx-home'}
            },

        ]
    },

];

export const asyncRouterMap = [
    {
        path: '/password',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件',icon: 'el-icon-lx-home' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Password.vue'], resolve),
                meta: { title: '密码管理',icon: 'el-icon-lx-home'}
            }
        ]
    },

    {
        path: '/tabs',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: 'tab选项卡' ,icon: 'el-icon-lx-home'},
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Tabs.vue'], resolve),
                meta: { title: 'tab选项卡' ,icon: 'el-icon-lx-home'}
            }

        ]
    },
    {
        path: '/form',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '表单相关' ,icon: 'el-icon-lx-home'},
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                meta: { title: '基本表单',icon: 'el-icon-lx-home'}
            },
            {
                path: 'page',
                component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                meta: { title: '三级菜单',icon: 'el-icon-lx-home'},
                children:[
                    {
                        path: 'editor',
                        component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                        meta: { title: '富文本编辑器',roles:['editor'],icon: 'el-icon-lx-home'}
                    },
                    {
                        path: 'markdown',
                        component: resolve => require(['../components/page/Markdown.vue'], resolve),
                        meta: { title: 'markdown编辑器',roles:['editor'],icon: 'el-icon-lx-home'}
                    }
                ]
            },
            {
                path: 'upload',
                component: resolve => require(['../components/page/Upload.vue'], resolve),
                meta: { title: '文件上传' ,icon: 'el-icon-lx-home'}
            }

        ]
    },
    {
        path: '/icon',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自定义图标' ,icon: 'el-icon-lx-home'},
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Icon.vue'], resolve),
                meta: { title: '自定义图标',roles:['editor'],icon: 'el-icon-lx-home'}
            }

        ]
    },

    {
        path: '/charts',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: 'schart图表',icon: 'el-icon-lx-home' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                meta: { title: 'schart图表',roles:['editor'],icon: 'el-icon-lx-home'}
            }

        ]
    },
    {
        path: '/drag',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '拖拽列表',icon: 'el-icon-lx-home' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/DragList.vue'], resolve),
                meta: { title: '拖拽列表' ,icon: 'el-icon-lx-home'}
            }

        ]
    },

    {
        path: '/permission',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '权限管理',roles:['admin'],icon: 'el-icon-lx-home' },
        children:[
            {
                path: 'index',
                component: resolve => require(['../components/page/Permission.vue'], resolve),
                meta: { title: '权限测试',roles:['admin'],icon: 'el-icon-lx-home'}
            },
            {
                path: '404',
                component: resolve => require(['../components/page/404.vue'], resolve),
                meta: { title: '404',roles:['admin'],icon: 'el-icon-lx-home' }
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
