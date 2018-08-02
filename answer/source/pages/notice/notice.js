// pages/notice/notice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t_img: app.globalData.HOST + 't_bg.jpg',
    hdwh_img: app.globalData.HOST + 'hdwh.png',
    tzs_Img: app.globalData.HOST + 'tzs.png',
    jj_img: app.globalData.HOST + 'jj.png',
    gg_tit: app.globalData.HOST + 'n_r.png',
    gg_con: app.globalData.HOST + 'gg_con.png',
    sound_url: app.globalData.HOST +'1.mp3',
    music_img:'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    width:'',
    height:'',
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
          txt_height: (res.windowHeight) * 0.5
        })
      }
    })
    this.audioCtx = wx.createAudioContext('myAudio')
    that.data.defau_tit ='你的好友向你发起黄帝文化PK,点击应战！'
  },

  onGotUserInfo: function () {
    console.log("这是方法")
    wx.getUserInfo({
      success: function (res) {
        console.log("这是登陆")
        console.log(res.userInfo)
        console.log("这是登陆")
        var userInfo = res.userInfo
        app.globalData.userInfo = userInfo
        app.getUserInfo(function (data) {
         
          app.globalData.session_key = wx.getStorageSync('session_key')
          wx.navigateTo({
            url: '../rules/rules',

          })
        })
       },
      fail: function (res){

        wx.getSetting({
          success: (res) => {
            console.log("getSetting")
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
              console.log("res2")
              console.log(res.userInfo.avatarUrl)
              console.log("res2")
              wx.request({
                url: that.globalData.HOST_Api + 'index/login',//自己的服务接口地址
                method: 'POST',
                header: {
                  'content-type': 'Content-Type:application/json'
                },
                data: {
                  code: code,
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,

                },
                success: function (data) {

                  console.log("登陆码")
                  console.log(data.data.session_key)
                  wx.clearStorageSync()
                  wx.setStorageSync('session_key', data.data.session_key)
                  //cb(data)

                },
                fail: function () {

                  console.log('系统错误')
                }
              })
            }
            else {

              //写个弹窗
              wx.showModal({
                title: '提示',
                content: '拒绝授权将无法参与游戏，请允许授权',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {



                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
             

            }
          }

        })
      }
    })
      

  

  },
  onGotUserInfo2: function () {
    console.log("这是方法")
    wx.getUserInfo({
      success: function (res) {
        app.getUserInfo(function (data) {

          wx.navigateTo({
            url: '../add_question/add_question',

          })
        })

        app.globalData.session_key = wx.getStorageSync('session_key')
      }
    })




  },
 
  onClickToRule: function () {
  
  },

 
 onClickToAddQues: function () {
 
        wx.navigateTo({
 
        url: '../add_question/add_question',

     })
 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
   
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