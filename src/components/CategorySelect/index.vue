<template>
  <div>
    <!--行内表单-->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model="cForm.category1Id" @change='handle1' :disabled='!show'>
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key='c1.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cForm.category2Id" @change='handle2' :disabled='!show'>
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key='c2.id'></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cForm.category3Id" @change='handle3' :disabled='!show'>
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key='c3.id'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data(){
    return{
      list1:[],
      list2:[],
      list3:[],
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }
    }
  },
  mounted(){
    this.getCategoryList();
  },
  methods:{
    // 获取一级分类的数据
    async getCategoryList(){
      let result = await this.$API.attr.reqCateGoryList();
      if(result.code == 200){
        this.list1 = result.data;
      }
    },
    // 获取二级分类的数据
    async handle1(){
      // 清除数据
      this.list2=[];
      this.list3=[];
      this.cForm.category2Id = '';
      this.cForm.category3Id = '';
      // 结构出一级分类的id
      const {category1Id} = this.cForm;
      this.$emit('getCartgoryId',{getCartgoryId:category1Id,level:1});
      let result = await this.$API.attr.reqCateGory2List(category1Id);
      if(result.code == 200){
        this.list2 = result.data;
      }
    },
    // 获取三级分类的数据
    async handle2(){
      // 清除数据
      this.list3=[];
      this.cForm.category3Id = '';
      // 结构出二级分类的id
      const {category2Id} = this.cForm;
      this.$emit('getCartgoryId',{getCartgoryId:category2Id,level:2});
      let result = await this.$API.attr.reqCateGory3List(category2Id);
      if(result.code ==200){
        this.list3 = result.data;
      } 
    },
    handle3(){
      const {category3Id} = this.cForm;
      this.$emit('getCartgoryId',{getCartgoryId:category3Id,level:3});
    }
  }
};
</script>

<style>
</style>