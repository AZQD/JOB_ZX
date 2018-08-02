// pages/menu/menu.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    menu_tit:'',
    tit_img: app.globalData.HOST + 'menu/zt_tt.png',
    yxgz_img: app.globalData.HOST + 'menu/yxgz.png',
    yxgz_con_img: app.globalData.HOST + 'menu/yxgz_con.png',
    drdt: app.globalData.HOST + 'menu/mbtn_1.png',
    hypk_img: app.globalData.HOST + 'menu/mbtn_2.png',
    wdzj_img: app.globalData.HOST + 'menu/mbtn_3.png',
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
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
          menu_height: (res.windowHeight)*0.9
        })
      }
    })
  },

  onClickToSinglePk: function () {
    wx.navigateTo({
      url: '../about_1/about_1',

    })
  },
  onClickToFindPk: function () {
    wx.navigateTo({
      url: '../pk_answer/pk_answer',

    })
  },
  onClickToMygrade: function () {
    wx.navigateTo({
      url: '../grade/grade',

    })
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