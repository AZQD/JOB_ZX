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
    TextAreaValue:'',
    TextValueA:'',
    TextValueB: '',
    TextValueC: '',
    cover_show:false,
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
          margin_left:(res.windowWidth - 180)/2,
          con_height: (res.windowHeight)*0.7,
          txt_height: res.windowHeight * 1.2,
    
        })
      }
    })
    this.audioCtx = wx.createAudioContext('myAudio')
    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'
  },
  //获取题目内容
  bindTextAreaBlur: function (e) {
    this.setData({
      TextAreaValue: e.detail.value

    })
    console.log("题目内容")
    console.log(this.data.TextAreaValue)
  },
  //获取答案内容A
  bindKeyInputA: function (e) {
    this.setData({
      TextValueA: e.detail.value

    })
    console.log("答案A")
    console.log(this.data.TextValueA)
  },
  //获取答案内容B
  bindKeyInputB: function (e) {
    this.setData({
      TextValueB: e.detail.value
     })
    console.log("答案B")
    console.log(this.data.TextValueB)
  },
  //获取答案内容C
  bindKeyInputC: function (e) {
    this.setData({
      TextValueC: e.detail.value
    })
    console.log("答案C")
    console.log(this.data.TextValueC)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.array[e.detail.value])
  },
  onClickBack: function (e) {
    wx.navigateTo({
      url: '../notice/notice',

    })
  },
  onClickConfirmSub: function () {
    var session_key = wx.getStorageSync('session_key')
    var title = this.data.TextAreaValue
    var Aanswer = this.data.TextValueA
    var Banswer = this.data.TextValueB
    var Canswer = this.data.TextValueC
    var right = this.data.array[this.data.index]
    var answer={
      A: Aanswer,
      B: Banswer ,
      C: Canswer

    }
    console.log("出题参数")
    console.log(session_key)
    console.log(title)
    console.log(answer)
    console.log(right)
    console.log("出题参数")
    var that=this
    app.addQuestionData(session_key, title, answer, right, function (res) {
      var addQuestionData_status=res.data.status
      if (addQuestionData_status=="2000"){
        that.setData({
          cover_show:true
        })
      }
      else{
        var msg = res.data.msg
        wx.showModal({
          title: '提示',
          content:msg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      }
      //轮播图
      })
  },
  /**
   * 返回答题
   */
  onClickToAnswerQues: function () {
    wx.navigateTo({
      url: '../notice/notice',

    })
  },
  onClickToAddQues: function () {
    wx.navigateTo({
      url: '../onClickToAddQues/onClickToAddQues',

    })
  },
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