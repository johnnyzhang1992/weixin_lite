// index.js
var app = getApp();
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
                                wx.redirectTo({
                                    url: '../../index'
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