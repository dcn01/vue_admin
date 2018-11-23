<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">王大爷的后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <div v-show="isShow" class="login-error">
                    <div class="error-info">账户名或登录密码不正确</div>
                </div>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-checkbox  class="remember_me" v-model="ruleForm.remember" >记住我</el-checkbox>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>


    export default {
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    remember:false
                },
                isShow:false,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data= {
                            username: this.ruleForm.username,
                            password:this.ruleForm.password,
                            remember:this.ruleForm.remember
                        };
                       this.postRequest('/sys/login',data,null).then(this.loginInfoSucc);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loginInfoSucc(res) {
                if (res.ret && res.data) {
                    this.$store.commit('SET_TOKEN',res.data);
                    this.$router.push('/');
                }else {
                    this.ruleForm.username='';
                    this.ruleForm.password='';
                    this.isShow=true;
                }


            }
        }
    }
</script>

<style scoped>

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
    .login-error {
        height: 20px;
        margin-bottom: 10px;
    }
    .error-info {
        line-height: 20px;
        text-align: center;
        background: #eee;
        color: red;
    }
    .remember_me {
        text-align: center;
        padding-bottom: 20px;

    }
</style>
