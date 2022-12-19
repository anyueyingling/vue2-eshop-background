<template>
  <div class='echarts' ref='charts'>

  </div>
</template>

<script>
import *as echarts from 'echarts';
export default {
    mounted(){
        // 初始化实例
        let lineCharts = echarts.init(this.$refs.charts);
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false,
            },
            series:[
                {
                    type:'line',
                    data:[10,7,33,34,45,35],
                    smooth:true,
                    itemStyle:{
                        opacity:0,
                    },
                    lineStyle:{
                        color:'purple'
                    },
                    areaStyle:{
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            grid:{
                top:0,
                bottom:0,
                left:0,
                right:0,
            }
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