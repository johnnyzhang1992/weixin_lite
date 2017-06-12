// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
          //更新数据
          var sex = userInfo.gender;
          if(sex = 1){
            userInfo.gender = '男';
          }else{
            userInfo.gender = '女'
          }
          that.setData({
              userInfo:userInfo
          });
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
      wx.setNavigationBarTitle({
          title: '个人信息'
      });
      wx.hideShareMenu()
  }
});