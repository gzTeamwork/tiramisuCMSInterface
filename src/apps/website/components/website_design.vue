<template>
  <div class="designSubmit">
    <!-- 页面顶部 -->
    <div class="header"></div>
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <!-- part 套餐 -->
      <div class="part">
        <div class="part-label">
          <i class="el-icon-i--brush_fill" style="color:#d00600"></i>
          设计套餐
          <span class="small"> Design Package</span>
        </div>
        <div class="part-body">
          <el-row class="table" :gutter="1">
            <!-- 首列 -->
            <el-col :span="8" class="table-tr" >
              <div class="table-td">套餐选择服务项目</div>
              <div class="table-td" v-for="(item,index) in designServiceItems" :key="index">{{item}}</div>
              <div class="table-td">请选择套餐>>></div>
            </el-col>
            <div class="table-tr" v-for="(item,index) in designSetData" @click="designSetSelectHandle(index)" :key="index" :class="(form.designSet==index)?'active':''">
            <el-col :span="4" :class="'table-tr-'+index" >
              <div v-for="(row,key) in item" :class="'table-td table-td-'+key" :key="key">
                <template v-if="key == 'price'">
                  ¥{{row}}.00
                </template>
                <template v-else>
                  {{row}}
                </template>
              </div>
            </el-col>
            </div>
          </el-row>
        </div>
      </div>
      <!-- part 需求 -->
      <div class="part">
        <div class="part-label">
          <i class="el-icon-i--editor"></i>
          设计需求
          <span class="small"> Design Demand</span>
        </div>
        <div class="part-body">
          <!-- 商标名 -->
          <div class="item">
            <div class="label">Logo/商标名称
              <span class="isMust">(必填)</span>
            </div>
            <div class="item-body">

              <el-input class="input" v-model="form.name" placeholder="填写您的项目名称"></el-input>

            </div>
          </div>
          <!-- vi项 -->
          <div class="item">
            <div class="label">VI设计项
              <span class="isMust">(必填)</span>
            </div>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in viitems" :key="index" 
              v-model="item.checked" :checked="item.checked || false" :data-price='item.price' :disabled='item.disable || false'
                :label="item.name" border style="margin:.5em"></el-checkbox>
            </div>
          </div>
          <div class="item">
            <!-- Logo风格 -->
            <div class="label">喜欢的Logo风格
              <span class="isMust">(必填)</span>
            </div>
            <el-row class="item-body" :gutter="5">
              <el-radio-group v-model="form.logoStyle">
                <el-col :span="4" v-for="index in 6" :key="index" align="center">
                  <img :src="designStyle[index].imgUrl" alt="" style="margin:auto" />
                  <el-radio :label="designStyle[index].name">
                  </el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
          </div>
          <!-- 设计要求 -->
          <div class="item">
            <div class="label">设计要求
              <span class="isMust">(选填)</span>
            </div>
            <div class="item-body">
              <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.design_suggest" placeholder="请详细描述您的设计要求，有助高效完成logo设计" >
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- part 联系 -->
      <div class="part">
        <div class="part-label">
          <i class="el-icon-i--mobilephone_fill"></i>
          联系方式
          <span class="small"> Concat</span>
        </div>
        <div class="part-body">

          <!-- 客户名 -->
          <div class="item">
            <div class="label">您的姓名
              <span class="isMust">(必填)</span>
            </div>
            <div class="item-body">
              <el-input class="input" v-model="form.user_name" placeholder="请填写您的名字"></el-input>
            </div>
          </div>
          <!-- 电话 -->
          <div class="item">
            <div class="label">您的联系方式
              <span class="isMust">(必填)</span>
            </div>
            <div class="item-body">
              <el-input class="input" v-model="form.user_phone" placeholder="请填写您的联系方式(手机)"></el-input>
            </div>
          </div>
          <!-- 公司名 -->
          <div class="item">
            <div class="label">公司名字
              <span class="isMust">(必填)</span>
            </div>
            <div class="item-body">
              <el-input class="input" v-model="form.user_company" placeholder="请填写您的公司名"></el-input>

            </div>
          </div>
        </div>


      </div>
      <div style="margin:4em;width:100%;text-align:center">
            <el-button type="primary" class="submitBtn">提交</el-button>
            <el-button type="danger"class="submitBtn">重置</el-button>
      </div>
    <div><img :src="footerJPG" style="width:100%"/></div>
    </el-form>
  </div>
</template>

<script>
import { designIcon } from "../assets/imgs/design_active.png";
import design1 from "../assets/imgs/1.jpg";
import design2 from "../assets/imgs/2.jpg";
import design3 from "../assets/imgs/3.jpg";
import design4 from "../assets/imgs/4.jpg";
import design5 from "../assets/imgs/5.jpg";
import design6 from "../assets/imgs/6.jpg";
import footerJPG from "../assets/imgs/footer.jpg";
export default {
  name: "designSubmit",
  data() {
    return {
      designStyle: designStyles,
      designServiceItems: designServiceItems,
      designIcon: designIcon,
      form: {
        name: "测试",
        designSet: 0,
        logoStyle: 1,
        design_suggest: "",
        designViitems:"",
      },
      designSetData: designSetData,
      viitems: viitems,
      footerJPG:footerJPG,
    };
  },
  methods: {
    designSetSelectHandle(e){
      this.form.designSet = e;
      this.form.designViitems = designSetDatas[e]['vis'];
      let setVis = this.form.designViitems;
      for(let k=0;k<this.viitems.length;k++){
        this.viitems[k].checked = false;
      }
      for(let k = 0;k<setVis.length;k++){
        this.viitems[parseInt(setVis[k]-1)].checked = true;
      } 
  }}
};

