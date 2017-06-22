// index.js
var app = getApp();
var _inputVal = '';
var _books = {};
var _book = {};
Page({

  /**
   * 页面的初始数据
   */
    data: {
      inputShowed: false,
      inputVal: "",
      books: [],
      searchResult: false,
      book:{},
      showDetail: false
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            searchResult: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        _inputVal = e.detail.value;
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
                q: _inputVal,
                start:0,
                count:10
            },
            success: function (re) {
                _books = re.data.books;
                that.setData({
                    books: re.data.books,
                    searchResult: true
                })
            }
        });
    },
    choseOne: function (e) {
        var id = e.currentTarget.id;
        _book = _books[id];
        this.setData({
            searchResult: false,
            showDetail:true,
            book: _books[id]
        })
    },
    saveBook: function () {
        if(_book){
            wx.request({
                url: 'https://johnnyzhang.cn/wxxcx/save/book',
                data: {
                    book_name: _book.title,
                    book_author: _book.author[0],
                    douban_id: _book.id,
                    cover_image:_book.image,
                    content: _book.summary,
                    id: wx.getStorageSync('user').user_id
                },
                success: function (resp) {
                    if (resp.data == 'success') {
                        wx.showModal({
                            title: '保存成功',
                            showCancel: false,
                            confirmText: '我知道了',
                            success: function (res) {
                                if (res.confirm) {}
                            }
                        });
                    }
                }
            });
        }
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