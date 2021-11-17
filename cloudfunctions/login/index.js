// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  let status=-1

  //登录验证
  const res= await cloud.callFunction({
    name: 'userQuery',
    data:{
      openid,
    },
  })
  console.log(res)
  status=res.result.status
  //添加数据
  if(res.result.userData == 0){
    console.log("新增数据")
    const resAdd= await cloud.callFunction({
      name: 'addUser',
      data:{
        openid,
      }
    })
    status=resAdd.result.status
  }
  else{
    console.log("已有数据",res.result.userData)
    status=0
  }


  return {
    status,
    openid,
  }
}