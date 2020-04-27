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
  adduser:{
    url:'/pc/user/addUser',
    method: 'post',
  },
  edituser:{
    url:'/pc/user/updateUserById',
    method: 'post',
  },
  listUsers:{
    url:'/pc/user/listUsers',
    method: 'post',
  },
  deleteUser:{
    url:'/pc/user/deleteUserById',
    method: 'post',
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request