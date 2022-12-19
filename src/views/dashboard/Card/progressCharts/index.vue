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
                min:0,
                max:100,
            },
            yAxis:{
                show:false,
                type:'category'
            },
            series:[
                {
                    type:'bar',
                    data:[78],
                    barWidth:10,
                    color:'yellowgreen',
                    showBackground:true,
                    backgroundColor:{
                        color:'#eee',
                    },
                    label:{
                        show:true,
                        formatter:"|",
                        position:"right",
                    }
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