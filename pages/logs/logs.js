//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    logs: [],
    defaultData: {
      title: "订单中心", // 导航栏标题
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})