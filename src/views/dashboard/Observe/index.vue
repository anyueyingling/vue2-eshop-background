<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <Search />
          <!-- 表格
        :default-sort="{ prop: 'date', order: 'descending' }"-->
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index" label="排名" width="80">
            </el-table-column>
            <el-table-column label="搜索关键字" width="180"> </el-table-column>
            <el-table-column label="用户数" sortable> </el-table-column>
            <el-table-column label="周涨幅" sortable> </el-table-column>
          </el-table>
          <!--分页器-->
          <el-pagination layout="prev, pager, next" :total="1000" class='pagination'>
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <Category />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
export default {
  name: "",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    Search,
    Category,
  },
};
</script>

<style>
.pagination{
    float:right;
}
</style>