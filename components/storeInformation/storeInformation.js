// components/storeInformation/storeInformation.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['Flex布局', 'Grid布局', '辅助布局']
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