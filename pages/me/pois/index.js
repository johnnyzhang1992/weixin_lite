// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pois:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '我的足迹'
      });
      wx.showLoading({
          title: '页面加载中...',
          mask: true
      });
      var that = this;
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_pois',
          data: {
              user_id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var pois = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =pois.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = pois[i];
                          _obj.created_at = app.getDateDiff(pois[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          pois: _data
                      })
                  }
              }
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.hideLoading();
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
      var that = this;
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_pois',
          data: {
              user_id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var pois = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =pois.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = pois[i];
                          _obj.created_at = app.getDateDiff(pois[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          pois: _data
                      });
                      wx.stopPullDownRefresh()
                  }
              }
          }
      });
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