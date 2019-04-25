<template>

<el-row type="flex" justify="center" class="container">
<el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form">
   <el-form-item>
  <div class="title">登陆</div>
   </el-form-item>
            <!-- prop 指定规则查找 -->
  <el-form-item label="账号" prop="uname">
    <el-input v-model="form.uname"></el-input>
  </el-form-item>

    <el-form-item label="密码" prop="upwd">
    <el-input v-model="form.upwd" type="password"></el-input>
  </el-form-item>
  
  <el-form-item class="footer">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
 </el-row>
</template>
<script>
  export default {
    data() {
      return {
        form: {
            uname:"",
            upwd:""
        },
        // 表单的验证规则,element里有
         rules: {
            // 多条规则，不同的状态下触发
          // require 是否必填
          // message 报错提示文字
          // trigger 什么时候触发
          uname: [
            { required: true, message: '请输入账号', trigger: 'blur' }  
          ],
          upwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          }
      }
    },
    methods: {

      //登陆提交
      onSubmit() {
     this.$refs.form.validate(valid=>{
       console.log(valid)
       if(!valid) return;
       console.log('123')

        this.$axios({
      url: "http://localhost:8899/admin/account/login",
     method: "POST",
     data:this.form,
      // 处理跨域请求的参数
     withCredentials: true

      }).then(res=>{
        console.log(res)
       if(res.data.status==0){
         this.$router.push("/admin")
       }else{
           this.$message({
          message:res.data.message,
           type: 'success'
        });

       }
      })
     })
       
     
      }
    }
  }
</script>


<style scoped lang="less">
.title{
  text-align:center;
  // margin: 5px
  font-size: 20px;
  color:cornflowerblue
}
.form{
  width: 450px;
  margin-top:10%
}
.footer{
  text-align:center;
  //  margin: 0px 5px
}

</style>
