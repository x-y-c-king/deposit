import {get, post} from './../utils/require'


const getUserInfo = function(url, data = {}) {
  return get(url,data);
}
const getBusiness = function(url,data = {}) {
  return get(url,data)
}


const setUserInfo =function(url,data = {}) {
  return post(url,data);
}



// export {
  
// }
module.exports = {
  getUserInfo,
  setUserInfo,
  getBusiness
}
