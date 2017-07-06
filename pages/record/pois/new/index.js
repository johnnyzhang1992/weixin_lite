// index.js
var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var demo = new QQMapWX({
    key: 'C2LBZ-UQUW5-DXFI5-QRQDQ-HV26J-WFBQK' // 必填
});
var status = '';
var tag = '';
var poi_id ='';
var more_info = {};
var new_lat = '';
var new_lng = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
      type: 'new',
      items: [
          {name: 'active', value: '公开', checked: 'true'},
          {name: 'private', value: '自己可见'}
      ],
      tags:[
          {name:'spot',value:'景点',checked:'true'},
          {name:'university',value:'大学'}
      ],
      address:{},
      more_info:{},
      width:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      poi_id = options.id;
      wx.getSystemInfo({
         success: function (res) {
             that.setData({
                 width:res.windowWidth
             });
         }
      });
      if(options.id){
          wx.request({
              url: 'https://johnnyzhang.cn/wxxcx/get/poi_detail',
              data: {
                  poi_id:options.id,
                  id : wx.getStorageSync('user').user_id
              },
              success: function (res) {
                  if(res.data){
                      console.log(res.data[0]);
                      var poi = res.data[0];
                      if(poi.cover_image){
                          poi.cover_image = 'https://johnnyzhang.cn/'+poi.cover_image
                      }
                      if(poi.status == 'active'){
                          that.setData({
                              items: [
                                  {name: 'active', value: '公开', checked: 'true'},
                                  {name: 'private', value: '自己可见'}
                              ]
                          })
                      }else if(poi.status == 'private'){
                          that.setData({
                              items: [
                                  {name: 'active', value: '公开'},
                                  {name: 'private', value: '自己可见', checked: 'true'}
                              ]
                          })
                      }
                      if(poi.tag == 'university'){
                         that.setData({
                             tags:[
                                 {name:'spot',value:'景点'},
                                 {name:'university',value:'大学',checked:'true'}
                             ]
                         })
                      }
                      wx.setNavigationBarTitle({
                          title: poi.poi_name
                      });
                      that.setData({
                          type:'edit',
                          poi: poi,
                          lat:poi.lat,
                          lng:poi.lng,
                          address: poi.address,
                          markers: [{
                              latitude: poi.lat,
                              longitude: poi.lng,
                              name: poi.poi_name,
                              desc: poi.address
                          }]
                      })
                  }
              }
          })
      }else{
          wx.getLocation({
              success: function (res) {
                  // 调用腾讯位置接口
                  demo.reverseGeocoder({
                      location: {
                          latitude: res.latitude,
                          longitude: res.longitude
                      },
                      success: function(resp) {
                          more_info = resp.result.ad_info;
                          that.setData({
                              lat:res.latitude,
                              lng:res.longitude,
                              address: resp.result.address,
                              markers: [{
                                  latitude: res.latitude,
                                  longitude: res.longitude,
                                  name: resp.result.address,
                                  desc: '高度：'+res.altitude
                              }]
                          })
                      },
                      fail: function(res) {
                          console.log(res);
                      },
                      complete: function(res) {

                      }
                  });
              }
          });
      }


  },
    bindFormSubmit:function (e) {
        console.log(e.detail.value);
        var address = e.detail.value.address;
        var lat = e.detail.value.lat;
        var lng = e.detail.value.lng;
        var title = e.detail.value.title;
        var content = e.detail.value.content;
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/save/poi',
            data: {
                title:title,
                content:content ,
                lat:lat,
                lng:lng,
                address:address,
                status:status ? status : 'active',
                tag:tag ? tag : 'spot',
                more_info:more_info,
                user_id: wx.getStorageSync('user').user_id
            },
            success: function (resp) {
                if (resp.data.msg.msg == 'success') {
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                    });
                    wx.redirectTo({
                        url: '../detail/index?id='+resp.data.msg.id
                    })
                }
            }
        });
    },
    editFormSubmit:function (e) {
        console.log(e.detail.value);
        var address = e.detail.value.address;
        var lat = e.detail.value.lat;
        var lng = e.detail.value.lng;
        var title = e.detail.value.title;
        var content = e.detail.value.content;
        wx.request({
            url: 'https://johnnyzhang.cn/wxxcx/save/poi',
            data: {
                poi_id:poi_id,
                title:title,
                content:content ,
                lat:lat,
                lng:lng,
                address:address,
                status:status ? status : 'active',
                tag:tag ? tag : 'spot',
                more_info:more_info,
                user_id: wx.getStorageSync('user').user_id
            },
            success: function (resp) {
                if (resp.data.msg.msg == 'success') {
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                    });
                    wx.redirectTo({
                        url: '../detail/index?id='+poi_id
                    })
                }
            }
        });
    },
    nameChange: function(e) {
        status = e.detail.value;
        console.log(status);
    },
    tagChange: function(e) {
        tag = e.detail.value;
        console.log('tag:'+tag)
    },
    getCenterLocation: function () {
      var that = this;
        this.mapCtx.getCenterLocation({
            success: function(res){
                new_lat = res.latitude;
                new_lng = res.longitude;
                console.log(res.longitude);
                console.log(res.latitude);
                // 调用腾讯位置接口
                demo.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function(resp) {
                        console.log(resp.result);
                        more_info = resp.result.ad_info;
                        that.setData({
                            lat:res.latitude,
                            lng:res.longitude,
                            address: resp.result.address,
                            markers: [{
                                latitude: res.latitude,
                                longitude: res.longitude,
                                name: resp.result.address,
                                desc: '高度：'+res.altitude
                            }]
                        })
                    },
                    fail: function(res) {
                        console.log(res);
                    },
                    complete: function(res) {

                    }
                });
            }
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      // 使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('myMap')
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