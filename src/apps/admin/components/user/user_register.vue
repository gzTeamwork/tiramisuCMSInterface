/* * @Author: Azusakuo * @Date: 2017-12-01 14:17:36 * @Last Modified by: Azusakuo * @Last Modified time: 2017-12-01 14:34:22
*/

<template>
  <div class="user_register_form" style="max-width: 600px;margin:auto">
    <el-form ref="user_register_form" status-icon :model="registerForm" :rules="rules" label-width="120px">
      <!--用户注册-->
      <h1 style="text-align:center;">用户注册</h1>
      <el-form-item v-for="(item,index) in registerItems" :key="index" :label="item.label" :prop="item.key">
        <el-input v-model="registerForm[item.key]" :placeholder="item.placeholder||''" auto-complete="off" :type="item.inputType||'text'"></el-input>
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
let validateCreater = require("../../common/validate_creater");
export default {
  name: "user_register_form",
  data() {
    var checkAge = (rule, value, callback) => {
      callback(new Error(value));
    };
    return {
      registerForm: {
        nick_name: "",
        account: "",
        password: "",
        repassword: "",
        phone: "",
        email: ""
      },
      registerItems: [
        {
          key: "nick_name",
          label: "用户昵称",
          placeholder: "我们怎么称呼你?",
          inputType: "text"
        },
        {
          key: "account",
          label: "登录账户",
          placeholder: "可以输入登录账户(邮箱或手机号)..",
          inputType: "text"
        },
        {
          key: "password",
          label: "登录密码",
          placeholder: "",
          inputType: "password"
        },
        {
          key: "repassword",
          label: "再次输入密码",
          placeholder: "",
          inputType: "password"
        },
        {
          key: "phone",
          label: "联系方式",
          placeholder: "建议输入11位手机号..",
          inputType: "text"
        },
        {
          key: "email",
          label: "邮箱",
          placeholder: "常用邮箱..",
          inputType: "email"
        }
      ],
      // 验证规则
      rules: {
        //  昵称
        nick_name: [
          validateCreater.required("昵称是必须的"),
          validateCreater.between(3, 20)
        ],
        account: [
          validateCreater.required("账户是必须的"),
          validateCreater.between(3, 20)
        ],
        password: [
          validateCreater.required("密码是必须的"),
          validateCreater.between(3, 16)
        ],
        repassword: [
          validateCreater.required("请再次输入相同密码进行确认"),
          validateCreater.between(3, 16),
          validateCreater.custom((r, v, c) => {
            if (v !== this.registerForm.password) {
              c(new Error("两次输入的密码不相同"));
            } else {
              c();
            }
          })
        ],
        phone: [
          validateCreater.required("联系号码是必须的"),
          validateCreater.between(8, 11),
          validateCreater.isPhone()
        ],
        email: [validateCreater.required("请输入邮箱..")]
      }
    };
  },
  components: {},
  watch: {
    "form.password": function(password) {
      this.passwordChange(password);
    }
  },
  mounted() {},
  methods: {
    passwordChange: _.debounce(function(e) {
      console.log("简易加密->" + bpw + ",原密码->" + e);
      this.loginForm.password = bpw;
    }, 500),
    //注册跳转
    navigator: function(url) {
      this.method = "register";
      this.$router.push({
        path: url
      });
    },
    //表单重设
    resetForm: function() {
      this.registerForm = {
        account: "",
        password: "",
        repassword: "",
        phone: ""
      };
    },
    //注册表单提交
    registerSubmit: function(event) {
      let vm = this;
      //  表单验证
      vm.$refs["user_register_form"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      return;
      vm.$http
        .get(vm.$getUrl("adminUrl") + "user/api_user_register", {
          params: _.partition(vm.registerItems, "val")
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