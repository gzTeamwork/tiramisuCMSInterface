<template>
  <div class="design_config tiramisu">
    <h3 class="line-label">
      LOGO设计小程序设置
    </h3>
    <div class="part">
      <div class="part-label">
        VI项设置
        <el-button-group style="margin-left:2em;">
          <el-button type="primary" size="mini" @click="showNewViHandle">
            <i class="el-icon-i--add"></i>
            增加VI项
          </el-button>
          <el-button type="danger" size="mini">
            <i class="el-icon-i--close"></i>
            批量删除
          </el-button>
        </el-button-group>
        <div class="part" ref="newViitemPart" v-if="newViitem.isShow||false">
          <div class="part-label">
            新建VI项目
            <el-form v-model="newViitem.form">
              <el-form-item v-for="(item,index) in newViitem.form" :key="index">
                <el-form-item :label="index">
                  <el-input :v-model="item"></el-input>
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "design_config",
  data() {
    return {
      ViitemTemplate: {
        name: "",
        title: "",
        summary: "",
        price: ""
      },
      //  新vi项
      newViitem: {
        form: {},
        isShow: false
      }
    };
  },
  mounted() {
    let vm = this;
    this.newViitem.form = this.ViitemTemplate;
    //  初始化数据
  },
  methods: {
    //  显示新vi表单
    showNewViHandle() {
      //  清空旧信息
      if (this.showNewViHandle.isShow) {
        this.newViitem.form = this.ViitemTemplate;
      }
      this.newViitem.isShow = this.newViitem.isShow ? false : true;
    }
  }
};
</script>
<style scope>
.design_config {
}
</style>