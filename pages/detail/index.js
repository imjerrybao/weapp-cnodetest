var utils = require('../../utils/utils');

Page({
    data: {
        title: '话题详情',
        detail: {},
        hidden: false
    },
    onLoad: function(options) {
        console.log(options);
        this.fetchData(options.id);
    },
    fetchData: function(id) {
        var that = this;
        that.setData({
            hidden: true
        });
        if(!id) {
            wx.showToast({
                title: '话题ID不能为空',
                icon: 'fail',
                duration: 2000
            });
            return;
        }
        wx.request({
            url: 'https://cnodejs.org/api/v1/topic/'+id,
            data: {
                mdrender: false
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        hidden: true
                    });
                }, 300);
                console.log(res.data.data);
                res.data.data.create_at = utils.formatTime(new Date(res.data.data.create_at));
                that.setData({
                    detail: res.data.data
                });
            }
        });
    }
});
