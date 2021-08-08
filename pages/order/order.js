// pages/order/order.js
const app = getApp()
import {
  settingOrder,getOrderList
} from './../../service/api'
// import {
//   getOrderList
// } from "./../../service/api"
// import Toast from './../../node_modules/@vant/weapp/lib/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    defaultData: {
      title: "订单中心", // 导航栏标题
      icon: false
    },
    order: [],
    finshed: false,
    barHeight: app.globalData.navBarHeight,
    isLogin: app.globalData.isLogin,
    steps: [{
        text: '预约中',
        // desc: '描述信息',
        inactiveIcon: 'clock-o',
        activeIcon: 'clock',
      },
      {
        text: '进行中',
        // desc: '描述信息',
        inactiveIcon: 'fire-o',
        activeIcon: 'fire',
      },
      {
        text: '已完成',
        // desc: '描述信息',
        inactiveIcon: 'smile-o',
        activeIcon: 'smile',
      }
    ],
    active: 2,
    pageNum: 0,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList(true);
  },
  getOrderList(first = false) {
    console.log(this.data.isLogin)
    if (!app.globalData.isLogin) {
      // Toast("请先登录");
      return;
    }
    if (first) {
      wx.showLoading({
        title: '加载中...',
      })
    }

    getOrderList({
      id: app.globalData.userId,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }).then((res) => {
      if (first) {
        wx.hideLoading();
      }
      wx.stopPullDownRefresh();
      if (res.status === 200) {
        if (res.data.length < this.data.pageSize) {
          // this.finshed = true;
          this.setData({
            finshed: true
          })
        }
        if (first === 1) {
          this.setData({
            order: res.data,
            pageNum: this.data.pageNum + 1
          })
        } else {
          this.setData({
            order: this.data.order.concat(res.data),
            pageNum: this.data.pageNum + 1
          })
        }

      }
    }).catch((err) => {
      // wx.stopPullDownRefresh
      wx.stopPullDownRefresh();
      if (first) {
        wx.hideLoading();
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
    this.setData({
      isLogin: app.globalData.isLogin,
      pageNum: 0
    })
    // this.setData({
    //   pageNum: 0
    // })
    this.getOrderList(1);
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
    this.setData({
      pageNum: 0
    })
    this.getOrderList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.finshed) {
      this.getOrderList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleOper(e) {
    const type = e.target.dataset.key;
    const index = e.target.dataset.index;
    const item = e.target.dataset.item;
    console.log(typeof type)
    let date = this.data.order;
    let t = []
    wx.showLoading({
      title: '加载中',
    })
    settingOrder({
      id: item.orderId,
      userId: app.globalData.userId,
      type
    }).then((res) => {
      wx.hideLoading();
      switch (type) {
        case '1':
          for (let i = 0; i < date.length; i++) {
            if (i === index) {
              date[i].cancel = 1;
            }
            t.push(date[i]);
          }
          break;
        case '2':
          for (let i = 0; i < date.length; i++) {
            if (i === index) {
              date[i].step = 2;
              // continue;
            }
            t.push(date[i]);
          }
          wx.navigateTo({
            url: '../evaluate/evaluate?item=' + encodeURIComponent(JSON.stringify(item))
            // events: this.data.itemData
          })
          break;
        case '3':
          for (let i = 0; i < date.length; i++) {
            if (i === index) {
              continue;
            }
            t.push(date[i]);
          }
          break;
      }
      this.setData({
        order: t
      })
    }).catch((err) => {
      wx.hideLoading();
    })


  },
  handleTel(e) {
    console.log(e)
    const tel = e.target.dataset.tel;
    // console.log(item)
    wx.showActionSheet({
      itemList: ['呼叫'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: tel, //此号码并非真实电话号码，仅用于测试
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        }
      }
    })
    // wx.makePhoneCall({
    //   phoneNumber: tel, //此号码并非真实电话号码，仅用于测试
    //   success: function () {
    //     console.log("拨打电话成功！")
    //   },
    //   fail: function () {
    //     console.log("拨打电话失败！")
    //   }
    // })
  }
})