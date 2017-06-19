// index.js
var app = getApp();
var inputContent = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      inputContent: {},
      signature : wx.getStorageSync('user').signature
  },
    bindChange: function(e) {
       inputContent['signature'] = e.detail.value;
    } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '个性签名'
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
    saveSignature: function () {
        var new_signature = inputContent['signature'];
        var old_signature = wx.getStorageSync('user').signature || '';
        if(old_signature == new_signature || new_signature == undefined || new_signature == null){
            wx.showModal({
                title: '你没有做修改哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {}
                }
            });
        }else{
            wx.request({
                url: 'https://johnnyzhang.cn/wxxcx/set/signature',
                data: {
                    signature: new_signature,
                    id: wx.getStorageSync('user').user_id
                },
                success: function (resp) {
                    if (resp.data == 'success') {
                        var user = wx.getStorageSync('user');
                        user.signature = new_signature;
                        wx.setStorageSync('user',user);
                        wx.showModal({
                            title: '修改成功',
                            showCancel: false,
                            confirmText: '我知道了',
                            success: function (res) {
                                if (res.confirm) {}
                            }
                        });
                    }
                },
                fail: function () {
                    wx.showModal({
                        title: 'Sorry,哪里出问题了，修改失败',
                        showCancel: false,
                        confirmText: '我知道了',
                        success: function (res) {
                            if (res.confirm) {}
                        }
                    });
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