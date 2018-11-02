<template>
    <div class="wrapper">
        <v-head></v-head>
        <sidebar-index class="sidebar-container"></sidebar-index>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList" :exclude="noCache">
                        <router-view v-if="isRouterAlive"></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import SidebarIndex from './sidebar/index'

    export default {
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                tagsList: [],
                collapse: false,
                isRouterAlive: true
            }
        },
        computed:{
            noCache() {
                return this.$store.getters.noCacheName
            }
        },
        components: {
            vHead, vSidebar, vTags, SidebarIndex
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>
