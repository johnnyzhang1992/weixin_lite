//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs)
    },
    getUserInfo:function(cb){
        //获取授权用户基本数据
        var that = this;
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //调用登录接口
            wx.login({
                success: function (response) {
                    var code = response.code;
                    var systemInfo = null;
                    wx.getSystemInfo({
                        success: function(res) {
                            systemInfo = res;
                        }
                    });
                    wx.getUserInfo({
                        success: function (resp) {
                            that.globalData.userInfo = resp.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                            wx.setStorageSync('userInfo',resp.userInfo);
                            // 向关联网站发送请求，解密、存储数据
                            wx.request({
                                url: 'https://johnnyzhang.cn/wxxcx/userinfo',
                                data: {
                                    code: code,
                                    iv: resp.iv,
                                    encryptedData: resp.encryptedData,
                                    systemInfo: systemInfo
                                },
                                success: function (res) {
                                    if(res.data){
                                        console.log('---------UserInfo----success------------');
                                        console.log('statusaCode:' + res.statusCode);
                                        wx.setStorageSync('user',res.data);
                                        wx.setStorageSync('location',res.data.address);
                                    }
                                }
                            })
                        }
                    });
                }
            })
        }
    },
    getRunData: function (cb) {
        // 获取授权用户的微信运动数据
        var that = this;
        if(this.globalData.runData){
            typeof cb == "function" && cb(this.globalData.runData)
        }else{
            //调用登录接口
            wx.login({
                success: function (response) {
                    var code = response.code;
                    wx.getWeRunData({
                        success:function(res) {
                            // 向关联网站发送请求，解密、存储数据
                            wx.request({
                                url: 'https://johnnyzhang.cn/wxxcx/rundata',
                                data: {
                                    code: code,
                                    iv: res.iv,
                                    encryptedData: res.encryptedData,
                                    id: wx.getStorageSync('user').user_id
                                },
                                success: function (resp) {
                                    if (resp) {
                                        that.globalData.runData = resp.data.stepInfoList;
                                        typeof cb == "function" && cb(that.globalData.runData);
                                        console.log('---------RunData----success------------');
                                        console.log('statusaCode:' + resp.statusCode);
                                        // console.log(resp.data.stepInfoList);
                                    }
                                }
                            });
                        }
                    })
                }
            });
        }
    },
    formatTime: function (time) {
        var unixTimestamp = new Date( time * 1000);
        var year = unixTimestamp.getFullYear();
        var month = unixTimestamp.getMonth()+1;
        var date = unixTimestamp.getDate();
        return [year,month,date].join('/');
    },
    getLocation: function () {
        var location = {};
        wx.getLocation({
            type: 'gcj02',//wgs84
            success: function (res) {
                location.latitude = res.latitude;//维度
                location.longitude = res.longitude;//经度
                location.speed = res.speed; //速度
                location.accuracy = res.accuracy; //位置的精确度
                location.altitude = res.altitude || '';//高度 m
                location.verticalAccuracy = res.verticalAccuracy || '';//垂直精度
                location.horizontalAccuracy = res.horizontalAccuracy || '';//水平精度
                wx.setStorageSync('location',location);
            }
        })
    },
    choseLocation: function () {
      var location = {};
        wx.chooseLocation({
            success: function (res) {
               location.name = res.name;
               location.address = res.address;
               location.latitude = res.latitude;
               location.longitude = res.longitude;
               wx.setStorageSync('location1',location);
            }
        })
    },
    getDateDiff: function(dateStr){
         function getDateTimeStamp(dateStr)  {
            return Date.parse(dateStr.replace(/-/gi, "/"));
        }
        var publishTime = getDateTimeStamp(dateStr) / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime() / 1000),
            d,
            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);
        d_seconds = parseInt(d);

        if (d_days > 0 && d_days < 3) {
            return d_days + '天前';
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + '小时前';
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + '分钟前';
        } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
                return '刚刚';
            } else {
                return d_seconds + '秒前';
            }
        } else if (d_days >= 3 && d_days < 30) {
            return M + '-' + D + ' ' + H + ':' + m;
        } else if (d_days >= 30) {
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
        }
    },
    globalData:{
        userInfo: null,
        runData: null
    }

});