import {
  get,
  post
} from './../utils/require'

// get
const getUserInfo = function (url, data = {}) {
  return get(url, data);
}
const getBusiness = function (url, data = {}) {
  return get(url, data)
}
const getBusinessInfo = function (data = {}) {
  console.log(data)
  const url = "/user/getBusinessInfo"
  return get(url, data);
}
const getCommon = function (data = {}) {
  const url = '/user/getCommon';
  return get(url, data);
}
const getOrderList = function (data = {}) {
  const url = '/user/getOrderList'
  return get(url, data);
}
const settingOrder = function (data = {}) {
  const url = '/user/settingOrder'
  return get(url, data);
}


// post
const setUserInfo = function (url, data = {}) {
  return post(url, data);
}

const userName = function getUserName(data = {}) {
  const url = '/user/getUserName'
  return get(url, data)
}

const evaluate = function (data = {}) {
  const url = "/user/evaluate";
  return post(url, data);
}
const pay = function (data = {}) {
  const url = "/user/pay"
  return post(url, data);
}
const uploadBusiness = function (data = {}) {
  const url = '/user/addBusiness';
  return post(url, data);
}
const switchShop = function(data = {}) {
  const url = '/user/switchShop'
  return get(url,data)
}
const getOpen = function(data = {}) {
  const url = '/user/getOpen'
  return get(url, data)
}
const getBusinessOrder = function(data = {}) {
  const url = "/user/getBusinessOrder"
  return get(url, data);
}



// export {

// }
module.exports = {
  getUserInfo,
  setUserInfo,
  getBusiness,
  getBusinessInfo,
  getCommon,
  getOrderList,
  settingOrder,
  evaluate,
  pay,
  uploadBusiness,
  userName,
  switchShop,getOpen,getBusinessOrder
}