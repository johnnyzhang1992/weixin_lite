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
      wx.setNavigationBarTitle({
          title: '设置'
      });
      var that = this;
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
          //更新数据
          var sex = userInfo.gender;
          userInfo.nickName =  wx.getStorageSync('user').user_name || userInfo.nickName;
          userInfo.signature = wx.getStorageSync('user').signature || '去设置个性签名吧';
          if(sex = 1){
            userInfo.gender = '男';
          }else{
            userInfo.gender = '女'
          }
          that.setData({
              userInfo:userInfo
          });
      });
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
  },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
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
            wx.stopPullDownRefresh()
        });
    }
});