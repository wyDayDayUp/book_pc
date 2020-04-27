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
  getdriverList:{
    url:'/pc/driver/listDrivers',
    method: 'post',
  },
  listTreeAreas:{
    url:'/pc/area/listTreeAreas',
    method: 'post',
  },
  listAreasByParentCode:{
    url:'/pc/area/listAreasByParentCode',
    method: 'post',
  },
  addDriver:{
    url:'/pc/driver/addDriver',
    method: 'post',
  },
  findDriver:{
    url:'/pc/driver/findDriverById',
    method: 'post',
  },
  deleteDriver:{
    url:'/pc/driver/deleteDriverByUserId',
    method: 'post',
  },
  updateDrivers:{
    url:'/pc/driver/updateDriversById',
    method: 'post',
  },

  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request