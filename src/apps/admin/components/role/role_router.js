/*
 * @Author: Zicokuo 
 * @Date: 2017-11-26 18:51:27 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-29 14:36:26
 */


//	role-router
let rootUrl = '/admin/role/';
export default {
  path: "role",
  title: "角色",
  component: () => import("../components/template.vue"),
  children: [
    {
      name: "role_manager",
      url: rootUrl + "manager",
      title: "角色管理",
      path: "manager*",
      component: () => import("../components/role/role_manager.vue"),
      meta: {
        pageTitle: "角色管理"
      },
      isMenu: true
    }
  ]
};
