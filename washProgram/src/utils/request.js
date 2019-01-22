/**
 * @param {*} path :请求url
 * @param {*} params : 请求需要传的参数
 * @param {*} method : 请求的方式，默认是GET，可以是POST
 */

const methods = {
  requestPost(path, params) {
    return methods.request(path, params, 'POST');
  },
  request(path, params, method = 'GET') {
    return new Promise(function(resolve, reject) {
      params = { ...params };
      wx.request({
        url: path,
        data: params,
        method,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          resolve(data);
        },
        fail: msg => {
          wx.showModal({
            title: '提示',
            content: '当前没有网络连接',
            showCancel: false
          });
          console.log(msg);
          reject(msg);
        }
      });
    });
  }
};

module.exports = methods;
