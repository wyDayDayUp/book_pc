<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search" @reset="reset">
        <el-form-item label="商品名称" label-width="70px" prop="goodsName">
            <el-input  v-model="fromData.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" label-width="70px" prop="goodsCondition">
           <el-select v-model="fromData.goodsCondition" placeholder="请选择" style="width:100%" class="Select">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="在售" value="1"></el-option>
            <el-option label="已下架" value="2"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="广告词" label-width="70px" prop="goodsAdvertisement">
            <el-input v-model="fromData.goodsAdvertisement"></el-input>
        </el-form-item>
        <el-form-item label="出版社" label-width="70px" prop="goodsPublisher">
            <el-input v-model="fromData.goodsPublisher"></el-input>
        </el-form-item>
        <el-form-item label="作者" label-width="70px" prop="goodsAuthor">
            <el-input v-model="fromData.goodsAuthor"></el-input>
        </el-form-item>
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
       <el-table-column :show-overflow-tooltip='true' v-for="(item, index) in col" :key="index" :prop="item.prop" :label="item.label" align="center" :width="item.width"></el-table-column>
    </i-table>
    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="商品名称" prop="goodsName" label-width="100px">
            <el-input v-model="dialogFromData.goodsName"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="书号" prop="goodsIsbn" label-width="100px">
            <el-input v-model="dialogFromData.goodsIsbn"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="一级分类"  prop="goods" label-width="100px">
            <el-select placeholder="请选择" v-model="dialogFromData.goods" class="select" @change="change">
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
              <el-option v-for="item in one" :key="item.goodsCateId" :label="item.cateName" :value="item.goodsCateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="二级分类" prop="goodsCateCode" label-width="100px">
            <el-select placeholder="请选择" v-model="dialogFromData.goodsCateCode" class="select" @focus = "test">
              <el-option v-for=" item in two" :key="item.goodsCateId" :label="item.cateName" :value="item.goodsCateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="广告词" prop="goodsAdvertisement" label-width="100px">
             <el-input type="textarea" :rows=4 v-model="dialogFromData.goodsAdvertisement"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="商品介绍" prop="goodsDescription" label-width="100px">
             <el-input type="textarea" :rows=4 v-model="dialogFromData.goodsDescription"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="商家名称" prop="goodsBusiness" label-width="100px">
             <el-input v-model="dialogFromData.goodsBusiness"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="11">
          <el-form-item label="库存" prop="goodsStock" label-width="100px">
             <el-input v-model="dialogFromData.goodsStock"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item> 
       <el-form-item>
        <el-col :span="11">
          <el-form-item label="作者" prop="goodsAuthor" label-width="100px">
             <el-input v-model="dialogFromData.goodsAuthor"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="11">
          <el-form-item label="出版社" prop="goodsPublisher" label-width="100px">
             <el-input v-model="dialogFromData.goodsPublisher"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item> 
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="成本价" prop="goodsFixPrice" label-width="100px">
            <el-input v-model="dialogFromData.goodsFixPrice"></el-input>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="在售价" prop="goodsSalePrice" label-width="100px">
            <el-input v-model="dialogFromData.goodsSalePrice"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="图片" label-width="100px">
            <el-upload
            action="http://299z2526w7.wicp.vip/pc/image/uploadImage"
            name="imageFile"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :data="imgData">
              <el-button size="small" type="primary">点击上传</el-button>
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
import req from '@/api/comm-manage.js'
export default {  
  name:'comm-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    return {
       en:"",
       show:false,
       diglogTitle:'新增商品',
       type:'',
       IsChecked:[],
        //  删除id数组
       idList:{},
       editId:'',
        imgData:{
        imageCate:1,
         access_token:JSON.parse(sessionStorage.getItem('userInfo')).access_token
       },
       fileList:[],
       fromData:{
          goodsName:'',
          goodsAdvertisement:'',
          goodsCondition:'',
          goodsPublisher:'',
          goodsAuthor:''
       },
       //查询数据
       pageinfo:{
          pageNum:1,
          pageSize:5,
          total:0,
          goodsName:'',
          goodsAdvertisement:'',
          goodsCondition:'',
          goodsPublisher:'',
          goodsAuthor:'',
       },
       toolba:[
        {val:1,name:'新增',type:'primary',func:()=>{this.show = true,this.diglogTitle = '新增商品',this.type = '1'
            for(var key in this.dialogFromData)
              this.dialogFromData[key] = ''
          }
        },
        {
          val:1,
          name:'修改',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要修改的数据！')
             else if(this.IsChecked.length != 1)  
               return this.$message.warning('最多只能勾选一条数据!')  
            this.show = true
            this.diglogTitle = '修改商品信息'
            this.type = '2'
            // this.dialogFromData = this.IsChecked[0]
            // this.dialogFromData.goods = this.IsChecked[0].firstGoodsCateId
            for(var key in this.IsChecked[0])
              this.dialogFromData[key] = this.IsChecked[0][key]
            this.dialogFromData.goods = this.IsChecked[0].firstGoodsCateId  
            req('listGoodsCates',{
              cateParent:this.IsChecked[0].firstGoodsCateId
            }).then(res=>{
              this.two = res.data
            })
          }
        },  
        {
          val:1,
          name:'删除',
          type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要删除的选项！')
            this.$confirm('此操作将永久删除所选中的数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
             req('deleteGoods',{
               goodsIds:this.idList.join(',')
             }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                  this.$message.success('删除成功！')
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
          name:'上架',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要上架的商品选项！')
              this.$confirm('此操作将对选中的商品状态进行修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('updateGoodsCondition',{
                goodsIds:this.idList.join(','),
                goodsCondition:1
              }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                    this.$message.success('修改成功！')
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
          name:'下架',
          type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
              return this.$message.warning('请先勾选所要上架的商品选项！')
              this.$confirm('此操作将对选中的商品状态进行修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('updateGoodsCondition',{
                goodsIds:this.idList.join(','),
                goodsCondition:2
              }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                    this.$message.success('修改成功！')
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
      ],
      col:[
        {label:'商品名称',prop:'goodsName',width:'160px'},
        {label:'作者',prop:'goodsAuthor',width:'170px'},
        {label:'出版社',prop:'goodsPublisher',width:'145px'},
        {label:'定价',prop:'goodsFixPrice',width:'107px'},
        {label:'售价',prop:'goodsSalePrice',width:'107px'},
        {label:'销售量',prop:'goodsSaleSum',width:'107px'},
        {label:'一级分类',prop:'firstGoodsCateName',width:'107px'},
        {label:'二级分类',prop:'secondGoodsCateName',width:'107px'},
        {label:'广告词',prop:'goodsAdvertisement',width:'107px'},
        {label:'商品介绍',prop:'goodsDescription',width:'107px'},
        {label:'商品状态',prop:'goodsCondition',width:'107px'},
        {label:'上架时间',prop:'goodsSaleTime',width:'180px'},
        // {label:'浏览量',prop:'goodsVisitNum'},
        {label:'商家名称',prop:'goodsBusiness',width:'107px'},
        {label:'库存',prop:'goodsStock',width:'107px'},
        {label:'isbn书号',prop:'goodsIsbn',width:'140px'},
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
      dialogFromData:{
        goodsName:'',
        goodsFixPrice:'',
        goodsSalePrice:'',
        goodsStock:'',
        goodsAdvertisement:'',
        goodsDescription:'',
        goodsBusiness:'',
        goodsIsbn:'',
        imageId:'',
        goodsCateCode:'',
        goods:'',
        goodsPublisher:'',
        goodsAuthor:'',
      },
      rules:{
        goodsName:[
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsFixPrice:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsSalePrice:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goods:[
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodsCateCode:[
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodsAdvertisement:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsDescription:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsBusiness:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsPublisher:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsAuthor:[
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goodsIsbn:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ],
        goodsStock:[
           { required: true, message: '不能为空', trigger: 'blur' },
        ]
      },
      one:[],
      two:[],
    }
  },
  mounted(){
    this.getshopList()
    req('listTreeGoodsCates').then(res=>{
      console.log(res.data)
      this.one = res.data
    })
  },
  methods:{
    // 获取商品列表信息
    getshopList(){
      req('getshopList',{
        ...this.pageinfo,
      }).then(res=>{
        // console.log(res)
        this.tableData = res.data.list
        console.log(this.tableData[0].goodsCondition)
        this.tableData.forEach(item => {
          if(item.goodsCondition === 0)
            item.goodsCondition = "未发布"
          else if(item.goodsCondition === 1)  
            item.goodsCondition = "在售"
          else if(item.goodsCondition === 2)
            item.goodsCondition = "已下架"  
        });
        this.pageinfo.total =  res.data.total
      })
    },
    search(){
      this.pageinfo.pageNum = 1
      this.pageinfo.goodsName = this.fromData.goodsName
      this.pageinfo.goodsAdvertisement = this.fromData.goodsAdvertisement
      this.pageinfo.goodsCondition = this.fromData.goodsCondition
      this.pageinfo.goodsPublisher = this.fromData.goodsPublisher
      this.pageinfo.goodsAuthor = this.fromData.goodsAuthor
      this.getshopList()
      console.log(this.fromData)
    },
    reset(){
      this.pageinfo.pageNum = 1
      this.pageinfo.goodsName = ''
      this.pageinfo.goodsAdvertisement = ''
      this.pageinfo.goodsCondition = ''
      this.pageinfo.goodsPublisher = ''
      this.pageinfo.goodsAuthor = ''
      this.getshopList()
    },
    handleSizeChange(value){
       this.pageinfo.pageSize = value
        this.getshopList()
      console.log(value)
    },
    handleCurrentChange(value){
      this.pageinfo.pageNum = value
      this.getshopList()
      console.log(value)
    },
    handleSelectionChange(cols){
      console.log(cols)
       this.IsChecked = cols
       this.idList = []
        cols.forEach(item=>{
        this.idList.push(item.goodsId)
      })  
      //  if(cols.length === 1){
      //    this.dialogFromData = cols[0]
        
      //  }
      //  if(cols.length > 0)
      //   this.editId = cols[0].storeId
    },
    handleAvatarSuccess(res, file){
      // this.dialogFromData.headImage = URL.createObjectURL(file.raw);
      // console.log(this.dialogFromData.headImage)
      this.dialogFromData.imageId = res.data.imageId
      console.log(res)
    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
      this.fileList = []
      this.dialogFromData.imageId = ''
      this.two = []
    
    },
    outerVisible(){
      this.show = false
      this.fileList = []
      this.dialogFromData.imageId = ''
      this.$refs.form.resetFields();
      this.two = []
    
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type === '1'){
            req('addGoods',{
              ...this.dialogFromData
            }).then(res=>{
              if(res.code!=1)  return this.$message.error(res.msg)
                 this.$message.success('新增成功！')
                 this.pageinfo.pageNum = 1
                 this.show = false
                  this.getshopList()
            })
          }else if(this.type === '2'){
            if(this.dialogFromData.goodsCondition === '未发布')
              this.dialogFromData.goodsCondition = 0
            else if(this.dialogFromData.goodsCondition === '在售')
               this.dialogFromData.goodsCondition = 1
            else if(this.dialogFromData.goodsCondition === '已下架') 
               this.dialogFromData.goodsCondition = 2     
            req('updateGoods',{
              ...this.dialogFromData
            }).then(res=>{
              if(res.code!=1)  return this.$message.error(res.msg)
                 this.$message.success('修改成功！')
                 this.pageinfo.pageNum = 1
                 this.show = false
                  this.getshopList()
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    change(val){
      console.log(val)
       req('listGoodsCates',{
        cateParent:val
      }).then(res=>{
        console.log(res)
        this.two = res.data
      })
    },
    test(){
      if(!this.dialogFromData.goods)
         return this.$message.warning('请先选择一级分类！')
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  width: 100%;
}
/deep/ .from{
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  .i-search{
    .el-form{
      display: flex;
      flex-wrap: wrap;
      margin-left: 30px;
      .el-form-item{
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
/deep/ .Select{
    .el-select__caret{
  margin-right: 110px;
} 
} 

</style>