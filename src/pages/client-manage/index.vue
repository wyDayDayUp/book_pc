<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="客户名称" label-width="80px" prop="userName">
            <el-input  v-model="fromData.userName"></el-input>
        </el-form-item>
        <el-form-item label="客户账号" label-width="80px" prop="userLoginName">
            <el-input v-model="fromData.userLoginName"></el-input>
        </el-form-item>
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
       <el-table-column  v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
    </i-table>
    <!-- <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item>
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
        <el-col :span="11">
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
        <el-col :span="11">
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
      </el-form-item>  
    </el-form>  
    </i-dialog> -->
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/client-manage.js'
export default {  
  name:'client-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       diglogTitle:'新增用户',
       fromData:{
         userName:'',
         userLoginName:'',
       },
       pageinfo:{
          pageNum:1,
          pageSize:5,
          userName:'',
          userLoginName:'',
          total:0,
       },
       toolba:[],
      col:[
        {label:'客户账号',prop:'userLoginName'},
        {label:'姓名',prop:'userName'},
        {label:'性别',prop:'userSex'},
        {label:'手机',prop:'userPhone'},
        {label:'客户邮箱',prop:'userMail'},
        {label:'身份证',prop:'userIdcard'},
      ],
      tableData:[
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
      ],
      // dialogFromData:{
      //   account:'',
      //   name:'',
      //   role:'',
      //   sex:'',
      //   phone:'',
      //   pass:'',
      //   emai:'',
      //   identity:''
      // },
      // rules:{
      //   account:[
      //     { required: true, message: '请输入活动名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   name:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   sex:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   phone:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   emai:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   identity:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   pass:[
      //      { required: true, message: '请输入活动名称', trigger: 'blur' },
      //   ],
      //   role:[
      //     { required: true, message: '请选择活动区域', trigger: 'change' }
      //   ]
      // }
    }
  },
  mounted(){
    this. getCustomerList()
  },
  methods:{
    getCustomerList(){
      req('getCustomerList',{
        ...this.pageinfo
      }).then(res=>{
        console.log(res)
        if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
           this.tableData = res.data.list
          
          this.pageinfo.total = res.data.total
      })
    },
    search(){
      this.pageinfo.userLoginName = this.fromData.userLoginName
      this.pageinfo.userName = this.fromData.userName
      this.getCustomerList()
      // console.log(this.fromData)
    },
    reset(){
      this.pageinfo.userName =''
      this.pageinfo.userLoginName =''
      this.pageinfo.pageNum = 1
      this.getCustomerList()
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
      this.getCustomerList()
      console.log(value)
    },
    handleCurrentChange(value){
      this.pageinfo.pageNum = value
      this.getCustomerList()
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
          alert('submit!');
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
.i-table{
  margin-top: 50px;
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
        width: 30%;
        .el-form-item__content{
          margin-left: 25px;
        }
        .el-input__inner{
          width: 70%;
        }
      }
    }
  }
}
</style>