<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick" style="font-size:25px"></i>
    <div>
      <!-- //渲染data里的数据 -->
      {{username}} <span style="padding:0px 15px">{{realname}}</span>
      <span @click="handleOut">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      realname: ""
    };
  },
  methods: {
    handleClick() {
      this.$emit("updateCollapse");
    },
    //退出功能：退出跳转到首页，清除本地数据
    handleOut() {
      this.$axios({
        url: "/admin/account/logout",
        method: "GET",
        // 处理跨域请求的参数
        withCredentials: true
      }).then(res => {
        console.log(res);
        //这个是只拿res.data里面的status
        const { status } = res.data;
        if (status == 0) {
          //1.跳转到首页
          // this.$router.push("/login")  因为返回登陆页后，按后退键还会退到首页
          this.$router.replace("/login"); 
          //2.清除本地数据
          localStorage.removeItem("username");
          localStorage.removeItem("realname");
        }
      });
    }
  },
  //生命周期，事件执行完了执行
  mounted() {
    //从本地获取信息 ：localStorage.getItem("username");
    //this.username，意思就是把此处的值赋值给data里的username
    this.username = localStorage.getItem("username");
    this.realname = localStorage.getItem("realname");
    console.log(this.username, this.realname);
  }
};
</script>

<style>
.el-icon-back {
  cursor: pointer;
}
.user-info span {
  cursor: pointer;
}
</style>
