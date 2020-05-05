<template>
  <div>
    <div class="from">
      <i-search :model="fromData" @search="search"  @reset="reset">
       <el-form-item label="状态" prop="rollImageCondition">
          <el-select v-model="fromData.rollImageCondition" placeholder="请选择">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="全部" value="2"></el-option>
          </el-select>
        </el-form-item>
      </i-search>
    </div>
    <i-table :toolbar="toolba" :tabledata="tableData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
    :pageinfo="pageinfo" @handleSelectionChange="handleSelectionChange">
       <el-table-column prop="rollImageWeight" label="排序" align="center"></el-table-column>   
       <el-table-column prop="imageUrl" label="图片路径" align="center" :show-overflow-tooltip='true'></el-table-column>  
       <el-table-column prop="rollImageCondition" label="状态" align="center"></el-table-column>  
       <el-table-column label="预览" align="center">
        <template slot-scope="scope"> 
            <el-link :href="scope.row.imageUrl" type="primary" target="_blank" v-show="'scope.row.imageUrl'" v-if="scope.row.imageUrl">预览</el-link>
            <div v-else>无图片</div>
            <!-- <el-image 
              style="width: 50px; height: 50px"
              :src="scope.row.imageUrl" 
              :preview-src-list="scope.row.imageList">
            </el-image> -->
            <!-- <img :src='scope.row.imageUrl'> -->
        </template>    
      </el-table-column>  
       <el-table-column prop="rollImageBeginDate" label="有效期起" align="center"></el-table-column>  
       <el-table-column prop="rollImageEndDate" label="有效期止" align="center"></el-table-column>   
    </i-table>
    <i-dialog :visible="show" @close="close" :title="diglogTitle" 
    @innerVisible="innerVisible"
    @outerVisible="outerVisible"
    >
    <el-form :model="dialogFromData" :rules="rules" ref="form">
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="轮播图片" label-width="100px">
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
         <el-col :span="11">
          <el-form-item label="排序" prop="rollImageWeight" label-width="100px" style="width:96%">
            <el-input v-model="dialogFromData.rollImageWeight"></el-input>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="有效日期"  prop="rollImageBeginDateStr" label-width="100px">
            <el-date-picker
              v-model="dialogFromData.rollImageBeginDateStr"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>  
         <el-col :span="11">
          <el-form-item label="有效期止" prop="rollImageEndDateStr" label-width="100px">
            <el-date-picker  type="date" placeholder="选择日期" v-model="dialogFromData.rollImageEndDateStr"  value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>  
      </el-form-item>  
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="商品" prop="name" label-width="100px" style="width:96%">
            <el-input v-model="dialogFromData.name"></el-input>
          </el-form-item>
        </el-col>  
        <el-button type="primary" @click="choseBox">选择</el-button>
      </el-form-item>  
    </el-form>  
    </i-dialog>
    <!-- 轮播商品选择框 -->
    <el-dialog
      title="轮播商品选择"
      :visible.sync="dialogVisible"
      width="55%">
      <el-form :model="showDate" :rules="showrules">
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
      ref="choseRef"
      @select="showhandleSelectionChange"
      style="width: 100%">
      <el-table-column  type="selection" align="center" ></el-table-column>
      <el-table-column label="商品编号" prop="goodsCode" align="center"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName" align="center"></el-table-column>
      <el-table-column label="商品状态" prop="goodsCondition" align="center"></el-table-column>
      <el-table-column label="一级分类" prop="firstGoodsCateName" align="center"></el-table-column>
      <el-table-column label="二级分类" prop="secondGoodsCateName" align="center"></el-table-column>
      </el-table>
      <el-pagination
      @size-change="chosehandleSizeChange"
      @current-change="chosehandleCurrentChange"
      :current-page="choseInfo.pageNum"
      :page-sizes="[5, 10, 20]"
      :page-size="choseInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="choseInfo.total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="colse">取 消</el-button>
        <el-button type="primary" @click="sumit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ISearch from '@/components/component/i-search.vue'
