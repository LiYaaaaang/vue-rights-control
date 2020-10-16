<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { initDynamicRoutes } from './router'
export default {
    name: 'app',
    created() {
        console.log(this.$router.currentRoute)
        initDynamicRoutes()
    },
}
</script>

