<template>
  <div>
    <el-row>
      <el-col :span="8">
        <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
        @handleSelectionChange="handleSelectionChange">
        </i-table>
        <div class="list_box">
         <el-menu :default-active="activeIndex" @select="selectIndex">
             <el-menu-item v-for="(item) in menuList" :key="item.menuId" :index="item.menuId" @click="version(item.version)">
               <span slot="title">{{item.menuName}}</span>
             </el-menu-item>  
          </el-menu>
        </div>
      </el-col>
       <el-col :span="16">
         <h3>菜单详情</h3>
         <el-form :model="menuInfo" v-show="isshow">
          <el-row>
            <el-col :span="8">
              <el-form-item label="名称" label-width="70px" prop="menuName">
                <el-input v-model="menuInfo.menuName"></el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="备注" label-width="70px" prop="menuComment">
                <el-input v-model="menuInfo.menuComment"></el-input>
              </el-form-item>
            </el-col>  
          </el-row>
          <el-col :span="8">
            <el-form-item label="路由" label-width="70px" prop="menuRoute">
                <el-input v-model="menuInfo.menuRoute"></el-input>
            </el-form-item>
          </el-col> 
        </el-form>
       </el-col>
       
    </el-row>


    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    :validate-on-rule-change = "false"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item tem label="名称" prop="menuName" label-width="100px" >
         <el-input style="width:85%" v-model="dialogFromData.menuName"></el-input>
      </el-form-item>
      <el-form-item tem label="备注" label-width="100px" prop="menuComment">
         <el-input style="width:85%" v-model="dialogFromData.menuComment"></el-input>
      </el-form-item>
       <el-form-item tem label="路由" label-width="100px" prop="menuRoute">
         <el-input style="width:85%" v-model="dialogFromData.menuRoute"></el-input>
      </el-form-item>
    </el-form>   
    </i-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import axios from 'axios'
import qs from 'qs'
import req from '@/api/menu-manage.js'
export default {  
  name:'menu-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       activeIndex:'',
       type:'',
       isshow:false,
       show:false,
       diglogTitle:'新增菜单',
      //  选中菜单的ID
       checkedId:'',
      //  选中的版本号
       checkedversion:'',
       fromData:{},
       menuList:{},
       menuInfo:{
         menuName:'',
         menuComment:'',
         menuRoute:''
       },
       menu:[
         {name:'商品管理',id:"1"},
         {name:'商赢管理',id:"2"},
         {name:'商有管理',id:"3"},
         {name:'商用管理',id:"4"},
       ],
       toolba:[
        {name:'新增',type:'primary',func:()=>{this.show = true,this.type = '1',this.diglogTitle = '新增菜单'
          this.dialogFromData.menuName = ''
          this.dialogFromData.menuComment = ''
          this.dialogFromData.menuRoute = ''
        }},
        {name:'修改',type:'primary',func:()=>{this.show = true,this.type = '2',this.diglogTitle = '修改菜单'}},
        {
          name:'删除',
          type:'primary',
          func:()=>{
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              req('deletemenu',{
                menuIds:this.checkedId
              }).then(res=>{
                 if(res.code!=1) return this.$message.error('删除失败')
                  this.$message.success('删除成功')
                  this.getmennuList()
                  this.selectIndex(this.checkedId)
                  this.isshow = false
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        },
         {
           name:'刷新',
           type:'primary',
           func:()=>{
             this.$router.go(0)
           }
         },
      ],
      tableData:[
       
      ],
      dialogFromData:{
        menuName:'',
        menuRoute:'',
        isMenu:'',
        menuComment:'',
      },
      rules:{
        menuName:[
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        menuRoute:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        menuComment:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  created(){
    this.getmennuList()
  },
  methods:{
    // 获取菜单管理信息
    getmennuList(){
      req('listMenus').then(res=>{
        console.log(res)
        this.menuList = res.data
        console.log(this.menuList)
      })
    },
    version(v){
      this.checkedversion = v
    },
    // 选中的菜单
    selectIndex(id){
      console.log(id)
      this.checkedId = id
      this.isshow = true
      // axios({
      //    method:'post',
      //    url:`http://299z2526w7.wicp.vip/pc/menu/findMenuById`,
      //    data:qs.stringify({menuId:id}),
      //    headers:{'Content-Type':'application/x-www-form-urlencoded'}
      // }).then(res=>{
      //   if(res.data.code!=1) return this.$message.error('查询失败')
      //     this.$message.success('查询成功')
      // })
      req('getmenuList',{
        menuId:id
      }).then(res=>{
        console.log(res)
         if(res.code!=1) return false
           this.$message.success('查询成功')
           this.menuInfo.menuName = res.data.menuName
           this.menuInfo.menuComment = res.data.menuComment
           this.menuInfo.menuRoute = res.data.menuRoute
           this.dialogFromData.menuName = res.data.menuName
           this.dialogFromData.menuComment = res.data.menuComment
           this.dialogFromData.menuRoute = res.data.menuRoute
      })
    },
    // showmenu(data){
    //   this.isshow = true
    //   this.menuInfo.menuName = data.name
    // },
    search(){
      console.log(this.fromData)
    },
    handleSizeChange(value){
      console.log(value)
    },
    handleCurrentChange(value){
      console.log(value)
    },
    handleSelectionChange(cols){
      console.log(cols)
    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
    },
    outerVisible(){
      this.show = false
      this.$refs.form.resetFields();
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
            req('addmenu',{
              menuName:this.dialogFromData.menuName,
              menuComment:this.dialogFromData.menuComment,
              menuRoute:this.dialogFromData.menuRoute
            }).then(res=>{
              console.log(res)
               if(res.code!=1) return this.$message.error('新增失败')
               this.$message.success('新增成功')
               this.getmennuList()
               this.isshow = false
               this.show = false
            })
          }
          else{
            console.log(2)
            req('editmenu',{
              menuId:this.checkedId,
              menuName:this.dialogFromData.menuName,
              menuComment:this.dialogFromData.menuComment,
              menuRoute:this.dialogFromData.menuRoute,
              version:this.checkedversion
            }).then(res=>{
              if(res.code!=1) return this.$message.error('修改失败')
               this.$message.success('修改成功')
               this.getmennuList()
               this.isshow = false
               this.show = false
            })
          }  
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  width: 100%;
}
/deep/ .from{
   margin-top: 20px;
  .i-search{
     width: 100%;
    .el-form{
       width: 100%;
       display: flex;
       flex-wrap: wrap;
       justify-content:start;
      .el-form-item{
         margin-left: 25px;
        width: 20%;
        .el-form-item__content{
          margin-left: 25px;
        }
        .el-input__inner{
          width: 80%;
        }
      }
    }
  }
}
a{
  text-decoration: none;
  color: rgb(51, 51, 51);
}
 .list_box{
  display: flex;
  flex-wrap: wrap;
  margin-left: 110px;
  a{
    width: 100%;
    margin-bottom: 10px;
  }
  .el-menu{
    border-right: 0px;
    .el-menu-item{
      span{
        font-size: 16px;
      }
    }
  }
  
}
h3{
  margin-top: 20px;
  font-weight: normal;
  font-size: 24px;
  margin-bottom: 20px;
  margin-left: -65px;
}
/deep/ .el-dialog{
  width: 28%;
}
.el-input{
  width: 80%;
}
/deep/ .el-form-item__label{
  font-size: 16px;
}
</style>