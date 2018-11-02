<template>
    <div>
        <div class="tags" v-if="showTags">
            <ul>
                <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}"
                    :key="index">
                    <router-link :to="item.path" class="tags-li-title"
                                 @contextmenu.prevent.native="openMenu(item,$event)">
                        {{item.title}}
                    </router-link>
                    <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
                </li>
            </ul>
            <div class="tags-close-box">
                <el-dropdown @command="handleTags">
                    <el-button size="mini" type="primary">
                        标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu size="small" slot="dropdown">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li>刷新</li>
            <li>关闭</li>
            <li>关闭其他</li>
            <li>关闭所有</li>
        </ul>
    </div>


</template>

<script>
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                visible: false,
                top: 0,
                left: 0,
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                } else {
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll() {
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther() {
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                });
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route) {
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                });
                if (!isExist) {
                    if (this.tagsList.length >= 8) {
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command) {
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            openMenu(tag, e) {
                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left  // container margin left
                const offsetTop = this.$el.getBoundingClientRect().top  // container margin left
                const offsetWidth = this.$el.offsetWidth // container width
                const maxLeft = offsetWidth - menuMinWidth // left boundary
                const left = e.clientX - offsetLeft + 15 // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft
                } else {
                    this.left = left
                }
                this.top = e.clientY-offsetTop+10,
                    this.visible = true
            },
            closeMenu() {
                this.visible = false
            }

        },
        watch: {
            $route(newValue, oldValue) {
                this.setTags(newValue);
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }

        },
        created() {
            this.setTags(this.$route);
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    }
    .contextmenu li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
    }


</style>
