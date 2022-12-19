import request from '@/utils/request'
//获取品牌列表接口 /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit) => request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get',
})
// 处理添加品牌操作
// /admin/product/baseTrademark/save
export const reqaddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}
// 删除品牌接口
export const reqDeleteTradeMark = (id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete',
})