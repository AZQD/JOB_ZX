// pages/notice/notice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t_img: app.globalData.HOST + 't_bg.jpg',
    ct_tit: app.globalData.HOST_Local + 'pk/nlqk.png',
    jj_img: app.globalData.HOST + 'icon_sj.png',
    add_success: app.globalData.HOST_Local + 'pk/submit.png',
    width:'',
    height: '',
    array: ['A', 'B', 'C'],
    index:"0",
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    defau_tit:'',
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
          margin_left:(res.windowWidth - 180)/2,
          con_height: (res.windowHeight)*0.7,
          txt_height: res.windowHeight * 1.2,
    
        })
      }
    })
    this.audioCtx = wx.createAudioContext('myAudio')
    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})