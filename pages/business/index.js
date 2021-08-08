// pages/business/index.js
const app = getApp()
import {
  areaList
} from '@vant/area-data';
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast'
import {
  uploadBusiness
} from './../../service/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    currentDate: "",
    defaultData: {
      title: "商家入驻", // 导航栏标题
      icon: true,
    },
    show: false,
    showTimer: false,
    form: {
      nickName: "abatre",
      avatar: "http://47.111.2.107/images/1620964110609BdF6rscs0Fky808813032589bed1321a96530166c5ee.jpg",
      name: '寄存1',
      tel: '15223998752',
      address: '',
      detailsAdd: 'cccc',
      lat: "",
      log: "",
      box: 10,
      pack: 20,
      start: null,
      end: null,
      details: '一个专为寄存恭喜的 方式',
      price: [5, 10],

    },
    city: "",
    flag: 1,
    fileList: [{
      url: "http://47.111.2.107/images/1620964110609BdF6rscs0Fky808813032589bed1321a96530166c5ee.jpg"
    }],

    autosize: {
      maxHeight: 80,
      minHeight: 80
    }
  },
  get(key) {
    return this.data[key];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  afterRead: function (event) {
    const {
      file
    } = event.detail;

    console.log(event.detail)
    // return
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.request({
    //   url: 'http://47.111.2.107:3000/image/upload',
    //   method: "POST",
    //   data: {
    //     file
    //   },
    //   header: {
    //     'content-type': 'multipart/form-data' // ['multipart/form-data',]
    //     // 'content-type': 
    //   },
    //   timeout: 5000,
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: (err) => {
    //     console.log(err)
    //   }
    // })
    wx.uploadFile({
      url: 'http://47.111.2.107:3000/image/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        file: file
      },
      success: (res) => {
        // 上传完成需要更新 fileList
        // if(res.data)
        const result = JSON.parse(res.data);
        // console.log(result.data);

        const {
          form,
          fileList
        } = this.data;
        form.avatar = result.data
        if (fileList.length === 0) {
          fileList.push({
            url: result.data
          })
        } else {
          fileList[0].url = result.data
        }

        // fileList.push({ ...file, url: res.data });
        this.setData({
          form,
          fileList
        });
      },
      fail(err) {
        console.log(err)
      }
    });
  },

  onClose() {
    this.setData({
      show: false,
    })
  },
  hanldeFocus(event) {
    this.setData({
      show: true
    })
  },
  handleConfirm(event) {
    // console.log(this.data.areaList)

    const add = event.detail.values;
    // console.log(add);
    const address = `${add[0].name} ${add[1].name}${add[2].name}`
    this.setData({
      "form.address": address,
      city: add[0].name,
      show: false
    })
  },
  handleCancel() {
    this.setData({
      show: false
    })
  },
  hanldeLocation() {
    wx.getLocation({
      altitude: '业务需要',
      success: (res) => {
        console.log(res)
        this.setData({
          'form.lat': res.latitude,
          'form.log': res.longitude
        })
      },
      fail: (errr) => {}
    })
  },
  hanldeTimer(event) {
    const flag = event.target.dataset.flag
    this.setData({
      showTimer: true,
      flag: flag
    })
    console.log((event.target.dataset.flag))
  },
  handleconf(event) {
    console.log(event)
    if (this.data.flag === '1') {
      this.setData({
        'form.start': event.detail,
        showTimer: false
      })
    } else {
      this.setData({
        'form.end': event.detail,
        showTimer: false
      })
    }
  },
  handleCan() {
    this.setData({
      showTimer: false
    })
  },
  handleSubmit() {
    const {
      form,
      city
    } = this.data;
    const rule = {
      "nickName": {
        isNull: true,
        reg: "",
        message: '用户名不能为空'
      },
      'avatar': {
        isNull: true,
        reg: "",
        message: '店铺头像能为空'
      },
      'name': {
        isNull: true,
        reg: /^/,
        message: '负责人不能为空'
      },
      'address': {
        isNull: true,
        reg: /^/,
        message: '地址不能为空'
      },
      'detailsAdd': {
        isNull: true,
        reg: /^/,
        message: '地址详情不能为空'
      },
      'tel': {
        isNull: false,
        reg: /^1[3|4|5|7|8][0-9]{9}$/,
        message: '手机号输入有误'
      },
      'lat': {
        isNull: true,
        reg: /^/,
        message: '经纬度不能为空'
      },
      'log': {
        isNull: true,
        reg: '',
        message: '经纬度不能为空'
      },
      'box': {
        isNull: false,
        reg: /^[1-9]\d*$/,
        message: '数量只能是正整数'
      },
      'pack': {
        isNull: false,
        reg: /^[1-9]\d*$/,
        message: '数量只能是正整数'
      },
      'start': {
        isNull: true,
        reg: /^/,
        message: '经营开始不能为空'
      },
      'end': {
        isNull: true,
        reg: /^/,
        message: '经营结束不能为空'
      },
      'details': {
        isNull: false,
        reg: /^/,
        message: '店铺描述不能为空'
      },
      'price': {
        isNull: true,
        reg: /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,
        message: '价格为数字，保留小数点后两位'
      },
    }
    try {
      Object.keys(form).forEach((item, index) => {

        if (!rule[item].isNull) {
          if (!rule[item].reg.test(form[item])) {
            throw new Error(rule[item].message)
          }
        } else {
          if (item === 'price') {
            // console.log('price')
            if (!(rule[item].reg.test(form[item][0] || "")) || !(rule[item].reg.test(form[item][1] || ""))) {
              throw new Error(rule[item].message)
            }
          } else {
            if (!form[item] || form[item] === "") {
              throw new Error(rule[item].message)
            }
          }
        }
      })
    } catch (err) {
      Toast({
        message: err.message,
        position: "bottom"
      });
      return
      // if (err.message === '结束') throw e;
    }
    const dt = {
      userId: app.globalData.userId,
      nickName: form.nickName,
      avatar: form.avatar,
      user: form.name,
      tel: form.tel,
      address: form.address + form.detailsAdd,
      lat: form.lat,
      log: form.log,
      box: form.box,
      pack: form.pack,
      start: form.start,
      end: form.end,
      details: form.details,
      city: city, 
      price: form.price[0] + ',' + form.price[1],
    }
    wx.showLoading({
      title: '正在申请中!',
    })
    uploadBusiness(dt).then(res => {
      console.log(res)
      if (res.status === 200) {
        Toast({
          message: "申请成功!"
        })
        // const {i} = app.globalData
        // app.globalData.isBusiness=true;
        app.globalData.business = res.data;
        wx.navigateBack()
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  handleInput(event) {
    // console.log(event)
    const type = event.target.dataset.type;
    switch (type - 0) {
      case 1:
        this.setData({
          "form.nickName": event.detail
        })
        break;
      case 2:
        this.setData({
          "form.name": event.detail
        })
        break;
      case 3:
        this.setData({
          "form.tel": event.detail
        })
        break;
      case 4:
        this.setData({
          "form.detailsAdd": event.detail
        })
        break;
      case 5:
        this.setData({
          "form.pack": event.detail
        })
        break;
      case 6:
        this.setData({
          "form.box": event.detail
        })
        break;
      case 7:
        this.setData({
          "form.details": event.detail
        })
        break;
      case 8:
        this.setData({
          "form.price[0]": event.detail
        })
        break;
      case 9:
        this.setData({
          "form.price[1]": event.detail
        })
        break;
    }
  }
})