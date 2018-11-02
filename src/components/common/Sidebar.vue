<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                <template v-for="item in items">
                    <div v-if="!item.hidden&&item.children">
                        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
                            <el-menu-item :index="onlyOneChild.path" :key="onlyOneChild.path" >
                                <i :class="el-icon-lx-calendar"></i><span slot="title">{{ item.title }}</span>
                            </el-menu-item>
                        </template>
                        <el-submenu v-else ref="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="el-icon-lx-calendar"></i><span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="child in item.children" v-if="!child.hidden">
                                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i"
                                                  :index="threeItem.index">
                                        {{ threeItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </div>
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i"
                                                  :index="threeItem.index">
                                        {{ threeItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>


                    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
                            <el-menu-item :index="onlyOneChild.path" :key="onlyOneChild.path" >
                                <i :class="el-icon-lx-calendar"></i><span slot="title">{{ item.title }}</span>
                            </el-menu-item>
                    </template>
                </template>

        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                onlyOneChild: null
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            },
            items() {
                return this.$store.getters.permission_routers;
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            hasOneShowingChild(children, parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            }

        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
