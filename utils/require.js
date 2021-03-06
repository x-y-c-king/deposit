let params = {}
// const BaseUrl = "http://xie-y-c.top:3000"
const BaseUrl = "http://192.168.252.96:3000"
import toast from './../miniprogram_npm/@vant/weapp/toast/toast'

const get = function (url, data = {}) {
  url = BaseUrl + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method:"GET",
      data: {
        ...data,
        ...params
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // resolve(res.data);
          if (res.data.status === 200) {
            resolve(res.data);
            return
          } 
          // wx.showToast({
          //   title: res.data.msg,
          // })
          toast({message:res.data.msg,position:"bottom"})
          reject(res.data);
        } else {
          reject(res)
        }
      },
      timeout: 5000,
      fail: (err) => {
        reject(err)
      }
    })
  })
}
const post = function (url, data = {}) {
  url = BaseUrl + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method:"POST",
      data: {
        ...data,
        ...params
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
        // 'content-type':"application/text"
      },
      timeout: 5000,
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.status === 200) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.msg,
            })
            reject(res.data);
          }
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export {
  get,
  post
}