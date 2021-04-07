// components/navigation-bar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultData: {
      type: Object,
      value: {
        icon: false,
        title: "寄存"
      },
      observer: function (newVal, oldVal) {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBarBack(e) {
      wx.navigateBack();
    }
  }
})