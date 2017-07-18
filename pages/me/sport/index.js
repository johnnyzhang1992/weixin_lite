/**
 * Created by zq199 on 2017/6/9.
 */
//index.js
//获取应用实例
var app = getApp();
var _userInfo = null;
Page({
    data: {
        motto: '微信运动',
        icon: '../../../images/icon/footprint_active.png',
        userInfo: {},
        runData: {},
        dayData: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '运动'
        });
        wx.showLoading({
            title: '页面加载中...',
            mask: true
        });
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            userInfo.nickName =  wx.getStorageSync('user').user_name || userInfo.nickName;
            _userInfo = userInfo;
        });
        app.getRunData(function (runData) {
            //更新数据
            var stepInfoList = runData;
            // 最近一周的数据
            var _data = [];
            for(var i =stepInfoList.length-7;i<stepInfoList.length;i++){
                var _time = app.formatTime(stepInfoList[i].timestamp);
                // var _time = stepInfoList[i].timestamp;
                var _step = stepInfoList[i].step;
                var _obj = {};
                _obj.time = _time;
                _obj.step = _step;
                _data.push(_obj);
            }
            // 当天的数据
            var _dayData = {};
            _dayData.time = app.formatTime(stepInfoList[stepInfoList.length-1].timestamp);
            _dayData.step = stepInfoList[stepInfoList.length-1].step;
            // console.log(_data);
            that.setData({
                userInfo:_userInfo,
                runData:_data,
                dayData: _dayData
            });
        })
    },
    onReady: function () {
        wx.hideLoading();
    }
});
