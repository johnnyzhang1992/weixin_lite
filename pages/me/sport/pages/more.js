/**
 * Created by zq199 on 2017/6/12.
 */
//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        motto: '微信运动',
        icon: '../../../../../images/icon/footprint_active.png',
        runData: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '微信运动'
        });
        wx.showLoading({
            title: '页面加载中...',
            mask: true
        });
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getRunData(function (runData) {
            //更新数据
            var stepInfoList = runData;
            var _data = [];
            for(var i =0;i<stepInfoList.length;i++){
                var _time = app.formatTime(stepInfoList[i].timestamp);
                var _step = stepInfoList[i].step;
                var _obj = {};
                _obj.time = _time;
                _obj.step = _step;
                _data.push(_obj);
            }
            that.setData({
                runData:_data
            });
        })
    },
    onReady: function () {
        wx.hideLoading();
    }

});
