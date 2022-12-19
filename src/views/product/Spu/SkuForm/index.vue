<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model='skuInfo.skuName'></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type='number' v-model='skuInfo.price'></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model='skuInfo.weight'></el-input>
      </el-form-item>

      <el-form-item label="规则描述">
        <el-input type="textarea" rows="4" v-model='skuInfo.skuDesc'></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for='(attr,index) in attrInfoList' :key='attr.id'>
            <el-select placeholder="请选择" v-model='attr.attrIdAndAttrvalueId'>
              <el-option :label="attr1.valueName" :value="`${attr.id}:${attr1.id}`" v-for='(attr1,index) in attr.attrValueList' :key='attr1.id'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for='(saleAttr,index) in spuSaleAttrLIst' :key='saleAttr.id'>
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndAttrValueId">
              <el-option :label="attrValue.saleAttrValueName" :value="`${saleAttr.id}:${attrValue.id}`" v-for='(attrValue,index) in saleAttr.spuSaleAttrValueList' :key='attrValue.id'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data='spuImageList'>
          <el-table-column
            prop="prop"
            label="label"
            width="80"
            type="selection"
            @selection-change="handleSelectionChange"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" alt="" style='width:100px;height:100px'>
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if='row.isDefault ==0' @click='changeIsdefault(row)'>设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click='save'>保存</el-button>
        <el-button @click='cancel'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrLIst: [],
      attrInfoList: [],
      // 向服务器提交的参数
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 通过v-model双向绑定
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 默认图片
        skuDefaultImg: "",
        skuAttrValueList: [
          /* {
            attrId: 0,
            valueId: 0,
          }, */
        ],
        
        skuImageList: [
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],        
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],  
      },
      spu:{},
      // 收集图片的数据字段
      imageList:[],
    };
  },
  methods: {
    // 获取sku数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片
      let result = await this.$API.sku.reqImageList(spu.id);
      if (result.code == 200) {
        let list = result.data;
        // 添加是否默认标签
        list.forEach(item=>{
          item.isDefault = 0
        });
        this.spuImageList = list;
      }
      // 获取销售属性数据
      let result1 = await this.$API.sku.reqSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrLIst = result1.data;
      }
      // 获取商品信息
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // 点击复选框按钮时的回调函数
    handleSelectionChange(params){
      this.imageList = params;
    },
    // 点击设置默认按钮
    changeIsdefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消按钮的回调
    cancel(){
      // 通知父组件切换场景
      this.$emit('changescenes',0);
      // 清除数据
      Object.assign(this._data,this.$options.data());
    },
    // 保存按钮的回调
    async save(){
      // 整理数据
      const {attrInfoList,skuInfo,spuSaleAttrLIst,imageList} = this;
      let arr = [];
      let arr2 = [];
      attrInfoList.forEach(item=>{
        if(item.attrIdAndAttrvalueId){
          const [attrId,valueId] = item.attrIdAndAttrvalueId.split(":");
          let obj = {attrId,valueId};
          arr.push(obj);
        }
      });
      spuSaleAttrLIst.forEach(item=>{
        if(item.saleAttrIdAndAttrValueId){
          const [saleAttrId,saleAttrValueId] =item.saleAttrIdAndAttrValueId.split(":");
          let obj = {saleAttrId,saleAttrValueId};
          arr2.push(obj);
        }
      })
      skuInfo.skuAttrValueList = arr;
      skuInfo.skuSaleAttrValueList = arr2;

      skuInfo.skuImageList = imageList.map(item=>{
        return {
            imgName: item.imgName,
            imgUrl: item.imgUrl,
            isDefault: item.isDefault,
            spuImgId: item.id,
        }
      });
      let result = await this.$API.sku.reqSaveSkuInfo(skuInfo);
      if(result.code ==200){
        this.$message.success('保存成功');
        // 切换页面
        this.$emit('changescenes',0);
      }
    },
    
  },
};
</script>

<style>
</style>