function findArray(array, feature, all = true) {
  for (let index in array) {
    let cur = array[index];
    if (feature instanceof Object) {
      let allRight = true;
      for (let key in feature) {
        let value = feature[key];
        if (cur[key] == value && !all) return index;
        if (all && cur[key] != value) {
          allRight = false;
          break;
        }
      }
      if (allRight) return index;
    } else {
      if (cur == feature) {
        return index;
      }
    }
  }
  return -1;
}
let designSetDatas = [{
            name: 'Logo设计套餐A',
            vis: [1, 2, 3],
            price: 2680,
            summary: '2*2次标志设计提案\n在选定风格基础上免费修改4次方案\n赠送3个VIS项\n5-7个工作日内初稿\n预计工作周期：15天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'Logo设计套餐B',
            vis: [1, 2, 3, 4, 5, 6],
            price: 3200,
            summary: '2*3次标志设计提案\n在选定风格基础上免费修改6次方案\n赠送6个VIS项\n下单后5-7个工作日内初稿\n预计工作周期：21天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'VIS+12项VI设计套餐C',
            vis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            price: 4580,
            summary: '2*4次标志设计提案\n100%满意修改\n12个VIS项 下单后5-7个工作日内初稿\n预计工作周期：19天\n（包含初稿、修改、定稿、规范文件）'
        }, {
            name: 'Logo+20项VI设计套餐D',
            vis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21
            ],
            price: 5980,
            summary: '2*4次标志设计提案\n100%满意修改\n20个VIS项\n下单后5-7个工作日内初稿\n预计工作周期：24天\n（包含初稿、修改、定稿、规范文件）'
        }, ];
let designSetData = [
  {
    name: "Logo设计套餐A",
    one: "2*2次标志设计提案",
    two: "修改4次方案",
    three: "赠送3个VIS项",
    four: "5-7个工作日",
    fice: "15天",
    six: "初稿、修改、定稿、规范文件",
    price: 2680
  },
  {
    name: "Logo设计套餐B",
    one: "2*3次标志设计提案",
    two: "修改6次方案",
    three: "赠送6个VIS项",
    four: "5-7个工作日",
    fice: "21天",
    six: "初稿、修改、定稿、规范文件",
    price: 3200
  },
  {
    name: "VIS+12项VI设计套餐C",
    one: "2*4次标志设计提案",
    two: "100%满意修改",
    three: "12个VIS项",
    four: "5-7个工作日",
    fice: "19天",
    six: "初稿、修改、定稿、规范文件",
    price: 4580
  },
  {
    name: "Logo+20项VI设计套餐D",
    one: "2*4次标志设计提案",
    two: "100%满意修改",
    three: "20个VIS项",
    four: " 5-7个工作日",
    fice: "24天",
    six: "初稿、修改、定稿、规范文件",
    price: 5980
  }
];
let viitems = [
  {
    id: "1",
    name: "标志标准印刷色",
    price: 200
  },
  {
    id: "2",
    name: "企业辅助色（系）",
    price: 200
  },
  {
    id: "3",
    name: "标志标准化制图",
    price: 200
  },
  {
    id: "4",
    name: "标志墨稿、反白稿",
    price: 200
  },
  {
    id: "5",
    name: "标志最小比例限定",
    price: 200
  },
  {
    id: "6",
    name: "标志特定色彩展示",
    price: 200
  },
  {
    id: "7",
    name: "象征图形",
    price: 200
  },
  {
    id: "8",
    name: "标志与象征图形组合",
    price: 200
  },
  {
    id: "9",
    name: "标志与标准字组合",
    price: 200
  },
  {
    id: "10",
    name: "名片",
    price: 200
  },
  {
    id: "11",
    name: "信封",
    price: 200
  },
  {
    id: "12",
    name: "信纸",
    price: 200
  },
  {
    id: "13",
    name: "PPT模板",
    price: 200
  },
  {
    id: "14",
    name: "工号牌",
    price: 200
  },
  {
    id: "15",
    name: "工作证",
    price: 200
  },
  {
    id: "16",
    name: "标识牌",
    price: 200
  },
  {
    id: "17",
    name: "合同书规范",
    price: 200
  },
  {
    id: "18",
    name: "便签",
    price: 200
  },
  {
    id: "19",
    name: "标识伞",
    price: 200
  },
  {
    id: "20",
    name: " 广告衫",
    price: 200
  }
];
let designServiceItems = ["设计提案", "修改方案", "VI服务项", "初稿日程", "预计工作周期", "备注"];
let designStyles = [
  {},
  {
    imgUrl: design1,
    name: "图标+标准字体"
  },
  {
    imgUrl: design2,
    name: "图标+设计字体"
  },
  {
    imgUrl: design3,
    name: "单字体设计"
  },
  {
    imgUrl: design4,
    name: "单图标设计"
  },
  {
    imgUrl: design5,
    name: "图文融合"
  },
  {
    imgUrl: design6,
    name: "图标包含文字"
  }
];
</script>
<style lang='sass' scope>
  @import '../assets/sass/website_design.scss'
</style>