const {
  get
} = require("../../utils/require");
import {
  getBusinessInfo
} from "../../service/api";
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast'
// pages/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "店铺详情",
      icon: true
    },
    itemData: {},
    markers: [],
    client: app.globalData.clientHeight,
    navBarHeight: app.globalData.navBarHeight,
    opacity: 0,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    PageInfo: {},
    pageDate: {},
    loading: true
  },
  get: function (tag) {
    return this.data[tag]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = JSON.parse(decodeURIComponent(options.item));
    const marker = [{
      longitude: item.longitude,
      latitude: item.latitude,
      iconPath: '/image/location.png',
      width: 65,
      height: 65,
    }]
    let info = this.getBusInfo(item);
    this.getPageDate(item.id);
    this.setData({
      itemData: item,
      defaultData: {
        title: item.detail.nickName,
        icon: true
      },
      markers: marker
    })


  },
  getPageDate(id) {
    getBusinessInfo({
      id
    }).then((res) => {
      this.setData({
        loading: false
      })
      if (res.status === 200) {
        this.setData({
          pageDate: {
            ...res.data,
            price: res.data.info.priceType.split(',')
          }
        })
      }

    }).catch((err) => {
      this.setData({
        loading: false
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleScrollTop: function (e) {
    const height = this.data.navBarHeight;
    let scrollTop = e.detail.scrollTop;

    let opacity;
    if (scrollTop > height) {
      opacity = 1;
    } else if (scrollTop < 5) {
      opacity = 0;
    } else {
      opacity = scrollTop / height;
    }
    this.setData({
      opacity: opacity
    })
  },
  handlePay: function () {
    if (!app.globalData.isLogin) {
      Toast({
        message: "请先登录",
        position: "bottom"
      })
      return
    }
    if (this.data.pageDate.info.open === 0) {
      Toast({
        message: "店铺也关闭！",
        position: "bottom"
      })
      return
    }
    wx.navigateTo({
      url: '../pay/pay?item=' + encodeURIComponent(JSON.stringify(this.data.pageDate)),
    })
  },
  getBusInfo: function (item) {
    // const url = 
    // console.log(getBusinessInfo)
    //  getBusinessInfo({id: item.id }).then( (res) => {
    //   //  console.log(res)
    // })
  },
  handleToWarning() {

  },
  handleToCommon() {
    // Toast({
    //   message: '请先登录',
    //   position: "bottom"
    // })
    wx.navigateTo({
      url: '../common/common?id=' + this.data.itemData.id
    })
  },
})