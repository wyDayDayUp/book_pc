<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="用户名" label-width="60px" prop="userName">
            <el-input  v-model="fromData.userName"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="50px" prop="userLoginName">
            <el-input v-model="fromData.userLoginName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="userRole">
          <el-select v-model="fromData.userRole" placeholder="请选择" style="width:90%">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="店长" value="2"></el-option>
            <!-- <el-option label="司机" value="3"></el-option> -->
          </el-select>
        </el-form-item>
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
       <el-table-column  v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
    </i-table>
  
    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    :validate-on-rule-change = "false"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户账户" prop="userLoginName" label-width="100px">
            <el-input v-model="dialogFromData.userLoginName"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="用户姓名" prop="userName" label-width="100px">
            <el-input v-model="dialogFromData.userName"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户性别"  prop="userSex" label-width="100px">
            <el-select v-model="dialogFromData.userSex" placeholder="请选择" style="width:90%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
              <!-- <el-option label="司机" value="3"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="手机号" prop="userPhone" label-width="100px">
            <el-input v-model="dialogFromData.userPhone"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户邮箱" prop="userMail" label-width="100px">
            <el-input v-model="dialogFromData.userMail"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="身份证" prop="userIdcard" label-width="100px">
            <el-input v-model="dialogFromData.userIdcard"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户密码" prop="userPassword" label-width="100px" >
            <el-input v-model="dialogFromData.userPassword" type="password"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="11">
          <el-form-item label="用户角色" prop="userRole" label-width="100px">
            <el-select placeholder="请选择" v-model="dialogFromData.userRole" class="select">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="店长" value="2"></el-option>
               <!-- <el-option label="司机" value="3"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="头像上传" label-width="100px">
            <el-upload
            action="http://299z2526w7.wicp.vip/pc/image/uploadImage"
            name="imageFile"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :data="imgData">
            <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>  
          </el-form-item>
        </el-col>
      </el-form-item>  
    </el-form>  
    </i-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import Axios from 'axios'
