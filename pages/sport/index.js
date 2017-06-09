/**
 * Created by zq199 on 2017/6/9.
 */
//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        motto: '微信运动',
        userInfo: {},
        runData: {}
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
    }
});
