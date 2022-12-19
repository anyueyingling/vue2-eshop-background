<template>
  <div>
    <div class="category-header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="value">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="charts-bar" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    // 初始化实例
    let myCharts = echarts.init(this.$refs.charts);
    // 配置数据
    myCharts.setOption({
      title:{
        text:"视频",
        subtext:1024,
        right:'center',
        top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    myCharts.on("mouseover", (params) => {
      const{name,value}=params.data;
      myCharts.setOption({
        title:{
          text:name,
          subtext:value,
        }
      })
    });
  },
};
</script>

<style>
.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
  padding-bottom: 13px;
}
.el-radio-button__inner {
  padding: 5px 10px;
}
.charts-bar {
  width: 100%;
  height: 300px;
}
</style>