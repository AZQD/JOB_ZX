//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

 //登录
  getUserInfo: function (cb) {
    var that = this
    var session = wx.getStorageSync('sessionCode')
    console.log("这是sessionCode")
    console.log(session)
    console.log("这是sessionCode")
    wx.login({
      success: function (r) {
        that.globalData.code = r.code;//登录凭证
        var code = that.globalData.code
        console.log("这是登陆参数")
        console.log(code)
        console.log(that.globalData.userInfo)
        console.log("这是登陆参数")
        if (code) {
          wx.request({
            url: that.globalData.HOST_Api + 'index/login',//自己的服务接口地址
            method: 'POST',
            header: {
              'content-type': 'Content-Type:application/json'
            },
            data: {
              code: code,
              avatarUrl: that.globalData.userInfo.avatarUrl,
              nickName: that.globalData.userInfo.nickName,

            },
            success: function (data) {
              console.log("登陆码")
              console.log(data.data.session_key)
              wx.clearStorageSync()
              wx.setStorageSync('session_key', data.data.session_key)
              cb(data)

            },
            fail: function () {

              console.log('系统错误')
            }
          })

        } else {

          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  },
  requestNetByPost: function (api, data, func) {// 网络请求post
    var that = this
    wx.request({
      url: that.globalData.HOST_Api + api, //接口地址
      method: "POST",
      data: data,
      header: {
        "Content-Type": 'Content-Type:application/json'
      },
      success: function (res) { // 请求成功会条用
        console.log(api + "请求成功")
        func(res)
      },
      complete: function (res) {

      },
      fail: function (res) { // 请求失败会调用
        console.log("请求失败：接口：" + api)
        console.log(res)
      }
    })
  },
  //分享日志
  shareData: function (session_key, cbFunc) {
    var that = this;
    that.requestNetByPost("game/share_log",
      {
        session_key: session_key,
      },
      function (res) {
        console.log("这是分享日志")
        console.log(res)
        console.log("这是分享日志")
        cbFunc(res)

      })
  },

  //我要出题
  addQuestionData: function (session_key, title, answer, right, cbFunc) {
    var that = this;
    that.requestNetByPost("game/sub_question",
      {
        session_key: session_key,
        title: title,
        answer: answer,
        right: right
      },
      function (res) {
        console.log("这是出题结果")
        console.log(res)
        console.log("这是出题结果")
        cbFunc(res)

      })
  },
  //单人模式初始化
  addAnswerDatainitialize: function (session_key, mode, initialize, room_id, invitee, cbFunc) {
  
     var that = this;
     that.requestNetByPost("game/get_question",
      {
        session_key: session_key,
        mode: mode,
        initialize: initialize,
        room_id: room_id,
        invitee: invitee,
      },
      function (res) {
        console.log("初始化获取题目")
        console.log(res)
        console.log("初始化获取题目")
      cbFunc(res)

      })
  },
  //单人模式下一题
  addAnswerNextData: function (session_key, mode, initialize, room_id, invitee, log_id, answer, cbFunc) {
    console.log("单人模式下一题")
    var that = this;

    that.requestNetByPost("game/get_question",
      {
        session_key: session_key,
        mode: mode,
        initialize: initialize,
        room_id: room_id,
        invitee: invitee,
        log_id: log_id,
        answer: answer
      },
      function (res) {
        console.log("这是返回题目结果")
        console.log(res)
        console.log("这是返回题目结果")
        cbFunc(res)
      })
  },

  //单人模式我的战绩
  singleMyGradeData: function (session_key, cbFunc) {
    console.log("我的战绩")
    var that = this;

    that.requestNetByPost("game/get_self_info",
      {
        session_key: session_key,
      },
      function (res) {
        console.log("这是我的战绩")
        console.log(res)
        console.log("这是我的战绩")
        cbFunc(res)

      })
  },
  //排行榜
  regustRangeData: function (page, cbFunc) {
     
     var that = this;
     that.requestNetByPost("game/get_score_sort",
      {
        page: page,
      },
      function (res) {
        console.log("排行榜")
        console.log(res)
        console.log("排行榜")
        cbFunc(res)

      })

  },
  //单人答题结果
  regustSingleResult: function (session_key, serial_num, log_id, question_id, cbFunc) {
    var that = this;

    that.requestNetByPost("game/get_result",
      {
        session_key: session_key,
        serial_num: serial_num,
        log_id: question_id,
        question_id: question_id

      },
      function (res) {
        console.log("单人答题结果")
        console.log(res)
        console.log("单人答题结果")
        cbFunc(res)

      })

  },
  //用户状态上报
  // regustgetRoomInfo: function (session_key, room_id, cbFunc) {
  //   var that = this;
  //   that.requestNetByPost("game/get_room_info",
  //     {
  //       session_key: session_key,
  //       room_id: room_id,
  //      },
  //     function (res) {
  //       console.log("用户状态上报")
  //       console.log(res)
  //       console.log("用户状态上报")
  //       cbFunc(res)
  //     })
  // },
  //开始游戏
  // regustgetRoomInfo: function (room_id, cbFunc) {
  //   var that = this;
  //   that.requestNetByPost("game/start_game",
  //     {

  //       room_id: room_id,
  //    },
  //     function (res) {
  //       console.log("开始游戏")
  //       console.log(res)
  //       console.log("开始游戏")
  //       cbFunc(res)
  //     })
  // },
  //销毁房间
  // regustDestroyRroom: function (room_id, cbFunc) {
  //   var that = this;
  //   that.requestNetByPost("game/destroy_room",
  //     {
  //      room_id: room_id,
  //     },
  //     function (res) {
  //       console.log("销毁房间")
  //       console.log(res)
  //       console.log("销毁房间")
  //       cbFunc(res)
  //     })
  // },
  //请求时间定时器
  // regustTimeData: function (room_id, cbFunc) {
  //   var that = this;
  //   that.requestNetByPost("game/get_room_createtime",
  //     {
  //      room_id: room_id,
  //     },
  //     function (res) {
  //       console.log("定时器")
  //       console.log(res)
  //       console.log("定时器")
  //       cbFunc(res)
  //     })
  // },
  //获取答题结果
  globalData: {
    userInfo: null,
    HOST: 'https://www.youbei.mobi/Picture/dati/',
    HOST_Local: '../../images/',

    HOST_Api: 'https://game.youbei.mobi/game/',
    nickName: '',
    userInfo: [],
  }
})
