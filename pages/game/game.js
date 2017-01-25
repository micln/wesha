//game.js
//获取应用实例
var app = getApp()
Page({
	data: {
		_playerCap: 12, //  总座位数
		_playerNum: 0,
		players: [],

		_currentPlayer: null,
		_currentPosition: null,

		gameStatus: 'wait', //	wait | running | pause
		game:''
	},
	//事件处理函数
	bindHomeTap: function() {
		wx.navigateTo({
			url: 'pages/index/index'
		})
	},

	bindseatDownMeTap: function(evt) {

		var position = evt.target.dataset.player_idx;

		this.seatDownMe(position);
		
	},

	//  得到一个空着的座位ID
	firstEmptySeatIdx: function(){
		for (var i=0; i<this.data._playerCap; i++) if (!this.data.players[i]) return i;
	},

	seatUp: function(position) {
		var ps = this.data.players;
		var u = ps[position];
		ps[position] = null;
		this.setData({players:ps});

		this.changePlayerNum(-1);
		return u;
	},

	//  坐人
	seatDown: function(position, player) {
		var ps = this.data.players;
		ps[position] = player;
		this.setData({players:ps})

		this.changePlayerNum(1);
	},

	seatDownMe: function(position){
		var old = this.data._currentPosition;
		if (old !== null) this.seatUp(old);
		this.setData({_currentPosition:position});

		this.seatDown(position, this.currentPlayer() ) 
	},

	changePlayerNum : function(change) {
		var c = this.data._playerNum;
		c += change;
		this.setData({_playerNum:c});
	},

	currentPlayer : function(){
		if ( !this._currentPlayer ) {
			this._currentPlayer = {
				'wxUser' : app.globalData.userInfo
			}
		}

		 return this._currentPlayer;
	},

	onLoad: function () {
		console.log('game.onLoad')
		var that = this

		var seats = [];
		for (var i=0; i<this.data._playerCap; i++){
			seats.push(null);
		}

		this.setData({
			players: seats
		})
	},

	onReady: function(){
		this.seatDownMe(this.firstEmptySeatIdx());
	},

	onShow: function(){
	},

	onPullDownRefresh : function(){
	}
})
