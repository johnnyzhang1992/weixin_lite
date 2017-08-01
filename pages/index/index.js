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
        var posts = null;
        app.func.getPosts(function(res){
            posts = res;
            var user_info = null;
            __obj = __obj.concat(posts);
            app.func.getPois(function(res){
                __obj = __obj.concat(res);
                //调用应用实例的方法获取全局数据
                app.getUserInfo(function(userInfo){
                    user_info = userInfo;
                });
                that.setData({
                    obj: __obj.sort(util.compare('updated_at')),
                    userInfo:user_info
                })
            });
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
        var posts = null;
        app.func.getPosts(function(res){
            posts = res;
            var user_info = null;
            __obj = __obj.concat(posts);
            app.func.getPois(function(res){
                __obj = __obj.concat(res);
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
            });
        });
    },
    onReady: function () {
        wx.hideLoading();
    }

});
