<template>
  <div class="i-table">
    <div class="btn-list" v-show="toolbar.length">
      <!-- <template slot-scope="scope"> -->
        <!-- {{scope.row}} -->
        <el-button v-for="(item, index) in toolbar" :key="index" :type="item.type" @click="item.func">
        {{item.name}}
        </el-button>
      <!-- </template>   -->
    </div>

    <div class="table-container" v-show="tabledata.length">
      <el-table border :data="tabledata" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" v-show="selecttionShow"></el-table-column>
          <slot></slot>
      </el-table>
    </div>

   <div class="table-pagination" v-show="tabledata.length">
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :selecttionShow = "true"
        :current-page="pageinfo.pageNum"
        :page-sizes="[5,12,20]"
        :page-size="pageinfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageinfo.total">
    </el-pagination>
   </div>
  </div>
</template>

<script>
export default {
  name:'i-table',
  props:{
    toolbar:{
      type:Array,
      default:()=>{
        return []
      }
    },
    tabledata:{
      type:Array,
      default:()=>{
        return []
      }
    },
    pageinfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    selecttionShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      currentPage:1,
    }
  },
  methods:{
    handleSizeChange(value){
      this.$emit('handleSizeChange',value)
    },
    handleCurrentChange(value){
      this.$emit('handleCurrentChange',value)
    },
    handleSelectionChange(col) {
      this.$emit('handleSelectionChange',col)
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-table{
//   width: 1200px;
//   margin: 0 auto;
// }
.btn-list{
  margin: 20px 0px 20px 35px;
  .el-button{
     padding: 0 15px;
      border-radius: 0;
      height: 30px;
      line-height: 30px;
      text-align: center;
  }
}
.table-pagination{
   margin: 20px 20px 0 0;
   text-align: right;
}
.table-container{
  margin: 0 35px;
}
</style>