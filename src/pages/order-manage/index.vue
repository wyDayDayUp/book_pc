<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="下单人" label-width="80px" prop="userName" class="input">
            <el-input  v-model="fromData.userName"></el-input>
        </el-form-item>
        <el-form-item label="订单编码" label-width="80px" prop="orderCode" class="input">
            <el-input v-model="fromData.orderCode"></el-input>
        </el-form-item>
         <el-form-item label="订单状态"  label-width="80px" class="selectb" prop="orderCondition">
           <el-select v-model="fromData.orderCondition" placeholder="请选择" style="width:90%">
            <el-option label="已下单" value="0"></el-option>
            <el-option label="已取消" value="1"></el-option>
            <el-option label="已到货" value="2"></el-option>
            <el-option label="已取货" value="3"></el-option>
            <el-option label="已完成未评价" value="4"></el-option>
            <el-option label="已完成已评价" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" class="input" label-width="80px" prop="userPhone"> 
           <el-input  v-model="fromData.userPhone"></el-input>
        </el-form-item>
         <el-form-item label="付款时间"  label-width="80px" prop="value" style="margin-left:25px">
          <el-date-picker
            v-model="fromData.value"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>  
         <!-- <el-form-item label="订单状态"  label-width="80px" class="selectb" prop="orderCondition">
           <el-select v-model="fromData.orderCondition" placeholder="请选择" style="width:80%">
            <el-option label="已下单" value="0"></el-option>
            <el-option label="已取消" value="1"></el-option>
            <el-option label="已到货" value="2"></el-option>
            <el-option label="已取货" value="3"></el-option>
            <el-option label="已完成未评价" value="4"></el-option>
            <el-option label="已完成已评价" value="5"></el-option>
          </el-select>
        </el-form-item> -->
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange" >
       <el-table-column  v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
    </i-table>
    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
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
    </i-dialog>
    <!-- 详情对话框 -->
     <el-dialog
    title="门店详情"
    :visible.sync="orderdialogVisible"
    width="60%">
    <el-table
    border
    :data="ordertableData"
    style="width: 100%">
    <el-table-column v-for="(item, index) in ordercol" :key="index" :label="item.label" :prop="item.prop" align="center"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="orderclose">取 消</el-button>
      <el-button type="primary" @click="ordersumit">确 定</el-button>
    </span>
   </el-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/order-manage.js'
