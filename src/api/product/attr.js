import request from '@/utils/request'
// 一级分类接口
export const reqCateGoryList = ()=>request({
    url:'/admin/product/getCategory1',
    method:'get'
})
// 获取二级分类接口
export const reqCateGory2List = (category1Id) => request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'get'
})
// 获取三级分类接口
export const reqCateGory3List = (category2Id) => request({
    url:`/admin/product/getCategory3/${category2Id}`,
    method:'get'
})
// 通过三级ID获取数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id,category2Id,category3Id) =>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get',
})
// 添加属性值和属性名称接口 /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => request({
    url:'/admin/product/saveAttrInfo',
    method:'post',
    data,
})

