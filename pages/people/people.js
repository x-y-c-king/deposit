// pages/people/people.js
// import { getUserInfo,setUserInfo } from "../../service/api"
const api = require("../../service/api")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    UserInfo: {
      avatar: "",
      nickName: ""
    },
    defaultData: {
      title: "个人中心", // 导航栏标题
    },
    List:[{
        "id": 1,
        "icon": "friends-o",
        "title": "商家入驻"
      },
      {
        "id": 2,
        "icon": "coupon-o",
        "title": "我的优惠券"
      },
      {
        "id": 3,
        "icon": "orders-o",
        "title": "用户协议"
      },
      {
        "id": 4,
        "icon": "bulb-o",
        "title": "隐私政策"
      },
      {
        "id": 5,
        "icon": "setting-o",
        "title": "设置"
      },
      {
        "id": 1,
        "icon": "friends-o",
        "title": "商家入驻"
      },
      {
        "id": 2,
        "icon": "coupon-o",
        "title": "我的优惠券"
      },
      {
        "id": 3,
        "icon": "orders-o",
        "title": "用户协议"
      },
      {
        "id": 4,
        "icon": "bulb-o",
        "title": "隐私政策"
      },
      {
        "id": 5,
        "icon": "setting-o",
        "title": "设置"
      }
    ],
  },
  chile: function (e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isLogin) {
      console.log(app)
      this.setData({
        UserInfo: app.globalData.userInfo,
        isLogin: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleCellClick: function(event) {
    console.log(event.target.dataset['item'])
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("显示")
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
    console.log("上拉");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("底部");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("my name is people!");
  },
  PeopleLogin: function (e) {
    const url = '/user/test'
    const userid = app.globalData.userId
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res1) => {
        // console.log(res1)
        // wx.setStorageSync('UserInfo', res1.userInfo)
        this.setData({
          UserInfo: {
            ...res1.userInfo,
            avatar: res1.UserInfo.avatarUrl
          },
          isLogin: true
        })
        this.sendUserInfo(res1.userInfo, userid);
      }
    })
  },
  sendUserInfo: function (userInfo, userid) {
    let url = '/user/setUserInfo'
    // console.log(url)
    api.setUserInfo(url, {
      userid,
      avater: userInfo.avatarUrl,
      name: userInfo.nickName,
      gender: userInfo.gender
    }).then(res => {
      console.log(res)

    })

  },
})