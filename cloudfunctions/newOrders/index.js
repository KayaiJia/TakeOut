// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let status=-1
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  let openid=event.openid
  let order={
    name:event.name,
    time:event.time,
    price:event.price,
    goods:event.goods,
    addressName:event.addressName
    }
    await cloud.database().collection('user').where({
      id:openid
    })
    .update({
      data:{
        'order' : _.push(order)
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
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}