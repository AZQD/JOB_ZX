const { globalData } = require("./globalData");
const {ajaxDomain} = globalData;
export const  api = {
  AUTH_LOGIN: ajaxDomain+'/Auth/login', //用户注册接口
  GET_INDEX_CLOTH_CATEGORY: ajaxDomain+'/index/getIndexClothCategory', //获取小程序首页分类信息
  GET_WEAPP_BANNER: ajaxDomain+'/WeappBanner/getWeappBanner', //获取小程序Banner列表

  ORDER_LIST: ajaxDomain+'/User/orderList', //用户订单列表接口
};