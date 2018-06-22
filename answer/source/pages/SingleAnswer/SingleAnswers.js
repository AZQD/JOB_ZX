// pages/SingleAnswer/SingleAnswers.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    pk_img: app.globalData.HOST_Local + 'pk/pk_white.png',
    tx_img: app.globalData.HOST + 'grade/tx.png',
    pk_fail: app.globalData.HOST_Local + 'pk/pk_fail.png',
    pk_success: app.globalData.HOST_Local + 'pk/pk_success.png',
    time: '10',
    ans_ok: app.globalData.HOST_Local + 'ok_icon.png',
    ans_false: app.globalData.HOST_Local + 'false_icon.png',
    answer_res: '0',
    sound_url: app.globalData.HOST + '1.mp3',
    music_img: 'http://ou3tkgwq7.bkt.clouddn.com/music.png',
    log_id: '',
    title: '',
    A_con: '',
    B_con: '',
    c_con: '',
    answer: [],
    current: '',
    i_num: 1,
    question_id: '',
    result: '',
    nc: '田女士',
    defau_tit: '',
    serial_num: '',
    time_flag: "true",
    time_flag2: "true",
    time_flag3: "false",
    singleFailResult: '0',
    singleSuccessResult: '0',
    clickFlag: 'false',
    timeFlag3: 'false',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    //获取屏幕的高
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
    //初始化数据
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
    var log_id = that.data.log_id
    var question_id = that.data.question_id
    var serial_num = that.data.serial_num
    var result = 0
    var answer = {
      question_id: question_id,
      result: result
    }

    //若用户没有答题自动进入下一题
    //自动请求下一题
    var nextquestion = function () {
      setInterval(function () {
        if (that.data.time_flag == "true") {
          console.log("onload定时器time_flag")
          console.log(that.data.time_flag)
          if (that.data.i_num < "10") {
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
                i_num: that.data.i_num,

              })
            })
            var log_id = that.data.log_id
            var question_id = that.data.question_id
            var serial_num = that.data.serial_num
            var result = 0
            var answer = {
              question_id: question_id,
              result: result

            }
            console.log("无作答获取下一题参数")
            console.log(session_key)
            console.log(mode)
            console.log(initialize)
            console.log(room_id)
            console.log(log_id)
            console.log(invitee)
            console.log(question_id)
            console.log(answer)
            console.log("无作答获取下一题参数")
            that.setTime()
          }

          else {
            that.setData({
              time: '0'
            })
            that.data.time_flag = "false"
            var log_id = that.data.log_id
            var question_id = that.data.question_id
            var serial_num = that.data.serial_num
            console.log("挑战结果参数")
            console.log(session_key)
            console.log(serial_num)
            console.log(log_id)
            console.log(question_id)
            console.log("挑战结果参数")
            app.regustSingleResult(session_key, serial_num, log_id, question_id, function (res) {
              console.log("挑战结果参数status")
              console.log(res.status)
              console.log("挑战结果参数status")
              var singleResult = res.data.status
              if (singleResult == "2000") {
                that.setData({
                  singleSuccessResult: '1'
                })
                console.log(that.data.singleSuccessResult)
              }
              else {
                that.setData({

                  singleFailResult: '1'
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
  onClickSingAns: function () {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onCkickToAnswer: function (e) {
    var that = this
    var nextquestion
    clearInterval(that.setTime3())
    clearInterval(that.setTime2())

    that.setData({
      time: '0'
    })
    that.data.timeFlag3 = 'false',
      that.data.time_flag = 'false'
    that.data.time_flag3 = 'false'
    that.data.time_flag2 = 'false'
    console.log("onclickthat.data.time_flag3")
    console.log(that.data.time_flag3)

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
        clickFlag: 'true',
        time_flag3: 'false',
        time: 10,

      })
    }
    else {
      that.setData({
        answer_res: 2,
        current: index,
        falg: false,
        clickFlag: 'true',
        time_flag3: 'false',
        time: 10,
      })

    }

    //请求接口参数

    //完成本题请求下一题 
    setTimeout(
      function () {

        var session_key = app.globalData.session_key
        var mode = '1'
        var initialize = '0'
        var room_id = '0'
        var invitee = '0'
        var log_id = that.data.log_id
        var question_id = that.data.question_id
        var result = that.data.result
        console.log("question_id")
        console.log(question_id)
        var answer = {
          question_id: question_id,
          result: result

        }
        console.log("获取下一题参数onclick")
        console.log(session_key)
        console.log(mode)
        console.log(initialize)
        console.log(room_id)
        console.log(log_id)
        console.log(invitee)
        console.log(question_id)
        console.log(answer)
        console.log("获取下一题参数onclick")
        //请求下一题
        if (that.data.i_num < "10") {

          app.addAnswerNextData(session_key, mode, initialize, room_id, invitee, log_id, answer, function (res) {


            that.data.i_num++

            var initializeCon = res.data.data.question
            console.log("获取下一题结果")
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
              time_flag2: 'true',
              time_flag3: 'false',
              i_num: that.data.i_num,
              clickFlag: 'false',
            })
          })
          var log_id = that.data.log_id
          var question_id = that.data.question_id
          var serial_num = that.data.serial_num
          var result = 0
          var answer = {
            question_id: question_id,
            result: result

          }
          that.setTime2()
        } else {

          console.log("清除定时器t2")

          that.setData({
            time: '0'

          })

          var log_id = that.data.log_id
          var session_key = app.globalData.session_key
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
            var singleResult = res.data.status
            if (singleResult == "2000") {
              that.setData({
                singleSuccessResult: '1'
              })

            }
            else {
              that.setData({

                singleFailResult: '1'
              })

            }
          })


        }


      }, "2000");
    that.data.time_flag2 = "false"
    //无作答定时请求题目
    // nextquestion = function () {
    //   that.data.time_flag3 = 'true'
    //   if (that.data.time_flag3 == "true") {
    //   setInterval(function () {

    //     console.log("自动请求题目that.data.time_flag3")
    //     console.log(that.data.time_flag3)

    //     if (that.data.time_flag3 == "true") {
    //      
    //       that.data.timeFlag3='true'
    //       if (that.data.i_num < "10") {
    //         var session_key = app.globalData.session_key
    //         var mode = '1'
    //         var initialize = '0'
    //         var room_id = '0'
    //         var invitee = '0'
    //         var log_id = that.data.log_id
    //         var question_id = that.data.question_id
    //         var result = '0'
    //         console.log("question_id")
    //         console.log(question_id)
    //         var answer = {
    //           question_id: question_id,
    //           result: result

    //         }
    //         console.log("获取下一题参数onClick定时器")
    //         console.log(session_key)
    //         console.log(mode)
    //         console.log(initialize)
    //         console.log(room_id)
    //         console.log(log_id)
    //         console.log(invitee)
    //         console.log(question_id)
    //         console.log(answer)
    //         console.log("获取下一题参数onClick定时器")


    //         app.addAnswerNextData(session_key, mode, initialize, room_id, invitee, log_id, answer, function (res) {

    //           that.data.i_num++
    //           var initializeCon = res.data.data.question
    //           console.log("click下一题")
    //           console.log(res.data)
    //           that.setData({
    //             title: initializeCon.title,
    //             right: initializeCon.right,
    //             log_id: res.data.data.log_id,
    //             source: initializeCon.source,
    //             answer: initializeCon.answer,
    //             question_id: initializeCon.id,
    //             currentTime: 10,
    //             timeFlag3: 'true',
    //             time: 10,
    //             answer_res: 0,
    //             time_flag3: 'true',
    //             i_num: that.data.i_num,
    //             clickFlag: 'false',
    //           })
    //         })
    //         that.setTime3()
    //       }

    //       else {

    //         console.log("清除定时器t3")
    //         clearInterval(function () { that.setTime3() }),
    //           that.setData({
    //             time: '0'

    //           })
    //         that.data.time_flag3 = "false"
    //         var log_id = that.data.log_id
    //         var session_key = app.globalData.session_key
    //         var question_id = that.data.question_id
    //         var serial_num = that.data.serial_num
    //         console.log("排行榜参数")
    //         console.log(session_key)
    //         console.log(serial_num)
    //         console.log(log_id)
    //         console.log(question_id)
    //         console.log("排行榜参数")
    //         app.regustSingleResult(session_key, serial_num, log_id, question_id, function (res) {
    //           console.log("排行榜")
    //           console.log(res.data.status)
    //           var singleResult = res.data.status
    //           if (singleResult == "2000") {
    //             that.setData({
    //               singleSuccessResult: '1'

    //             })

    //           }
    //           else {
    //             that.setData({

    //               singleFailResult: '1'
    //             })

    //           }
    //         })


    //       }
    //     }


    //     else {


    //       that.data.timeFlag3 = 'false'
    //     }
    //   }
    //     , "10000")
    //   }
    // }


    // var autoNext = setTimeout(nextquestion, "3000")




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
    if (that.data.time_flag2 == "true") {
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
    }


  },
  setTime3: function () {

    console.log("点击事件定时器3")
    var currentTime2 = 10
    var that = this
    that.data.time = 10

    if (that.data.time_flag3 == "true") {
      var interval =
        setInterval(function () {
          console.log(that.data.time_flag3)
          console.log("that.data.time_flag3setTime3")
          if (that.data.timeFlag3 == "true") {
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
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  // 

  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.time_flag3 = 'false'

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

})