// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      poi_id: '',
      poi: {},
      lat:'',
      lng:'',
      markers: [],
      user_id:wx.getStorageSync('user').user_id
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
                      poi: poi,
                      lat:poi.lat,
                      lng:poi.lng,
                      markers: [{
                          latitude: poi.lat,
                          longitude: poi.lng,
                          name: poi.poi_name,
                          desc: poi.address
                      }]
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
    deletePoi:function (e) {
        wx.showModal({
            title: '提示',
            content: '你确定要删除吗？',
            success: function(res) {
                if (res.confirm) {
                    console.log(e);
                    var user_id = e.currentTarget.dataset.user_id;
                    var poi_id = e.currentTarget.dataset.poi_id;
                    wx.request({
                        url: 'https://johnnyzhang.cn/wxxcx/delete/poi',
                        data: {
                            poi_id: poi_id
                        },
                        success: function (res) {
                            if(res.data.msg.msg == 'success'){
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                                wx.redirectTo({
                                    url: '../../index'
                                })
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
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