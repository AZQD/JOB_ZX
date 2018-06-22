// pages/SingleAnswer/SingleAnswers.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pk_img: app.globalData.HOST_Local + 'pk/pk_white.png',
    tx_img: app.globalData.HOST + 'grade/tx.png',
    pk_success: app.globalData.HOST_Local  + 'pk/pk_success.png',
    width: '',
    height: '',
    currentTime:'10',
    ans_ok: app.globalData.HOST_Local + 'ok_icon.png',
    ans_false: app.globalData.HOST_Local + 'false_icon.png',
    answer_res: '1',
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    nc: '田女士',
    defau_tit: '',
    serial_num: '',
    time_flag: "true",
    time_flag2: "true",
    time_flag3: "false",
    singleFailResult: 'false',
    singleSuccessResult: 'true',
    flag_show:false,
    i_num: 1,
    singleFailResult: 'false',
    singleSuccessResult: 'true'
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
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 1000
    })
    var animation_fun=animation.width(16).rotate(36).step()
    var currentTime = that.data.currentTime;
    
    that.setData({

      time: currentTime,
       animation: animation_fun    

    })

    
    var that = this
    var context = wx.createCanvasContext('firstCanvas')
    var currentTime = '10'
    var i = 0
    var j = 1 / 5 * Math.PI
    var interval = setInterval(function () {
      that.setData({
        time: currentTime - 1
      })
      currentTime--;
      context.setStrokeStyle("#ff0000")
      context.setLineWidth(6)
      context.arc(34, 36, 24, 0, j, true)
      i = i + 1 / 5 * Math.PI
      j = i + 1 / 5 * Math.PI
      if (currentTime <=
        0) {

        clearInterval(interval)

        that.setData({
          time: '0',
          currentTime: 10,
          disabled: false

        })
      }
      context.stroke()
      context.draw()
    }, 1000)
    if(that.data.time=="0"){
      that.setData({

        flag_show: true
      })
      console.log(that.data.flag_show)
    }
    this.audioCtx = wx.createAudioContext('myAudio')
    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'
  },
  onShow: function (options) {
    var that = this
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        })
      }
    })
    this.setTime()
    var session_key = app.globalData.session_key
    var mode = '1'
    var initialize = '1'
    var room_id = '0'
    var invitee = '0'
    that.data.defau_tit = app.globalData.userInfo.nickName + '@你,向你发起黄帝文化PK,点击应战！'
    app.addAnswerDatainitialize(session_key, mode, initialize, room_id, invitee, function (res) {
      var initializeCon = res.data.data.question
      that.setData({
        title: initializeCon.title,
        right: initializeCon.right,
        log_id: res.data.data.log_id,
        source: initializeCon.source,
        answer: initializeCon.answer,
        question_id: initializeCon.id,
        serial_num: res.data.data.serial_num


      })
      console.log("初始化")

    })
    this.audioCtx = wx.createAudioContext('myAudio')
    var log_id = this.data.log_id
    var question_id = this.data.question_id
    var serial_num = this.data.serial_num
    var result = 0
    var answer = {
      question_id: question_id,
      result: result

    }

    //若用户没有答题自动进入下一题

    var nextquestion = function () {
      setInterval(function () {
        if (that.data.time_flag == "true") {
          console.log("onload定时器time_flag")
          console.log(that.data.time_flag)
          if (that.data.i_num < "11") {
            that.data.i_num++
            app.addAnswerNextData(session_key, mode, initialize, room_id, invitee, log_id, answer, function (res) {
              var initializeCon = res.data.data.question
              console.log("onload下一题")
              console.log(res.data)
              that.setData({
                title: initializeCon.title,
                right: initializeCon.right,
                log_id: res.data.data.log_id,
                source: initializeCon.source,
                answer: initializeCon.answer,
                question_id: initializeCon.id,
                currentTime: 10,
                time: 10,
                answer_res: 0,
                i_num: that.data.i_num
              })
            })
            console.log("that.data.question_id")
            console.log(that.data.question_id)
            that.setTime()
          }

          else {
            var t1 = function () { that.setTime() }
            console.log("清除定时器")
            clearInterval(t1),
              that.data.time_flag = "false"
            var log_id = that.data.log_id
            var question_id = that.data.question_id
            var serial_num = that.data.serial_num
            that.setData({
             time: '0'

            })
            console.log("排行榜参数")
            console.log(session_key)
            console.log(serial_num)
            console.log(log_id)
            console.log(question_id)
            console.log("排行榜参数")
            app.regustSingleResult(session_key, serial_num, log_id, question_id, function (res) {
              console.log("排行榜")
              console.log(res.data)
              var singleResult = res.status
              if (singleResult == "2000") {
                that.setData({
                  singleSuccessResult: 'true'

                })

              }
              else {
                // that.setData({

                //   singleFailResult: 'true'
                // })
                wx.navigateTo({
                  url: '../pk_result/pk_result',

                })
              }
            })
          }
        }
      }

        , "10000")
    }

    setTimeout(nextquestion, "1000")




    //单人答题结果

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onCkickToAnswer: function (e) {
    var that = this
    var t1 = function () { that.setTime() }
    console.log("清除定时器")
    clearInterval(t1)
    var t2 = function () { that.setTime2() }
    clearInterval(t2)
    that.data.time_flag3 = false
    that.data.time_flag = false
    var index = e.currentTarget.dataset.index

    var answer_tag = this.data.answer[index].answer_tag
    var falg = this.data.flag
    var right = this.data.right
    var result = this.data.answer[index].answer_tag

    if (answer_tag == right && falg == true) {
      that.setData({
        answer_res: 1,
        current: index,
        falg: false,
        // time_flag: "false"
      })
    }
    else {
      that.setData({
        answer_res: 2,
        current: index,
        falg: false,
        // time_flag: "false"
      })

      console.log("that.data.current")
      console.log(that.data.current)
    }
    var session_key = app.globalData.session_key
    var mode = '1'
    var initialize = '0'
    var room_id = '0'
    var invitee = '0'
    var log_id = this.data.log_id
    var question_id = this.data.question_id

    var answer = {
      question_id: question_id,
      result: result

    }
    console.log("获取下一题参数")
    console.log(session_key)
    console.log(mode)
    console.log(initialize)
    console.log(log_id)
    console.log(invitee)
    console.log(question_id)
    console.log(result)
    console.log("获取下一题参数")

    setTimeout(

      function () {
        if (that.data.time_flag2 == "true") {

          app.addAnswerNextData(session_key, mode, initialize, room_id, invitee, log_id, answer, function (res) {
            that.data.i_num++
            var initializeCon = res.data.data.question
            console.log("点击获取下一题结果")
            console.log(res.data)
            that.setData({
              title: initializeCon.title,
              right: initializeCon.right,
              log_id: res.data.log_id,
              source: initializeCon.source,
              answer: initializeCon.answer,
              log_id: log_id,
              currentTime: 10,
              time: 10,
              answer_res: 0,
              // time_flag: false,
              time_flag3: "true",
              i_num: that.data.i_num
            })
          })
          that.setTime2()
        }
      }, "2000");


    var nextquestion = function () {
      setInterval(function () {
        if (that.data.time_flag3 == "true") {
          that.data.time_flag2 = "false"
          if (that.data.i_num < "11") {
            app.addAnswerNextData(session_key, mode, initialize, room_id, invitee, log_id, answer, function (res) {

              that.data.i_num++
              var initializeCon = res.data.data.question
              console.log("click下一题")
              console.log(res.data)
              that.setData({
                title: initializeCon.title,
                right: initializeCon.right,
                log_id: res.data.log_id,
                source: initializeCon.source,
                answer: initializeCon.answer,
                log_id: log_id,
                currentTime: 10,
                serial_num: res.data.serial_num,
                time: 10,
                answer_res: 0,
                // time_flag2: false
                i_num: that.data.i_num
              })
            })
            that.setTime3()
          }

          else { 
            that.setData({
              time: '0'

            })
            var t3 = function () { that.setTime3() }
            console.log("清除定时器")
            clearInterval(t3),
              that.setData({
                time: '0'

              })
            that.data.time_flag3 = "false"
            var log_id = that.data.log_id
            var question_id = that.data.question_id
            var serial_num = that.data.serial_num
            console.log("排行榜参数")
            console.log(session_key)
            console.log(serial_num)
            console.log(log_id)
            console.log(question_id)
            console.log("排行榜参数")
            app.regustSingleResult(session_key, serial_num, log_id, question_id, function (res) {
              console.log("排行榜")
              console.log(res.data)
              var singleResult = res.status
              if (singleResult == "2000") {
                that.setData({
                  singleSuccessResult: 'true'

                })

              }
              else {
                // that.setData({

                //   singleFailResult: 'true'
                // })
                wx.navigateTo({
                  url: '../pk_result/pk_result',

                })

              }
            })



          }
        }

      }
        , "10000")
    }

    setTimeout(nextquestion, "2000")
    if (that.data.serial_num == "3") {
      app.regustSingleResult(session_key, serial_num, log_id, question_id, function (res) {
        console.log("排行榜")
        console.log(res.data)
      })
    }

  },
  //定时器
  setTime: function () {

    var currentTime2 = 10
    var that = this
    console.log("setTime定时器time_flag")
    console.log(that.data.time_flag)

    var interval = setInterval(function () {

      if (that.data.time_flag == "true") {



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

            disabled: false

          })

        }
      }

    }, "1000")

  },
  //点击事件里的定时器
  setTime2: function () {

    console.log("点击事件定时器2")
    var currentTime2 = 10
    var that = this
    that.data.time = 10
    console.log(that.data.time_flag2)

    var interval = setInterval(function () {

      if (that.data.time_flag2 == "true") {


        that.setData({

          time: currentTime2 - 1,


        })
        console.log("time2")
        console.log(that.data.time)

        currentTime2--;

        if (currentTime2 <=
          0) {

          clearInterval(interval)

          that.setData({

            time: '0',

            currentTime2: 10,

            disabled: false

          })

        }
      }

    }, "1000")


  },
  setTime3: function () {

    console.log("点击事件定时器3")
    var currentTime2 = 10
    var that = this
    that.data.time = 10
    console.log(that.data.time_flag3)

    var interval =
      setInterval(function () {
        if (that.data.time_flag3 == "true") {
          that.setData({

            time: currentTime2 - 1,


          })
          console.log("time3")
          console.log(that.data.time)
          currentTime2--;

          if (currentTime2 <=
            0) {

            clearInterval(interval)

            that.setData({

              time: '0',

              currentTime2: 10,

              disabled: false

            })

          }


        }

      }, "1000")

  },
  onHide: function () {
    var t3 = function () { that.setTime3() }
    console.log("清除定时器")
    clearInterval(t3),
      this.data.time_flag3 = "false"

  },
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
  /**
 * 单人答题
 */
  onClickSingAns: function () {
    wx.navigateTo({
      url: '../SingleAnswer/SingleAnswers',

    })
  },
  /**
 * pk答题
 */
  onClickPkAns: function () {
    wx.navigateTo({
      url: '../pk_answer_in/pk_answer_in',

    })
  },
  /**
* 我要出题
*/
  onClickPToAddQues: function () {
    wx.navigateTo({
      url: '../add_question/add_question',

    })
  },
  /**
* 排行榜
*/
  onClickPToAddRang: function () {
    wx.navigateTo({
      url: '../ranking_list/ranking_list',

    })
  },
})