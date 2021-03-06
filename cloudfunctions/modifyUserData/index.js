// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/*

必须要传入名字(name)和头像(icon)以及openid

 */

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let status=-1

  await cloud.database().collection('user').where({id:event.openid}).update({
    data:{
      name:event.name,
      icon:event.icon,
    },
  })
  .then(res=>{
    console.log("更改成功",res)
    status=0
  })
  .catch(err=>{
    console.log("更改失败",err)
    status=300
  })

  return {
    status
  }
}