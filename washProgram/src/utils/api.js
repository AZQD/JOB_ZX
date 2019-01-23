const { globalData } = require("./globalData");
const {ajaxDomain} = globalData;
export const  api = {

  //登录注册
  AUTH_LOGIN: ajaxDomain+'/Auth/login', //用户注册接口

  //个人中心
  USER_DETAIL: ajaxDomain+'/User/userDetail', //我的（个人基本信息接口）

  //首页
  GET_INDEX_CLOTH_CATEGORY: ajaxDomain+'/index/getIndexClothCategory', //获取小程序首页分类信息
  GET_WEAPP_BANNER: ajaxDomain+'/WeappBanner/getWeappBanner', //获取小程序Banner列表

  //订单
  ORDER_LIST: ajaxDomain+'/User/orderList', //用户订单列表接口

  //价格表
  GET_CLOTH_CATEGORY: ajaxDomain+'/index/getClothCategory', //价格表
};