<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="司机编号" label-width="80px" prop="userCode" class="input">
            <el-input  v-model="fromData.userCode"></el-input>
        </el-form-item>
        <el-form-item label="司机姓名" label-width="80px" prop="userName" class="input">
            <el-input v-model="fromData.userName"></el-input>
        </el-form-item>
        <el-form-item label="所在省份" class="selecta"> 
          <el-select v-model="fromData.driverProvinceCode" placeholder="请选择所在省份" label-width="80px" @change="change" >
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
            <el-option v-for="item in TreeAreas" :key="item.areaNameId" :label="item.areaName" :value="item.areaNameId"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所在城市" class="selectb">
          <el-select v-model="fromData.driverCityCode" placeholder="请选择所在城市" label-width="80px" @change="changeCity"  @focus = "test">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
            <el-option v-for="item1 in TreeCity" :key="item1.areaNameId" :label="item1.areaName" :value="item1.areaNameId"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所在地区" class="selectc">
          <el-select v-model="fromData.driverRegionCode" placeholder="请选择所在地区" label-width="80px"  @chang="changeRegion" @focus = "test1">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
            <el-option v-for="item2 in TreeRegion" :key="item2.areaNameId" :label="item2.areaName" :value="item2.areaNameId"></el-option>
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
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="司机姓名" prop="userName" label-width="100px">
            <el-input v-model="dialogFromData.userName"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="联系电话" prop="userPhone" label-width="100px">
            <el-input v-model="dialogFromData.userPhone"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="司机账号"  prop="userLoginName" label-width="100px">
            <el-input v-model="dialogFromData.userLoginName"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="密码" prop="userPassword" label-width="100px">
            <el-input v-model="dialogFromData.userPassword" type="password">></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="身份证号" prop="userIdcard" label-width="100px">
            <el-input v-model="dialogFromData.userIdcard"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="所在省份" prop="driverProvinceCode" label-width="100px">
            <el-select placeholder="请选择所在省份" v-model="dialogFromData.driverProvinceCode" class="select" @change="change">
              <!-- <el-option label="广东" value="广东"></el-option>
              <el-option label="北京" value="北京"></el-option> -->
               <el-option v-for="item in TreeAreas" :key="item.areaNameId" :label="item.areaName" :value="item.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="所在城市" prop="driverCityCode" label-width="100px">
            <el-select placeholder="请选择所在城市" v-model="dialogFromData.driverCityCode" class="select" @change="changeCity" @focus = "test2">
              <!-- <el-option label="潮州" value="潮州"></el-option>
              <el-option label="汕头" value="汕头"></el-option> -->
               <el-option v-for="item1 in TreeCity" :key="item1.areaNameId" :label="item1.areaName" :value="item1.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
        <el-col :span="11">
          <el-form-item label="所在地区" prop="driverRegionCode" label-width="100px">
            <el-select placeholder="请选择所在地区" v-model="dialogFromData.driverRegionCode" class="select" @chang="changeRegion" @focus = "test3"> 
              <!-- <el-option label="湘桥区" value="湘桥区"></el-option>
              <el-option label="潮安区" value="潮安区"></el-option> -->
               <el-option v-for="item2 in TreeRegion" :key="item2.areaNameId" :label="item2.areaName" :value="item2.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>
       <el-form-item>
        <el-col :span="11">
          <el-form-item label="头像上传" prop="" label-width="100px">
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

    <!-- 司机详情对话框 -->
    <el-dialog
    title="司机详情"
    :visible.sync="driverdialogVisible"
    width="50%">
    <el-table
    border
    :data="drivertableData"
    style="width: 100%">
    <el-table-column v-for="(item, index) in drivercol" :key="index" :label="item.label" :prop="item.prop" align="center"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="infoclose">取 消</el-button>
      <el-button type="primary" @click="infosubmit">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/driver-info-manage.js'
