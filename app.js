//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
      //获取授权用户基本数据
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
          success: function (response) {
              var code = response.code;
              wx.getUserInfo({
                  success: function (resp) {
                      that.globalData.userInfo = resp.userInfo;
                      typeof cb == "function" && cb(that.globalData.userInfo);
                      wx.setStorageSync('userInfo',resp.userInfo);
                      // 向关联网站发送请求，解密、存储数据
                      wx.request({
                          url: 'https://johnnyzhang.cn/wxxcx/userinfo',
                          data: {
                              code: code,
                              iv: resp.iv,
                              encryptedData: resp.encryptedData
                          },
                          success: function (res) {
                              if(res.data){
                                  console.log('---------UserInfo----------------');
                                  console.log('statusaCode:' + res.statusCode);
                                  console.log('success!');
                              }
                          }
                      })
                  }
              });
          }
      })
    }
  },
  getRunData: function (cb) {
      // 获取授权用户的微信运动数据
      var that = this;
      if(this.globalData.runData){
          typeof cb == "function" && cb(this.globalData.runData)
      }else{
          //调用登录接口
          wx.login({
              success: function (response) {
                  var code = response.code;
                  wx.getWeRunData({
                      success:function(res) {
                          // 向关联网站发送请求，解密、存储数据
                          wx.request({
                              url: 'https://johnnyzhang.cn/wxxcx/rundata',
                              data: {
                                  code: code,
                                  iv: res.iv,
                                  encryptedData: res.encryptedData
                              },
                              success: function (resp) {
                                  if (resp) {
                                      that.globalData.runData = resp.data.stepInfoList;
                                      typeof cb == "function" && cb(that.globalData.runData);
                                      console.log('---------RunData----------------');
                                      console.log('statusaCode:' + resp.statusCode);
                                      // console.log(resp.data.stepInfoList);
                                  }
                              }
                          });
                      }
                  })
              }
          });
      }
  },
  formatTime: function (time) {
      var unixTimestamp = new Date( time * 1000);
      var year = unixTimestamp.getFullYear();
      var month = unixTimestamp.getMonth()+1;
      var date = unixTimestamp.getDate();
      return [year,month,date].join('/');
  },
  globalData:{
      userInfo: null,
      runData: null
  }
});