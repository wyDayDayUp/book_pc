<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="v"
      @close="close"
    >
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible">取 消</el-button>
      <el-button type="primary" @click="innerVisible">确定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'i-dialog',
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
    }
  },
  data() {
    return {
      v:this.visible,
    }
  },
  methods:{
    
    close(){
      this.$emit('close',false)
    },
    outerVisible(){
      this.$emit('outerVisible')
    },
    innerVisible(){
      this.$emit('innerVisible')
    }
  },
  watch: {
      visible(val) {
        console.log(val)
        this.v = val
      }
    },
}
</script>



<style lang="scss" scoped>

</style>