<template>
  <div>
    <el-card>
      <!--三级联动-->
      <CategorySelect @getCartgoryId="getCartgoryId" :show="scene ==0" />
    </el-card>
    <el-card>
      <div v-show='scene == 0'>
        <!--展示SPU列表结构-->
        <el-button type="primary" icon="el-icon-plus" style='margin:20px 0px' :disabled='!category3Id' @click='addSpu'>添加SPU</el-button>
        <!--spu-->
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <HintButton type="success" icon='el-icon-plus' size='mini' title='添加sku' @click='addSku(row)'></HintButton>
              <el-button type="warning" icon='el-icon-edit' size='mini' title='修改spu' @click="updateSpu(row)"></el-button>
              <el-button type="info" icon='el-icon-info' size='mini' title='查看当前spu的所有sku实例' @click='handle(row)'></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" style='margin:10px' @onConfirm='deleteSpu(row)'>
                <el-button type="danger" icon='el-icon-delete' size='mini' title='删除spu' slot="reference"></el-button>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>
        <!--分页器
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        -->
        <el-pagination
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="prev, pager, next, jumper,->, total, sizes"
          :total="total">
        </el-pagination>
      </div>
      <SpuForm v-show='scene ==1' @changeScene='changeScene' ref='spu'></SpuForm>
      <SkuForm v-show='scene ==2' ref='sku' @changescenes='changescenes'></SkuForm>
    </el-card>

  <el-dialog :title="`${spu.spuName}的列表`" :visible.sync="dialogTableVisible" :before-close="close">
    <el-table :data='skuList' border v-loading='loading'>
      <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
      <el-table-column prop="price" label="价格" width="150"></el-table-column>
      <el-table-column prop="weight" label="重量" width="200"></el-table-column>
      <el-table-column  label="默认图片" width="200">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style='width:100px;height:100px'>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm';
import SkuForm from './SkuForm';
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page:1,
      limit:3,
      // 存储spu列表信息
      records:[],
      total:0,
      scene:0, // 0代表展示spu列表信息，1代表添加或者修改spu,2代表添加sku
      dialogTableVisible:false, // 控制对话框的显示与隐藏
      spu:{},
      skuList:[],
      loading:true,
    };
  },
  components:{SpuForm,SkuForm},
  methods: {
    // 三级联动的自定义事件，可以吧子组件相应的id传给父组件
    getCartgoryId({ getCartgoryId, level }) {
      if (level == 1) {
        this.category1Id = getCartgoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = getCartgoryId;
        this.category3Id = "";
      } else {
        this.category3Id = getCartgoryId;
        this.getSpuList();
      }
    },
    // 通过三级id获取spu数据
    async getSpuList() {
      // 结构出三级id
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList( page, limit, category3Id);
      if(result.code == 200){
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 改变分页器的页数展示数据
    handleCurrentChange(page){
      this.page = page;
      this.getSpuList();
    },
    // 分页器函数，改变每页展示的数据个数
    handleSizeChange(limit){
      this.limit = limit;
      this.getSpuList();
    },
    // 点击添加Spu按钮，触发回调
    addSpu(){
      this.scene = 1;
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 点击修改按钮的回调函数
    updateSpu(row){
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件的回调函数
    changeScene(scene){
      this.scene= scene;
      this.getSpuList(this.page);
    },
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if(result.code == 200){
        this.$message('删除成功');
        this.getSpuList(this.records.length>1?this.page:this.page-1);
      }
    },
    // 添加sku
    addSku(row){
      this.scene =2;
      // 父组件调用子组件的方法，让子组件发请求
        this.$refs.sku.getData(this.category1Id,this.category2Id,row);
    },
    // 自定义事件的回调
    changescenes(scene){
      this.scene = scene;
      this.getSpuList(this.page);
    },
    // 查看sku列表
    async handle(spu){
      this.dialogTableVisible = true;
      this.spu = spu;
     let result = await this.$API.spu.reqSkuList(spu.id);
     if(result.code == 200){
      this.skuList = result.data;
      this.loading = false;
     }
    },
    // 对话框关闭的回调
    close(done){
      this.loading = true;
      this.skuList=[];
      done();
    }

  },
};
</script>

<style>
</style>