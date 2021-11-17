// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
let status=-1

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let userData=1

  await cloud.database().collection('user').where({
    id:event.openid
  })
  .get()
  .then(res => {
    userData=res.data.length
    console.log("查询成功",userData)
    status=0
  })
  .catch(err =>{
    userData=undefined
    status=200
    console.log("查询失败",err)
  })
  console.log("结尾",userData)

  return {
    userData,
    status,
  }
}