// index.js
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
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
      diarys: {}
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
      var pois = null;
      app.func.getPois(function(res){
          pois = res;
          that.setData({
              sliderLeft:_sildeLeft,
              sliderOffset:_slideOffset,
              pois: pois
          });
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
      var that = this;
      var posts = null;
      var diarys = null;
      app.func.getPosts(function(res){
          posts = res;
          app.func.getDiarys(function(res){
            diarys = res;
              that.setData({
                  posts:posts,
                  diarys:diarys
              });
          });
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
      var that = this;
      var posts = null;
      var diarys = null;
      var pois = null;
      app.func.getPois(function(res){
          pois = res;
          app.func.getPosts(function(res){
              posts = res;
              app.func.getDiarys(function(res){
                  diarys = res;
                  that.setData({
                      posts:posts,
                      diarys:diarys,
                      pois: pois
                  });
                  wx.stopPullDownRefresh();
              });
          });
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