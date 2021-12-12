// miniprogram/pages/address/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phoneNumber: '',
    address: {
      provinces: '',
      area: '',
      city: '',
      detailed: '',
    },
    detailed:'',
    openID:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openID:options.openID
    })
  },

  bindRegionChange(e) {
    this.setData({
      ['address.provinces']: e.detail.value[0],
      ['address.city']: e.detail.value[1],
      ['address.area']: e.detail.value[2]
    })
    console.log(this.data.address)
  },

  commit() {
    this.setData({
      ['address.detailed']:this.data.detailed
    })
    if (this.data.name !== '' && this.data.phoneNumber!=='' && this.data.address.detailed!=='' && this.data.address.city){
      console.log('你填完啦')
      wx.cloud.callFunction({
        name:'addAddress',
        data:{
          openid:this.data.openID,
          name:this.data.name,
          phoneNumber:this.data.phoneNumber,
          provinces:this.data.address.provinces,
          area:this.data.address.area,
          detailed:this.data.address.detailed,
          city:this.data.address.city
        }
      })
      .then(res=>{
        console.log('修改成功',res)
        if (res.result.status === 0){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
      .catch(err=>{
        console.log('修改失败',err)
      })
      wx.navigateBack({
        delta: 2
      })
    }
    else{
      console.log('没填完')
      wx.showToast({
        title: '请填写所有项',
        icon: 'error',
        duration: 2000
      })
    }
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