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
  getlistStores:{
    url:'/pc/store/listStores',
    method: 'post',
  },
  listAreasByParentCode:{
    url:'/pc/area/listAreasByParentCode',
    method: 'post',
  },
  addStore:{
    url:'/pc/store/addStore',
    method: 'post',
  },
  findStores:{
    url:'/pc/store/findStoresById',
    method: 'post',
  },
  updateStore:{
    url:'/pc/store/updateStoreById',
    method: 'post',
  },
  deleteStore:{
    url:'/pc/store/deleteStoreById',
    method:'post'
  }
  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request