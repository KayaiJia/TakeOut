// const computedBehavior = require("miniprogram-computed").behavior;
const app = getApp();
import router from '../../router/index'
//import { Router } from 'wxapp-router';
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    avatarUrl: '/miniprogram/images/geren.png',
    nickname: '点击登录',
    openID: '',
    icon:[
          { name: 'locationfill', isShow: true ,title:'我的地址',active:'queryAddress'},
          {name:'redpacket', isShow:'true',title:'我的卡包',active:'queryPurse'},
          {name:'favorfill',isShow:'true',title:'收藏店铺',active:'queryCollectionStore'}
        ]
  }, 
  queryCollectionStore(){
    router.gotoPage('/collection')
  },
  queryPurse(){
    router.gotoPage('/wallet')
  },
  queryAddress(){
    wx.cloud.callFunction({
      name:'getUserInfo',
      data:{
        openid:this.data.openID
      }
    })
    .then(res=>{
      console.log('成功',res)
      let length=res.result.userData[0].address.length
      console.log(length)
      let query={address:[]}
      for (let i=0;i<res.result.userData[0].address.length;i++){
        query.address[i]=JSON.parse(JSON.stringify(res.result.userData[0].address[i]));
      }
      console.log('元数据',res.result.userData[0].address)
      console.log('query:',query.address)
      for (let i=0;i<query.address.length;i++){
        query.address[i]=JSON.stringify(query.address[i])
      }
      query.openID=this.data.openID
      if(query.address){
        query.address=query.address.join('...')
      }
      router.gotoPage('/address',query)
    })
    .catch(err=>{
      console.log('失败',err)
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  onLoad(){
    wx.cloud.callFunction({
      name: 'login',
    })
      .then(res=> {
        this.setData({
          openID:res.result.openid,
        })
        app.globalData.openid=res.result.openid
        if (res.result.info[0]){
          this.setData({
            nickname:res.result.info[0].name,
            avatarUrl:res.result.info[0].icon,
          })
        }
        // this.data.openID = res.result.openid
        console.log('登入成功',res)
      })
      .catch(err=> {
        //this.data.openID = 'error'
        this.setData({
          openID:'error'
        })
        console.log(err,this.data.openID)
    })
  },

  login(){
    wx.getUserProfile({
      desc: "用于登录",
      success:(res)=>{
        let userInfo=res.userInfo
        //this.data.nickname=userInfo.nickName
        //this.data.avatarUrl=userInfo.avatarUrl
        this.setData({
          avatarUrl:userInfo.avatarUrl,
          nickname:userInfo.nickName
        })
        console.log(this.data.openID)
        wx.cloud.callFunction({
          name:'modifyUserData',
          data:{
            openid:this.data.openID,
            name:this.data.nickname,
            icon:this.data.avatarUrl,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})