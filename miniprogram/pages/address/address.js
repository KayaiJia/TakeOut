import router from '../../router/index'

// miniprogram/pages/address/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    icon:[{ name: 'write', isShow: true }],
    openID:''
  },

  addAddress(){
    let query={openID:this.data.openID}
    router.gotoPage('/addAddress',query)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.address){
        options.address=options.address.split("...")
        for (let i=0;i<options.address.length;i++){
          options.address[i]=JSON.parse(options.address[i])
        }
        this.setData({
          address:options.address,
        })
      }
     this.setData({
      openID:options.openID
     })
    console.log(this.data.address,this.data.openID)
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
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