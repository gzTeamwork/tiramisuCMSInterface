<template>
    <div class="index">
        <p>Hello,Welcome to Tiramisu CMS Index..</p>
        <a href="/admin">管理后台</a>
        <router-link to="/admin/user/login">用户登录</router-link>
        <router-link to="/single/design">需求单页</router-link>
    </div>
</template>
<script>
    export default {
        name: 'index',
        data () {
            return {}
        },
        methods: {}
    }
</script>
<style scope>
    .index {
    }
</style>