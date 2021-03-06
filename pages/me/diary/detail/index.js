// index.js
var app = getApp();
var _type = 'diary';
var _id = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        diary_id:'',
        diary:{},
        user_id:wx.getStorageSync('user').user_id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _id = options.id;
        wx.showLoading({
            title: '页面加载中...',
            mask: true
        });
        var that = this;
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/get/diary_detail',
            data: {
                diary_id:options.id,
                id : wx.getStorageSync('user').user_id
            },
            success: function (res) {
                if(res.data){
                    var diary = res.data[0];
                    diary.created_at = app.getDateDiff(diary.created_at);
                    wx.setNavigationBarTitle({
                        title: diary.title
                    });
                    that.setData({
                        diary: diary
                    })
                }
            }
        })
    },
    deletePost:function (e) {
        wx.showModal({
            title: '提示',
            content: '你确定要删除吗？',
            success: function(res) {
                if (res.confirm) {
                    console.log(e);
                    var user_id = e.currentTarget.dataset.user_id;
                    var diary_id = e.currentTarget.dataset.diary_id;
                    wx.request({
                        url: 'https://johnnyzhang.cn/wxxcx/delete/diary',
                        data: {
                            diary_id: diary_id
                        },
                        success: function (res) {
                            if(res.data.msg.msg == 'success'){
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                                // wx.redirectTo({
                                //     url: '../../index'
                                // })
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        var user_id = wx.getStorageSync('user').user_id;
        wx.request({
            url:  'https://johnnyzhang.cn/wxxcx/get/comments',
            data:{
                id:_id,
                type:_type,
                user_id:user_id
            },
            success: function (res) {
                if(res.data){
                    var comments = res.data;
                    // var _data = [];
                    comments.forEach(function (p1, p2, p3) {
                        p1.created_at =app.getDateDiff(p1.created_at);
                    });
                    that.setData({
                        comments:comments
                    });
                    wx.hideLoading();
                }
            }
        });
    },
    deleteComment: function (e) {
        var that = this;
        var user_id = wx.getStorageSync('user').user_id;
        wx.showModal({
            title: '提示',
            content: '你确定要删除吗？',
            success: function(res) {
                if (res.confirm) {
                    var comment_id = e.currentTarget.dataset.comment_id;
                    wx.request({
                        url: 'https://johnnyzhang.cn/wxxcx/delete/comment',
                        data: {
                            comment_id: comment_id
                        },
                        success: function (res) {
                            if(res.data.msg.msg == 'success'){
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                                wx.request({
                                    url:  'https://johnnyzhang.cn/wxxcx/get/comments',
                                    data:{
                                        id:_id,
                                        type:_type,
                                        user_id:user_id
                                    },
                                    success: function (res) {
                                        if(res.data){
                                            var comments = res.data;
                                            comments.forEach(function (p1, p2, p3) {
                                                p1.created_at =app.getDateDiff(p1.created_at);
                                            });
                                            that.setData({
                                                comments:comments
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
    },
    commentFormSubmit: function (e) {
        var that = this;
        var id = e.detail.value.id;
        var type = e.detail.value.type;
        var user_id = wx.getStorageSync('user').user_id;
        var content = e.detail.value.content;
        if(user_id){
            wx.showModal({
                title: '提示',
                content: '你确定要提交吗？',
                success: function(res) {
                    if (res.confirm) {
                        wx.request({
                            url: 'https://johnnyzhang.cn/wxxcx/save/comment',
                            data: {
                                id:id,
                                type:type,
                                user_id:user_id,
                                content:content
                            },
                            success: function (res) {
                                if(res.data.msg.msg == 'success'){
                                    wx.showToast({
                                        title: '提交成功',
                                        icon: 'success',
                                        duration: 3000
                                    });
                                    wx.request({
                                        url:  'https://johnnyzhang.cn/wxxcx/get/comments',
                                        data:{
                                            id:_id,
                                            type:_type,
                                            user_id:user_id
                                        },
                                        success: function (res) {
                                            if(res.data){
                                                var comments = res.data;
                                                comments.forEach(function (p1, p2, p3) {
                                                    p1.created_at =app.getDateDiff(p1.created_at);
                                                });
                                                that.setData({
                                                    comments:comments
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            });
        }else{
            wx.showToast({
                title: '请先登录',
                icon: 'loading',
                duration: 3000
            });
        }
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