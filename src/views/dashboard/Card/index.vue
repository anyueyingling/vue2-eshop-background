<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Detail title='总销售额' count='126560'>
                    <template slot='charts'> 
                        <span>周同比 56.67% <svg t="1662506505149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3548" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3549" fill="#d81e06"></path></svg></span>
                        <span>日同比 19.96% <svg t="1662506605835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4550" width="16" height="16"><path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z" p-id="4551" fill="#1afa29"></path></svg></span>
                    </template>

                    <template slot='footer'> 
                        <span>日销售额￥12232</span>
                    </template>
                </Detail>
                
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='访问量' count='88460'>
                    <template slot='charts'> 
                        <LineChart></LineChart>
                    </template>

                    <template slot='footer'> 
                        <span>日访问量1234</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='支付笔数' count='88460'>
                    <template slot='charts'> 
                        <barCharts></barCharts>
                    </template>

                    <template slot='footer'> 
                        <span>转化率65%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='运营活动效果' count='78%'>
                    <template slot='charts'> 
                        <progressCharts/>
                    </template>
                    <template slot='footer'> 
                        <span>周同比 12% <svg t="1662506505149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3548" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3549" fill="#d81e06"></path></svg></span>
                        <span>日同比 11% <svg t="1662506605835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4550" width="16" height="16"><path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z" p-id="4551" fill="#1afa29"></path></svg></span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
    name:"Card",
    components:{
        Detail,
        LineChart,
        barCharts,
        progressCharts,
    }
}
</script>

<style>

</style>