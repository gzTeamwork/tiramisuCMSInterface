/* * @Author: Zicokuo * @Date: 2017-11-29 22:29:38 * @Last Modified by: Zicokuo * @Last Modified time: 2017-11-30 01:57:56
*/
<template>
  <div class="user_logout" style="max-width: 600px;margin:auto">
    <el-form ref="form" :model="registerForm" label-width="120px">
      <!--用户注册-->
      <h1>用户注册</h1>
      <el-form-item label="注册账户" prop="nick_name">
        <el-input v-model="registerForm.account" placeholder="可以输入登录账户(邮箱或手机号).."></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="registerForm.nick_name" placeholder="我们怎么称呼你?"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="registerForm.email" placeholder="常用邮箱.."></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input type="password" v-model="registerForm.password" placeholder="请输入至少6位的密码.." min="6" max="10"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input type="password" v-model="registerForm.repassword" placeholder="请输入至少6位的密码.." min="6" max="10"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="registerForm.phone" placeholder="请输入手机号.." min="11" max="=11"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" v-on:click="registerSubmit">提交注册</el-button>
        <el-button type="danger" v-on:click="resetForm">重设</el-button>
        <el-button type="primary" v-on:click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import _ from "lodash";

  export default {
    name: "user_logout",
    data() {
      return {
        registerForm: {
          nick_name: "Azusakuo",
          account: "13828471634",
          password: "123456",
          repassword: "123456",
          phone: "13828471634",
          email: "21520993@qq.com"
        }
      };
    },
    // 验证规则
    rules: {
      nick_name: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        },
      ]
    },
    components: {},
    watch: {
      "form.password": function (password) {
        this.passwordChange(password);
      }
    },
    mounted() {},
    methods: {
      passwordChange: _.debounce(function (e) {
        console.log("简易加密->" + bpw + ",原密码->" + e);
        this.loginForm.password = bpw;
      }, 500),
      //注册跳转
      navigator: function (url) {
        this.method = "register";
        this.$router.push({
          path: url
        });
      },
      //表单重设
      resetForm: function () {
        this.registerForm = {
          account: "",
          password: "",
          repassword: "",
          phone: ""
        };
      },
      //登录表单提交
      loginSubmit: function (event) {
        let vm = this;
        if (event.isTrusted) {
          //    todo 表单验证,需要分离
          if (this.loginForm.account.length < 3) {
            this.$notify({
              title: "警告",
              message: "请输入正确的登录账户",
              type: "warning"
            });
            return false;
          }
          let api_url = vm.$getUrl("adminUrl") + "user/api_user_login";
          this.$http
            .get(api_url, {
              params: this.loginForm
            })
            .then(
              res => {
                //  TODO: 用户密码加密传输,不能明码传输
                console.log(res.body.msg);
                if (res.body.code === 1) {
                  vm.$notify({
                    title: "成功",
                    message: res.body.data.nick_name + "登录成功!",
                    type: "success"
                  });
                  let user = res.body.data;
                  user.isLogin = true;
                  vm.$store.dispatch("USER_UPDATE", user);
                  vm.$cache("user_info", user);
                  //  登录成功跳转
                  vm.$router.push({
                    path: "/admin/index"
                  });
                }
                console.log(res);
              },
              function (res) {
                vm.$notify({
                  title: "警告",
                  message: "登录失败,请重试",
                  type: "warning"
                });
              }
            );
        }
      },
      //注册表单提交
      registerSubmit: function (event) {
        let vm = this;
        vm.$http
          .get(vm.$getUrl("adminUrl") + "user/api_user_register", {
            params: vm.registerForm
          })
          .then(success_res => {
            console.log(success_res);
            if (success_res.body.code == 1) {
              vm.$message.success(success_res.body.msg);
            } else {
              vm.$message.error(success_res.body.msg);
            }
          })
          .then(error_res => {
            console.log(error_res);
          });
      }
    }
  };
</script>
<style scoped>

</style>