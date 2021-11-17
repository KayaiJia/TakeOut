// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID

  //登录验证
  const res= await cloud.callFunction({
    name: 'userQuery',
    data:{
      openid,
    },
  })
  let successful=res.result.call
  return {
    successful,
    openid,
  }
}