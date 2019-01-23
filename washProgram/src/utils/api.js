const { globalData } = require("./globalData");
const {ajaxDomain} = globalData;
export const  api = {
  AUTH_LOGIN: ajaxDomain+'/Auth/login',
  GET_INDEX_CLOTH_CATEGORY: ajaxDomain+'/index/getIndexClothCategory',
  GET_WEAPP_BANNER: ajaxDomain+'/WeappBanner/getWeappBanner',
};