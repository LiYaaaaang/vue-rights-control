import Vue from 'vue'
import router from '../router'

Vue.directive('permission', {
  // inserted 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  // 第一个参数是当前使用指令的DOM元素，第二个参数是可以通过它来得到自定义指令要执行的操作
  inserted(el, binding) {
    const action = binding.value.action
    const effect = binding.value.effect
    // 在当前路由所对应的组件中，如何判断用户是否具备action的权限
    // 判断在当前路由下是否有action这个权限
    console.log(binding)
    console.log(router)
    console.log(router.currentRoute.meta)
    if (router.currentRoute.meta.indexOf(action) == -1) {
      // 判断是否有禁用
      if (effect === 'disabled') {
        el.disabled = true
        // element-ui要求，禁用一个元素后需要增加这个样式
        el.classList.add('is-disabled')
      } else {
        // 没有的话，则删除这个元素
        el.parentNode.removeChild(el)
      }
    }
  }
})
