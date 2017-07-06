// index.js
var app = getApp();
var user_id = wx.getStorageSync('user').user_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      if(user_id && user_id == 13){
          wx.request({
              url: 'https://johnnyzhang.cn/wxxcx/get/users',
              data: {
                  user_id : wx.getStorageSync('user').user_id
              },
              success: function (res) {
                  if(res.data){
                      that.setData({
                          users: res.data
                      });
                      wx.stopPullDownRefresh()
                  }
              }
          });
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