import ITable from '@/components/component/i-table.vue'
import IDialog from '@/components/component/i-dialog.vue'
import req from '@/api/home-pic-manage.js'
export default {  
  name:'home-pic-manage',
  components:{
    ISearch,
    ITable,
    IDialog,
  },
  data() {
    var checkStart = (rule,value,callback) =>{
      if(!value){
        return callback(new Error('请输入起始日期'));
      }else{
        if(this.dialogFromData.rollImageBeginDateStr){
          if(this.dialogFromData.rollImageBeginDateStr > this.dialogFromData.rollImageEndDateStr){
             return callback(new Error('起始日期要小于结束日期'))
          }else{
            callback()
          }
        }
      }
    }
    var checkEnd = (rule,value,callback) =>{
      if(!value){
         return callback(new Error('请输入结束日期'));
      }else{
        if(this.dialogFromData.rollImageEndDateStr){
          if(this.dialogFromData.rollImageEndDateStr < this.dialogFromData.rollImageBeginDateStr){
            return callback(new Error('结束日期不能小于开始日期'))
          }else{
            callback()
          }
        }
      }
    }
    return {
       imglist:[
        'https://xzsd-1253216955.cos.ap-guangzhou.myqcloud.com/rollImage/rollImage_baf1455a54f34cec873d3b01323b644c.png',
      ],
       en:"",
       show:false,
       dialogVisible:false,
       diglogTitle:'新增轮播图',
        IsChecked:[],
         //  删除id数组
       idList:{},
       choseId:[],
       fileList:[],
        imgData:{
        imageCate:2,
        access_token:JSON.parse(sessionStorage.getItem('userInfo')).access_token
       },
       fromData:{
         rollImageCondition:""
       },
       showDate:{
         goodsName:'',
         goodsCode:'',
       },
       showtableData:[],
       showrules:{},
       pageinfo:{
          pageNum:1,
          pageSize:5,
          rollImageCondition:'',
          total:0,
       },
       choseInfo:{
         pageNum:1,
         pageSize:5,
         goodsCode:'',
         goodsName:'',
         goodsCondition:'',
         total:0,
       },
      toolba:[
        {val:1,name:'新增',type:'primary',func:()=>{this.show = true}},
        {
          val:1,
          name:'删除',
          type:'primary',
          func:()=>{
             if(this.IsChecked.length < 1)
               return this.$message.warning('请先勾选所要删除的选项！')
              this.$confirm('此操作将删除所有选中的数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('deleteRollImage',{
                 rollImageIds:this.idList.join(','),
             }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                    this.$message.success('删除成功！')
                    this.pageinfo.pageNum = 1
                    this.pageinfo.rollImageCondition = 2
                    this.getlistRollImages()
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
          name:'启用',
          type:'primary',
          
          func:()=>{
              if(this.IsChecked.length < 1)
               return this.$message.warning('请先勾选所要修改的选项！')
              this.$confirm('此操作将对选中的商品状态进行修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('updateRollImageCondition',{
                rollImageIds:this.idList.join(','),
                rollImageCondition:1
              }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                    this.$message.success('修改成功！')
                    this.getlistRollImages()
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
          name:'禁用',
          type:'primary',
          func:()=>{
            if(this.IsChecked.length < 1)
               return this.$message.warning('请先勾选所要修改的选项！')
              this.$confirm('此操作将对选中的商品状态进行修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               req('updateRollImageCondition',{
                rollImageIds:this.idList.join(','),
                rollImageCondition:0
              }).then(res=>{
                if(res.code!=1)  return this.$message.error(res.msg)
                    this.$message.success('修改成功！')
                    this.getlistRollImages()
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
        {label:'图片路径',prop:'imageUrl'},
        {label:'状态',prop:'rollImageCondition'},
        {label:'预览',prop:'rollImageGoodsCode'},
        {label:'有效期起',prop:'rollImageBeginDate'},
        {label:'有效期止',prop:'rollImageEndDate'},
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
        rollImageWeight:'',
        rollImageGoodsCode:'',
        rollImageBeginDateStr:'',
        rollImageEndDateStr:'',
        imageId:'',
        name:'',
      },
      rules:{
        rollImageWeight:[
          { required: true, message: '该项不能为空', trigger: 'blur' },
        ],
        name:[
           { required: true, message: '该项不能为空', trigger: 'change' },
        ],
        rollImageBeginDateStr:[
           {  required: true, validator:checkStart, trigger: 'change' },
        ],
        rollImageEndDateStr:[
           {  required: true,validator:checkEnd, trigger: 'change' },
        ],
      },
      
    }
  },
  mounted(){
    this.fromData.rollImageCondition = '2'
    this.pageinfo.rollImageCondition = this.fromData.rollImageCondition
    this.getlistRollImages()
  },
  methods:{
    getlistRollImages(){
        req('listRollImages',{
        ...this.pageinfo
      }).then(res=>{
        console.log(res)
        this.tableData = res.data.list
        this.tableData.forEach(item=>{
          if(item.rollImageCondition === 0)
            item.rollImageCondition = '禁用'
          else if(item.rollImageCondition === 1)
             item.rollImageCondition = '启用'  
        })
        this.pageinfo.total =  res.data.total
        
      })
    },
    getshopList(){
      req('getlistRollImageGoods',{
        ...this.choseInfo,
      }).then(res=>{
        // console.log(res)
        this.showtableData = res.data.list
        this.showtableData.forEach(item => {
          if(item.goodsCondition === 0)
            item.goodsCondition = "未发布"
          else if(item.goodsCondition === 1)  
            item.goodsCondition = "在售"
          else if(item.goodsCondition === 2)
            item.goodsCondition = "已下架"  
        });
        this.choseInfo.total =  res.data.total
      })
    },
    search(){
      this.pageinfo.pageNum = 1
      this.pageinfo.rollImageCondition = this.fromData.rollImageCondition
      this.getlistRollImages()
      console.log(this.fromData)
    },
    reset(){
      this.pageinfo.pageNum = 1
      this.pageinfo.rollImageCondition = 2
      this.getlistRollImages()
      console.log(this.fromData)
    },
    handleSizeChange(value){
      this.pageinfo.pageSize = value
       this.getlistRollImages()
      console.log(value)
    },
    handleCurrentChange(value){
       this.pageinfo.pageNum = value
      this.getlistRollImages()
      console.log(value)
    },
    handleSelectionChange(cols){
       console.log(cols)
       this.IsChecked = cols
       this.idList = []
        cols.forEach(item=>{
        this.idList.push(item.rollImageId)
      })  
    },
     handleAvatarSuccess(res, file){
      // this.dialogFromData.headImage = URL.createObjectURL(file.raw);
      // console.log(this.dialogFromData.headImage)
      this.dialogFromData.imageId = res.data.imageId
      console.log(res.data.imageId)
    },
    close(data){
      this.show=data
      this.$refs.form.resetFields();
      this.fileList = []
      this.dialogFromData.imageId = ''
       this.dialogFromData.name = ''
    },
    outerVisible(){
      this.show = false
      this.$refs.form.resetFields();
      this.fileList = []
      this.dialogFromData.imageId = ''
       this.dialogFromData.name = ''
    },
    innerVisible(){
     this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.choseId)
         
          req('addRollImage',{
            ...this.dialogFromData
          }).then(res=>{
            if(res.code!=1)  return this.$message.error(res.msg)
                this.$message.success('新增成功！')
             this.show = false  
             this.pageinfo.pageNum = 1
             this.pageinfo.rollImageCondition = 2
             this.getlistRollImages() 
          })
        } else {
          console.log('error submit!!');
          return false;
         }
      });
    },
    choseBox(){
      this.dialogVisible = true
      this.getshopList()
    },
    chosehandleSizeChange(value){
      this.choseInfo.pageSize = value
          this.getshopList()
    },
    chosehandleCurrentChange(value){
      this.choseInfo.pageNum = value
          this.getshopList()
    },
    choseSearch(){
      this.choseInfo.pageNum = 1
      this.choseInfo.goodsName = this.showDate.goodsName
      this.choseInfo.goodsCode = this.showDate.goodsCode
      this.getshopList()
     },
    choseReset(){
       this.choseInfo.pageNum = 1
       this.choseInfo.goodsName = ''
       this.choseInfo.goodsCode = ''
       this.showtableData.goodsName = ''
       this.showtableData.goodsCode = ''
       this.getshopList()
    },
    // showhandleSelectionChange(cols){
      // console.log(cols)
      // this.choseId = cols[0].goodsId
      // if(cols.length > 1){
      //    return this.$message.warning('只能选择一项数据！')
      // }  
    // },
    showhandleSelectionChange(row){
      // console.log(row )
      this.choseId = []
      if(row.length > 0)
      this.choseId.push(row[0])
       if(row.length > 1){
         this.$refs.choseRef.toggleRowSelection(row[1],false)
         return this.$message.warning('只能选择一项数据！')
       }   
    },
    sumit(){
      console.log(this.choseId)
      if(this.choseId.length != 1)
          return this.$message.warning('请选择一项数据！')
      this.dialogFromData.name = this.choseId[0].goodsName    
      this.dialogVisible =false
      this.dialogFromData.rollImageGoodsCode = this.choseId[0].goodsId
      this.choseId = []
    },
    colse(){
      this.dialogVisible =false
      this.dialogFromData.rollImageGoodsCode = this.choseId[0].goodsId
      this.choseId = []
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
          margin-left: -120px;
        }
        .el-input__inner{
          width: 100%;
        }
      }
    }
  }
}
/deep/ .el-dialog{
  width: 45%;
}
/deep/ .el-dialog{
   .el-pagination{
    text-align: right;
    margin-top: 15px;
  }
}
</style>