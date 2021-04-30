import {get, post} from './../utils/require'

// get
const getUserInfo = function(url, data = {}) {
  return get(url,data);
}
const getBusiness = function(url,data = {}) {
  return get(url,data)
}
const getBusinessInfo = function(data = {}) {
  const url = "/user/getBusinessInfo"
  return get(url,data);
}

// post
const setUserInfo =function(url,data = {}) {
  return post(url,data);
}




// export {
  
// }
module.exports = {
  getUserInfo,
  setUserInfo,
  getBusiness,
  getBusinessInfo
}
