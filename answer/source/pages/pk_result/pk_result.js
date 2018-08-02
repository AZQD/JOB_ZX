// pages/pk_result/pk_result.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    pk_success: app.globalData.HOST_Local + 'pk/pk_fail.png',
   
    tx_img: app.globalData.HOST + 'grade/tx.png',
    bg_img: app.globalData.HOST_Local + 'pk/pk_re_bg.png',
    success_img: app.globalData.HOST_Local + 'pk/success.png',
    fail_img: app.globalData.HOST_Local + 'pk/fail.png',
    pk_img: app.globalData.HOST_Local + 'pk/pk_white.png',
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
        })
      }
    })
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