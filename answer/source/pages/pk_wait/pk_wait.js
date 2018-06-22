// pages/pk_wait/pk_wait.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no_net: app.globalData.HOST_Local + 'no_net.png',
    pk_img: app.globalData.HOST_Local + 'pk/pk_white.png',   
    tx: app.globalData.HOST + 'grade/tx.png',
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    nc: '田女士',
    defau_tit: '',
    time:10,
    again_flag:false
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
        })
      }
    })
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(res)
        var net_flag = res.errMsg
        if (net_flag =="getNetworkType:ok"){




          
        }
      }
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
    var that=this
    var myUser = app.globalData.userInfo
    that.setData({
      tx_img: myUser.avatarUrl,
      nickName: myUser.nickName,
    })
    this.setTime()
    
  },
  onClickPkAnswer: function () {
    wx.navigateTo({
      url: '../rules/rules',

    })
  },
  onClickGiveUp:function() {

    wx.navigateTo({
      url: '../rules/rules',

    })
  },
  setTime: function () {

    var currentTime2 = 10
    var that = this
    console.log("setTime定时器time_flag")
    console.log(that.data.time_flag)

    var interval = setInterval(function () {

    



        that.setData({

          time: currentTime2 - 1,


        })



        currentTime2--;

        if (currentTime2 <=
          0) {

          clearInterval(interval)
         
          that.setData({

            time: '0',

            currentTime2: 10,

            disabled: false,
            again_flag:true

          })

        }
      

    }, "1000")

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