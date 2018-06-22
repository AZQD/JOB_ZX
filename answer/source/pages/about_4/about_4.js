// pages/abut_1/about_1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  width:'',
  height: '', 
  ab_tg: app.globalData.HOST +'tgjs.png',
  ab_img: app.globalData.HOST +'about/ab_pic_4.png',
  ab_txt: app.globalData.HOST +'about/ab_txt_4.png',
  ab_txt2:app.globalData.HOST +'about/ab_txt_44.png',
  animationData_1: [],
  animationData_2: [],
  animationData_3: [],
  sound_url: app.globalData.HOST + '1.mp3',
  music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',

  ab_img: app.globalData.HOST +'about/ab_pic_4.png',
  ab_txt: app.globalData.HOST +'about/ab_txt_4.png',
  ab_txt2:app.globalData.HOST +'about/ab_txt_44.png',
  animationData_1: [],
  animationData_2: [],
  animationData_3: [],
  sound_url: app.globalData.HOST + '1.mp3',
  music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
  defau_tit: '',
     nc: '田女士',
  defau_tit: '',
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        })
      }
    })
    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'
    var animation_1 = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 600,
      timingFunction: "ease",
      delay: 100
    })
    var animation_2 = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 600,
      timingFunction: "ease",
      delay: 700
    })
    var animation_3 = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 600,
      timingFunction: "ease",
      delay: 1300
    })
    animation_1.opacity(1).scale(2.2).translate(60, 30).step()
    animation_2.opacity(1).scale(2.6).translate(48, 120).step()
    animation_3.opacity(1).scale(0.7).translate(188, 520).step()
    this.setData({
      animationData_1: animation_1.export(),
      animationData_2: animation_2.export(),
      animationData_3: animation_3.export()
    })
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  topLoad: function () {
    wx.navigateTo({
      url: '../rules/rules',

    }) 
  },

  /**
   * 用户点击右上角分享
   */
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