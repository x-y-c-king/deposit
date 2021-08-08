//app.js
import api from "./service/api"
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 获取导航栏高度
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.clientHeight = systemInfo.screenHeight;
    // console.log(systemInfo)
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuHeight = menuButtonInfo.height;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const url = '/user/getUserInfo';
        api.getUserInfo(url, {
          code: res.code
        }).then((result) => {
          // if(re)
          wx.setStorageSync('userid', result.data.userId)
          
          if (result.data.flag) {
            console.log("app true")
            wx.setStorageSync('UserInfo', result.data)
            this.globalData.userInfo = result.data;
            this.globalData.userId = result.data.userId;
            this.globalData.isLogin = true;
            if(result.data.isBusiness) {
              this.globalData.business = result.data.businessId;
            }
          } else {
            console.log("app false")
            wx.setStorageSync('UserInfo', null)
            this.globalData.isLogin = false;
            this.globalData.userId = result.data.userId;
          }
        })
      }
    })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // let user = wx.getStorageSync('UserInfo') || null;
    // if (user !== null) {
    //   this.globalData.userInfo = user;
    //   this.globalData.isLogin = true;
    // }
  },
  globalData: {
    userId: null,
    userInfo: null,
    isLogin: false,
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    clientHeight: 0,
    business: null,
  }
})