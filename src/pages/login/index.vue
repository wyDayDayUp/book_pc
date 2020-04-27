<template>
  <div class="login">
    <div class="login_box">
      <div class="avater_box">
        <img src="@/assets/icon.jpg">
      </div>
      <el-form label-width="0px" class="loginFrom" :model="from" :rules="rules" ref="from">
        <el-form-item prop="username" label="">
          <el-input prefix-icon="el-icon-user" class="a" v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-goods" v-model="from.password" type="password" class="a"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('from')">登录</el-button>
          <el-button type="info" @click="resetForm('from')">重置</el-button>
        </el-form-item>
      </el-form> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            axios.post('http://299z2526w7.wicp.vip/uaa/auth/form',qs.stringify(this.from) ).then(res=>{
              console.log(res.data)
              console.log(qs.parse(this.from))
              if(res.data.code!=0) return this.$message.error('用户名或密码错误')
              this.$message.success('登录成功')
              window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
              this.$router.push('/home')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  data() {
    return {
      logindata:[],
      from:{
        username:'admin',
        password:'123456'
      },
      rules:{
         username:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login{
  // background-color: #2b4b6b;
  background: url('u.jpg') no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  right: 3%;
  top: 40%;
  transform: translateY(-50%);
  .avater_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns{
  display: flex;
  justify-content: center;
  .el-button{
    margin-left: 10px;
  }
}
.loginFrom{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.el-input{
  width: 100%;
  font-size: 20px;
  line-height: 50px;
}
/deep/.a .el-input__inner{
  padding-left: 40px;
  font-size: 16px;
  flex: 1;
}
</style>