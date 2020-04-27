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
    url:'/pc/hotGoods/listHotGoods',
    method:'post'
  },
  addHotShop:{
    url:'/pc/hotGoods/addHotGoods',
    method:'post'
  },
  editHotShop:{
    url:'/pc/hotGoods/updateHotGoodsById',
    method:'post'
  },
  getChoseList:{
    url:'/pc/goods/listGoods',
    method:'post'
  },
  deleteHot:{
    url:'/pc/hotGoods/deleteHotGoodsById',
    method:'post'
  },
  findDisplayNum:{
    url:'/pc/hotGoods/findDisplayNum',
    method:'post'
  },
  updateDisplayNum:{
    url:'/pc/hotGoods/updateDisplayNum',
    method:'post'
  }
  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request