// index.js
var app = getApp();
var post_id = '';
var status = '0';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      category_id: 9,
      type: 'new',
      status:1,
      post:{},
      items: [
          {name: '0', value: '公开', checked: 'true'},
          {name: '-1', value: '自己可见'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      post_id = options.id;
      if(options.id){
          wx.request({
              url: 'https://johnnyzhang.cn/wxxcx/get/post_detail',
              data: {
                  post_id:options.id,
                  id : wx.getStorageSync('user').user_id
              },
              success: function (res) {
                  if(res.data){
                      var post = res.data[0];
                      post.created_at = app.getDateDiff(post.created_at);
                      wx.setNavigationBarTitle({
                          title: post.title
                      });
                      that.setData({
                          post: post,
                          type:'edit'
                      })
                  }
              }
          })
      }
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
                status:status,
                user_id: wx.getStorageSync('user').user_id
            },
            success: function (resp) {
                if (resp.data.msg.msg == 'success') {
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                    });
                    wx.redirectTo({
                        url: '../detail/index?id='+resp.data.msg.id
                    })
                }
            }
        });
   },
  editFormSubmit: function(e) {
        var content = e.detail.value.content;
        var title = e.detail.value.title;
        var des = e.detail.value.description;
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/save/post',
            data: {
                title:title,
                des: des,
                post_id:post_id,
                content:content ,
                status:status,
                user_id: e.detail.value.user_id
            },
            success: function (resp) {
                console.log(resp);
                if (resp.data.msg.msg == 'success') {
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                    });
                    wx.redirectTo({
                        url: '../detail/index?id='+post_id
                    })
                }
            }
        });
    },
    radioChange: function(e) {
        status = e.detail.value;
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