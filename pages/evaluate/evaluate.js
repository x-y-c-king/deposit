// pages/evaluate/evaluate.js
import {
  evaluate
} from './../../service/api'
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "反馈", // 导航栏标题
      icon: true
    },
    form: {
      rating: 0,
      rating1: 0,
      rating2: 0,
      content: "",
    },
    autosize: {
      maxHeight: 100,
      minHeight: 80
    },item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = JSON.parse(decodeURIComponent(options.item || '{}'));
    this.setData({
      item: item
    })
    // this.data.item = item;
    // console.log(item)

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
  onChange(event) {
    // event.detail
    this.data.form.rating = event.detail;
  },
  onChange1(event) {
    // event.detail
    this.data.form.rating1 = event.detail;
  },
  onChange2(event) {
    // event.detail
    this.data.form.rating2 = event.detail;
  },
  handleInput(event) {
    this.data.form.content = event.detail;
  },
  handleEval() {
    // console.log(this.data.form)
    const form = this.data.form;
    const rating = (form.rating + form.rating1 + form.rating2) / 3;
    if (form.content === "" || rating === 0) {
      // wx.showToast({
      //   title: '评价内容或评分不能为空',
      // })
      Toast({
        message: "评价内容或评分不能为空",
        position: 'bottom'
      });
      return
    }
    wx.showLoading({
      title: '上传中',
    })
    evaluate({
      id: this.data.item.businessId,
      userId: wx.getStorageSync('userid'),
      rating: parseInt(rating * 10) / 10,
      content: form.content,
      orderId: this.data.item.orderId
    }).then((res) => {
      wx.hideLoading()
      if (res.status === 200) {
        Toast({
          message: "发表成功",
          position: 'bottom'
        });
        wx.navigateBack()
      }
      // console.log(res)
    }).catch((err) => {
      wx.hideLoading()
      Toast({
        message: "发表失败",
        position: 'bottom'
      });
    })
  }
})