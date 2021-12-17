let openid
let nickname
let avatarUrl
const app = getApp();
let list = []

import { requestP } from '../../../app'
import router from '../../router/index'

const computedBehavior = require("miniprogram-computed").behavior;
Component({

  behaviors: [computedBehavior],
  data: {
    addName:[],
    CustomBar: app.globalData.CustomBar,
    icon: [{ name: 'location', isShow: true }, { name: 'right' }, { name: 'unfold' }],
    x: 0,
    y: 0,
    storeList: [],
    form: '',
    addressName: '定位',
    temp:[],
  },
  methods: {
    async onShow() {
      const that = this
      this.setData({
        storeList:[],
        from:''
      })
      await wx.startLocationUpdateBackground({
        type: 'gcj02'
      })
        .then(res => {
          wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            highAccuracyExpireTime: 5000
          })
            .then(res => {
              console.log('获取位置成功', res)
              this.setData({
                x: res.latitude,
                y: res.longitude,
              })
              requestP({
                // url: 'https://example.com/ajax',
                url:'http://aijiaqi.love:3000/api/store',
                dataType: 'json',
              })
                .then(res => {
                  console.log('网络请求',res)
                  for (let i = 0; i < res.data.res_body.data.length; i++) {
                    let x = (that.data.x * 100 + res.data.res_body.data[i].x) / 100
                    let y = (that.data.y * 100 + res.data.res_body.data[i].y) / 100
                    res.data.res_body.data[i].x = x
                    res.data.res_body.data[i].y = y
                    that.setData({
                      storeList: res.data.res_body.data,
                      from: `${that.data.from ? that.data.from : ''}${res.data.res_body.data[i].x.toString()},${res.data.res_body.data[i].y.toString()};`
                    })
                  }
                  console.log(that.data.from)
                  requestP({
                    url: 'https://apis.map.qq.com/ws/distance/v1/matrix',
                    data: {
                      mode: 'driving',
                      from: `${that.data.from.toString().substring(0, that.data.from.length - 1)}`,
                      // from:'22.2734436,113.41254',
                      to: `${that.data.x},${that.data.y}`,
                      key: 'TEBBZ-6X2LG-Z7DQM-IWWW4-KVYNJ-HBBJK'
                    },
                  })
                    .then(op => {
                      console.log('地址转换成功', op)
                      for (let i = 0; i < that.data.storeList.length; i++) {
                        this.setData({
                          [`storeList[${i}].distance`]: (op.data.result.rows[i].elements[0].distance+500) / 1000,
                          [`storeList[${i}].time`]: Math.round(((op.data.result.rows[i].elements[0].duration) + 1200) / 60),
                        })
                        console.log(this.data.storeList[i])
                      }
                      console.log(this.data.storeList)
                    })
                })
            })
            // console.log(t)
            .catch(error => {
              console.log('获取位置失败', error)
            })
        })
        .catch(error => {
          console.log('失败', error)
        })
      wx.nextTick(() => {
        if (list.length) {
          this.setData({
            storeList: list
          })
        }
        console.log('数据里存了', this.data.storeList)
      })
      console.log(that.data.storeList)
    },

    async onLoad(){
    await  wx.cloud.callFunction({
        name: 'login',
      })
        .then(res=> {
          app.globalData.openid=res.result.openid
          // this.data.openID = res.result.openid
          console.log('登入成功',res)
          wx.cloud.callFunction({
            name:'getUserInfo',
            data:{
              openid:app.globalData.openid
            }
          })
          .then(res=>{
            console.log('成功',res)
            if(res.result.userData[0].address.length){
            this.setData({
              address:res.result.userData[0].address
            })
            console.log('获取地址',this.data.address)
            for (let i=0;i<this.data.address.length;i++){
              this.setData({
                [`addName[${i}].name`]:this.data.address[i].address.detailed,
                [`addName[${i}].index`]:i
              })
            }
            console.log('获取地址名',this.data.addName)
          }
          })
          .catch(err=>{
            console.log('失败',err)
          })
        })
        
    },
    changeLocation(e){
      console.log(this.data.address)
      this.setData({
        addressName:this.data.address[`${parseInt(e.detail.value)}`].address.detailed,
        x:this.data.address[`${e.detail.value}`].address.x,
        y:this.data.address[`${e.detail.value}`].address.y,
      })
    },
    login: function () {
      wx.cloud.callFunction({
        name: 'login',
      })
        .then(res => {
          console.log("成功", res)
          openid = res.result.openid
          console.log(openid)
          this.setData({
            openid: res.result.openid
          })
        })
        .catch(res => {
          console.log("失败", res)
        })
    },
    details(e){
      let query={
        minPrice:this.data.storeList[`${e.currentTarget.dataset.src}`].upToSend,
        deliveryPrice:this.data.storeList[`${e.currentTarget.dataset.src}`].shippingFee,
        name:this.data.storeList[`${e.currentTarget.dataset.src}`].name,
        time:this.data.storeList[`${e.currentTarget.dataset.src}`].time,
        addressName:this.data.addressName
      }
      console.log(query)
      router.gotoPage('/goods',query)
    },
    onChooseLocation() {
      // wx.chooseLocation({
      //   data:{
      //     latitude:this.data.x,
      //     longitude:this.data.y
      //   },
      // })
      // .then(res=>{
      //   console.log('我成功了', res)
      //     this.setData({
      //       x: res.latitude,
      //       y: res.longitude,
      //       addressName: res.name
      //     });
      // })
      // .catch(err=>{
      //   console.log('失败',res)
      // })
    },
    screening(e){
      console.log('收到回调')
      this.setData({
        temp:this.data.storeList,
        storeList:this.data.storeList.filter((value, index, arr)=>{
          return value.name.includes(e.detail.keyword)
        })
      })
      console.log('筛选结束的数组',this.data.storeList)
    },
    reduction(){
      this.setData({
        storeList:this.data.temp,
        temp:[]
      })
    },
  },
  watch:{
    'addressName':function(){
      let that=this
      this.setData({
        from:''
      })
      requestP({
        // url: 'https://example.com/ajax',
        url:'http://aijiaqi.love:3000/api/store',
        dataType: 'json',
      })
        .then(res => {
          console.log('网络请求',res)
          for (let i = 0; i < res.data.res_body.data.length; i++) {
            let x = (that.data.x * 100 + res.data.res_body.data[i].x) / 100
            let y = (that.data.y * 100 + res.data.res_body.data[i].y) / 100
            res.data.res_body.data[i].x = x
            res.data.res_body.data[i].y = y
            that.setData({
              storeList: res.data.res_body.data,
              from: `${that.data.from ? that.data.from : ''}${res.data.res_body.data[i].x.toString()},${res.data.res_body.data[i].y.toString()};`
            })
          }
          console.log(that.data.from)
          requestP({
            url: 'https://apis.map.qq.com/ws/distance/v1/matrix',
            data: {
              mode: 'driving',
              from: `${that.data.from.toString().substring(0, that.data.from.length - 1)}`,
              // from:'22.2734436,113.41254',
              to: `${that.data.x},${that.data.y}`,
              key: 'TEBBZ-6X2LG-Z7DQM-IWWW4-KVYNJ-HBBJK'
            },
          })
            .then(op => {
              console.log('地址转换成功', op)
              for (let i = 0; i < that.data.storeList.length; i++) {
                this.setData({
                  [`storeList[${i}].distance`]: (op.data.result.rows[i].elements[0].distance+500) / 1000,
                  [`storeList[${i}].time`]: Math.round(((op.data.result.rows[i].elements[0].duration) + 1200) / 60),
                })
                console.log(this.data.storeList[i])
              }
              console.log(this.data.storeList)
            })
        })
    }
  }
})