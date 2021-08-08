// pages/common/common.js
import {
  getCommon
} from './../../service/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "店铺评价",
      icon: true
    },
    pageNum: 0,
    pageSize: 10,
    businessId: null,
    loading: true,
    finshed: false,
    commonList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    this.getCommon(id);
    this.setData({
      businessId: id,
    })
  },
  getCommon(id) {
    getCommon({
      id,
      'pageNum': this.data.pageNum,
      'pageSize': this.data.pageSize
    }).then((res) => {
      if (res.status === 200) {
        if(res.data.length < this.data.pageSize) {
          this.setData({
            finshed: true,
          })
        }
        this.setData({
          pageNum: this.data.pageNum + 1,
          commonList: this.data.commonList.concat(res.data || [])
        })
      }
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
    this.getCommon(this.data.businessId);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})