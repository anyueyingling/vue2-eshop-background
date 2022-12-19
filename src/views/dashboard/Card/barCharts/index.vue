<template>
  <div class='echarts' ref='charts'>

  </div>
</template>

<script>
import *as echarts from 'echarts';
export default {
    mounted(){
        // 初始化实例
        let barCharts = echarts.init(this.$refs.charts);
        // 配置数据
        barCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false,
            },
            series:[
                {
                    type:'bar',
                    data:[10,7,33,34,45,35],
                    
                }
            ],
            grid:{
                top:0,
                bottom:0,
                left:0,
                right:0,
            },
            tooltip:{}
        })
    }
}
</script>

<style>
.echarts{
    width:100%;
    height:100%;
}
</style>