<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#999"
    active-text-color="#fff"
    :collapse="collapse"
  >
    <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index+1}`">
      <template slot="title" >
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="`${index+1}-${subindex+1}`">
        <router-link to="subitem.src">{{subitem.name}}</router-link>
        </el-menu-item>

    </el-submenu>
  </el-menu>
</template>
<script>
export default {

    data() {
      return {
        menus: [
          {
            icon: "el-icon-menu",
            name: "购物商城",
            children: [
              { name: "商品管理", src: "/admin/goods-list" },
              { name: "栏目管理", src: "/admin/category-list" }
            ]
          },
          {
            icon: "el-icon-view",
            name: "会员管理",
            children: [
              { name: "会员管理", src: "/admin/account-list" }
              ]
          }
        ]
      };
    },
    props:{
      collapse: {
            // 属性的类型
            type: Boolean,
            // 默认值
            value: false
        }
    }
  
};
</script>
<style>

/* el-menu-vertical-demo el-menu
    el-menu-vertical-demo el-menu--collapse el-menu */
    /* 菜单栏收缩解决办法 */
    .el-menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu{
        border-right: none;
    }
    .el-menu-vertical-demo{

        height:100%;
    }

    .el-menu a{
        color: inherit;
        text-decoration: none;
    }
</style>
