let openid
let nickname
let avatarUrl
Page({
  onLoad(){

    /*wx.cloud.callFunction({
      name: 'login',
    })
    .then(res =>{
      console.log("成功",res)
      openid=res.result.openid
      console.log(openid)
      this.setData({
        openid:res.result.openid
      })
    })
    .catch(res =>{
      console.log("失败",res)
    })*/
  },
//获取用户信息的例子
  up:function(){
    wx.getUserProfile({
      desc: "用于登录",
      success:(res)=>{
        let userInfo=res.userInfo
        nickname=userInfo.nickName
        avatarUrl=userInfo.avatarUrl

        wx.cloud.callFunction({
          name:'modifyUserData',
          data:{
            openid:openid,
            name:nickname,
            icon:avatarUrl,
          }
        })
        .then(res =>{
          console.log("修改成功",res)
        })
        .catch(err =>{
          console.log("修改失败",err)
        })
      },
      fail:(err)=>{
        console.log("获取失败",err)
      }
    })
  },

 login:function(){
    wx.cloud.callFunction({
      name: 'login',
    })
    .then(res =>{
      console.log("成功",res)
      openid=res.result.openid
      console.log(openid)
      this.setData({
        openid:res.result.openid
      })
    })
    .catch(res =>{
      console.log("失败",res)
    })
  }
})
