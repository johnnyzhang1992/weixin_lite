// index.js
var app = getApp();
var inputContent = {};
var _address = wx.getStorageSync('location');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address : {},
      info: '新增地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '我的地址'
      });
      var that = this;
      // app.getLocation();
      // app.choseLocation();
      if(_address.address){
          that.setData({
              address: wx.getStorageSync('location') || { address:'填写你的地址吧'},
              info: '更新地址'
          })
      }
  },
    saveAddress: function (e) {
        var new_address = e.detail.value.address;
        if(new_address){
            _address.address = new_address;
            wx.request({
                url: 'https://johnnyzhang.cn/wxxcx/set/address',
                data: {
                    address: _address,
                    id: wx.getStorageSync('user').user_id
                },
                success: function (resp) {
                    if (resp.data == 'success') {
                        var address = wx.getStorageSync('location');
                        address.address = new_address;
                        wx.setStorageSync('location',address);
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
    choseLocation: function () {
        var that = this;
        // app.getLocation();
        // app.choseLocation();
        var location = {};
        wx.chooseLocation({
            success: function (res) {
                location.name = res.name;
                location.address = res.address;
                location.latitude = res.latitude;
                location.longitude = res.longitude;
                wx.setStorageSync('location',location);
                that.setData({
                    address: wx.getStorageSync('location'),
                    info: '更新地址'
                })
            }
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