// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      dayData: {},
      icon: '../../images/icon/footprint_active.png',
      signature : wx.getStorageSync('user').signature
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
          userInfo.nickName =  wx.getStorageSync('user').user_name || userInfo.nickName;
          userInfo.signature = wx.getStorageSync('user').signature || '';
          if(sex = 1){
              userInfo.gender = '男';
          }else{
              userInfo.gender = '女'
          }
          that.setData({
              userInfo:userInfo
          });
      });
      app.getRunData(function (runData) {
          //更新数据
          var stepInfoList = runData;
          // 当天的数据
          var _dayData = {};
          _dayData.time = app.formatTime(stepInfoList[stepInfoList.length-1].timestamp);
          _dayData.step = stepInfoList[stepInfoList.length-1].step;
          // console.log(_data);
          that.setData({
              dayData: _dayData
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
          title: '我'
      });
      wx.hideShareMenu()
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
});