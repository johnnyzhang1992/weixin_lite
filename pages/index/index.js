//index.js
//获取应用实例
var app = getApp();
var __obj = [];
Page({
    data: {
        userInfo: {},
        book: {},
        obj:{}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        wx.showLoading({
            title: '页面加载中...',
            mask: true
        });
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
                        var user_info = null;
                        for(var i =posts.length-1 ;i>=0;i--){
                            var _obj = {};
                            _obj = posts[i];
                            _obj.created_at = app.getDateDiff(posts[i].created_at);
                            _data.push(_obj);
                        }
                        __obj = __obj.concat(_data);
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
                                    __obj = __obj.concat(_data);
                                    //调用应用实例的方法获取全局数据
                                    app.getUserInfo(function(userInfo){
                                        user_info = userInfo;
                                    });
                                    that.setData({
                                        obj: __obj,
                                        userInfo:user_info
                                    })
                                }
                            }
                        });
                    }
                }
            }
        });

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        __obj = [];
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
                    __obj = __obj.concat(_data);
                }
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
                        __obj = __obj.concat(_data);
                        that.setData({
                            obj: __obj
                        });
                        wx.hideLoading();
                        wx.stopPullDownRefresh();
                    }
                }
            }
        });
    },
    onReady: function () {
        wx.hideLoading();
    }

});
