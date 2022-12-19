<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCartgoryId="getCartgoryId" :show='isShowTable'/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!--添加表格-->
        <el-table style="width: 100%" :data="attrList">
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :data="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          align="center"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if='row.flag'
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref='$index'
              ></el-input>
              <span v-else @click="toEdit(row,$index)" style='display:block'>{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm='deleteAttrValue($index)'>
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click='addOrUpdateAttr' :disabled='attrInfo.attrValueList.length<1'>保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 自定义事件的回调函数
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
        this.getAttrList();
      }
    },
    // 通过三级id获取数据
    async getAttrList() {
      // 结构出三级id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag:true,
      });
      // 添加一个属性值时聚焦
      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus();
      })
    },
    // 添加属性值的回调
    addAttr() {
      this.isShowTable = false;
      // 点击取消按钮时，清除数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 点击修改按钮时的回调
    updateAttr(row){
      this.isShowTable = false;
      //console.log(row);
      this.attrInfo.attrName = row.attrName;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach(item=>{
        this.$set(item,'flag',false);
      })
    },
    // 失去焦点的回调函数
    toLook(row){
      if(row.valueName.trim()==''){
        this.$message('请输入一个正确的属性');
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some(item=>{
        if(row!=item){
          return row.valueName == item.valueName;
        }
      })
      if(isRepat) return;
      row.flag = false;
    },
    toEdit(row,index){
      row.flag = true;
      this.$nextTick(()=>{
        this.$refs[index].focus();
      })
    },
    // 删除一行属性值
    deleteAttrValue(index){
      //console.log(index)
      this.attrInfo.attrValueList.splice(index,1);
    },
    // 点击保存按钮，添加或者更新数据
    async addOrUpdateAttr(){
      // 整理数据，过滤空的属性值
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag;
          return true;
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.$message('保存成功');
        this.getAttrList();
        this.isShowTable = true;
      } catch (error) {
        this.$message('保存失败');
      }
      
    }
  },
};
</script>

<style>
</style>