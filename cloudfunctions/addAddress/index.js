// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let status=-1
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  let address={
    name:event.name,
    phoneNumber:event.phoneNumber,
    address:{
      provinces:event.provinces,
      area:event.area,
      city:event.city,
      detailed:event.detailed,
    }
  }

  
  await cloud.database().collection('user').where({
    id:event.openid
  })
  .update({
    data:{
      'address' : _.push(address)
    }
  })
  .then(res=>{
    status=0
  })
  .catch(err=>{
    status=300
    console.log(err)
  })

  return {
    status
  }
}