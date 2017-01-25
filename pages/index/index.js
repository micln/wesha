//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindGameTap : function(){
    wx.navigateTo({
      url: '../game/game'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })      

      wx.navigateTo({
        url: '../game/game'
      })
    })
  },

  onShow: function(){
    console.log('onshow')
  },

  onPullDownRefresh : function(){
  console.log('刷新了')
  },

  onShareAppMessage : function(){
return {
  title: '慧仁的测试标题',
      desc: '其实什么都没有',
      path: '/page/user?id=123'
}
  }
})
