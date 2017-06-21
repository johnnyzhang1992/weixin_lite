// index.js
var app = getApp();
var inputVal = '';
Page({

  /**
   * 页面的初始数据
   */
    data: {
      inputShowed: false,
      inputVal: "",
      books: []
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        inputVal = e.detail.value;
        this.setData({
            inputVal: e.detail.value
        });
    },
    toSearch: function () {
        var that = this;
        // 搜索数据相关内容
        wx.request({
            url: "https://api.douban.com/v2/book/search",
            data:{
                q: inputVal,
                start:0,
                count:10
            },
            success: function (re) {
                console.log(re.data);
                that.setData({
                    books: re.data.books
                })
            }
        });
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