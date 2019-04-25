<template>
<div class="ag-ad">
  <el-container>
  <el-aside width="auto">
    <!-- 导入Aside组件 -->
    <!-- 调用 -->
    <Aside  :collapse="isCollapse"> </Aside>
  </el-aside>
  <el-container>
    <el-header>
        <Header @updateCollapse="updateCollapse"></Header>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
//1.导入Aside,Header组件
import Aside from "../components/Aside.vue"
import Header from "../components/Header.vue"
export default {
  data(){
    return{
      //侧边栏展开
      isCollapse:false
    }
  },
  methods: {
        // 修改左侧栏的展开和收起
        updateCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    },
      components:{
         Aside,
         Header
      }
}
</script>

<style>

  .el-header {
    background-color: #fff;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
  
  .el-aside {
    padding-top: 50px;
    background-color: #001529;
    color: #999;
    /* text-align: center; */
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    line-height: 160px;
  }
  
  .ag-ad > .el-container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
