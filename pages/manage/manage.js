// pages/manage/manage.js
import {
  getBusinessOrder,
  settingOrder
} from './../../service/api'
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "店铺订单", // 导航栏标题
      icon: true
    },
    orderList: [],
    finshed: false,
    pageNum: 0,
    pageSize: 10,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options;
    // const 
    this.setData({
      id: id || 10
    })
    this.getPageList(true)
  },
  getPageList(first = false) {
    let {
      orderList,
      pageNum,
      pageSize,
      id
    } = this.data;
    if (first) {
      wx.showLoading({
        title: '加载中',
      })
    }
    getBusinessOrder({
      pageNum,
      pageSize,
      id
    }).then(res => {
      if (res.status === 200) {
        if (res.data.length < pageSize) {
          this.setData({
            finshed: true
          })
        }
        orderList = orderList.concat(res.data);
        this.setData({
          pageNum: pageNum + 1,
          orderList,
        })
        if (first) {
          wx.hideLoading()
        }
      }
    }).catch(err => {
      this.setData({
        finshed: true
      })
      if (first) {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.finshed) {
      this.getPageList()
    }

  },
  handleGet(event) {
    const {
      index,
      item
    } = event.target.dataset;
    wx.showLoading({
      title: '处理中',
    })
    settingOrder({
      id: item.orderId,
      userId: wx.getStorageSync('userid'),
      type: 4
    }).then((res) => {
      const {
        orderList
      } = this.data;
      let order = orderList[index];
      order.step = 1
      orderList.splice(index, 1, order);
      this.setData({
        orderList
      })
      Toast({
        message: "操作成功",
        position: "bottom"
      })
      // orderList.
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
    })
    // const 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})