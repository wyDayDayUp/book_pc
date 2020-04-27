<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="门店编号" label-width="80px" prop="storeCode" class="input">
            <el-input  v-model="fromData.storeCode"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" label-width="80px" prop="storeName" class="input">
            <el-input v-model="fromData.storeName"></el-input>
        </el-form-item>
         <el-form-item label="店长名称" label-width="80px" prop="managerName" class="input">
            <el-input v-model="fromData.managerName"></el-input>
        </el-form-item>
        <el-form-item label="所在省份" class="selecta" prop="storeProvinceCode"> 
          <el-select v-model="fromData.storeProvinceCode" placeholder="请选择所在省份" label-width="80px" @change="change">
              <el-option v-for="item in TreeAreas" :key="item.areaNameId" :label="item.areaName" :value="item.areaNameId"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所在城市" class="selectb" prop="storeCityCode">
          <el-select v-model="fromData.storeCityCode" placeholder="请选择所在城市" label-width="80px" @change="changeCity" @focus = "test">
            <el-option v-for="item1 in TreeCity" :key="item1.areaNameId" :label="item1.areaName" :value="item1.areaNameId" ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所在区" class="selectc" prop="storeRegionCode">
          <el-select v-model="fromData.storeRegionCode" placeholder="请选择所在区" label-width="80px"  @chang="changeRegion" @focus = "test1">
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
          <el-form-item label="门店名称" prop="storeName" label-width="110px">
            <el-input v-model="dialogFromData.storeName"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="联系电话" prop="storePhone" label-width="110px">
            <el-input v-model="dialogFromData.storePhone"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="店长编号"  prop="storeManagerId" label-width="110px">
            <el-input v-model="dialogFromData.storeManagerId"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="营业执照编码" prop="storeLicenseCode" label-width="110px">
            <el-input v-model="dialogFromData.storeLicenseCode"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="所在省份" prop="storeProvinceCode" label-width="110px">
           <el-select placeholder="请选择所在省份" v-model="dialogFromData.storeProvinceCode" class="select" @change="change">
              <el-option v-for="item in TreeAreas" :key="item.areaNameId" :label="item.areaName" :value="item.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="所在城市" prop="storeCityCode" label-width="110px">
            <el-select placeholder="请选择所在城市" v-model="dialogFromData.storeCityCode" class="select" @change="changeCity" @focus = "test2"> 
                <el-option v-for="item1 in TreeCity" :key="item1.areaNameId" :label="item1.areaName" :value="item1.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="所在区" prop="storeRegionCode" label-width="110px">
            <el-select placeholder="请选择所在区" v-model="dialogFromData.storeRegionCode" class="select"  @chang="changeRegion" @focus = "test3">
              <el-option v-for="item2 in TreeRegion" :key="item2.areaNameId" :label="item2.areaName" :value="item2.areaNameId"></el-option>
            </el-select>
          </el-form-item>
        </el-col> 
      </el-form-item> 
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="详细地址" prop="storeAddress" label-width="110px">
             <el-input type="textarea" :rows=4 v-model="dialogFromData.storeAddress"></el-input>
          </el-form-item>  
        </el-col>  
      </el-form-item> 
    </el-form>  
    </i-dialog>

    <!-- 详情对话框 -->
     <el-dialog
    title="门店详情"
    :visible.sync="shopdialogVisible"
    width="60%">
    <el-table
    border
    :data="shoptableData"
    style="width: 100%">
    <el-table-column v-for="(item, index) in shopcol" :key="index" :label="item.label" :prop="item.prop" align="center"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="shopdialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="shopdialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/shop-info-manage.js'
