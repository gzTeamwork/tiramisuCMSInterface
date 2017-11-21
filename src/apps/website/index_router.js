const index_router = {
    icon: 'el-icon-i--homepage_fill',
    title: '站点入口',
    name: 'index_router',
    path: '',
    component: {
        template: '<keep-alive><router-view></router-view></keep-alive>'
    },
    children: [{
            title: '设计需求提交',
            name: 'single_design_submit',
            path: 'design',
            meta: {
                pageTitle: '设计需求提交'
            },
            component: () =>
                import ('./components/website_design.vue')
        },
        {
            title: '站点首页',
            name: 'website_index',
            path: '',
            meta: {
                pageTitle: '站点首页'
            },
            component: () =>
                import ('./components/index.vue')
        }
    ]
}
export default index_router