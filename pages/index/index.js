//index.js
//获取应用实例
const app = getApp()


Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		lat: null,
		log: null,
		selectLat: null,
		selectLog: null,
		markers: [],
		hashMapShow: false,
		showMaker: false,
		mapCtx:null,
		controls: '40',
		lastIndex: null,
	},
	onReady: function() {
		this.data.mapCtx = wx.createMapContext('map')
		// console.log(this.data.mapCtx)

	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},handleControl:function(e){
		console.log("点击了控件")
	},
	handleMaker: function (marker) { //点击地图时候触发
		// console.log(marker)
		if(this.data.lastIndex !== null) {
			let then = this.data.markers;
			console.log(this.data.lastItem)
			then[this.data.lastIndex].width = 50;
			then[this.data.lastIndex].height = 50;
			this.setData({
				markers:then
			})
		}
		let id = marker.detail.markerId
		let key;
		for(let i=0;i<this.data.markers.length;i++) {
			let item = this.data.markers[i];
			if(item.id === id) {
				key = i;
				break;
			}
		}
		const item = this.data.markers[key];
		this.setData({
			lastIndex: key
		})
		// this.data.lastItem = this.data.markers[key];
		let then = this.data.markers;
		then[key].width = 80;
		then[key].height = 80;

		this.setData({
			// selectLog: item.longitude,
			// selectLat: item.latitude,
			showMaker: true,
			markers:then
		})
		// console.log(item)
		this.data.mapCtx.moveToLocation({
			longitude:item.longitude,
			latitude:item.latitude,
			success:(res)=>{console.log(res)}
		})

	},
	handleLabel(e) {
		console.log(e)
	},
	handleMap: function(e) {
		// console.log(e)
		if(this.data.lastIndex !== null) {
			let then = this.data.markers;
			console.log(this.data.lastItem)
			then[this.data.lastIndex].width = 50;
			then[this.data.lastIndex].height = 50;
			this.setData({
				markers:then,
				showMaker:false
			})
		}
		// this.setData({
			
		// })
	},
	callouttap: function () {},
	labeltap: function () {},
	
	onLoad: function () {
		wx.getLocation({
			type: 'gcj02',
			success: (res) => {
				// console.log(res)
				var latitude = res.latitude // 纬度
				var longitude = res.longitude // 经度
				var markers = [];
				for (var i = 0; i < 10; i++) {
					markers.push({
						id: i + 1,
						longitude: longitude - i * 0.0010,
						latitude: latitude - i * 0.0010,
						iconPath: '/image/location.png',
						width: 50,
						height:50,
						// customCallout: {
						// 	anchorY: 60,
						// 	anchorX: 0,
						// 	display: 'BYCLICK'
						// }
					})
				}
				this.setData({
					lat: latitude,
					log: longitude,
					markers,
					hashMapShow: true,
				})
				// console.log(markers instanceof Array);
			}
		})

		// if (app.globalData.userInfo) {
		//   this.setData({
		//     userInfo: app.globalData.userInfo,
		//     hasUserInfo: true
		//   })
		// } else if (this.data.canIUse){
		//   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		//   // 所以此处加入 callback 以防止这种情况
		//   app.userInfoReadyCallback = res => {
		//     this.setData({
		//       userInfo: res.userInfo,
		//       hasUserInfo: true
		//     })
		//   }
		// } else {
		//   // 在没有 open-type=getUserInfo 版本的兼容处理
		//   wx.getUserInfo({
		//     success: res => {
		//       app.globalData.userInfo = res.userInfo
		//       this.setData({
		//         userInfo: res.userInfo,
		//         hasUserInfo: true
		//       })
		//     }
		//   })
		// }
	},
	getUserInfo: function (e) {
		// console.log(e)
		// app.globalData.userInfo = e.detail.userInfo
		// this.setData({
		// 	userInfo: e.detail.userInfo,
		// 	hasUserInfo: true
		// })
	}
})