import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from './store'

Vue.use(Router)

const userRule = {
  path: '/users',
  component: Users
}
const roleRule = {
  path: '/roles',
  component: Roles
}
const goodRule = {
  path: '/goods',
  component: GoodsList
}
const categoryRule = {
  path: '/categories',
  component: GoodsCate
}
// 字符串和路由规则的映射关系
const ruleMapping = {
  users: userRule,
  roles: roleRule,
  goods: goodRule,
  categories: categoryRule
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 在路由跳转的时候判断是否有token或者token是否还有效
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      console.log(1111111)
      next('/login')
    } else {
      next()
    }
  }
})

export function initDynamicRoutes() {
  // 根据二级权限,对路由规则进行动态添加
  console.log(router)
  const currentRoutes = router.options.routes
  const rightList = store.state.rightList
  console.log(rightList)
  rightList.forEach(item => {
    item.children.forEach(secondRight => {
      console.log(secondRight)
      // secondRight 二级权限信息 ruleMapping 路由和字符串的映射
      const temp = ruleMapping[secondRight.path]
      console.log(temp)
      // 把二级权限下的权限赋值给当前路由规则下的元数据，方便在自定义指令中拿到
      temp.meta = secondRight.rights
      currentRoutes[2].children.push(temp)
    })
    console.log(currentRoutes)
  })
  router.addRoutes(currentRoutes)
  console.log(router)
}

export default router
