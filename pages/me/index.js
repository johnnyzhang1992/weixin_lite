// index.js
var app = getApp();
var _userInfo = {};
var __dayData = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      dayData: {},
      icon: '../../images/icon/footprint_active.png',
      signature : wx.getStorageSync('user').signature,
      book: '',
      count:{},
      user_id:wx.getStorageSync('user').user_id
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
          _userInfo = userInfo;
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_count',
          data: {
              user_id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  that.setData({
                      userInfo:_userInfo,
                      count: res.data.count
                  });
                  wx.stopPullDownRefresh()
              }
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var that = this;
      app.getRunData(function (runData) {
          //更新数据
          var stepInfoList = runData;
          // 当天的数据
          var _dayData = {};
          _dayData.time = app.formatTime(stepInfoList[stepInfoList.length-1].timestamp);
          _dayData.step = stepInfoList[stepInfoList.length-1].step;
          // console.log(_data);
          that.setData({
              dayData:_dayData
          })
      });
  },
    AuthSetting: function () {
      console.log('-------');
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        wx.getSetting({
            success:function(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success: function(res) {
                            console.log(res);
                            // wx.startRecord()
                        },
                        fail: function (msg) {
                            console.log(msg)
                        }
                    })
                }
            }
        })
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
      var that = this;
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
          _userInfo = userInfo;
      });
      // 下拉刷新数据
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
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_count',
          data: {
              user_id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  that.setData({
                      userInfo:_userInfo,
                     count: res.data.count
                  });
                  wx.stopPullDownRefresh()
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
});