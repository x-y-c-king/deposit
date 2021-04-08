// pages/detail/index.js
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
    markers: []
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
    this.setData({
      itemData: item,
      defaultData: {
        title: item.detail.nickName,
        icon: true
      },
      markers:marker
    })
    console.log()
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
  handleScrollTop: function(e) {
    console.log(e)
  }
})