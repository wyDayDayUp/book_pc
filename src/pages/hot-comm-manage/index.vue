<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="商品名称" label-width="80px" prop="goodsName">
            <el-input  v-model="fromData.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" label-width="80px" prop="goodsCode">
            <el-input v-model="fromData.goodsCode"></el-input>
        </el-form-item>
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
       <!-- <el-table-column type="index" width="55" align="center" label="排序" :index="Index"></el-table-column> -->
       <el-table-column :show-overflow-tooltip='true' v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center"></el-table-column>
    </i-table>
    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
       <el-form-item tem label="商品" prop="goodsName" label-width="100px">
         <el-input style="width:70%" v-model="dialogFromData.goodsName"></el-input>
         <el-button type="primary" style="margin-left:15px" @click="choseBox">选择</el-button>
      </el-form-item>
      <el-form-item tem label="热门位排序" prop="hotGoodsWeight" label-width="100px">
         <el-input style="width:70%" v-model.number="dialogFromData.hotGoodsWeight"></el-input>
      </el-form-item>
    </el-form>  
    </i-dialog>


     <el-dialog
      title="热门位商品选择"
      :visible.sync="dialogVisible"
      width="60%">
      <el-form :model="showDate" ref="choseFrom">
        <el-col :span="9">
          <el-form-item label="商品名称" prop="goodsName" label-width="100px">
            <el-input v-model="showDate.goodsName"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="9">
          <el-form-item label="商品编码" prop="goodsCode" label-width="100px">
            <el-input v-model="showDate.goodsCode"></el-input>
          </el-form-item>
        </el-col> 
        <el-col :span="6">
          <el-form-item style="margin-left:20px">
            <el-button type="primary" @click="choseSearch">查询</el-button>
            <el-button @click="choseReset">重置</el-button>
          </el-form-item>
        </el-col> 
      </el-form>  
      <el-table
      :data="showtableData"
      border
      highlight-current-row
      @current-change="ChosehandleCurrentChange"
      style="width: 100%">
      <!-- <el-table-column  type="selection" align="center"></el-table-column> -->
      <el-table-column label="商品编号" prop="goodsCode" align="center"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName" align="center"></el-table-column>
      <el-table-column label="商品状态" prop="goodsCondition" align="center"></el-table-column>
      <el-table-column label="一级分类" prop="onename" align="center"></el-table-column>
      <el-table-column label="二级分类" prop="twoname" align="center"></el-table-column>
      </el-table>
      <el-pagination
      @size-change="chosehandleSizeChange"
      @current-change="chosehandleCurrentChange"
      :current-page="choseInfo.pageNum"
      :page-sizes="[ 5, 10, 20]"
      :page-size="choseInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="choseInfo.total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseClose">取 消</el-button>
        <el-button type="primary" @click="choseSumbit">提交</el-button>
      </span>
    </el-dialog>

    <!-- //展示商品数量 -->
      <el-dialog
      title="展示商品数量设置"
      :visible.sync="numdialogVisible"
      width="30%">
      <span class="total">当前APP端展示的数量为：{{Numdata.dictValue}}</span>
      <el-input v-model="ShowNum" placeholder="请输入要展示的数量" class="Input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Numclose">取 消</el-button>
        <el-button type="primary" @click="Numsumit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/hot-comm-manage.js'
