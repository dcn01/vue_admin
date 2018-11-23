<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选查询条件" class="handle-select mr10">
                    <el-option key="1" label="账户描述" value="账户描述"></el-option>
                    <el-option key="2" label="账户" value="账户"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="add" class="handle-add" @click="handleAdd">添加</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="编号" sortable width="150">
                </el-table-column>
                <el-table-column prop="description" label="账户描述">
                </el-table-column>
                <el-table-column prop="username" label="账户">
                </el-table-column>
                <el-table-column prop="password" label="密码">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :page-size="10"
                               :total="tableTotal">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="修改日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.updateTime" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="账户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'password',
        inject:['reload'],
        data() {
            return {
                tableData: [],
                tableTotal: 1,  //数量
                currentPage: 1,
                totalCount: 10,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

                //编辑框
                editVisible: false,
                delVisible: false,
                form: {
                    id: '',
                    description: '',
                    username: '',
                    password: '',
                    remark: '',
                    createTime: null,
                    updateTime: null
                },
                idx: -1,
                title: '',
            }
        },
        mounted() {
            this.getData();
            this.$store.dispatch("updateNoCache",'');
        },
        methods: {
            
            // 分页导航
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.select_word==='') {
                    this.getData();
                } else {
                    this.search();
                }

            },
            getData() {
                const url = '/password/details?page=' + this.currentPage + "&rows=" + this.totalCount;
                this.getRequest(url).then(res => {

                    if (res.ret && res.data) {
                        this.tableData = res.data;
                        this.tableTotal = res.total;
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection=val;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    description: item.description,
                    username: item.username,
                    password: item.password,
                    remark: item.remark,
                    createTime: item.createTime,
                    updateTime: item.updateTime
                };
                this.editVisible = true;
                this.title = "编辑"
            },
            handleDelete(index, row) {
                this.delVisible=true;
                this.idx=index;
                const item=this.tableData[index];
                this.del_list.push(item.id);
            },
            handleAdd() {
                this.editVisible = true;
                this.title = "添加"
            },
            saveEdit: function () {

                let url ='';
                let params={};
                if (this.title==="编辑") {
                    url = '/password/update';
                    params = {
                        description: this.form.description,
                        username: this.form.username,
                        password: this.form.password,
                        id:this.form.id
                    }

                }else if (this.title==="添加") {
                    url = '/password/add';
                    params = {
                        description: this.form.description,
                        username: this.form.username,
                        password: this.form.password
                    };
                }else {
                    return;
                }

                this.postRequest(url, params, null).then(res => {
                        if (res.ret) {
                            this.editVisible=false;
                            this.$store.dispatch("updateNoCache",this.$route.matched[1].components.default.name);
                            this.reload();
                        }
                    }
                );

            },
            delAll: function(){

                const length=this.multipleSelection.length;
                console.log(this.multipleSelection);
                for (let i=0;i<length;++i) {
                    this.del_list.push(this.multipleSelection[i].id);
                }
                let idString=this.del_list.join(",");
                const params= {
                    idString:idString
                };
                this.deletePassword(params);
            },

            deleteRow(){
                let idString=this.del_list.join(",");
                const params= {
                    idString:idString
                };
                this.deletePassword(params);
            },

            deletePassword:function (params) {
                const url='/password/delete';
                this.postRequest(url,params,null).then(res=>{
                    if (res.ret) {
                        this.delVisible=false;
                        this.getData();
                        this.$message.success('删除成功');
                    }
                })
            },
            search:function () {
                let searchType;
                if (this.select_cate===''||this.select_cate==='账户描述') {
                    searchType=1
                }else {
                    searchType=2;
                }
                const params = {
                    searchType : searchType,
                    selectWord: this.select_word,
                    page: this.currentPage,
                    rows: this.totalCount
                };
                this.postRequest('/password/select',params,null).then(res=> {
                    if (res.ret && res.data) {
                        this.tableData = res.data;
                        this.tableTotal = res.total;
                    }
                })

            }

        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 130px;
    }

    .handle-add {
        float: right;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
</style>