export default {  
  name:'shop-info-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       shopdialogVisible:false,
       type:'',
       diglogTitle:'新增门店',
       choseType:'1',
       IsChecked:[],
        //  删除id数组
       idList:{},
       editId:'',
       fromData:{
         storeProvinceCode:'',
         storeCityCode:'',
         storeRegionCode:'',
         storeCode:'',
         storeName:'',
         managerName:'',
       },
        imgData:{
        imageCate:4
       },
       fileList:[],
       pageinfo:{
          pageNum:1,
          pageSize:2,
          storeCode:'',
          storeName:'',
          managerName:'',
          storeProvinceCode:'',
          storeCityCode:'',
          storeRegionCode:'',
          total:0,
       },
      toolba:[
        {
          name:'详情',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要查询详情的门店！')
            else if(this.IsChecked.length != 1)
              return this.$message.warning('最多只能选择一条数据！')   
            this.shopdialogVisible = true
            this.shoptableData = []
            req('findStores',{
               storeId:this.editId
            }).then(res=>{
              if(res.code!=1) return console.log('查询失败')
                   console.log('查询成功！')
               this.shoptableData.push(res.data) 
            })
          }
        },
        {name:'新增',type:'primary',func:()=>{this.show = true,this.choseType = '2',this.diglogTitle = '新增门店',this.type = '1',this.TreeCity=[],this.TreeRegion =[] }},
        {

          name:'修改',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要修改的数据！')
            else if(this.IsChecked.length != 1)
              return this.$message.warning('最多只能选择一条数据！') 
            this.show = true,
            this.choseType = '2',
            this.diglogTitle = '修改门店信息',
            this.type = '2'
            req('findStores',{
              storeId:this.editId
            }).then(res=>{
              console.log(res)
                if(res.code!=1) return console.log('查询失败')
                   console.log('查询成功！')
                this.dialogFromData = res.data  
                req('listAreasByParentCode',{
                     areaNameParentCode:res.data.storeProvinceCode
                   }).then(res=>{
                     this.TreeCity = res.data
                     req('listAreasByParentCode',{
                        areaNameParentCode:this.dialogFromData.storeCityCode
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
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('deleteStore',{
                 storeIds:this.idList.join(',')
               }).then(res=>{
                  if(res.code!=1)  return this.$message.error('删除失败！')
                  this.$message.success('删除成功！')
                  this.pageinfo.pageNum = 1
                  this.listStores()
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
        {label:'门店编号',prop:'storeCode'},
        {label:'门店名称',prop:'storeName'},
        {label:'电话',prop:'storePhone'},
        {label:'详细地址',prop:'storeAddress'},
        {label:'店长姓名',prop:'userName'},
        {label:'邀请码',prop:'storeInvitationCode'},
        {label:'门店账号',prop:'userLoginName'},
      ],
      shopcol:[
         {label:'门店名称',prop:'storeName'},
         {label:'门店编号',prop:'storeId'},
         {label:'联系电话',prop:'storePhone'},
         {label:'详细地址',prop:'storeAddress'},
         {label:'营业执照编码',prop:'storeLicenseCode'},
         {label:'所在省',prop:'provinceName'},
         {label:'所在市',prop:'cityName'},
         {label:'所在区',prop:'regionName'},
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
      shoptableData:[],
      dialogFromData:{
        storeName:'',
        storePhone:'',
        storeManagerId:'',
        storeLicenseCode:'',
        storeProvinceCode:'',
        storeCityCode:'',
        storeRegionCode:'',
        storeAddress:'',
      },
      rules:{
        storeName:[
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storePhone:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeManagerId:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeLicenseCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeProvinceCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeCityCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeRegionCode:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        storeAddress:[
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      },
      TreeAreas:[],
      TreeCity:[],
      TreeRegion:[],
    }
  },
  mounted(){
    this.listStores()
    req('listAreasByParentCode').then(res=>{
      if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
         this.TreeAreas = res.data
         console.log(this.TreeAreas)  
    })
  },
  methods:{
    listStores(){
      req('getlistStores',{
        ...this.pageinfo
      }).then(res=>{
         if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
          this.tableData = res.data.list
           this.pageinfo.total = res.data.total
      })
    },
    search(){
      this.pageinfo.pageNum = 1
      this.pageinfo.storeCode = this.fromData.storeCode
      this.pageinfo.storeName = this.fromData.storeName
      this.pageinfo.managerName = this.fromData.managerName
      this.pageinfo.storeProvinceCode = this.fromData.storeProvinceCode
      this.pageinfo.storeRegionCode = this.fromData.storeRegionCode
      this.pageinfo.changeCity = this.fromData.changeCity
      this.listStores()
      console.log(this.fromData)
    },
    reset(){
       this.pageinfo.pageNum = 1
       this.pageinfo.storeCode = ''
       this.pageinfo.storeName = ''
       this.pageinfo.managerName = ''
       this.pageinfo.storeProvinceCode = ''
       this.pageinfo.storeCityCode = ''
       this.pageinfo.storeRegionCode = ''
       this.fromData.storeProvinceCode = ''
       this.fromData.storeCityCode = ''
       this.fromData.storeRegionCode = ''
       this.listStores()
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
       this.listStores()
      console.log(value)
    },
    handleCurrentChange(value){
       this.pageinfo.pageNum = value
        this.listStores()
      console.log(value)
    },
    handleSelectionChange(cols){
      console.log(cols)
      this.IsChecked = cols
      if(cols.length > 0)
        this.editId = cols[0].storeId
      this.idList = []
      cols.forEach(item=>{
        this.idList.push(item.storeId)
      })  
    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
      this.fileList = []
      this.choseType = '1'
      this.TreeCity = []
      this.TreeRegion = []
    },
    outerVisible(){
      this.show = false
      this.$refs.form.resetFields();
      this.choseType = '1'
      this.TreeCity = []
      this.TreeRegion = []
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
             req('addStore',{
              ...this.dialogFromData
            }).then(res=>{
              if(res.code!=1)  return this.$message.error('新增失败！')
                 this.$message.success('新增成功！')
                 this.show = false 
                 this.pageinfo.storeProvinceCode = ''
                 this.pageinfo.storeCityCode = ''
                 this.pageinfo.storeRegionCode = ''
                 this.pageinfo.pageNum = 1
                 this.TreeCity = []
                 this.TreeRegion = []
                 this.$refs.form.resetFields();
                 this.choseType = '1'
                 this.listStores()
            })
          }else if(this.type === '2'){
            req('updateStore',{
              ...this.dialogFromData
            }).then(res=>{
               if(res.code!=1)  return this.$message.error('修改失败！')
                 this.$message.success('修改成功！')
                 this.show = false 
                 this.pageinfo.storeProvinceCode = ''
                 this.pageinfo.storeCityCode = ''
                 this.pageinfo.storeRegionCode = ''
                 this.TreeCity = []
                 this.TreeRegion = []
                 this.pageinfo.pageNum = 1
                 this.$refs.form.resetFields();
                 this.choseType = '1'
                 this.listStores()
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
      this.fromData.storeCityCode = ''
      this.fromData.storeRegionCode = '' 
      this.dialogFromData.storeCityCode = ''
      this.dialogFromData.storeRegionCode = ''  
      this.pageinfo.storeCityCode = ''
      this.pageinfo.storeProvinceCode = val
      if(this.choseType === '2')
        this.dialogFromData.storeProvinceCode = val
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
      this.fromData.storeRegionCode = '' 
      this.dialogFromData.storeRegionCode = ''
      this.pageinfo.storeCityCode = val

      if(this.choseType === '2')
      this.dialogFromData.storeCityCode = val
      req('listAreasByParentCode',{
        areaNameParentCode:val
      }).then(res=>{
          if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
           this.TreeRegion = res.data
      })
    },
    changeRegion(val){
      this.pageinfo.storeRegionCode = val
      if(this.choseType === '2')
      this.dialogFromData.storeRegionCode = val
    },
    test(){
      if(!this.pageinfo.storeProvinceCode)
         return this.$message.warning('请先选择所在的省！')
    },
    test1(){
      if(!this.pageinfo.storeCityCode)
         return this.$message.warning('请先选择所在的城市！')
    },
     test2(){
      if(!this.dialogFromData.storeProvinceCode)
         return this.$message.warning('请先选择所在的省！')
    },
    test3(){
      if(!this.dialogFromData.storeCityCode)
         return this.$message.warning('请先选择所在的城市！')
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
           width: 24%;
           margin-left: 36px;
           .el-select{
            width: 62%;
          }
        }
        .selectb{
          width: 24%;
          margin-left: 41px;
          .el-select{
            width: 62%;
          }
        }
        .selectc{
          width: 24%;
          margin-left: 53px;
          .el-select{
            width: 62%;
          }
        }
        .input{
          margin-left: 25px;
          width: 25%;
          .el-input{
            width: 70%;
          }
        }
      
    }
  }
}

</style>