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
  ab_img: app.globalData.HOST +'about/ab_pic_1.png',
  ab_txt: app.globalData.HOST +'about/ab_txt_1.png',
  animationData_1:[],
  animationData_2: [],
  sound_url: app.globalData.HOST + '1.mp3',
  music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
  defau_tit: '',
  scrollTop:400,
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
      duration: 100,
      timingFunction: "ease",
      delay: 500
    })
    var animation_2 = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 100,
      timingFunction: "ease",
      delay: 600
    })
    animation_1.opacity(1).step()
    animation_2.opacity(1).step()
    this.setData({
      animationData_1: animation_1.export(),
      animationData_2: animation_2.export()
    })
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onClickToRule: function () {
    wx.navigateTo({
      url: '../SingleAnswer/SingleAnswers',

    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log("xiala")
  //   wx.navigateTo({
  //     url: '../about_2/about_2',

  //   }) 
  // },

  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });

  },
  topLoad: function () {
    console.log("xiala2")
    wx.navigateTo({
      url: '../about_2/about_2',

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