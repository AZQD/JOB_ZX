const { globalData } = require("./globalData");
const {ajaxDomain} = globalData;
export const  api = {
  AUTH_LOGIN: ajaxDomain+'/Auth/login',
};