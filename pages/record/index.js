// index.js
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var _pois = {};
var _posts = {};
var _diarys = {};
var _sildeLeft = 0;
var _slideOffset = 0;
Page({

  /**
   * 页面的初始数据
   */

  data: {
      tabs: ["故事", "游记", "日记"],
      activeIndex: 1,
      sliderOffset: 0,
      sliderLeft: 0,
      pois: {},
      posts: {},
      diary: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      var that = this;
      wx.getSystemInfo({
          success: function(res) {
              _sildeLeft =  (res.windowWidth / that.data.tabs.length - sliderWidth) / 2;
              _slideOffset = res.windowWidth / that.data.tabs.length * that.data.activeIndex
          }
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/posts',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var posts = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =posts.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = posts[i];
                          _obj.created_at = app.getDateDiff(posts[i].created_at);
                          _data.push(_obj);
                      }
                      _posts = _data;
                  }
              }
          }
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/pois',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var pois = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =pois.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = pois[i];
                          _obj.created_at = app.getDateDiff(pois[i].created_at);
                          _data.push(_obj);
                      }
                      _pois = _data;
                  }
              }
          }
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/diarys',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var diarys = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =diarys.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = diarys[i];
                          _obj.created_at = app.getDateDiff(diarys[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          sliderLeft:_sildeLeft,
                          sliderOffset:_slideOffset,
                          diarys: _data,
                          posts: _posts,
                          pois: _pois
                      })
                  }
              }
          }
      });
  },
  tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
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
          url: 'https://johnnyzhang.cn/wxxcx/get/posts',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var posts = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =posts.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = posts[i];
                          _obj.created_at = app.getDateDiff(posts[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          posts: _data
                      })
                  }
              }
          }
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/diarys',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var diarys = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =diarys.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = diarys[i];
                          _obj.created_at = app.getDateDiff(diarys[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          diarys: _data
                      })
                  }
              }
          }
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/pois',
          data: {
              id: wx.getStorageSync('user').user_id
          },
          success: function (resp) {
              if (resp.data) {
                  var pois = resp.data;
                  if(resp.data){
                      var _data = [];
                      for(var i =pois.length-1 ;i>=0;i--){
                          var _obj = {};
                          _obj = pois[i];
                          _obj.created_at = app.getDateDiff(pois[i].created_at);
                          _data.push(_obj);
                      }
                      that.setData({
                          pois: _data
                      });
                      wx.stopPullDownRefresh()
                  }
              }
          }
      });
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