import qs from 'qs'
import req from '@/api/user-manage.js'
export default {  
  name:'user-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       fileList:[],
       type:'',
      //  修改选中的Id
       editId:'',
       editversion:'',
       isChecked:[],
       diglogTitle:'新增用户',
       fromData:{
          userLoginName:'',
          userName:'',
          userRole:'',
       },
       imgData:{
        imageCate:4,
        access_token:JSON.parse(sessionStorage.getItem('userInfo')).access_token
       },
       editDataInfo:{},
      //查询数据
       pageinfo:{
          pageNum:1,
          pageSize:5,
          userLoginName:'',
          userName:'',
          userRole:'',
          total:0,
       },
      //  删除id数组
       idList:{},
      dialogFromData:{
        userLoginName:'',
        userName:'',
        userRole:'',
        userSex:'',
        userPhone:'',
        userPassword:'',
        userMail:'',
        userIdcard:'',
        imageId:'',
        version:''
      },
       toolba:[
        {name:'新增',type:'primary',func:()=>{this.show = true,this.diglogTitle = '新增用户',this.type = '1'
             for(var key in this.dialogFromData){
               if(key === 'userRole')
                this.dialogFromData[key] = ''
               else
                this.dialogFromData[key] = '' 
             }
        }},
        {name:'修改',type:'primary',func:()=>{
          if(this.isChecked.length < 1)
             return this.$message.warning('请先勾选所要修改的数据！')
          else if(this.isChecked.length != 1)
              return this.$message.warning('最多只能勾选一条数据！')    
          this.show = true,this.diglogTitle = '修改用户',this.type = '2'
          for( var key in this.editDataInfo){
              this.dialogFromData[key] = this.editDataInfo[key]
           }
           this.dialogFromData.userPassword = '******'
          //  if(this.dialogFromData.userSex === '男')
          //     this.dialogFromData.userSex = 1
          //   else
          //     this.dialogFromData.userSex = 2  
           console.log(this.dialogFromData)
           
          }
           
        },
        {
          name:'删除',
          type:'primary',
          func:()=>{
            if(this.isChecked.length < 1)
              return this.$message.warning('请先勾选所要删除的数据！')
              this.$confirm('此操作将永久删除该这些账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              req('deleteUser',{
                ids:this.idList.join(',')
              }).then(res=>{
                if(res.code!=1)  return this.$message.error('删除失败！')
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getuserInfo()
                this.idList=[]
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        },
      ],
      col:[
        {label:'用户编号',prop:'userId'},
        {label:'账号',prop:'userLoginName'},
        {label:'姓名',prop:'userName'},
        {label:'角色',prop:'userRole'},
        {label:'性别',prop:'userSex'},
        {label:'手机',prop:'userPhone'},
        {label:'邮箱',prop:'userMail'},
        {label:'身份证',prop:'userIdcard'},
      ],
      tableData:[
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
        // {userLoginName:'1',userName:'2',userRole:'3',userSex:'4',userPhone:'5',userMail:'6',userIdcard:'7'},
      ],
      rules:{
        userLoginName:[
          { required: true, message: '请输入账号名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
          {pattern:/^[0-9a-zA-Z]+$/, message: '不能带有汉字', trigger: 'blur'}
        ],
        userName:[
           { required: true, message: '请输入用户姓名', trigger: 'blur' },
           { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        userSex:[
           { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        userPhone:[
           { required: true, message: '请输入电话号码', trigger: 'blur' },
           {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ ,required: true, message: '不是有效的电话号码', trigger: 'blur' },
        ],
        userMail:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },          
           { pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,required: true, message: '不是有效的邮箱', trigger: 'blur' },
        ],
        userIdcard:[
           { required: true, message: '请输入身份证号', trigger: 'blur' },
           { min: 18, max: 18, message: '身份证必须为18位', trigger: 'blur' },
           { pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效的身份证号', trigger: 'blur' } 
        ],
        userPassword:[
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        userRole:[
          {required: true, message: '请选择角色', trigger: 'blur' }
        ],
      },
      
    }
  },
  mounted(){
    // this.pageinfo.total = this.tableData.length
    this.getuserInfo()
  },
  methods:{
    //获取用户信息
    handleAvatarSuccess(res, file){
      // this.dialogFromData.headImage = URL.createObjectURL(file.raw);
      // console.log(this.dialogFromData.headImage)
      this.dialogFromData.imageId = res.data.imageId
      console.log(res)
    },
    getuserInfo(){
    //   Axios.post(`http://299z2526w7.wicp.vip/pc/user/listUsers`,qs.stringify(this.pageinfo)).then(res=>{
    //   console.log(res.data.data.list)
    //   if(res.data.code!=1)
    //     console.log('查询失败')
    //     this.tableData = res.data.data.list
    //     this.tableData.forEach(item=>{
    //       if(item.userSex === 1)
    //         item.userSex = '男'
    //       else if(item.userSex === 2)
    //         item.userSex = '女'
    //     })
    //     this.pageinfo.total =  res.data.data.total
    //     console.log('查询成功') 
    // })
    
            req('listUsers',{
              ...this.pageinfo
            }).then(res=>{
              console.log(res)
              if(res.code!=1)
                console.log('查询失败')
                this.tableData = res.data.list
                this.tableData.forEach(item=>{
                  if(item.userSex === 1)
                    item.userSex = '男'
                  else if(item.userSex === 2)
                    item.userSex = '女'
                  if(item.userRole === 1)
                    item.userRole = '管理员'
                  else if(item.userRole ===2)
                    item.userRole = '店长'
                  // else if(item.userRole ===3)
                  //   item.userRole = '司机'  
                })
                this.pageinfo.total =  res.data.total
                console.log('查询成功') 
            })    
            
    },
    // 查询用户信息
    search(){
      console.log(this.fromData.userName)
      this.pageinfo.userLoginName = this.fromData.userLoginName
      this.pageinfo.userName = this.fromData.userName
      this.pageinfo.userRole = this.fromData.userRole
      this.pageinfo.pageNum = 1
      console.log(this.pageinfo)
      this.getuserInfo()
      console.log(this.fromData)
    },
    reset(){
      this.pageinfo.userName =''
      this.pageinfo.userLoginName =''
      this.pageinfo.pageNum = 1
      console.log(this.fromData)
      this.getuserInfo()
    },
    handleSizeChange(value){
      console.log(value)
      this.pageinfo.pageSize = value
      this.getuserInfo()
    },
    handleCurrentChange(value){
      console.log(value)
      this.pageinfo.pageNum = value
        this.getuserInfo()
    },
    handleSelectionChange(cols){
      console.log(cols)
       this.editDataInfo = cols[0]
      this.idList = []
       this.isChecked = cols
      cols.forEach(item=>{
        this.idList.push(item.userId)
        this.editversion = cols[0].version
       
      })
      // console.log(this.idList.join(','))
        if(cols){
        this.editId = this.idList.join(',')
       
        }

        // console.log(this.editversion)
        // console.log(this.editId)
      

    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
      this.fileList = []
      this.dialogFromData.imageId = ''
    },
    outerVisible(){
      this.show = false
      this.fileList = []
      this.dialogFromData.imageId = ''
      this.$refs.form.resetFields();
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
            if(this.dialogFromData.userSex === '男')
              this.dialogFromData.userSex = 1
            if(this.dialogFromData.userSex === '女')
              this.dialogFromData = 2  
            req('adduser',{
              ...this.dialogFromData
            }).then(res=>{
               if(res.code!=1) return this.$message.error(res.msg)
               this.$message.success('新增成功')
               this.getuserInfo()
               this.show = false
               this.dialogFromData.imageId = ''
            })
          }
          else if(this.type === '2'){
            if(this.dialogFromData.userPassword === '******')
                  this.dialogFromData.userPassword = ''
            if(this.dialogFromData.userRole === '管理员')
              this.dialogFromData.userRole = 1
            if(this.dialogFromData.userRole === '店长')  
              this.dialogFromData.userRole = 2
            if(this.dialogFromData.userSex === '男')
              this.dialogFromData.userSex = 1
            if(this.dialogFromData.userSex === '女')
               this.dialogFromData.userSex = 2    
            req('edituser',{
              ...this.dialogFromData,
              userId:this.editId,
              version:this.editversion
            }).then(res=>{
               if(res.code!=1){
                 this.dialogFromData.userPassword = "******"
                 return this.$message.error(res.msg)
               } 
               this.$message.success('修改成功')
               this.getuserInfo()
               this.show = false
               this.dialogFromData.imageId = ''
              
            })
          }


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
        .el-input__suffix-inner{
          margin-left: -110px;
        }
      }
    }
  }
}

</style>