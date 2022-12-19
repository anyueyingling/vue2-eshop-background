<template>
  <div>
    <div class="search-header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span>
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item >双皮奶</el-dropdown-item>
          <el-dropdown-item >蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="search-body">
      <el-row :gutter="10">
        <el-col :span="12">
          <Linecharts />
        </el-col>
        <el-col :span="12">
          <Linecharts />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Linecharts from "./Linecharts";
export default {
  name: "",
  components: {
    Linecharts,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  margin: 0px 0px 10px 0px;
  border-bottom: 2px solid #ccc;
}
</style>