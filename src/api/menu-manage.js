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
  listMenus:{
    url:'/pc/menu/listMenus',
    method:'post',
  },
  getmenuList:{
    url:'/pc/menu/findMenuById',
    method:'post',
  },
  addmenu:{
    url:'/pc/menu/addMenu',
    method:'post',
  },
  editmenu:{
    url:'/pc/menu/updateMenuById',
    method:'post',
  },
  deletemenu:{
    url:'/pc/menu/deleteMenuById',
    method:'post',
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request