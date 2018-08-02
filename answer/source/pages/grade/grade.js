// pages/grade/grade.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    menu_tit: '',
    tit_img: app.globalData.HOST + 'menu/zt_tt.png',
    tx:app.globalData.HOST +'grade/tx.png',
    yd: app.globalData.HOST_Local + 'yd.png',
    qs: app.globalData.HOST_Local + 'qs.png',
    sl: app.globalData.HOST_Local + 'sl.png',
    cg: app.globalData.HOST + 'grade/cg.png',
    fx: app.globalData.HOST + 'grade/fx.png',
    back: app.globalData.HOST + 'grade/back.png',
    share: app.globalData.HOST + 'grade/share.png',
    share_url: app.globalData.HOST + 'share.jpg',
   
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    nc: '田女士',
    defau_tit: '',
    all_right:'',
    answer_num: '',
    exceed_num:'',
    share_question_num:'',
    win_rate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
          menu_height: (res.windowHeight) * 0.9,
          
        })
        console.log(app.globalData.userInfo)
        that.data.defau_tit = app.globalData.userInfo.nickName+'@你,向你发起黄帝文化PK,点击应战！'
        var session_key = wx.getStorageSync('session_key')
        //个人战绩
        app.singleMyGradeData(session_key, function (res) {
           console.log(res.data)
           var grade=res.data.data
           var rate = res.data.data.win_rate
     
          //  console.log(rate)
           console.log("parseFloat(rate)")
         
           var rateNew = String(rate)
           var rateInt = rateNew.substring(0, 3)
           console.log(rateInt)
         
           that.setData({
             all_right: grade.all_right , //全胜
             share_question_num: grade.share_question_num,// 分享
             answer_num: grade.answer_num, //已答
             win_rate: rateInt,// 胜率
             exceed_num: grade.exceed_num // 超过


           })
        })
      }
    })
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onShareAppMessage: function (res) {
    app.globalData.session_key = wx.getStorageSync('session_key')
    var session_key = app.globalData.session_key
    var that = this;
    return {
      title: that.data.defau_tit,
      desc: that.data.introduction,
      path: '/pages/index/index?id=' + that.data.nc,
      imageUrl:that.data.share_url,
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
  onClickToIndex: function () {
    wx.navigateTo({
      url: '../index/index',

    })
  },
  
  // onShareAppMessage: function (res) {
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //     console.log(res.target)
  //   }
  //   return {
  //     title: '黄帝文化挑战赛',
  //     path: '/page/rules/rules'
  //   }
  // },

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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})