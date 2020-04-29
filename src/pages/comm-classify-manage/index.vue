<template>
  <div>
     <div class="top">
       <div class="Left">
         <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
        :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
          <el-table-column  v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
        </i-table>
       </div>
       <div class="Right">
          <h3>分类详情</h3>
       </div>
     </div> 
     <div class="botton">
        <div class="list_box">
          <el-tree :data="treedata" :props="defaultProps" 
          ref="tree"
          @current-change="test"
          @node-expand="Open"
          @node-collapse="Close"
          @node-click="nodeInfo"
          ></el-tree>
        </div>
        <div class="info">
           <el-form v-show="isshow" :model="dialogFromData">
           <!-- <el-row> -->
             <!-- <el-col :span="12"> -->
                <el-form-item label="名称" label-width="70px">
                  <el-input v-model="dialogFromData.cateName"></el-input>
                </el-form-item>
             <!-- </el-col>  -->
             <!-- <el-col :span="12"> -->
               <el-form-item label="备注" label-width="70px">
                  <el-input v-model="dialogFromData.cateComment"></el-input>
               </el-form-item>
             <!-- </el-col>  
           </el-row>   -->
         </el-form>
        </div>
     </div>
    <!-- <el-row>
      <el-col :span="6">
        <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
        :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
          <el-table-column  v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
        </i-table>
        <el-tree :data="treedata" :props="defaultProps" 
        ref="tree"
        @current-change="test"
        @node-expand="Open"
        @node-collapse="Close"
        @node-click="nodeInfo"
        ></el-tree>
      </el-col>
       <el-col :span="16">
         <h3>分类详情</h3>
         <el-form v-show="isshow" :model="dialogFromData">
           <el-row>
             <el-col :span="12">
                <el-form-item label="名称" label-width="70px">
                  <el-input v-model="dialogFromData.cateName"></el-input>
                </el-form-item>
             </el-col> 
             <el-col :span="12">
               <el-form-item label="备注" label-width="70px">
                  <el-input v-model="dialogFromData.cateComment"></el-input>
               </el-form-item>
             </el-col>  
           </el-row>  
         </el-form>
       </el-col>
    </el-row> -->


    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item tem label="名称" prop="cateName" label-width="70px">
         <el-input style="width:85%" v-model="dialogFromData.cateName"></el-input>
      </el-form-item>
      <el-form-item tem label="备注" prop="cateComment" label-width="70px">
         <el-input style="width:85%" v-model="dialogFromData.cateComment"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户账户" prop="account" label-width="100px">
            <el-input v-model="dialogFromData.account"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="用户姓名" prop="name" label-width="100px">
            <el-input v-model="dialogFromData.name"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户性别"  prop="sex" label-width="100px">
            <el-input v-model="dialogFromData.sex"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="手机号" prop="phone" label-width="100px">
            <el-input v-model="dialogFromData.phone"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="8">
          <el-form-item label="用户邮箱" prop="emai" label-width="100px">
            <el-input v-model="dialogFromData.emai"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="身份证" prop="identity" label-width="100px">
            <el-input v-model="dialogFromData.identity"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="8">
          <el-form-item label="用户密码" prop="pass" label-width="100px">
            <el-input v-model="dialogFromData.pass"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="11">
          <el-form-item label="用户角色" prop="role" label-width="100px">
            <el-select placeholder="请选择活动区域" v-model="dialogFromData.role" class="select">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>   -->
    </el-form>  
    </i-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/comm-classify-manage.js'
