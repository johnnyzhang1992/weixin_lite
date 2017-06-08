//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
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
                      wx.request({
                          url: 'https://johnnyzhang.cn/wxxcx',
                          data: {
                              code: code,
                              iv: resp.iv,
                              encryptedData: resp.encryptedData
                          },
                          success: function (res) {
                              console.log('statusaCode:' + res.statusCode);
                              console.log(res.data);
                          }
                      })
                  }
              })
          }
      })
    }
  },
  globalData:{
    userInfo:null
  }
});