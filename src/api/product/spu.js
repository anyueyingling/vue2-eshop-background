import request from '@/utils/request';
// 获取Spu商品信息 /admin/product/{page}/{limit} method：get
export const reqSpuList = (page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id},
})

// 获取spu基本信息 /admin/product/getSpuById/{spuId}
export const reqBsaeSpuList=(spuId)=>request({
    url:`/admin/product/getSpuById/${spuId}`,
    methos:'get'
})

// 获取品牌信息 /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList=()=>request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:"get"
})
// 获取图片信息 /admin/product/spuImageList/{spuId}
export const reqImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:"get"
})
// 获取平台全部销售属性 /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList =()=>request({
    url:'/admin/product/baseSaleAttrList',
    method:'get',
})
// 修改或者添加spu
export const reqAddOrUpdateSpu=(spuInfo)=>{
    if(spuInfo.id){
        // spuInfo参数中带有id参数
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo});
    }else{
        // spuInfo参数中不带有id参数
        return request({url:"/admin/product/saveSpuInfo",method:'post',data:spuInfo});
    }
}
// 删除spu
export const reqDeleteSpu = (spuId)=>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete',
})
// /admin/product/findBySpuId/{spuId}
export const reqSkuList =(spuId)=>request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get',
})



