// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book_id : '',
      book:{},
      d_book:{}
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
         book_id: options.id
      });
      wx.request({
          url: 'https://johnnyzhang.cn/wxxcx/get/book_detail',
          data: {
              book_id:options.id,
              id : wx.getStorageSync('user').user_id
          },
          success: function (res) {
              if(res.data){
                  var book = res.data[0];
                  console.log(book);
                  wx.setNavigationBarTitle({
                      title: book.book_name
                  });
                  wx.request({
                      url: "https://api.douban.com/v2/book/"+book.douban_id,
                      success: function(resp){
                          console.log(resp.data);
                          that.setData({
                              d_book: resp.data
                          })
                          // $('#cover_image').attr('src',data.image);
                          // $('.book-author').html(data.author);
                          // $('.book-douban-url').attr('href',data.alt);
                          // $('.origin-title').html(data.origin_title);
                          // $('.book-pages').html(data.pages);
                          // $('.book-isbn').html(data.isbn13);
                          // $('.book-publisher').html(data.publisher);
                          // $('.book-pubdate').html(data.pubdate);
                          // $('.book-translator').html(data.translator);
                          // $('.book-douban-rating').html(data.rating.average);
                          // $('#author_intro').html(data.author_intro);
                          // $('#book-summary').html(data.summary);
                          // console.info(JSON.stringify("alt_title:"+data.alt_title));
                      },
                      fail: function (xhr,status,error) {
                          console.info('获取豆瓣图书内容失败！');
                      }
                  });
                  that.setData({
                      book: book
                  })
              }
          }
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