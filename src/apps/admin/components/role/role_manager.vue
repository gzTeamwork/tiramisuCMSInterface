<template>
    <div class="role_manager">
        <h3>角色管理</h3>
        <el-row :gutter="24">
            <!-- 用户角色列表 -->
            <el-col :span="16">
                 
            </el-col>
            <!-- 角色列表 -->
            <el-col :span="8">
                el-table
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "role_manager",
  data() {
    return {
      uers_list: {
        formData: []
      },
      role_list: {
        formData: []
      }
    };
  },
  method: {},
  beforeMount() {
    // TODO:表单数据初始化
  }
};
</script>

<style scope>

</style>