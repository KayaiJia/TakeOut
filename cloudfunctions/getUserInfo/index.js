// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let userData={}

  await cloud.database().collection('user').where({
    id:event.openid
  })
  .get()
  .then(res=>{
    for (key in res.data){
      userData[key]=res.data[key]
    }
  })
  .catch(err=>{

  })

  return {
   userData
  }
}