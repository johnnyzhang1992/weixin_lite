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
      if(wx.getStorageSync('user').user_id){
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
                  }else{
                      wx.showToast({
                          title: '加载失败',
                          icon: 'info',
                          duration: 3000
                      });
                  }
              }
          });
      }else{
          wx.showModal({
              title: '加载失败，请重现授权登录',
              showCancel: false,
              confirmText: '我知道了',
              success: function (res) {
                  if (res.confirm) {
                      wx.checkSession({
                          success: function () {
                              console.info('======登录有效------');
                              //session 未过期，并且在本生命周期一直有效
                          },
                          fail: function () {
                              console.info('======登录过期------');
                              //登录态过期
                              wx.login({
                                  success: function (response) {
                                      var code = response.code;
                                      var systemInfo = null;
                                      wx.getSystemInfo({
                                          success: function (res) {
                                              systemInfo = res;
                                          }
                                      });
                                      wx.getUserInfo({
                                          success: function (resp) {
                                              that.globalData.userInfo = resp.userInfo;
                                              typeof cb == "function" && cb(that.globalData.userInfo);
                                              wx.setStorageSync('userInfo', resp.userInfo);
                                              // 向关联网站发送请求，解密、存储数据
                                              wx.request({
                                                  url: 'https://johnnyzhang.cn/wxxcx/userinfo',
                                                  data: {
                                                      code: code,
                                                      iv: resp.iv,
                                                      encryptedData: resp.encryptedData,
                                                      systemInfo: systemInfo
                                                  },
                                                  success: function (res) {
                                                      if (res.data) {
                                                          console.log('---------UserInfo----success------------');
                                                          console.log('statusaCode:' + res.statusCode);
                                                          wx.setStorageSync('user', res.data);
                                                          wx.setStorageSync('location', res.data.address);
                                                      }
                                                  }
                                              })
                                          }
                                      });
                                  }
                              })
                          }
                      });
                  }
              }
          });
      }

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
        wx.checkSession({
            success: function () {
                console.info('======登录有效------');
                //session 未过期，并且在本生命周期一直有效
            },
            fail: function (res) {
                console.log(res);
                console.info('======登录过期------');
                //登录态过期
                wx.login({
                    success: function (response) {
                        var code = response.code;
                        var systemInfo = null;
                        wx.getSystemInfo({
                            success: function (res) {
                                systemInfo = res;
                            }
                        });
                        wx.getUserInfo({
                            success: function (resp) {
                                that.globalData.userInfo = resp.userInfo;
                                typeof cb == "function" && cb(that.globalData.userInfo);
                                wx.setStorageSync('userInfo', resp.userInfo);
                                // 向关联网站发送请求，解密、存储数据
                                wx.request({
                                    url: 'https://johnnyzhang.cn/wxxcx/userinfo',
                                    data: {
                                        code: code,
                                        iv: resp.iv,
                                        encryptedData: resp.encryptedData,
                                        systemInfo: systemInfo
                                    },
                                    success: function (res) {
                                        if (res.data) {
                                            console.log('---------UserInfo----success------------');
                                            console.log('statusaCode:' + res.statusCode);
                                            wx.setStorageSync('user', res.data);
                                            wx.setStorageSync('location', res.data.address);
                                        }
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        // wx.getSetting({
        //     success:function(res) {
        //         if (!res.authSetting['scope.userInfo']) {
        //             wx.authorize({
        //                 scope: 'scope.userInfo',
        //                 success: function(res) {
        //                     console.log(res);
        //                     // wx.startRecord()
        //                 },
        //                 fail: function (msg) {
        //                     console.log(msg)
        //                 }
        //             })
        //         }
        //     }
        // })
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
      if(wx.getStorageSync('user').user_id){
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
      }
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