export default {  
  name:'order-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       orderdialogVisible:false,
       editId:'',
       diglogTitle:'新增用户',
        //  删除id数组
       idList:{},
       IsChecked:[],
       fromData:{
          value:'',
          userName:'',
          orderCode:'',
           userPhone:'',
          orderCondition:'',
       },
       pageinfo:{
          pageNum:1,
          pageSize:5,
          total:0,
          userName:'',
          orderCode:'',
          orderBeginPayTimeStr:'',
          orderEndPayTimeStr:'',
          userPhone:'',
          orderCondition:'',
       },
      toolba:[
        {
          name:'详情',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
            else if(this.IsChecked.length != 1)
                 return this.$message.warning('最多勾选一个数据！')    
            this.orderdialogVisible = true
            req('listOrder',{
              orderId:this.editId
            }).then(res=>{
               this.ordertableData = res.data[0].orderDetailList
               console.log(res.data[0].orderDetailList)
            })
          }
        },
        {
          name:'订单取消',
          type:'primary',
          func:()=>{
               if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
                this.$confirm('此操作将修改所选中数据的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                req('updateOrderCondition',{
                  orderIds:this.idList.join(','),
                  orderCondition:1
                }).then(res=>{
                  if(res.code!=1)  return this.$message.error('修改失败！')
                  this.$message.success('修改成功！')
                  
                  this.getliststore()
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
          name:'订单到货',
          type:'primary',
           func:()=>{
               if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
                this.$confirm('此操作将修改所选中数据的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                req('updateOrderCondition',{
                  orderIds:this.idList.join(','),
                  orderCondition:2
                }).then(res=>{
                  if(res.code!=1)  return this.$message.error('修改失败！')
                  this.$message.success('修改成功！')
                  
                  this.getliststore()
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
          name:'取消到货',
          type:'primary',
           func:()=>{
               if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
                this.$confirm('此操作将修改所选中数据的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                req('updateOrderCondition',{
                  orderIds:this.idList.join(','),
                  orderCondition:0
                }).then(res=>{
                  if(res.code!=1)  return this.$message.error('修改失败！')
                  this.$message.success('修改成功！')
                  
                  this.getliststore()
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
          name:'订单已取货',
          type:'primary',
           func:()=>{
               if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
                this.$confirm('此操作将修改所选中数据的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                req('updateOrderCondition',{
                  orderIds:this.idList.join(','),
                  orderCondition:3
                }).then(res=>{
                  if(res.code!=1)  return this.$message.error('修改失败！')
                  this.$message.success('修改成功！')
                  
                  this.getliststore()
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
          name:'取消已取货',
          type:'primary',
           func:()=>{
               if(this.IsChecked.length < 1)
                 return this.$message.warning('请先勾选所要修改的数据！')
                this.$confirm('此操作将修改所选中数据的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                req('updateOrderCondition',{
                  orderIds:this.idList.join(','),
                  orderCondition:2
                }).then(res=>{
                  if(res.code!=1)  return this.$message.error('修改失败！')
                  this.$message.success('修改成功！')
                  
                  this.getliststore()
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
        {label:'订单编码',prop:'orderCode'},
        {label:'订单总价',prop:'orderTotalPrice'},
        {label:'订单状态',prop:'orderCondition'},
        {label:'支付状态',prop:'orderPayCondition'},
        {label:'门店编码',prop:'storeCode'},
        {label:'下单人姓名',prop:'userName'},
        {label:'下单人手机号',prop:'userPhone'},
        {label:'确认付款时间',prop:'orderPayTime'},
      ],
       ordercol:[
         {label:'用户编号',prop:'userCode'},
         {label:'订单编号',prop:'orderDetailOrderCode'},
         {label:'商品编码',prop:'orderDetailGoodsDisplayCode'},
         {label:'商品名称',prop:'orderDetailGoodsName'},
         {label:'购买数量',prop:'orderDetailGoodsNum'},
         {label:'总金额',prop:'orderDetailGoodsTotalPrice'},
         {label:'售价',prop:'orderDetailGoodsSalePrice'},
         {label:'定价',prop:'orderDetailGoodsFixPrice'},
       ],
      ordertableData:[],
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
        account:'',
        name:'',
        role:'',
        sex:'',
        phone:'',
        pass:'',
        emai:'',
        identity:''
      },
      rules:{
        account:[
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        sex:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        phone:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        emai:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        identity:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        pass:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        role:[
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  mounted(){
    this.getliststore()
  },
  methods:{
    getliststore(){
          req('listOrders',{
          ...this.pageinfo
      }).then(res=>{
        console.log(res)
        if(res.code!=1) return console.log('查询失败')
              console.log('查询成功！')
            this.tableData = res.data.list   
            this.tableData.forEach(item=>{
              if(item.orderCondition === 0)
                  item.orderCondition = '已下单'
               else if(item.orderCondition === 1)
                  item.orderCondition = '已取消'  
               else if(item.orderCondition === 2)  
                   item.orderCondition = '已到货'
               else if(item.orderCondition === 3)
                   item.orderCondition = '已取货'
               else if(item.orderCondition === 4)  
                   item.orderCondition = '已完成未评价' 
               else if(item.orderCondition === 5)
                   item.orderCondition = '已完成已评价'  
               if(item.orderPayCondition === 1)    
                   item.orderPayCondition = '已支付'             
            })     
            this.pageinfo.total = res.data.total    
      })
    },
    search(){
      this.pageinfo.userName = this.fromData.userName
      this.pageinfo.orderCode = this.fromData.orderCode
      this.pageinfo.userPhone = this.fromData.userPhone
      this.pageinfo.orderCondition = this.fromData.orderCondition
      this.pageinfo.orderBeginPayTimeStr = this.fromData.value[0]
      this.pageinfo.orderEndPayTimeStr = this.fromData.value[1]
      this.pageinfo.pageNum = 1
      console.log(this.fromData)
       this.getliststore()
    },
    reset(){
      this.pageinfo.userName = ''
      this.pageinfo.orderCode = ''
      this.pageinfo.userPhone = ''
      this.pageinfo.orderCondition = ''
      this.pageinfo.orderBeginPayTimeStr = ''
      this.pageinfo.orderEndPayTimeStr = ''
      this.pageinfo.pageNum = 1
      console.log(this.fromData)
       this.getliststore()
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
      this.getliststore()
      console.log(value)
    },
    handleCurrentChange(value){
      this.pageinfo.pageNum = value
      this.getliststore()
      console.log(value)
    },
    handleSelectionChange(cols){
      console.log(cols)
      this.IsChecked = cols
       if(cols.length > 0)
        this.editId = cols[0].orderId
       this.idList = []
      cols.forEach(item=>{
        this.idList.push(item.orderId)
      })  
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
    },
    orderclose(){
      this.orderdialogVisible = false
      this.getliststore()
    },
    ordersumit(){
      this.orderdialogVisible = false
      this.getliststore()
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
          width: 21%;
          margin-left: 66px;
          .el-select{
            width: 62%;
          }
        }
        .selectc{
          width: 24%;
          margin-left: 39px;
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
        .data{
          display: flex;
          justify-content: space-between;
          width: 45%;
          span{
            padding: 0 5px;
          }
          .el-form-item__label{
            margin-right: 50px;
          }
         .el-form-item__content{
           margin-left: -67px;
           margin-right: 57px;
         }
        }
    }
  }
}
.el-input__inner{
  border-radius:0px;
  padding: 0 12px;
  height: 35px;
  line-height: 35px;
}
</style>