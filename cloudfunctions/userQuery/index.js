// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
let call=undefined
/*

错误代码：

un     函数未正常调用
100   用户不存在，尝试写入数据库失败
200   数据库查询失败
300   获取用户信息失败
        
*/
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

   cloud.database().collection('user').where({
    id:event.openid
  })
  .get()
  .then(res => {
    if(res.data.length == 0){
      console.log("无数据",res)
      cloud.database().collection('user').add({
        data:{
          //name:userInfo[nickname],
          id:event.openid,
          //icon:userInfo[avatarUrl],
          address:[],
        }
      })
      .then(res =>{
        console.log('添加成功',res)
        call=0;
       })
      .catch(res =>{
        console.log('失败',res)
        call=100
      })
    }
    else{
      console.log("有数据")
      call=0
    }
  })
  .catch(err =>{
    call=200
  })
  console.log("call=",call)

  return {
    call,
  }
}