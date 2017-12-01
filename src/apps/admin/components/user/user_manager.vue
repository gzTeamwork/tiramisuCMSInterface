<template>
  <div class="user_manager">
    <h1>用户管理</h1>
    <template name="toolbar">
      <p>
        <el-button type="primary" icon="el-icon-i--right" size="mini" :disabled="tableSelected == 0" @click="batchFinished">批量完成
        </el-button>
        <el-button type="danger" icon="el-icon-i--empty" size="mini" :disabled="tableSelected == 0" @click="batchDeleted">批量删除
        </el-button>
        <el-button type="infor" icon="el-icon-i--" size="mini" :disabled="tableSelected == 0" @click="exportSubmits">导出成Excel</el-button>
        <el-button type="success" icon="el-icon-i--refresh" size="mini" @click="refreshTable">刷新</el-button>
      </p>
      <p> 共有{{tableTotals}}条项目,当前显示{{ listDatas.length || 0 }}条,已选择{{tableSelected.length || 0}}条</p>
    </template>
    <template name="table">
      <el-table :data="userList.formData" style="width: 100%" :default-sort="{prop: 'create_time', order: 'descending'}" @selection-change="handleSelectionChange"
        ref="designTable">
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: "user_manager",
    data() {
      return {
        userList: {}
      };
    },
    beforeMount() {
      let vm = this;
      vm.$http
        .get(vm.$cache("adminUrl") + "user/api_get_user_list")
        .then(success_res => {
          if (success_res.body.code == 1) {
            this.userList = success_res.body.data;
          }
        }, error_res => {

        });
    }
  };
</script>

<style scope>

</style>