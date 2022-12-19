<template>
  <div>
    <el-form ref="form" label-width="80px" :model='spu'>
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model='spu.spuName'></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model='spu.tmId'>
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in trademarkList" :key='tm.id'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input placeholder="SPU描述" type="textarea" rows="4" v-model='spu.description'></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unselectedAttr.length}未选择`" v-model='attrIdAndAttrName'>
        <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unselectedAttr" :key="unselect.id"></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-plus" :disabled='!attrIdAndAttrName' @click='addSaleAttrList'>添加销售属性</el-button>

        <el-table style="width: 100%" border :data='spu.spuSaleAttrList'>
          <el-table-column type='index' label="序号" width="80" align="">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope='{row,$index}'>
                <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
                <el-button type="danger" icon='el-icon-delete' size="mini" @click='spu.spuSaleAttrList.splice($index,1)'></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item >
        <el-button type="primary" @click='addOrUpdateSpu'>保存</el-button>
        <el-button @click='cancel'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储spu
      spu:{      
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: '',
        spuImageList: [
/*             {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0
            } */
        ],        
        spuSaleAttrList: [
/*             {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
                {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0
                }
            ]
            } */
        ],   
      },
      trademarkList:[],
      // 图片
      spuImageList:[],
      saleAttrList:[],
      attrIdAndAttrName:""
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.spuImageList = fileList;
    },
    // 图片墙预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加图片时的回调
    handleSuccess(response, file, fileList){
      // 收集添加图片的信息
      this.spuImageList = fileList;
    },
    // 初始化
    async initSpuData(spu){
       let result=  await this.$API.spu.reqBsaeSpuList(spu.id);
       if(result.code ==200){
        this.spu = result.data;
       }
       // 获取品牌信息
       let result1 = await this.$API.spu.reqTrademarkList();
       if(result1.code == 200){
        this.trademarkList = result1.data;
       }
       let result2 = await this.$API.spu.reqImageList(spu.id);
       if(result2.code == 200){
        let listArr = result2.data;
        listArr.forEach(item => {
            item.name = item.imgName;
            item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
       }
       let result3 = await this.$API.spu.reqBaseSaleAttrList();
       if(result3.code ==200){
        this.saleAttrList = result3.data;
       }
    },
    // 添加一个销售属性
    addSaleAttrList(){
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清空数据
      this.attrIdAndAttrName='';
    },
    // 添加一个属性值
    addSaleAttrValue(row){
      this.$set(row,'inputVisible',true);
      this.$set(row,'inputValue','');
    },
    // 失去焦点则传输数据
    handleInputConfirm(row){
      const {baseSaleAttrId,inputValue} = row;
      // 属性值不能为空
      if(inputValue.trim()==''){
        this.$message('属性值不能为空');
        return;
      }
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
      if(!result) return;

      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      this.$set(row,'inputVisible',false);
    },
    // 保存按钮的回调
    async addOrUpdateSpu(){
      // 整理数据
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return{
          imageName:item.name,
          imageUrl:(item.response&&item.response.data)||item.url,
        };
      });
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if(result.code==200){
        this.$message.success('保存成功');
        this.$emit("changeScene",0);
      };
      // 清除数据
      Object.assign(this._data,this.$options.data());
    },
    // 点击添加按钮触发回调
    async addSpuData(category3Id){
      this.spu.category3Id = category3Id;
      // 获取品牌信息
       let result1 = await this.$API.spu.reqTrademarkList();
       if(result1.code == 200){
        this.trademarkList = result1.data;
       };
      let result3 = await this.$API.spu.reqBaseSaleAttrList();
       if(result3.code ==200){
        this.saleAttrList = result3.data;
       };
    },
    // 点击取消按钮的回调
    cancel(){
      this.$emit("changeScene",0);
      // 清除数据
      Object.assign(this._data,this.$options.data());
    }
    
  },
  computed:{
    // 计算出还未选择的计算属性
    unselectedAttr(){
      let result = this.saleAttrList.filter(item=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name != item1.saleAttrName;
        })
      })
        return result;
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>