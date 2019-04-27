<template>
     <!-- 新增、删除、搜索栏 -->
  <div>
    <el-row type="flex" justify="space-between" class="container">
      <div class="a1">
        <el-button>新增</el-button>
        <el-button @click="handleMoreDelete">删除</el-button>
      </div>
      <div class="a2">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 商品列表栏 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题" width="500px">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" alt style="width:64px">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="类型" width="180"></el-table-column>
      <el-table-column prop="market_price" label="价格" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页功能 -->
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 5, 5, 5]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="17">
    </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ids: [],
      page:[{
         currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }]
    };
  },
  methods: {
    handleSelectionChange(val) {
      //获取conselo获取的数据中的id,不止一个
      const ids = val.map(v => {
        return v.id;
      });
      this.ids = ids;
    },
    //封装函数
    getList() {
      this.$axios({
        url: "/admin/goods/getlist?pageIndex=1&pageSize=4&searchvalue=",
        withCredentials: true
      }).then(res => {
        // console.log(res);
        //保存请求的数据到上面data中
        const { message } = res.data;
        this.tableData = message;
        // console.log(this.data);
      });
    },
    //实现编辑功能
    handleEdit(row) {
      console.log(row);
    },
    //实现删除功能
    handleDelete(row) {
      //1/获取id
      const id = row.id;
      // //2、调用删除接口
      //  this.$axios({
      //    url:`/admin/goods/del/${id} `,
      //     withCredentials: true,
      //  }).then(res=>{
      //       console.log(res)
      //  })

      //提示是否删除
      this.$confirm("确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //2、调用删除接口
          this.$axios({
            url: `/admin/goods/del/${id} `,
            withCredentials: true
          }).then(res => {
            console.log(res);
          });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //调用函数进行刷新页面
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //实现点击删除多选功能
    handleMoreDelete() {
      const id = this.ids.join(",");

      //提示是否删除
      this.$confirm("确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //2、调用删除接口
          this.$axios({
            url: `/admin/goods/del/${id} `,
            withCredentials: true
          }).then(res => {
            console.log(res);
          });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //调用函数进行刷新页面
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页功能
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
   handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  mounted() {
    //去Methods封装成函数
    // this.$axios({
    //   url: "/admin/goods/getlist?pageIndex=1&pageSize=4&searchvalue=",
    //   withCredentials: true
    // }).then(res => {
    //   // console.log(res);
    //   //保存请求的数据到上面data中
    //   const { message } = res.data;
    //   this.tableData = message;
    //   // console.log(this.data);
    // }); getList()
    //调用式函数
    this.getList();
  }
};
</script>

<style>
.block{
  padding: 20px 0;
}
.container {
  margin: 20px 0;
}
.el-select .el-input {
  width: 110px;
}
</style>
