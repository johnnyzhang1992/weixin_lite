/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/19.
 */
var app = getApp();
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
function getDateDiff(dateStr){
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
}
function getPosts(cb) {
    wx.request({
        url: 'https://johnnyzhang.cn/wxxcx/get/posts',
        data: {
            id: wx.getStorageSync('user').user_id
        },
        success: function (resp) {
            if(resp.data){
                var posts = resp.data;
                posts.forEach(function (p1) {
                    p1.created_at = getDateDiff(p1.created_at);
                });
                return typeof cb == "function" && cb(posts.sort(compare('id')));
            }
        }
    });
}
function getDiarys(cb) {
    wx.request({
        url: 'https://johnnyzhang.cn/wxxcx/get/diarys',
        data: {
            id: wx.getStorageSync('user').user_id
        },
        success: function (resp) {
            if(resp.data){
                var diarys = resp.data;
                diarys.forEach(function (p1) {
                    p1.created_at = getDateDiff(p1.created_at);
                });
                return typeof cb == "function" && cb(diarys.sort(compare('id')));
            }
        }
    });
}
function getPois(cb) {
    wx.request({
        url: 'https://johnnyzhang.cn/wxxcx/get/pois',
        data: {
            id: wx.getStorageSync('user').user_id
        },
        success: function (resp) {
            if (resp.data) {
                var pois = resp.data;
                pois.forEach(function (p1) {
                    p1.created_at = getDateDiff(p1.created_at);
                });
                return typeof cb == "function" && cb(pois.sort(compare('id')));
            }
        }
    });


}
module.exports = {
    getPosts:getPosts,
    getDiarys:getDiarys,
    getPois:getPois
};