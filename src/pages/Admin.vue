<template>
  <div class="ag-ad">
    <el-container>
      <el-aside width="auto">
        <!-- 导入Aside组件 -->
        <!-- 调用 -->
        <Aside :collapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header @updateCollapse="updateCollapse"></Header>
        </el-header>
        <el-main>
          <!-- 面包屑组件 -->
          <div class="mianB">
            <!-- //方法一 -->
            {{routerIfo.join(" > ")}}
            <!-- 方法二 :调用element组件-->
            <!-- <el-breadcrumb separator=">">

              <el-breadcrumb-item v-for="(item,index) in routerIfo" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb> -->
          </div>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//1.导入Aside,Header组件
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
// import GoodsList from "../pages/GoodsList.vue"

export default {
  data() {
    return {
      //侧边栏展开
      isCollapse: false
    };
  },
  methods: {
    // 修改左侧栏的展开和收起
    updateCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  //注册
  components: {
    Aside,
    Header
  
  },
  computed: {
    routerIfo() {
      const arr = this.$route.matched.map(v => {
        return v.meta
      })
      // console.log(arr);
      return arr;
    }
  }
};
</script>

<style>
.mianB {
  border-bottom: 1px solid #aaa;
  padding-bottom: 15px;
}
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
  background-color: #e9eef3;
  color: #333;
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
