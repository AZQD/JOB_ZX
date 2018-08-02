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
    pk_success: app.globalData.HOST_Local + 'pk/pk_success.png',
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