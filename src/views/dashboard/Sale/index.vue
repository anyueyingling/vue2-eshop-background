<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix" style="margin: 10px 0px">
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click='setDay'>今日</span>
        <span @click="setWeek">本周</span>
        <span @click='setMonth'>本月</span>
        <span @click='setYear'> 本年</span>
        <!--v-model="value1"-->
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          size="mini"
          class="date"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!--内容区域-->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span>1</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>2</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>3</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>4</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>5</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>6</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
            <li>
              <span>7</span>
              <span>销售额</span>
              <span>13244</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      date:[]
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 345, 345, 235, 137, 238, 348],
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  // 监听属性
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
  methods:{
    setDay(){
      const day = dayjs().format('YYYY-MM-DD');
      this.date =[day,day];
    },
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.date = [start,end];
    },
    setMonth(){
      const start =dayjs().startOf('month').format('YYYY-MM-DD');
      const end =dayjs().endOf('month').format('YYYY-MM-DD');
      this.date = [start,end];
    },
    setYear(){
      const start =dayjs().startOf('year').format('YYYY-MM-DD');
      const end =dayjs().endOf('year').format('YYYY-MM-DD');
      this.date = [start,end];
    }
  }
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.right span {
  margin: 0px 20px;
}
.date {
  width: 250px;
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  width: 100%;
  height: 250px;
  list-style: none;
  padding: 0;
}
ul li {
  height: 9%;
  margin: 10px 0px;
}
ul li span {
  margin: 0px 10px;
}
</style>