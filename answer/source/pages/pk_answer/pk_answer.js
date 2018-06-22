// pages/pk_answer/pk_answer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    widt:'',
    height:'',
    pk_img: app.globalData.HOST_Local + 'pk/pk.png',
    tx_img: app.globalData.HOST + 'grade/tx.png',
    pk1_img: app.globalData.HOST + 'pk_1.png',
    pk2_img: app.globalData.HOST + 'pk_2.png',
    animationData_1:[],
    animationData_2: [],
    animationData_3: [],
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    nc: '田女士',
    defau_tit: '',
    share_url: app.globalData.HOST + 'share.jpg',
    room_id:'',
    sendMessage_Flag:'true'
  
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
    this.audioCtx = wx.createAudioContext('myAudio')
  

    console.log(that.data.room_id)
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
    var animation_1 = wx.createAnimation({
      transformOrigin: "50% 50% 0",
      duration: 150,
      timingFunction: "ease",
      delay: 200
    })
    animation_1.opacity(1).translate(206, 10).step()
    this.setData({
      animationData_1: animation_1.export(),
    })

    var animation_2 = wx.createAnimation({
      transformOrigin: "50% 50% 0",
      duration: 150,
      timingFunction: "ease",
      delay: 400
    })
    animation_2.opacity(1).translate(-206, 260).step()
    this.setData({
      animationData_2: animation_2.export(),
    })
    var animation_3 = wx.createAnimation({
      transformOrigin: "50% 50% 0",
      duration: 200,
      timingFunction: "ease",
      delay: 600
    })
    animation_3.opacity(1).translate(226, 20).step()
    this.setData({
      animationData_3: animation_3.export(),
    })

    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'

    var myUser = app.globalData.userInfo
    that.setData({
      tx_img: myUser.avatarUrl,
      nickName: myUser.nickName,
    })
    var session_key = wx.getStorageSync('session_key')
    app.shareData(session_key, function (res) {
      var room_id = res.data.data.room_id
      that.setData({
        room_id: room_id,
      })
      console.log("room_idonShow")
      console.log(that.data.room_id)
    })

    // var room_id = this.data.room_id
    // if (room_id){}
    //    else{
    //   //  wx.navigateTo({
    //   //    url: '../pk_wait/pk_wait'

    //   // })

    //    }

    // var getRoomState = function () {
    //   console.log('去请求时间')
      

    //   setInterval(getRoomState, 1000)
    // }

    wx.connectSocket({
      url: 'wss://game.youbei.mobi:2346',
    })

    wx.onSocketOpen(function () {
    console.log("链接成功")
    })
   
    wx.onSocketMessage(function (data) {
       
     
   
      console.log(data.data);
     
      if (data) {
        var room_id = that.data.room_id
       // var room_id = '86'
        var msg = { "type": "login", "session_key": session_key, "room_id": room_id}
        
        var objData = JSON.stringify(msg)
        if (that.data.sendMessage_Flag=='true'){

         wx.sendSocketMessage({
          data: objData,
          success: function (res) {
            that.setData({
              sendMessage_Flag: false,
            })
            console.log("发送成功")
            console.log(res)
          }
         })
        }
      }
    })

  
  },
  onHide: function() {
    wx.connectSocket({
      url: 'wss://game.youbei.mobi:2346',
    })

  },
  /**
   *答题开始
   */
  onClickStart: function () {
    wx.navigateTo({
      url: '../pk_answer_in/pk_answer_in'

    })
  },

   /**
   *答题放弃
   */
  onClickEnd: function () {
    wx.navigateTo({
      url: '../rules/rules',

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
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
 
    onShareAppMessage: function (res) {
    app.globalData.session_key = wx.getStorageSync('session_key')
    var session_key = app.globalData.session_key
    var that = this;
    var room_id = that.data.room_id
    console.log("room_id")
    console.log(room_id)

    return {
      title: that.data.defau_tit,
      desc: that.data.introduction,
      path: '/pages/ room_id/ room_id?id=' + that.data.nc,
      imageUrl: that.data.share_url,
      success: function (res) {
        console.log("成功")
        console.log(res)
        //转发成功
       
        app.regustTimeData(room_id, function (res) {
          // var sponsor = res.data.sponsor
          // var invitee = res.data.invitee
          // wx.setStorageSync('sponsor', sponsor)
          // wx.setStorageSync('invitee', invitee)
          var time = res.data.data.room_remain_time
          console.log("timer")
          console.log(time)
          console.log(that.timeFormData(time))  
         

        })

        wx.connectSocket({
          url: 'wss://game.youbei.mobi:2346',
          // data: {
          //   x: '',
          //   y: ''
          // },
          header: {
            'content-type': 'application/json'
          },
          protocols: ['protocol1'],
          method: "GET"
        })
        
      },
      fail: function (res) {
        console.log("失败")
        console.log(res)
        // 转发失败
      }
    }
  },
  timeFormData: function (time){
    

      var secondTime = parseInt(time);// 秒
      var minuteTime = 0;// 分
      var hourTime = 0;// 小时
      if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) ;

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + ":" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    }
  
  
})