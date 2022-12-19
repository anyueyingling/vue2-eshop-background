<template>
  <div>
    <div class="header">
        <span>搜索用户数</span>
        <svg t="1662504402386" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2375" width="20" height="20"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2376"></path></svg>
    </div>
    <div class="main">
        <span>12321</span>
        <span>17.1</span>
        <svg t="1662506505149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3548" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3549" fill="#d81e06"></path></svg>
        <svg t="1662506605835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4550" width="16" height="16"><path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z" p-id="4551" fill="#1afa29"></path></svg>
    </div>
    <div class='footer'>
        <div class="charts" ref='charts'>

        </div>
    </div>
  </div>
</template>

<script>
import *as echarts from 'echarts'
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
                        color:'blue'
                    },
                    areaStyle:{
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
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
.header{
    display:flex;
    align-items: center;   
    margin-bottom: 10px;
}
.header span{
    margin-right:20px;
}
.main{
    margin-bottom: 10px;
}
.main :nth-child(2){
    margin-left:20px;
}
.charts{
    width:100%;
    height:50px;
}
</style>