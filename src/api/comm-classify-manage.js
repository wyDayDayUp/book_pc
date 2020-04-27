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
  gettreeList:{
    url:'/pc/goodsCate/listTreeGoodsCates',
    method:'post'
  },
  addonemenu:{
    url:'/pc/goodsCate/addGoodsCate',
    method:'post'
  },
  addtwomenu:{
    url:'/pc/goodsCate/addGoodsCate',
    method:'post'
  },
  menuInfo:{
    url:'/pc/goodsCate/findGoodsCateById',
    method:'post'
  },
  editMenu:{
    url:'/pc/goodsCate/updateGoodsCateById',
    method:'post'
  },
  deletemenu:{
    url:'/pc/goodsCate/deleteGoodsCateById',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request