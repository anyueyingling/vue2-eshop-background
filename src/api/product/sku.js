import request from '@/utils/request';
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 商品基础属性接口 get
export const reqAttrInfoList =(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})

// /admin/product/spuImageList/{spuId}
export const reqImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:"get"
})

// /admin/product/spuSaleAttrList/{spuId}
export const reqSaleAttrList=(spuId)=>request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method:"get"
})

// /admin/product/saveSkuInfo post
export const reqSaveSkuInfo= (skuInfo)=>request({
    url:"/admin/product/saveSkuInfo",
    method:'post',
    data:skuInfo,
})

// /admin/product/list/{page}/{limit} get
export const reqSkuList = (page,limit) => request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})
///admin/product/onSale/{skuId}
export const reqOnSale =(skuId)=>request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})

// /admin/product/cancelSale/{skuId}
export const reqCancelSale=(skuId)=>request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})

// /admin/product/getSkuById/{skuId} get
export const reqGetSkuInfo=(skuId)=>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get',
})