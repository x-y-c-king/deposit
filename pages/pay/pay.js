// pages/pay/pay.js
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast'
import {
  pay
} from './../../service/api'
// const md5 = require('./../../utils/md5');
import {
  md5
} from './../../utils/md5'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "行李寄存",
      icon: true
    },
    itemData: {},
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    startTimer: "",
    endTimer: "",
    start: "",
    end: "",
    type: null,
    num1: 0,
    num2: 0,
    count: 0,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  getTimeDate() {
    let time = Date.parse(new Date());
    const rult = 60 * 24 * 60 * 60 * 1000;
    this.setData({
      maxDate: new Date(parseInt(time) + rult).getTime()
    })

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onPopup(e) {
    console.log(e)
    this.setData({
      show: true,
      type: e.currentTarget.dataset['type']
    });
  },
  onInput(event) {
    // this.setData({

    // });
  },
  handleAdd(event) {
    let num1 = this.data.num1;
    let num2 = this.data.num2;
    if (event.currentTarget.dataset['type'] === '1') {
      if (this.data.itemData.info.bigStock === this.data.num1) {
        Toast({
          message: "商家库存不足",
          position: 'bottom'
        });
        return
      }
      this.setData({
        num1: num1 + 1
      })
    } else {
      if (this.data.itemData.info.stock === this.data.num2) {
        Toast({
          message: "商家库存不足",
          position: 'bottom'
        });
        return
      }
      this.setData({

        num2: num2 + 1
      })
    }
    this.handleCountChange();
  },
  handleCountChange() {
    if (this.data.endTimer === '' || this.data.startTimer === "") {
      return
    }
    let day = Math.ceil(((this.data.endTimer - this.data.startTimer) / 1000 / 60 / 60 / 24) + 1);
    let price = this.data.num1 * 10 + this.data.num2 * 5;
    // console.log(day)
    this.setData({
      count: day * price
    })
  },
  handleRemove(event) {
    let num1 = this.data.num1;
    let num2 = this.data.num2;
    if (event.currentTarget.dataset['type'] === '1') {
      if (num1 === 0) {
        return
      }
      this.setData({
        num1: num1 - 1
      })
    } else {
      if (num2 === 0) {
        return
      }
      this.setData({
        num2: num2 - 1
      })
    }
    this.handleCountChange();
  },
  handleConfirm(event) {
    let date = new Date(event.detail)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (this.data.type === '1') {
      this.setData({
        currentDate: event.detail,
        start: `${year}年${month}月${day}日`,
        startTimer: event.detail,
        show: false
      })
      if (this.data.endTimer < event.detail && this.data.endTimer !== '') {
        this.setData({
          endTimer: event.detail,
          end: `${year}年${month}月${day}日`
        })
      }
    } else {
      if (this.data.startTimer === '') {
        Toast({
          message: "请先选择开始时间",
          position: "bottom"
        })
        return
      }
      if (event.detail < this.data.startTimer) {
        Toast({
          message: "结束时间不能小于开始时间！",
          position: "bottom"
        })
        // Toast("结束时间不能小于开始时间！")
        return;
      }
      this.setData({
        currentDate: event.detail,
        end: `${year}年${month}月${day}日`,
        endTimer: event.detail,
        show: false
      })
    }
    this.handleCountChange();
    // this.setData({
    //   currentDate: event.detail,
    //   show: false
    // })
  },

  onGetUserInfo(e) {
    console.log(e.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = JSON.parse(decodeURIComponent(options.item))
    this.setData({
      itemData: item,
      defaultData: {
        title: item.info.nickName,
        icon: true
      }
    })

    this.getTimeDate();
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
  handlePay() {
    // console.log(this.data);
    // let {item, startTi} = this.data;

    let data = {
      userId: wx.getStorageSync('userid'),
      id: this.data.itemData.info.id,
      start: this.data.startTimer,
      end: this.data.endTimer,
      pack: this.data.num2,
      box: this.data.num1,
      price: this.data.count
    }
    if (data.start === "" && data.end === "") {
      Toast({
        message: "起止时间不能为空",
        position: 'bottom'
      })
      return;
    }
    if (data.pack === 0 && data.box === 0) {
      Toast({
        message: "请选择寄存的商品",
        position: 'bottom'
      })
      return
    }
    wx.showLoading({
      title: '支付中',
    })
    pay(data).then((res) => {
      wx.hideLoading();
      if (res.status === 200) {
        // Toast({
        //   message: "支付成功",
        //   position: "bottom"
        // })
        wx.showToast({
          title: '支付成功',
        })
        wx.navigateBack()
      }
    }).catch((err) => {
      wx.hideLoading();
    })
    console.log(data)
  }
})