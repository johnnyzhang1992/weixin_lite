// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      category_id: 9,
      type: 'zaji',
      status:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
    bindFormSubmit: function(e) {
        var content = e.detail.value.content;
        var title = e.detail.value.title;
        var des = e.detail.value.description;
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/save/post',
            data: {
                title:title,
                des: des,
                content:content ,
                id: wx.getStorageSync('user').user_id
            },
            success: function (resp) {
                if (resp.data == 'success') {
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                    });
                }
            }
        });
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