// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      poi_id: '',
      poi: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
          title: '页面加载中...',
          mask: true
      });
      var that = this;
      that.setData({
          poi_id: options.id
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/poi_detail',
          data: {
              poi_id:options.id,
              id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  var poi = res.data[0];
                  if(poi.cover_image){
                      poi.cover_image = 'https://johnnyzhang.cn/'+poi.cover_image
                  }
                  wx.setNavigationBarTitle({
                      title: poi.poi_name
                  });
                  that.setData({
                      poi: poi
                  })
              }
          }
      })
  },
    findLocation: function (e) {
        var latitude = e.target.dataset.lat;
        var  longitude = e.target.dataset.lng;
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: e.target.dataset.name,
            address:e.target.dataset.address
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.hideLoading();
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
})