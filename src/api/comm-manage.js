import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getshopList:{
    url:'/pc/goods/listAllGoods',
    method:'post'
  },
  listTreeGoodsCates:{
    url:'/pc/goodsCate/listTreeGoodsCates',
    method:'post'
  },
  listGoodsCates:{
    url:'/pc/goodsCate/listGoodsCatesByParentCode',
    method:'post'
  },
  addGoods:{
    url:'/pc/goods/addGoods',
    method:'post'
  },
  deleteGoods:{
    url:'/pc/goods/deleteGoodsById',
    method:'post'
  },
  updateGoodsCondition:{
    url:'/pc/goods/updateGoodsConditionById',
    method:'post'
  },
  updateGoods:{
    url:'/pc/goods/updateGoodsById',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request