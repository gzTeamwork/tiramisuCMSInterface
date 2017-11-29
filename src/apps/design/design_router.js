let root_url = "/admin/design";
const design_router = {
  title: "标志定制小程序管理",
  key: "design_router",
  path: "design",
  url: "/admin/design",
  component: {
    template: "<keep-alive><router-view></router-view></keep-alive>"
  },
  children: [
    {
      title: "小程序统计",
      url: root_url + "/index",
      path: "index",
      name: "design_index",
      component: () => import("./components/design_index.vue"),
      meta: {
        pageTitle: "小程序统计"
      },
      isMenu: true
    },
    {
      title: "客户申请",
      url: root_url + "/list",
      path: "list",
      name: "design_list",
      component: () => import("./components/design_submits.vue"),
      meta: {
        pageTitle: "客户申请"
      },
      isMenu: true
    },
    {
      title: "客户列表",
      url: root_url + "/user",
      path: "user",
      name: "design_user",
      component: () => import("./components/design_user.vue"),
      meta: {
        pageTitle: "客户列表"
      },
      isMenu: true
    },
    {
      title: "字段设置",
      url: root_url + "/config",
      path: "config",
      name: "design_config",
      component: () => import("./components/design_config.vue"),
      meta: {
        pageTitle: "字段设置"
      },
      isMenu: true
    },
    {
      title: "首页",
      url: root_url + "/index",
      path: "",
      name: "design_index",
      component: () => import("./components/design_index.vue"),
      meta: {
        pageTitle: "首页"
      }
    }
  ]
};
export default design_router;
