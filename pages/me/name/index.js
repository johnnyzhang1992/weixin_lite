// index.js
var app = getApp();
var inputContent = {};
var nickName = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      inputContent: {},
      name : wx.getStorageSync('user').user_name
  },
    bindChange: function(e) {
       inputContent['nickName'] = e.detail.value;
    } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '我的昵称'
      });
      var that = this;
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
              userInfo:userInfo
          });
      });
  },
    saveName: function () {
        var new_name = inputContent['nickName'];
        var old_name = wx.getStorageSync('user').user_name;
        if(old_name == new_name || new_name == undefined){
            wx.showModal({
                title: '你没有做修改哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {}
                }
            });
        }else{
            wx.request({
                url: 'https://johnnyzhang.cn/wxxcx/set/name',
                data: {
                    name: new_name,
                    id: wx.getStorageSync('user').user_id
                },
                success: function (resp) {
                    if (resp.data == 'success') {
                        var user = wx.getStorageSync('user');
                        user.user_name = new_name;
                        wx.setStorageSync('user',user);
                        wx.showToast({
                            title: '已完成',
                            icon: 'success',
                            duration: 3000
                        });
                    }
                }
            });
        }
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
});