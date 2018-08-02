//index.js
//获取应用实例
var app = getApp()
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    width:'',
    height: '',
    jzz: app.globalData.HOST +'jzz.png',
    jzz_img: app.globalData.HOST + 'jzz_img.png',
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    nc: '田女士',
    defau_tit: '',

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
     
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    app.globalData.session_key = wx.getStorageSync('session_key')
 
    setTimeout(function () {
      wx.navigateTo({
        url: '../notice/notice',

      })
    }, 1000);
    this.audioCtx = wx.createAudioContext('myAudio')
    wx.getSystemInfo({
     
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    app.globalData.session_key = wx.getStorageSync('session_key')
    var session_key = app.globalData.session_key
    var that = this;
    return {
      title: that.data.defau_tit,
      desc: that.data.introduction,
      path: '/pages/index/index?id=' + that.data.nc,
      imageUrl: that.data.share_url,
      success: function (res) {
        console.log("成功")
        console.log(res)
        //转发成功
        app.shareData(session_key, function (res) {

        })
      },
      fail: function (res) {
        console.log("失败")
        console.log(res)
        // 转发失败
      }
    }
  },
  
  
})
