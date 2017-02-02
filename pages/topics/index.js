var utils = require('../../utils/utils');

Page({
    data: {
        title: '话题列表',
        topics: [],
        hidden: false,
        tab: 'all'
    },
    onLoad: function() {
        this.fetchData();
    },
    fetchData: function(data) {
        var that = this;
        if(!data) {data = {}}
        wx.request({
            url: 'https://cnodejs.org/api/v1/topics',
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        hidden: true
                    });
                }, 300);
                that.setData({
                    topics: res.data.data.map(function(item) {
                        item.create_at = utils.formatTime(new Date(item.create_at));
                        return item;
                    })
                });
            }
        });
    },
    itemTapAction: function(e) {
        var that = this;
        var tab = e.currentTarget.id;
        that.setData({
            tab: tab,
            hidden:false
        });
        if (tab !== 'all') {
            this.fetchData({tab: tab});
        } else {
            this.fetchData();
        }
    },
    redictDetail: function(e) {
        var id = e.currentTarget.id;
        var url = '../detail/index?id='+id;
        wx.navigateTo({
          url: url,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})