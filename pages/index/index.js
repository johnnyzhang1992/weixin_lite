//index.js
var util = require('../../utils/util');
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
                                if(res.data){
                                    var books = res.data;
                                    books.forEach(function (p1, p2, p3) {
                                        p1.created_at =app.getDateDiff(p1.created_at);
                                    });
                                    __obj = __obj.concat(books);
                                    //调用应用实例的方法获取全局数据
                                    app.getUserInfo(function(userInfo){
                                        user_info = userInfo;
                                    });
                                    that.setData({
                                        obj: __obj.sort(util.compare('updated_at')),
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
        var __obj = [];
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
                                if(res.data){
                                    var books = res.data;
                                    books.forEach(function (p1, p2, p3) {
                                        p1.created_at =app.getDateDiff(p1.created_at);
                                    });
                                    __obj = __obj.concat(books);
                                    //调用应用实例的方法获取全局数据
                                    app.getUserInfo(function(userInfo){
                                        user_info = userInfo;
                                    });
                                    that.setData({
                                        obj: __obj.sort(util.compare('updated_at')),
                                        userInfo:user_info
                                    });
                                    wx.hideLoading();
                                    wx.stopPullDownRefresh();
                                }
                            }
                        });
                    }
                }
            }
        });
    },
    onReady: function () {
        wx.hideLoading();
    }

});
