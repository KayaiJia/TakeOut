
// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数

Component({

  data: {
    keyword:'',
    flag:0
  },

  methods:{
    passKeywords(){
      this.triggerEvent('returnKeyword', {keyword:this.data.keyword})
      console.log('触发回调1')
      this.data.flag++
    },
    reduction(){
      if(this.data.flag){
        this.triggerEvent('reduction')
      }
    }
  }
})
