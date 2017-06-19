// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      name : wx.getStorageSync('user').user_name,
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
      //获取地址
      // wx.chooseAddress({
      //     success: function (res) {
      //         console.log(res.errMsg);
      //         console.log(res.userName);
      //         console.log(res.postalCode);
      //         console.log(res.provinceName);
      //         console.log(res.cityName);
      //         console.log(res.countyName);
      //         console.log(res.detailInfo);
      //         console.log(res.nationalCode);
      //         console.log(res.telNumber);
      //     }
      // });
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