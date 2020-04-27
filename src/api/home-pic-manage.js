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
  listRollImages:{
    url: '/pc/rollImage/listRollImages',
    method: 'post',
  },
  updateRollImageCondition:{
    url: '/pc/rollImage/updateRollImageConditionById',
    method: 'post',
  },
  deleteRollImage:{
    url:'/pc/rollImage/deleteRollImageById',
    method: 'post',
  },
  addRollImage:{
    url:'/pc/rollImage/addRollImage',
    method: 'post',
  },
  getshopList:{
    url:'/pc/goods/listAllGoods',
    method: 'post',
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request