export default {  
  name:'comm-classify-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       isshow:false,
       diglogTitle:'新增分类',
       fromData:{},
       add:{},
       isNull:'',
      // //  节点信息
      //  nodeInfo:{},
      //  判断新增分类层级
       level:'1',
       type:'',
       pageinfo:{
          pageIndex:1,
          pagesize:5,
          total:0,
       },
       toolba:[
        {name:'新增',type:'primary',func:()=>{
           if(this.add.cateLevel === 2)
                return this.$message.warning('不能增加三级菜单')
          this.show = true,this.type = '1',this.diglogTitle = '新增分类',this.dialogFromData.cateName = '',
        this.dialogFromData.cateComment = ''
        }},
        {name:'修改',type:'primary',func:()=>{
          if(!this.$refs.tree.getCurrentNode())
            return this.$message.warning('请点击要修改的选项')
          this.show = true,this.type = '2',this.diglogTitle = '修改分类'}},
        {
          name:'删除',
          type:'primary',
          func:()=>{
              this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(this.$refs.tree.getCurrentNode().goodsCateId)
              req('deletemenu',{
                goodsCateId:this.$refs.tree.getCurrentNode().goodsCateId
              }).then(res=>{
                if(res.code!=1) return this.$message.error(res.msg)
                  this.$message.success('删除成功')
                  this.isshow = false
                  this.getTree()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        },
        {name:'刷新',type:'primary',func:()=>{this.show = true}},
      ],
      col:[
        {label:'账号',prop:'account'},
        {label:'姓名',prop:'name'},
        {label:'角色',prop:'role'},
        {label:'性别',prop:'sex'},
        {label:'手机',prop:'phone'},
        {label:'邮箱',prop:'email'},
        {label:'身份证',prop:'identity'},
      ],
      tableData:[
       
      ],
      dialogFromData:{
        cateName:'',
        cateComment:'',
      },
      rules:{
        cateName:[
          { required: true, message: '不能为空', trigger: 'blur' },
          
        ],
        cateComment:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ]
      },
      defaultProps: {
        children: 'childGoodsCateList',
        label: 'cateName'
      },
      treedata:[
        // {
        //   label: '传记',
        //   children: [
        //     {label: '名人传记'},
        //     {label:'帝王传记'},
        //     {label:'君候列传'}
        //   ]
        // }, 
        //  {
        //   label: '传记',
        //   children: [
        //     {label: '名人传记'},
        //     {label:'帝王传记'},
        //     {label:'君候列传'}
        //   ]
        // }, 
        //  {
        //   label: '传记',
        //   children: [
        //     {label: '名人传记'},
        //     {label:'帝王传记'},
        //     {label:'君候列传'}
        //   ]
        // }, 
      ]  
    }
  },
  mounted(){
    // this.pageinfo.total = this.tableData.length
  },
  created(){
    this.getTree()
  },
  methods:{
    // 获取树形的数据
    nodeInfo(){
      // if(this.$refs.tree.getCurrentNode().childGoodsCateList.length!=0)
      //   console.log(66)
      // console.log(this.$refs.tree.getCurrentNode())
      req('menuInfo',{
        goodsCateId:this.$refs.tree.getCurrentNode().goodsCateId
      }).then(res=>{
         console.log(res.data.cateName)
         if(res.code!=1) return console.log('查询失败')
            this.isshow = true
            this.dialogFromData.cateName = res.data.cateName
            this.dialogFromData.cateComment = res.data.cateComment
            console.log('查询成功！')
      })
    },
    Close(){
      this.level = '1'
      // console.log("我关闭了")
    },
    Open(){
      this.level = '2'
      // console.log("我打开了")
    },
    getTree(){
      req('gettreeList',{

      }).then(res=>{
        console.log(res.data)
        this.treedata = res.data
      })
    },
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

              
           
                if(this.level === '1'){
                req('addonemenu',{
                  cateName:this.dialogFromData.cateName,
                  cateComment:this.dialogFromData.cateComment,
                  cateLevel:this.level,
                }).then(res=>{
                  if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.success('新增成功')
                    this.show = false
                    this.getTree()
                })
              }else if(this.level === '2'){
                if(this.add.cateLevel === 2){
                  req('addonemenu',{
                  cateName:this.dialogFromData.cateName,
                  cateComment:this.dialogFromData.cateComment,
                  cateLevel:this.level,
                }).then(res=>{
                  if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.success('新增成功')
                    this.show = false
                    this.getTree()
                })
                }else{
                req('addtwomenu',{
                  cateName:this.dialogFromData.cateName,
                  cateComment:this.dialogFromData.cateComment,
                  cateLevel:this.level,
                  cateParent:this.$refs.tree.getCurrentNode().goodsCateId
                }).then(res=>{
                  if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.success('新增成功')
                    this.show = false
                    this.getTree()
                })
              }  
            }
          }else if(this.type === '2'){
            req('editMenu',{
              goodsCateId:this.$refs.tree.getCurrentNode().goodsCateId,
              cateName:this.dialogFromData.cateName,
              cateComment:this.dialogFromData.cateComment,
              version:this.$refs.tree.getCurrentNode().version
            }).then(res=>{
              if(res.code!=1) return this.$message.error(res.msg)
                  this.$message.success('修改成功')
                  this.show = false
                  this.isshow = false
                  this.getTree()
            })
          }
            

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    test(val){
      console.log(val)
      this.add = val
    },
  
  }
}
</script>

<style lang="scss" scoped>
.top{
  display: flex;
  align-items: center;
  margin-left: 35px;
  margin-top: 20px;
  width: 60%;
  border: 1px solid #ccc;
  .Left{
    border-right: 1px solid #ccc;
    width: 40%;
  }
  .Right{
    h3{
      margin-left: 20px;
      text-align: center;
      font-weight: normal;
      font-size: 24px;
    }
  }
}
.botton{
  display: flex;
  width: 60%;
   margin-left: 35px;
  border: 1px solid #ccc;
  border-top: 0px;
  .list_box{
  border-right: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  // margin-left: 110px;
  width: 40%;
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
 .info{
   margin-left: 30px;
   margin-top: 15px;
 }
}
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
/deep/ .el-tree{
  margin-left: 125px;
  margin-top: 15px;
  margin-bottom: 15px;
  .el-tree-node__label{
    font-size: 18px;
    margin-bottom: 6px;
    margin-top: 5px;
  }
  .el-tree-node__expand-icon{
    line-height: 20px;
  }
}
// h3{
//   margin-top: 20px;
//   font-weight: normal;
//   font-size: 24px;
//   margin-bottom: 20px;
// }
// .el-input{
//   width: 70%;
// }
// /deep/ .el-dialog{
//   width: 28%;
// }
</style>