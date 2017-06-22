//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        motto: '欢迎回来！',
        userInfo: {},
        book: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad');
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            });
        });
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/get/book',
            data: {
                id : wx.getStorageSync('user').user_id
            },
            success: function (res) {
                var books = res.data;
                if(res.data){
                    var _data = [];
                    for(var i =books.length-1 ;i>books.length-4;i--){
                        var _obj = {};
                        _obj = books[i];
                        _obj.created_at = app.getDateDiff(books[i].created_at);
                        _data.push(_obj);
                    }
                    that.setData({
                        book: _data
                    })
                }
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    }
});