export default {  
  name:'hot-comm-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       Index:0,
       show:false,
       dialogVisible:false,
       numdialogVisible:false,
       diglogTitle:'新增热门位商品',
       Numdata:{},
       ShowNum:'',
        IsChecked:[],
       type:'',
      //  删除id列表
       idList:[],
      //  修改列表信息
       editlist:{
         hotGoodsId:'',
         hotGoodsGoodsCode:'',
         hotGoodsWeight:'',
         version:''
       },
       showDate:{
         goodsCode:'',
         goodsName:''
       },
       fromData:{
         goodsName:'',
         goodsCode:''
       },
       pageinfo:{
          pageNum:1,
          pageSize:5,
          goodsName:'',
          goodsCode:'',
          total:0,
       },
       Col:{},
      //  选择框数据
       choseInfo:{
         pageNum:1,
         pageSize:5,
         goodsCode:'',
         goodsName:'',
         total:0,
       },
      toolba:[
        {val:1,name:'新增',type:'primary',func:()=>{this.show = true,this.diglogTitle = '新增热门位商品',this.type = '1',this.dialogFromData.goodsName = '', this.dialogFromData.hotGoodsWeight =null}},
        {val:1,name:'修改',type:'primary',
            func:()=>{
            if(this.IsChecked.length < 1)
               return this.$message.warning('请先勾选所要修改的选项！') 
            else if(this.IsChecked.length != 1)
               return this.$message.warning('最多只能修改一条数据！')      
            this.show = true,
            this.diglogTitle = '修改热门位商品',
            this.type = '2',
            this.dialogFromData.goodsName = this.editlist.goodsName
            this.dialogFromData.hotGoodsWeight = this.editlist.hotGoodsWeight
            
          }
        },
        {
          val:1,
          name:'删除',
          type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
               return this.$message.warning('请先勾选所要删除的选项！')
             this.$confirm('此操作将永久删除选中的商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              req('deleteHot',{
                hotGoodsIds:this.idList.join(',')
              }).then(res=>{
                if(res.code!=1) return this.$message.error('删除失败！')
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.pageinfo.pageNum = 1
                this.getshopList()
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
          val:1,
          name:'展示商品数量',
          type:'primary',
          func:()=>{
            this.numdialogVisible = true
            req('findDisplayNum',{}).then(res=>{
              // console.log(res)
              this.Numdata = res.data
              console.log(this.Numdata)
            })
          }
        }
      ],
      col:[
        {label:'排序',prop:'hotGoodsWeight'},
        {label:'商品编号',prop:'goodsCode'},
        {label:'商品名称',prop:'goodsName'},
        {label:'商品价格',prop:'goodsSalePrice'},
        {label:'商品介绍',prop:'goodsDescription'},
      ],
      choseCol:[
        {label:'商品编号',prop:'goodsCode'},
        {label:'商品名称',prop:'goodsName'},
        {label:'商品状态',prop:'goodsCondition'},
        {label:'一级分类',prop:'onename'},
        {label:'二级分类',prop:'twoname'},
      ],
      tableData:[
      ],
      choseTableData:[],
      showtableData:[],
      dialogFromData:{
        hotGoodsGoodsCode:'',
        hotGoodsWeight:'',
        goodsName:'',
      },
      rules:{
        account:[
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goodsName:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        hotGoodsWeight:[
           { required: true, message: '不能为空', trigger: 'blur' },
           { type: 'number', message: '必须为数字值'}
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
    // this.pageinfo.total = this.tableData.length
    this.getshopList()
  },
  // created(){
  //   this.getshopList()
  // },
  methods:{
    getshopList(){
      req('getshopList',{
        ...this.pageinfo,
      }).then(res=>{
        console.log(res)
        if(res.code!=1) return console.log('查询失败')
           console.log('查询成功！')
           this.tableData = res.data.list
           console.log(this.tableData)
          this.Index = (res.data.pageNum - 1) * res.data.pageSize +1
          this.pageinfo.total = res.data.total
          
      })
    },
    search(){
      this.pageinfo.goodsName = this.fromData.goodsName
      this.pageinfo.goodsCode = this.fromData.goodsCode
      this.pageinfo.pageNum = 1
      this.getshopList()
      console.log(this.fromData)
    },
    reset(){
       this.pageinfo.pageNum = 1
       this.pageinfo.goodsName  = ''
       this.pageinfo.goodsCode =''
       this.getshopList()
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
      console.log(value)
      this.getshopList()
    },
    handleCurrentChange(value){
      this.pageinfo.pageNum = value
      console.log(value)
      this.getshopList()
    },
    handleSelectionChange(cols){
      this.idList = []
      this.IsChecked = cols
      cols.forEach(item=>{
        this.idList.push(item.hotGoodsId)
        this.editlist.hotGoodsId = cols[0].hotGoodsId
        this.editlist.hotGoodsGoodsCode = cols[0].hotGoodsGoodsCode
        this.editlist.goodsName = cols[0].goodsName
        this.editlist.hotGoodsWeight = cols[0].hotGoodsWeight
        this.editlist.version = cols[0].version
      })
      console.log(cols)
      console.log(this.idList)
      console.log(this.editlist)
    },
    close(data){
      this.show=data
      this.dialogFromData.goodsName = ''
      this.editlist.hotGoodsGoodsCode = ''
      this.dialogFromData.hotGoodsWeight =''
      this.$refs.form.resetFields();
    },
    outerVisible(){
      this.show = false
      this.dialogFromData.goodsName = ''
      this.editlist.hotGoodsGoodsCode = ''
      this.dialogFromData.hotGoodsWeight =''
      this.$refs.form.resetFields();
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
            req('addHotShop',{
              hotGoodsGoodsCode:this.dialogFromData.hotGoodsGoodsCode,
              hotGoodsWeight:this.dialogFromData.hotGoodsWeight
            }).then(res=>{
              if(res.code!=1)  return this.$message.error(res.msg)
                 this.$message.success('新增成功！')
              this.show = false
              this.pageinfo.pageNum = 1
              // this.$refs.choseFrom.resetFields();
              this.getshopList()
              this.$refs.form.resetFields();
            })
          }else if(this.type === '2'){
            this.editlist.hotGoodsWeight = this.dialogFromData.hotGoodsWeight
            console.log(this.editlist)
            req('editHotShop',{
              ...this.editlist
            }).then(res=>{
              if(res.code!=1)  return this.$message.error(res.msg)
                 this.$message.success('修改成功！')
              this.show = false
              // this.pageinfo.pageNum = 1
              // this.$refs.choseFrom.resetFields();
              this.getshopList()
              this.$refs.form.resetFields();
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getchoseList(){
      this.showtableData = []
      req('getChoseList',{
        ...this.choseInfo
      }).then(res=>{
        console.log(res)
        if(res.code!=1) return console.log('获取失败')
          console.log('获取成功')
          this.choseTableData = res.data.list
          res.data.list.forEach(item=>{
            if(item.goodsCondition === 0)
              item.goodsCondition = '未发布'
            else if(item.goodsCondition === 1)
              item.goodsCondition = '在售'
            else if(item.goodsCondition === 2)
              item.goodsCondition = '已下架'    
            this.showtableData.push({
              goodsCode:item.goodsCode,
              goodsName:item.goodsName,
              goodsCondition:item.goodsCondition,
              onename:item.goodsCate.cateName,
              twoname:item.goodsCate.parentGoodsCate.cateName,
              goodsId:item.goodsId
            })
          })
          console.log(this.showtableData)
          this.choseInfo.total = res.data.total
      })
    },

    choseBox(){
      this.dialogVisible = true
      this.getchoseList()
    },
    chosehandleSizeChange(value){
      this.choseInfo.pageSize = value
      this.getchoseList()
    },
    chosehandleCurrentChange(value){
      this.choseInfo.pageNum = value
      this.getchoseList()
    },
    choseSearch(){
      this.choseInfo.pageNum = 1
      this.choseInfo.goodsName = this.showDate.goodsName
      this.choseInfo.goodsCode = this.showDate.goodsCode
      this.getchoseList()
    },
    choseReset(){
      this.choseInfo.pageNum = 1
      this.choseInfo.goodsName = ''
      this.choseInfo.goodsCode = ''
      this.getchoseList()
    },
    choseSumbit(){
      if(!this.editlist.hotGoodsGoodsCode)
        return this.$message.warning('请选择一项！')
        
      this.dialogFromData.hotGoodsGoodsCode = this.Col.goodsId
      this.dialogFromData.goodsName = this.Col.goodsName
      this.editlist.hotGoodsGoodsCode = this.Col.goodsId
      this.dialogVisible = false 
    },
    CloseClose(){
      this.dialogVisible = false
      this.dialogFromData.goodsName = ''
      this.editlist.hotGoodsGoodsCode = ''
    },
    ChosehandleCurrentChange(cols){
      console.log(cols)
      if(cols){
      this.Col = cols 
      this.dialogFromData.hotGoodsGoodsCode = cols.goodsId
      this.dialogFromData.goodsName = cols.goodsName
      this.editlist.hotGoodsGoodsCode = cols.goodsId
      }
    },
    Numclose(){
      this.numdialogVisible = false
      this.ShowNum = ''
    },
    Numsumit(){
      req('updateDisplayNum',{
        dictId:this.Numdata.dictId,
        dictValue:this.ShowNum,
        version:this.Numdata.version
      }).then(res=>{
         if(res.code!=1)  return this.$message.error('设置失败！')
          this.$message.success('设置成功！')
          this.numdialogVisible = false
          this.ShowNum = '' 
      })     
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
.el-input{
  width: 70%;
}
/deep/ .el-dialog{
  width: 28%;
}
 /deep/ .el-dialog{
   .el-pagination{
    text-align: right;
    margin-top: 15px;
  }
}
.total{
  font-size: 18px;
}
.Input{
  margin-top: 25px;
}
</style>