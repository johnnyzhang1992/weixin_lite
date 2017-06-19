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
    globalData:{
        userInfo: null,
        runData: null
    }

});