<template>
  <div class="i-search">
    <el-form :model="model" ref="from">
      <slot></slot>  
      <el-form-item>
           <el-button type="primary" @click="search">查询</el-button>
           <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>   
    </el-form>
  </div>
</template>
<script>

export default {
  name:'i-search',
  props:{
    model:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {

      ruleForm:{
        name:'',
      }
    }
  },
  methods:{
    search(){
      this.$emit('search')
    },
    reset(){
      console.log(this.$refs.from.model)
      this.$emit('reset')
      this.$refs.from.resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>

// .el-input{
//     width: 300px;
//   }
.el-form{
  /deep/ .el-form-item{
    margin-bottom: 0;
    
  }
}
</style>