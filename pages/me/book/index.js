// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '我的阅读'
      });
      wx.showLoading({
          title: '页面加载中...',
          mask: true
      });
      var that = this;
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_book',
          data: {
              user_id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  that.setData({
                      book: res.data
                  })
              }
          }
      })
  },
    deleteBook: function (e) {
        var that = this;
        var user_id = wx.getStorageSync('user').user_id;
        wx.showModal({
            title: '提示',
            content: '你确定要删除吗？',
            success: function(res) {
                if (res.confirm) {
                    var book_id = e.currentTarget.dataset.book_id;
                    wx.request({
                        url: 'https://johnnyzhang.cn/wxxcx/delete/book',
                        data: {
                            book_id: book_id
                        },
                        success: function (res) {
                            if(res.data.msg.msg == 'success'){
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                                wx.navigateBack({
                                    delta: 1
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
      var that = this;
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/user_book',
          data: {
              user_id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  that.setData({
                      book: res.data
                  })
              }
              wx.hideLoading();
              wx.stopPullDownRefresh();
          }
      })
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