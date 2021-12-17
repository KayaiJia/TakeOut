// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/** 
 * 100 添加失败
 * 
*/

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  let status=-1

  db.collection('user').add({
    data: {
      id:event.openid,
      address:[],
      merchants:0,
      order:[],
    }
  })
  .then(res=>{
    status=0
  })
  .catch(res=>{
    status=100
  })


  return {
    status,
  }
}