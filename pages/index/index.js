//index.js
//获取应用实例
const app = getApp()
import {
	getBusiness
} from "../../service/api"
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
		mapCtx: null,
		controls: '40',
		lastIndex: null,
		itemData: {},
		item: {}
	},
	onReady: function () {
		this.data.mapCtx = wx.createMapContext('map')

	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	handleControl: function (e) {},
	handleMaker: function (marker) { //点击地图时候触发
		// marker
		let id = marker.detail.markerId;
		let key;
		for (let i = 0; i < this.data.markers.length; i++) {
			let item = this.data.markers[i];
			if (item.id === id) {
				key = i;
				break;
			}
		}
		if (this.data.lastIndex !== null) { //改变上一个点击的状态
			let then = this.data.markers;
			then[this.data.lastIndex].width = 50;
			then[this.data.lastIndex].height = 50;
			this.setData({
				markers: then
			})
		}
		const item = this.data.markers[key];

		this.setData({
			lastIndex: key,
			itemData: item.detail,
			item: item
		})
		// this.data.lastItem = this.data.markers[key];
		let then = this.data.markers;
		then[key].width = 80;
		then[key].height = 80;

		this.setData({
			// selectLog: item.longitude,
			// selectLat: item.latitude,
			showMaker: true,
			markers: then
		})
		this.data.mapCtx.moveToLocation({
			longitude: item.longitude,
			latitude: item.latitude,
			success: (res) => {}
		})

	},
	handleLabel(e) {},
	handleMap: function (e) {
		if (this.data.lastIndex !== null) {
			let then = this.data.markers;
			then[this.data.lastIndex].width = 50;
			then[this.data.lastIndex].height = 50;
			this.setData({
				markers: then,
				showMaker: false
			})
		}
	},
	callouttap: function () {},
	labeltap: function () {},
	handleToDetail: function (e) {
		wx.navigateTo({
			url: '../detail/index?item=' + encodeURIComponent(JSON.stringify(this.data.item))
			// events: this.data.itemData
		})
	},

	onLoad: function () {
		wx.getLocation({
			type: 'gcj02',
			success: (res) => {
				var latitude = res.latitude // 纬度
				var longitude = res.longitude // 经度
				var markers = [];
				// console.log(res);
				this.getAllBusiness(res);
				// for (var i = 0; i < 10; i++) {
				// 	markers.push({
				// 		id: i + 1,
				// 		longitude: longitude - i * 0.0010,
				// 		latitude: latitude - i * 0.0010,
				// 		iconPath: '/image/location.png',
				// 		width: 50,
				// 		height:50,
				// 		detail:{
				// 			avatar:"http://thirdqq.qlogo.cn/g?b=oidb&k=7GXVHxgiaxYjhic7P6f7X4Pw&s=100&t=1614320303",
				// 			nickName: "重庆北站寄存点"+i,
				// 			price:[{
				// 				title:'10元/件/天'
				// 			},{
				// 				title:"5元/件/天"
				// 			}],
				// 			startTimer:"8：30",
				// 			endTimer:"20：00",
				// 			address: "重庆市渝北区黄山大道东路王家桥社区8栋"
				// 		}
				// 		// customCallout: {
				// 		// 	anchorY: 60,
				// 		// 	anchorX: 0,
				// 		// 	display: 'BYCLICK'
				// 		// }
				// 	})
				// }
				// this.setData({
				// 	lat: latitude,
				// 	log: longitude,
				// 	markers,
				// 	hashMapShow: true,
				// })
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
	getAllBusiness: function (result) {
		const url = "/user/getAllBusiness"
		getBusiness(url, {
			lat: result.latitude,
			log: result.longitude
		}).then(res => {
			const data = res.data;
			let business = [];
			for (let i = 0; i < data.length; i++) {
				let item = data[i];
				business.push({
					// ...item,
					id: item.id,
					longitude: item.log,
					latitude: item.lat,
					iconPath: '/image/location.png',
					width: 50,
					height: 50,
					detail: {
						...item,
						price: item.priceType.split(',').forEach(item => {
							// console.log(item)
							return item + "元/件/天"
						})
					}
				})
			}

			this.setData({
				lat: result.latitude,
				log: result.longitude,
				markers: business,
				hashMapShow: true,
			})
		},(err)=>{
			console.log(err)
			this.setData({
				lat: result.latitude,
				log: result.longitude,
				hashMapShow: true,
			})
		})
		
	},
	getUserInfo: function (e) {}
})