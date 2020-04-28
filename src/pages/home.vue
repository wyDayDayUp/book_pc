<template>
  <div>
    <el-container>
      <el-header height='80px'>
        <router-link to="">行走书店管理系统</router-link>
        <div class="user-info">
          <!-- <img :src="userInfo.imageUrl">
          <span>{{userInfo.userLoginName}}</span> -->
          <el-popover
            placement="top"
            :v-model='false'>
            <el-button   type="text" class="btn" @click="singOut">退出登录</el-button>
            <div slot="reference" class="user-info">
               <img :src="userInfo.imageUrl" v-show="userInfo.imageUrl">
               <img src="../assets/u18.jpg"  v-show="!userInfo.imageUrl">
               <span>{{userInfo.userLoginName}}</span>
            </div>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="handlerSelect" :default-active="activeIndex">
             <el-menu-item v-for="item in menuList" :key="item.menuRoute" :index="item.menuRoute">
               <span slot="title">{{item.menuName}}</span>
             </el-menu-item>  
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>  
</template>
<script>
import req from '@/api/home.js'
export default {
  name:'home',
  
  data() {
    return {
    activeIndex:'',
    userInfo:{},
     menuList: [
        // {title: '用户管理', path: '/home/user-manage'},
        // {title: '菜单管理', path: '/home/menu-manage'},
        // {title: '商品管理', path: '/home/comm-manage'},
        // {title: '首页轮播图管理', path: '/home/home-pic-manage'},
        // {title: '商品分类管理', path: '/home/comm-classify-manage'},
        // {title: '客户管理', path: '/home/client-manage'},
        // {title: '订单管理', path: '/home/order-manage'},
        // {title: '热门位商品管理', path: '/home/hot-comm-manage'},
        // {title: '门店信息管理', path: '/home/shop-info-manage'},
        // {title: '司机信息管理', path: '/home/driver-info-manage'}
      ]
    }
  },
  methods:{
    handlerSelect(key,path){
      console.log(key)
      // console.log(path)
       window.sessionStorage.setItem('Path',key)
      if(key != this.$route.path){
        this.$router.replace({path:key})
      }
      // var a = {path:key}
      // console.log(a)
    },
    singOut(){
      sessionStorage.clear('userInfo')
      sessionStorage.clear('Path')
      this.$router.push({path:'login'}).catch(err => {})
    }
  },
  mounted(){
    if(window.sessionStorage.getItem('Path'))
      this.activeIndex =  window.sessionStorage.getItem('Path')
    else 
      this.activeIndex =  '/home/user-manage'
    req('user').then(res=>{
      this.userInfo = res.data
       console.log(this.userInfo)
      if(!this.userInfo.hasOwnProperty("imageUrl"))
        this.userInfo.imageUrl = require('../assets/u18.jpg')  
        console.log(this.userInfo.userRole)
      if(this.userInfo.userRole === 1){
        req('listMenus').then(res=>{
          this.menuList = res.data
        })
        // this.menuList = [
        //   {title: '用户管理', path: '/home/user-manage'},
        //   {title: '菜单管理', path: '/home/menu-manage'},
        //   {title: '商品管理', path: '/home/comm-manage'},
        //   {title: '首页轮播图管理', path: '/home/home-pic-manage'},
        //   {title: '商品分类管理', path: '/home/comm-classify-manage'},
        //   {title: '客户管理', path: '/home/client-manage'},
        //   {title: '订单管理', path: '/home/order-manage'},
        //   {title: '热门位商品管理', path: '/home/hot-comm-manage'},
        //   {title: '门店信息管理', path: '/home/shop-info-manage'},
        //   {title: '司机信息管理', path: '/home/driver-info-manage'},
        //   {title: '111', path: '/test'}
        // ]
      }else if(this.userInfo.userRole === 2){
        this.menuList = [
          {menuName: '客户管理', menuRoute: '/home/client-manage'},
          {menuName: '订单管理', menuRoute: '/home/order-manage'},
        ]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
 .el-popover{
  .el-button{
     margin-left: 47px;
    /deep/ span{
      font-size: 16px;
    }
  }
}
.el-header{
  background-color: rgb(242, 242, 242);
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.router-link-active{
  text-decoration: none;
  color: rgb(86, 163, 253);
}
.user-info{
  display: flex;
  align-items: center;
  img{
    margin-right: 10px;
    display: block;
    height: 58px;
    height: 60px;
    border-radius: 50%;
  }
  span{
    color: rgb(86, 163, 253);
    font-size: 18px;
  }
}
.el-aside{
  height: calc(100%-80px);
}
.el-menu-item{
  text-align: center;
  font-size: 18px;
}
.el-main{
  padding: 0;
}
</style>