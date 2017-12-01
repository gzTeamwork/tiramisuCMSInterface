/*
 * @Author: Zicokuo 
 * @Date: 2017-11-19 01:38:00 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-12-01 19:06:34
 */

//	user-router
let rootUrl = "/admin/user/";
export default {
  path: "user",
  title: "用户",
  component: () => import("../template.vue"),
  children: [
    {
      name: "admin_user_manager",
      url: rootUrl + "manager",
      title: "用户管理",
      path: "manager*",
      component: () => import("./user_manager.vue"),
      meta: {
        pageTitle: "用户管理"
      },
      isMenu: true
    },
    {
      name: "admin_user_login",
      url: rootUrl + "login",
      title: "用户登录",
      path: "login*",
      component: () => import("./user_login.vue"),
      meta: {
        pageTitle: "用户登录"
      },
      isMenu: false
    },
    {
      name: "admin_user_register",
      url: rootUrl + "register",
      title: "用户登录",
      path: "register*",
      component: () => import("./user_register.vue"),
      meta: {
        pageTitle: "用户登录"
      },
      isMenu: false
    }
  ]
};