export default {  
  name:'driver-info-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       driverdialogVisible:false,
       diglogTitle:'新增司机',
       type:'',
       editId:'',
        IsChecked:[],
       choseType:'1',
       imgData:{
        imageCate:4,
         access_token:JSON.parse(sessionStorage.getItem('userInfo')).access_token
       },
        //  删除id数组
       idList:{},
       fileList:[],
       fromData:{
         userName:'',
         userCode:'',
         driverProvinceCode:'',
         driverCityCode:'',
         driverRegionCode:''
       },
       pageinfo:{
          pageNum:1,
          pageSize:5,
          userCode:'',
          userName:'',
          driverProvinceCode:'',
          driverCityCode:'',
          driverRegionCode:'',
          total:0,
       },
      toolba:[
        {name:'详情',type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要查询详情的选项！')
            else if(this.IsChecked.length != 1)
              return this.$message.warning('最多只能选择一条数据！')   
            this.driverdialogVisible = true
            req('findDriver',{
              userId:this.editId
            }).then(res=>{
              console.log(res)
               this.drivertableData.push(res.data)
            })
          }
        },
        {name:'新增',type:'primary',func:()=>{this.show = true,this.diglogTitle = '新增司机',this.type = '1',this.choseType = '2',this.TreeCity=[],this.TreeRegion =[]}},
        {
          name:'修改',
          type:'primary',
          func:()=>{
               if(this.IsChecked.length < 1)
                return this.$message.warning('请先勾选所要修改的数据！')
              else if(this.IsChecked.length != 1)
                return this.$message.warning('最多只能选择一条数据！') 
              this.diglogTitle = '修改司机信息'
              this.show = true
              this.type = '2'
              this.choseType = '2'
              req('findDriver',{
                userId:this.editId
              }).then(res=>{
                this.dialogFromData = res.data
                console.log(this.dialogFromData)
                if(res.code!=1) return console.log('查询失败')
                   console.log('查询成功！')
                    this.dialogFromData.userPassword = '******'
                   req('listAreasByParentCode',{
                     areaNameParentCode:res.data.driverProvinceCode
                   }).then(res=>{
                     this.TreeCity = res.data
                     req('listAreasByParentCode',{
                        areaNameParentCode:this.dialogFromData.driverCityCode
                     }).then(res=>{
                       this.TreeRegion = res.data
                     })
                   })
              })
          }
        },
        {
          name:'删除',
          type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
                return this.$message.warning('请先勾选所要删除的数据！')
             this.$confirm('此操作将永久删除所选中的账户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              req('deleteDriver',{
                userIds:this.idList.join(',')
              }).then(res=>{
                if(res.code!=1)  return this.$message.error('删除失败！')
                  this.$message.success('删除成功！')
                  this.pageinfo.pageNum = 1
                  this.getdriverList()
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
      drivercol:[
        {label:'司机姓名',prop:'userName'},
        {label:'联系电话',prop:'userPhone'},
        {label:'司机账号',prop:'userLoginName'},
        {label:'身份证号',prop:'userIdcard'},
        {label:'所在省',prop:'provinceName'},
        {label:'所在城市',prop:'cityName'},
        {label:'所在地区',prop:'regionName'},
      ],
      col:[
        {label:'司机编号',prop:'userCode'},
        {label:'姓名',prop:'userName'},
        {label:'手机',prop:'userPhone'},
        {label:'身份证',prop:'userIdcard'},
        {label:'账号',prop:'userLoginName'},
      ],
      drivertableData:[],
      tableData:[
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
        // {account:'1',name:'2',role:'3',sex:'4',phone:'5',email:'6',identity:'7'},
      ],
      dialogFromData:{
        userName:'',
        userPhone:'',
        userLoginName:'',
        userPassword:'',
        userIdcard:'',
        driverProvinceCode:'',
        driverCityCode:'',
        driverRegionCode:'',
        imageId:'',
      },
      rules:{
        userName:[
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        userPhone:[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ ,required: true, message: '不是有效的电话号码', trigger: 'blur' },
        ],
        userLoginName:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        userPassword:[
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        userIdcard:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证必须为18位', trigger: 'blur' },
          { pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
        ],
        driverProvinceCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        driverCityCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        driverRegionCode:[
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      TreeAreas:[],
      TreeCity:[],
      TreeRegion:[],
    }
  },
  mounted(){
    this.getdriverList()
    req('listAreasByParentCode').then(res=>{
      if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
         this.TreeAreas = res.data
         console.log(this.TreeAreas)  
    })
  },
  methods:{
    getdriverList(){
      req('getdriverList',{
        ...this.pageinfo
      }).then(res=>{
         console.log(res)
         if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
          this.tableData = res.data.list
           console.log(this.tableData)
          this.pageinfo.total = res.data.total  
      })
    },
    search(){
      this.pageinfo.pageNum = 1
      this.pageinfo.userCode = this.fromData.userCode
      this.pageinfo.userName = this.fromData.userName
      this.pageinfo.driverProvinceCode = this.fromData.driverProvinceCode
      this.pageinfo.driverCityCode = this.fromData.driverCityCode
      this.pageinfo.driverRegionCode = this.fromData.driverRegionCode
      this.getdriverList()
      // console.log(this.fromData)
    },
    reset(){
      this.pageinfo.pageNum = 1
      this.pageinfo.userCode = ''
      this.pageinfo.userName = ''
      this.fromData.driverProvinceCode = ''
      this.pageinfo.driverProvinceCode = ''
      this.fromData.driverCityCode = ''
      this.pageinfo.driverCityCode = ''
      this.pageinfo.driverRegionCode = ''
      this.fromData.driverRegionCode = ''
      this.getdriverList()
    },
    handleAvatarSuccess(res, file){
      // this.dialogFromData.headImage = URL.createObjectURL(file.raw);
      // console.log(this.dialogFromData.headImage)
      this.dialogFromData.imageId = res.data.imageId
      console.log(res)
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
      this.getdriverList()
      console.log(value)
    },
    handleCurrentChange(value){
      this.pageinfo.pageNum = value
      this.getdriverList()
      console.log(value)
    },
    handleSelectionChange(cols){
      console.log(cols)
      this.IsChecked = cols
      if(cols.length > 0)
      this.editId = cols[0].userId
      this.idList = []
      cols.forEach(item=>{
        this.idList.push(item.userId)
      })

    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
      this.fileList = []
      this.dialogFromData.imageId = ''
      this.choseType = '1'
      this.dialogFromData.driverProvinceCode = ''
      this.TreeCity = []
      this.TreeRegion = [] 
      
    },
    outerVisible(){
      this.show = false
      this.fileList = []
      this.$refs.form.resetFields();
      this.dialogFromData.imageId = ''
       this.dialogFromData.driverProvinceCode = ''
      this.choseType = '1'
      this.TreeCity = []
      this.TreeRegion = []
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
            req('addDriver',{
              ...this.dialogFromData
            }).then(res=>{
              if(res.code!=1)  return this.$message.error('新增失败！')
                 this.$message.success('新增成功！')
                 this.show = false 
                 this.pageinfo.driverProvinceCode = ''
                 this.pageinfo.driverCityCode = ''
                 this.pageinfo.driverRegionCode = ''
                 this.$refs.form.resetFields();
                 this.pageinfo.pageNum = 1
                 this.TreeCity = []
                 this.TreeRegion = []
                 this.choseType = '1'
                 this.getdriverList()
            })
          }else if(this.type === '2'){
             if(this.dialogFromData.userPassword === '******')
                  this.dialogFromData.userPassword = ''
            req('updateDrivers',{
              ...this.dialogFromData
            }).then(res=>{
               if(res.code!=1)  return this.$message.error('修改失败！')
                 this.$message.success('修改成功！')
                 this.show = false 
                 this.pageinfo.driverProvinceCode = ''
                 this.pageinfo.driverCityCode = ''
                 this.pageinfo.driverRegionCode = ''
                 this.pageinfo.pageNum = 1
                 this.TreeCity = []
                 this.TreeRegion = []
                 this.$refs.form.resetFields();
                 this.choseType = '1'
                 this.getdriverList()
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    change(val){
      this.TreeCity = []
      this.TreeRegion = [] 
      this.fromData.driverCityCode = ''
      this.fromData.driverRegionCode = '' 
      this.dialogFromData.driverCityCode = ''
      this.dialogFromData.driverRegionCode = ''  
      this.pageinfo.driverCityCode = ''
      this.pageinfo.driverProvinceCode = val
      if(this.choseType === '2')
        this.dialogFromData.driverProvinceCode = val
      req('listAreasByParentCode',{
        areaNameParentCode:val
      }).then(res=>{
          if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
           this.TreeCity = res.data
           console.log(this.TreeCity)
      })
      console.log(val)
    },
    changeCity(val){
      this.TreeRegion = [] 
      this.fromData.driverRegionCode = '' 
      this.dialogFromData.driverRegionCode = ''
      this.pageinfo.driverCityCode = val
      if(this.choseType === '2')
      this.dialogFromData.driverCityCode = val
      req('listAreasByParentCode',{
        areaNameParentCode:val
      }).then(res=>{
          if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
           this.TreeRegion = res.data
      })
    },
    changeRegion(val){
      this.pageinfo.driverRegionCode = val
      if(this.choseType === '2')
      this.dialogFromData.driverRegionCode = val
    },
     test(){
      if(!this.pageinfo.driverProvinceCode)
         return this.$message.warning('请先选择所在的省！')
    },
    test1(){
      if(!this.pageinfo.driverCityCode)
         return this.$message.warning('请先选择所在的城市！')
    },
     test2(){
      if(!this.dialogFromData.driverProvinceCode)
         return this.$message.warning('请先选择所在的省！')
    },
    test3(){
      if(!this.dialogFromData.driverCityCode)
         return this.$message.warning('请先选择所在的城市！')
    },
    infosubmit(){
      this.driverdialogVisible = false
      this.getdriverList()
    },
    infoclose(){
      this.driverdialogVisible = false
      this.getdriverList()
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  width: 100%;
}
.i-table{
  margin-top: 25px;
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
      
        .el-form-item__content{
          margin-left: 25px;
        }
        .selecta{
           width: 30%;
           margin-left: 32px;
           .el-select{
            width: 61%;
          }
        }
        .selectb{
          width: 30%;
          margin-left: 36px;
          .el-select{
            width: 61%;
          }
        }
        .selectc{
          width: 30%;
          margin-left: 25px;
          .el-select{
            width: 61%;
          }
        }
        .input{
          margin-left: 25px;
          width: 30%;
          .el-input{
            width: 70%;
          }
        }
      
    }
  }
}

</style>