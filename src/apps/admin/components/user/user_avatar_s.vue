<template>
  <div class="tiramisu-text-center">
    <div class="userAvatarBox">
      <img :src="user.avatar" alt="userAvatar" class="tiramisu-avatar-s" />
      <p class="nickName">{{ user.nick_name }}</p>
      <el-button type="mini" size="mini" @click="userLogout">登出</el-button>
    </div>
  </div>
</template>
<script>
import avatar from "~/public-resource/images/user.png";

export default {
  data() {
    return {
      user: {}
    };
  },
  mounted: function() {
    console.log(avatar);
    this.user = this.$store.state.info;
    this.user.avatar = this.user.avatar || avatar;
  },
  methods: {
    userLogout() {
      let vm = this;
      vm
        .$confirm("是否进行用户登出操作?", "提示", {
          confirmButtonText: "登出",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          vm.$cache("userInfo", "", "", true);
          let userInfo = vm.$cache("user_info");
          userInfo.isLogin = false;
          vm.$cache("user_info", userInfo);
          location.reload();
          vm.$http
            .get(vm.$getUrl("adminUrl") + "user/api_user_logout", {
              params: userInfo
            })
            .then(success_res => {
              console.log(success_res);
            });
          this.$message({
            type: "success",
            message: "登出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    }
  }
};
</script>
<style scope>

</style>