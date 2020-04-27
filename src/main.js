// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'




Vue.use(ElementUI)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// window.addEventListener('load', function () {
//   // console.log(location.href)
//   // console.log(location.href.split('#')[1] != '/home/user-manage')
//   if(location.href.split('#')[1] != '/home/user-manage')
//     router.replace('/home')
//   // if(this.location.href != '/home/user-manage')
  
// })
router.beforeEach((to,from,next)=>{
  if(to.path == '/login') return next()
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  if(userInfo && userInfo.access_token ){
    next()
  }
  else{
    // if(to.path === '/login') return next()
     next('/login')
  }
})


