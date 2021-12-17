// components/storeInformation/storeInformation.js
const computedBehavior = require("miniprogram-computed").behavior;
const app = getApp();
let that
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    list:Object,
    x:String,
    y:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['Flex布局', 'Grid布局', '辅助布局'],
    storeList:{y:'1'},
  },
  watch:{
    
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      that=this
      console.log('我启动了')
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  observers:{
      // wx.request({
      //   url: 'https://apis.map.qq.com/ws/distance/v1/matrix',
      //   data:{
      //     mode:'walking',
      //     from:`${that.data.x},${that.data.y}`,
      //     to:`${that.data.list.x},${listy}`,
      //     key:'TEBBZ-6X2LG-Z7DQM-IWWW4-KVYNJ-HBBJK'
      //   },
      //   success:function(res){
      //     console.log('地址转换成功',res)
      //   }
      // })
    },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      console.log(e);
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  }
})