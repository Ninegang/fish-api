window.public=window.public||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/skins/Shared/SharedScene.exml'] = window.SharedSceneSkin = (function (_super) {
	__extends(SharedSceneSkin, _super);
	var SharedSceneSkin$Skin1 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin1, _super);
		function SharedSceneSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "button_setting";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0.5;
			t.bottom = 32.5;
			t.horizontalCenter = 0;
			t.size = 25;
			return t;
		};
		return SharedSceneSkin$Skin1;
	})(eui.Skin);

	var SharedSceneSkin$Skin2 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin2, _super);
		function SharedSceneSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "button_back";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0.5;
			t.bottom = 32.5;
			t.horizontalCenter = 0;
			t.size = 25;
			return t;
		};
		return SharedSceneSkin$Skin2;
	})(eui.Skin);

	var SharedSceneSkin$Skin3 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin3, _super);
		function SharedSceneSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["iconDisplay","labelDisplay"];
			
			this.elementsContent = [this.iconDisplay_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin3.prototype;

		_proto.iconDisplay_i = function () {
			var t = new eui.Image();
			this.iconDisplay = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin3;
	})(eui.Skin);

	var SharedSceneSkin$Skin4 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin4, _super);
		function SharedSceneSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shared_icon_inmail";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin4;
	})(eui.Skin);

	var SharedSceneSkin$Skin5 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin5, _super);
		function SharedSceneSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shared_icon_setting";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin5;
	})(eui.Skin);

	var SharedSceneSkin$Skin6 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin6, _super);
		function SharedSceneSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shared_icon_rank";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin6;
	})(eui.Skin);

	var SharedSceneSkin$Skin7 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin7, _super);
		function SharedSceneSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shared_icon_insert";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin7;
	})(eui.Skin);

	var SharedSceneSkin$Skin8 = 	(function (_super) {
		__extends(SharedSceneSkin$Skin8, _super);
		function SharedSceneSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SharedSceneSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shared_icon_customer";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SharedSceneSkin$Skin8;
	})(eui.Skin);

	function SharedSceneSkin() {
		_super.call(this);
		this.skinParts = ["btnTopSetting","btnGoback","nickname","userID","btnUserInfo","goldnum","noticeLabel","noticeScroller","noticeItemGroup","btnShopping","btnSetting","btnCustomer","pingView"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.btnTopSetting_i(),this.btnGoback_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.nickname_i(),this.userID_i(),this.btnUserInfo_i(),this._Group1_i(),this.noticeItemGroup_i(),this._Image8_i(),this._Group3_i(),this._Group4_i(),this.pingView_i()];
	}
	var _proto = SharedSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 110;
		t.left = -3;
		t.right = 0;
		t.source = "top_bg_png";
		t.y = -2.02;
		return t;
	};
	_proto.btnTopSetting_i = function () {
		var t = new eui.Button();
		this.btnTopSetting = t;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.label = "";
		t.right = 17;
		t.top = 17;
		t.width = 46;
		t.skinName = SharedSceneSkin$Skin1;
		return t;
	};
	_proto.btnGoback_i = function () {
		var t = new eui.Button();
		this.btnGoback = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54.73;
		t.label = "";
		t.left = 5;
		t.top = 22;
		t.width = 58;
		t.skinName = SharedSceneSkin$Skin2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.left = 78;
		t.source = "photo_bg";
		t.top = 13;
		t.width = 75;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 51;
		t.source = "Title";
		t.y = 7;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 28;
		t.left = 169;
		t.source = "top_id_bg";
		t.top = 72;
		t.width = 130;
		return t;
	};
	_proto.nickname_i = function () {
		var t = new eui.Label();
		this.nickname = t;
		t.bold = true;
		t.height = 38;
		t.left = 170;
		t.size = 26;
		t.text = "";
		t.top = 0;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 170;
		return t;
	};
	_proto.userID_i = function () {
		var t = new eui.Label();
		this.userID = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.left = 204;
		t.size = 18;
		t.text = "65342413";
		t.top = 71;
		t.verticalAlign = "middle";
		t.width = 96;
		return t;
	};
	_proto.btnUserInfo_i = function () {
		var t = new eui.Button();
		this.btnUserInfo = t;
		t.anchorOffsetX = 2.01;
		t.anchorOffsetY = 0.2;
		t.height = 78.9;
		t.label = "";
		t.left = 81;
		t.top = 16;
		t.width = 69.4;
		t.skinName = SharedSceneSkin$Skin3;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 59;
		t.left = 175;
		t.top = 7;
		t.width = 213;
		t.elementsContent = [this._Image5_i(),this.goldnum_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 51;
		t.source = "top_coin_bg";
		t.verticalCenter = 0;
		t.width = 230;
		t.x = -11;
		return t;
	};
	_proto.goldnum_i = function () {
		var t = new eui.Label();
		this.goldnum = t;
		t.height = 38;
		t.left = 50;
		t.right = 25;
		t.size = 24;
		t.text = "21.63333";
		t.textAlign = "left";
		t.textColor = 0xfec66f;
		t.verticalAlign = "middle";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.noticeItemGroup_i = function () {
		var t = new eui.Group();
		this.noticeItemGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.horizontalCenter = 85;
		t.top = 77;
		t.width = 630;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this.noticeScroller_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.height = 41;
		t.left = 34;
		t.right = 114;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "announcement_bg";
		t.top = 14;
		t.verticalCenter = 1;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 10;
		t.source = "shared_top_msg";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.noticeScroller_i = function () {
		var t = new eui.Scroller();
		this.noticeScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 7;
		t.enabled = false;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 8;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 399;
		t.x = 92;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 41;
		t.width = 505;
		t.x = -49;
		t.y = 226;
		t.elementsContent = [this.noticeLabel_i()];
		return t;
	};
	_proto.noticeLabel_i = function () {
		var t = new eui.Label();
		this.noticeLabel = t;
		t.anchorOffsetX = 0;
		t.bottom = 6;
		t.fontFamily = "微软雅黑";
		t.height = 41;
		t.size = 23;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xfec66f;
		t.top = 4;
		t.verticalAlign = "middle";
		t.width = -100;
		t.x = 500;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.alpha = 0;
		t.bottom = 0;
		t.height = 70;
		t.horizontalCenter = 0;
		t.source = "shared_bottom_back";
		t.width = 1280;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.bottom = 10;
		t.right = 120;
		t.touchEnabled = false;
		t.elementsContent = [this._Image9_i(),this._Image10_i(),this.btnShopping_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 109;
		t.source = "shared_icon_shop";
		t.width = 117;
		t.x = 4.5;
		t.y = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 98;
		t.source = "shared_icon_shopZ";
		t.width = 111;
		t.x = 119;
		t.y = 11;
		return t;
	};
	_proto.btnShopping_i = function () {
		var t = new eui.Button();
		this.btnShopping = t;
		t.anchorOffsetX = 0;
		t.height = 109;
		t.label = "";
		t.width = 234;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.bottom = 20;
		t.horizontalCenter = -80;
		t.elementsContent = [this._Button1_i(),this.btnSetting_i(),this._Button2_i(),this._Button3_i(),this.btnCustomer_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.height = 71;
		t.label = "";
		t.touchEnabled = false;
		t.width = 60;
		t.x = 0;
		t.y = 26;
		t.skinName = SharedSceneSkin$Skin4;
		return t;
	};
	_proto.btnSetting_i = function () {
		var t = new eui.Button();
		this.btnSetting = t;
		t.height = 71;
		t.label = "";
		t.touchEnabled = false;
		t.width = 60;
		t.x = 117;
		t.y = 27;
		t.skinName = SharedSceneSkin$Skin5;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.height = 99;
		t.label = "";
		t.touchEnabled = false;
		t.width = 124;
		t.x = 224;
		t.y = 1;
		t.skinName = SharedSceneSkin$Skin6;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.height = 71;
		t.label = "";
		t.touchEnabled = false;
		t.width = 60;
		t.x = 356;
		t.y = 27;
		t.skinName = SharedSceneSkin$Skin7;
		return t;
	};
	_proto.btnCustomer_i = function () {
		var t = new eui.Button();
		this.btnCustomer = t;
		t.height = 99;
		t.label = "";
		t.touchEnabled = false;
		t.width = 124;
		t.x = 477;
		t.y = 0;
		t.skinName = SharedSceneSkin$Skin8;
		return t;
	};
	_proto.pingView_i = function () {
		var t = new PingTip();
		this.pingView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.right = 77;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 53;
		t.y = 30;
		return t;
	};
	return SharedSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/gamehall/MainScene.exml'] = window.MainSceneSkin = (function (_super) {
	__extends(MainSceneSkin, _super);
	var MainSceneSkin$Skin9 = 	(function (_super) {
		__extends(MainSceneSkin$Skin9, _super);
		function MainSceneSkin$Skin9() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MainSceneSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_iconbg";
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_icon";
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image3_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_slbz";
			t.verticalCenter = 40;
			return t;
		};
		return MainSceneSkin$Skin9;
	})(eui.Skin);

	var MainSceneSkin$Skin10 = 	(function (_super) {
		__extends(MainSceneSkin$Skin10, _super);
		function MainSceneSkin$Skin10() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MainSceneSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_iconbg";
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_icon";
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image3_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "game_slbz";
			t.verticalCenter = 40;
			return t;
		};
		return MainSceneSkin$Skin10;
	})(eui.Skin);

	var MainSceneSkin$Skin11 = 	(function (_super) {
		__extends(MainSceneSkin$Skin11, _super);
		function MainSceneSkin$Skin11() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MainSceneSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "gamehall_languegeBtn_png";
			t.percentWidth = 100;
			return t;
		};
		return MainSceneSkin$Skin11;
	})(eui.Skin);

	function MainSceneSkin() {
		_super.call(this);
		this.skinParts = ["goRoom","goDSRoom","btnLanguage","sharedHeader"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.goRoom_i(),this.goDSRoom_i(),this.btnLanguage_i(),this.sharedHeader_i()];
	}
	var _proto = MainSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gamehall_bigBg";
		t.top = 0;
		return t;
	};
	_proto.goRoom_i = function () {
		var t = new uiCore.Button();
		this.goRoom = t;
		t.horizontalCenter = -427;
		t.y = 247.5;
		t.skinName = MainSceneSkin$Skin9;
		return t;
	};
	_proto.goDSRoom_i = function () {
		var t = new uiCore.Button();
		this.goDSRoom = t;
		t.horizontalCenter = -100;
		t.visible = false;
		t.y = 247.5;
		t.skinName = MainSceneSkin$Skin10;
		return t;
	};
	_proto.btnLanguage_i = function () {
		var t = new uiCore.Button();
		this.btnLanguage = t;
		t.label = "";
		t.right = 190;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 20;
		t.x = -396;
		t.y = 1;
		t.skinName = MainSceneSkin$Skin11;
		return t;
	};
	_proto.sharedHeader_i = function () {
		var t = new SharedSceneView();
		this.sharedHeader = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "SharedSceneSkin";
		t.top = 0;
		return t;
	};
	return MainSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/games/fishGame/FishGameNumfish.exml'] = window.FishGameNumfish = (function (_super) {
	__extends(FishGameNumfish, _super);
	var FishGameNumfish$Skin12 = 	(function (_super) {
		__extends(FishGameNumfish$Skin12, _super);
		function FishGameNumfish$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameNumfish$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "guanbi";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FishGameNumfish$Skin12;
	})(eui.Skin);

	var FishGameNumfish$Skin13 = 	(function (_super) {
		__extends(FishGameNumfish$Skin13, _super);
		function FishGameNumfish$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameNumfish$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "continue";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FishGameNumfish$Skin13;
	})(eui.Skin);

	var FishGameNumfish$Skin14 = 	(function (_super) {
		__extends(FishGameNumfish$Skin14, _super);
		function FishGameNumfish$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameNumfish$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "exit";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FishGameNumfish$Skin14;
	})(eui.Skin);

	function FishGameNumfish() {
		_super.call(this);
		this.skinParts = ["killfish25","killfish26","killfish27","killfish24","killfish23","killfish22","killfish19","killfish20","killfish18","killfish17","killfish16","killfish15","killfish21","killfish14","killfish13","killfish12","killfish11","killfish10","killfish09","killfish08","killfish07","killfish06","killfish05","killfish04","killfish03","killfish02","killfish01","closebtn","Continuebtn","Exitbtn","downtime","goldnum","totalgold","killfish26Label","killfish25Label","killfish27Label","killfish24Label","killfish23Label","killfish22Label","killfish19Label","killfish20Label","killfish18Label","killfish17Label","killfish16Label","killfish15Label","killfish21Label","killfish14Label","killfish13Label","killfish12Label","killfish11Label","killfish10Label","killfish09Label","killfish08Label","killfish07Label","killfish06Label","killfish05Label","killfish04Label","killfish03Label","killfish02Label","killfish01Label"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.killfish25_i(),this.killfish26_i(),this.killfish27_i(),this.killfish24_i(),this.killfish23_i(),this.killfish22_i(),this.killfish19_i(),this.killfish20_i(),this.killfish18_i(),this.killfish17_i(),this.killfish16_i(),this.killfish15_i(),this.killfish21_i(),this.killfish14_i(),this.killfish13_i(),this.killfish12_i(),this.killfish11_i(),this.killfish10_i(),this.killfish09_i(),this.killfish08_i(),this.killfish07_i(),this.killfish06_i(),this.killfish05_i(),this.killfish04_i(),this.killfish03_i(),this.killfish02_i(),this.killfish01_i(),this.closebtn_i(),this.Continuebtn_i(),this.Exitbtn_i(),this.downtime_i(),this.goldnum_i(),this.totalgold_i(),this._Image2_i(),this._Image3_i(),this.killfish26Label_i(),this.killfish25Label_i(),this.killfish27Label_i(),this.killfish24Label_i(),this.killfish23Label_i(),this.killfish22Label_i(),this.killfish19Label_i(),this.killfish20Label_i(),this.killfish18Label_i(),this.killfish17Label_i(),this.killfish16Label_i(),this.killfish15Label_i(),this.killfish21Label_i(),this.killfish14Label_i(),this.killfish13Label_i(),this.killfish12Label_i(),this.killfish11Label_i(),this.killfish10Label_i(),this.killfish09Label_i(),this.killfish08Label_i(),this.killfish07Label_i(),this.killfish06Label_i(),this.killfish05Label_i(),this.killfish04Label_i(),this.killfish03Label_i(),this.killfish02Label_i(),this.killfish01Label_i()];
	}
	var _proto = FishGameNumfish.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 620;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.width = 1085;
		return t;
	};
	_proto.killfish25_i = function () {
		var t = new eui.Image();
		this.killfish25 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 87;
		t.horizontalCenter = -44;
		t.source = "killfish_25_Gray";
		t.top = 92;
		t.width = 120;
		return t;
	};
	_proto.killfish26_i = function () {
		var t = new eui.Image();
		this.killfish26 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 94;
		t.horizontalCenter = 324.5;
		t.source = "killfish_26_Gray";
		t.top = 91;
		t.width = 125;
		return t;
	};
	_proto.killfish27_i = function () {
		var t = new eui.Image();
		this.killfish27 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.horizontalCenter = 198.5;
		t.source = "killfish_27_Gray";
		t.top = 92;
		t.width = 117;
		return t;
	};
	_proto.killfish24_i = function () {
		var t = new eui.Image();
		this.killfish24 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 73;
		t.horizontalCenter = -442.5;
		t.source = "killfish_24_Gray";
		t.top = 219;
		t.width = 121;
		return t;
	};
	_proto.killfish23_i = function () {
		var t = new eui.Image();
		this.killfish23 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 77;
		t.horizontalCenter = -319;
		t.source = "killfish_23_Gray";
		t.top = 219;
		t.width = 126;
		return t;
	};
	_proto.killfish22_i = function () {
		var t = new eui.Image();
		this.killfish22 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 87;
		t.horizontalCenter = 450.5;
		t.source = "killfish_22_Gray";
		t.top = 89;
		t.width = 127;
		return t;
	};
	_proto.killfish19_i = function () {
		var t = new eui.Image();
		this.killfish19 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.horizontalCenter = -171.5;
		t.source = "killfish_19_Gray";
		t.top = 94;
		t.width = 119;
		return t;
	};
	_proto.killfish20_i = function () {
		var t = new eui.Image();
		this.killfish20 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.horizontalCenter = 77.5;
		t.source = "killfish_20_Gray";
		t.top = 95;
		t.width = 111;
		return t;
	};
	_proto.killfish18_i = function () {
		var t = new eui.Image();
		this.killfish18 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86;
		t.horizontalCenter = -439.5;
		t.source = "killfish_18_Gray";
		t.top = 93;
		t.width = 129;
		return t;
	};
	_proto.killfish17_i = function () {
		var t = new eui.Image();
		this.killfish17 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.horizontalCenter = -194.5;
		t.source = "killfish_17_Gray";
		t.top = 217;
		t.width = 129;
		return t;
	};
	_proto.killfish16_i = function () {
		var t = new eui.Image();
		this.killfish16 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86;
		t.horizontalCenter = -72.5;
		t.source = "killfish_16_Gray";
		t.top = 215;
		t.width = 119;
		return t;
	};
	_proto.killfish15_i = function () {
		var t = new eui.Image();
		this.killfish15 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.horizontalCenter = 38;
		t.source = "killfish_15_Gray";
		t.top = 214;
		t.width = 108;
		return t;
	};
	_proto.killfish21_i = function () {
		var t = new eui.Image();
		this.killfish21 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.horizontalCenter = -302;
		t.source = "killfish_21_Gray";
		t.top = 95;
		t.width = 130;
		return t;
	};
	_proto.killfish14_i = function () {
		var t = new eui.Image();
		this.killfish14 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 81;
		t.horizontalCenter = 145;
		t.source = "killfish_14_Gray";
		t.top = 213;
		t.width = 108;
		return t;
	};
	_proto.killfish13_i = function () {
		var t = new eui.Image();
		this.killfish13 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.horizontalCenter = 252;
		t.source = "killfish_13_Gray";
		t.top = 214;
		t.width = 104;
		return t;
	};
	_proto.killfish12_i = function () {
		var t = new eui.Image();
		this.killfish12 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82;
		t.horizontalCenter = 354;
		t.source = "killfish_12_Gray";
		t.top = 214;
		t.width = 106;
		return t;
	};
	_proto.killfish11_i = function () {
		var t = new eui.Image();
		this.killfish11 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.horizontalCenter = 458.5;
		t.source = "killfish_11_Gray";
		t.top = 213;
		t.width = 105;
		return t;
	};
	_proto.killfish10_i = function () {
		var t = new eui.Image();
		this.killfish10 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.horizontalCenter = -468;
		t.source = "killfish_10_Gray";
		t.top = 338;
		t.width = 98;
		return t;
	};
	_proto.killfish09_i = function () {
		var t = new eui.Image();
		this.killfish09 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = -367;
		t.source = "killfish_09_Gray";
		t.top = 342;
		t.width = 98;
		return t;
	};
	_proto.killfish08_i = function () {
		var t = new eui.Image();
		this.killfish08 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = -261;
		t.source = "killfish_08_Gray";
		t.top = 341;
		t.width = 98;
		return t;
	};
	_proto.killfish07_i = function () {
		var t = new eui.Image();
		this.killfish07 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = -152;
		t.source = "killfish_07_Gray";
		t.top = 340;
		t.width = 98;
		return t;
	};
	_proto.killfish06_i = function () {
		var t = new eui.Image();
		this.killfish06 = t;
		t.height = 80;
		t.horizontalCenter = -44;
		t.source = "killfish_06_Gray";
		t.top = 340;
		return t;
	};
	_proto.killfish05_i = function () {
		var t = new eui.Image();
		this.killfish05 = t;
		t.height = 80;
		t.horizontalCenter = 68.5;
		t.source = "killfish_05_Gray";
		t.top = 339;
		return t;
	};
	_proto.killfish04_i = function () {
		var t = new eui.Image();
		this.killfish04 = t;
		t.height = 80;
		t.horizontalCenter = 177;
		t.source = "killfish_04_Gray";
		t.top = 338;
		return t;
	};
	_proto.killfish03_i = function () {
		var t = new eui.Image();
		this.killfish03 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 280;
		t.source = "killfish_03_Gray";
		t.top = 337;
		t.width = 98;
		return t;
	};
	_proto.killfish02_i = function () {
		var t = new eui.Image();
		this.killfish02 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 371.5;
		t.source = "killfish_02_Gray";
		t.top = 339;
		t.width = 95;
		return t;
	};
	_proto.killfish01_i = function () {
		var t = new eui.Image();
		this.killfish01 = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 464.5;
		t.source = "killfish_01_Gray";
		t.top = 336;
		t.width = 95;
		return t;
	};
	_proto.closebtn_i = function () {
		var t = new uiCore.Button();
		this.closebtn = t;
		t.label = "";
		t.right = 55;
		t.top = 30;
		t.skinName = FishGameNumfish$Skin12;
		return t;
	};
	_proto.Continuebtn_i = function () {
		var t = new uiCore.Button();
		this.Continuebtn = t;
		t.bottom = 92;
		t.label = "";
		t.left = 208;
		t.skinName = FishGameNumfish$Skin13;
		return t;
	};
	_proto.Exitbtn_i = function () {
		var t = new uiCore.Button();
		this.Exitbtn = t;
		t.bottom = 95;
		t.height = 101;
		t.label = "";
		t.right = 206;
		t.skinName = FishGameNumfish$Skin14;
		return t;
	};
	_proto.downtime_i = function () {
		var t = new eui.Label();
		this.downtime = t;
		t.height = 47;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 86;
		t.x = 431.67;
		t.y = 551;
		return t;
	};
	_proto.goldnum_i = function () {
		var t = new eui.BitmapLabel();
		this.goldnum = t;
		t.anchorOffsetX = 0;
		t.font = "powerFont_fnt";
		t.height = 66;
		t.width = 329.36;
		t.x = 809.64;
		t.y = 462;
		return t;
	};
	_proto.totalgold_i = function () {
		var t = new eui.BitmapLabel();
		this.totalgold = t;
		t.font = "powerFont_fnt";
		t.height = 66;
		t.width = 436;
		t.x = 320;
		t.y = 462;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 126;
		t.source = "puyushouhuo";
		t.top = 464;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 652;
		t.source = "youxibi";
		t.top = 460;
		return t;
	};
	_proto.killfish26Label_i = function () {
		var t = new eui.Label();
		this.killfish26Label = t;
		t.horizontalCenter = 324.5;
		t.text = "0";
		t.top = 179;
		return t;
	};
	_proto.killfish25Label_i = function () {
		var t = new eui.Label();
		this.killfish25Label = t;
		t.horizontalCenter = -34.5;
		t.text = "0";
		t.top = 178;
		return t;
	};
	_proto.killfish27Label_i = function () {
		var t = new eui.Label();
		this.killfish27Label = t;
		t.horizontalCenter = 201.5;
		t.text = "0";
		t.top = 181;
		return t;
	};
	_proto.killfish24Label_i = function () {
		var t = new eui.Label();
		this.killfish24Label = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -442.5;
		t.text = "0";
		t.top = 296;
		t.width = -57;
		return t;
	};
	_proto.killfish23Label_i = function () {
		var t = new eui.Label();
		this.killfish23Label = t;
		t.horizontalCenter = -315.5;
		t.text = "0";
		t.top = 299;
		return t;
	};
	_proto.killfish22Label_i = function () {
		var t = new eui.Label();
		this.killfish22Label = t;
		t.horizontalCenter = 462.5;
		t.text = "0";
		t.top = 178;
		return t;
	};
	_proto.killfish19Label_i = function () {
		var t = new eui.Label();
		this.killfish19Label = t;
		t.horizontalCenter = -163.5;
		t.text = "0";
		t.top = 179;
		return t;
	};
	_proto.killfish20Label_i = function () {
		var t = new eui.Label();
		this.killfish20Label = t;
		t.horizontalCenter = 83.5;
		t.text = "0";
		t.top = 179;
		return t;
	};
	_proto.killfish18Label_i = function () {
		var t = new eui.Label();
		this.killfish18Label = t;
		t.horizontalCenter = -442.5;
		t.text = "0";
		t.top = 183;
		return t;
	};
	_proto.killfish17Label_i = function () {
		var t = new eui.Label();
		this.killfish17Label = t;
		t.horizontalCenter = -192.5;
		t.text = "0";
		t.top = 297;
		return t;
	};
	_proto.killfish16Label_i = function () {
		var t = new eui.Label();
		this.killfish16Label = t;
		t.horizontalCenter = -69.5;
		t.text = "0";
		t.top = 295;
		return t;
	};
	_proto.killfish15Label_i = function () {
		var t = new eui.Label();
		this.killfish15Label = t;
		t.horizontalCenter = 38.5;
		t.text = "0";
		t.top = 297;
		return t;
	};
	_proto.killfish21Label_i = function () {
		var t = new eui.Label();
		this.killfish21Label = t;
		t.horizontalCenter = -315.5;
		t.text = "0";
		t.top = 183;
		return t;
	};
	_proto.killfish14Label_i = function () {
		var t = new eui.Label();
		this.killfish14Label = t;
		t.horizontalCenter = 141.5;
		t.text = "0";
		t.top = 299;
		return t;
	};
	_proto.killfish13Label_i = function () {
		var t = new eui.Label();
		this.killfish13Label = t;
		t.horizontalCenter = 254.5;
		t.text = "0";
		t.top = 297;
		return t;
	};
	_proto.killfish12Label_i = function () {
		var t = new eui.Label();
		this.killfish12Label = t;
		t.horizontalCenter = 363.5;
		t.text = "0";
		t.top = 297;
		return t;
	};
	_proto.killfish11Label_i = function () {
		var t = new eui.Label();
		this.killfish11Label = t;
		t.horizontalCenter = 457.5;
		t.text = "0";
		t.top = 297;
		return t;
	};
	_proto.killfish10Label_i = function () {
		var t = new eui.Label();
		this.killfish10Label = t;
		t.horizontalCenter = -467.5;
		t.text = "0";
		t.top = 427;
		return t;
	};
	_proto.killfish09Label_i = function () {
		var t = new eui.Label();
		this.killfish09Label = t;
		t.horizontalCenter = -365.5;
		t.text = "0";
		t.top = 428;
		return t;
	};
	_proto.killfish08Label_i = function () {
		var t = new eui.Label();
		this.killfish08Label = t;
		t.horizontalCenter = -252.5;
		t.text = "0";
		t.top = 429;
		return t;
	};
	_proto.killfish07Label_i = function () {
		var t = new eui.Label();
		this.killfish07Label = t;
		t.horizontalCenter = -151.5;
		t.text = "0";
		t.top = 430;
		return t;
	};
	_proto.killfish06Label_i = function () {
		var t = new eui.Label();
		this.killfish06Label = t;
		t.horizontalCenter = -43.5;
		t.text = "0";
		t.top = 427;
		return t;
	};
	_proto.killfish05Label_i = function () {
		var t = new eui.Label();
		this.killfish05Label = t;
		t.horizontalCenter = 69.5;
		t.text = "0";
		t.top = 425;
		return t;
	};
	_proto.killfish04Label_i = function () {
		var t = new eui.Label();
		this.killfish04Label = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 178;
		t.text = "0";
		t.top = 427;
		t.width = 16;
		return t;
	};
	_proto.killfish03Label_i = function () {
		var t = new eui.Label();
		this.killfish03Label = t;
		t.horizontalCenter = 280.5;
		t.text = "0";
		t.top = 427;
		return t;
	};
	_proto.killfish02Label_i = function () {
		var t = new eui.Label();
		this.killfish02Label = t;
		t.horizontalCenter = 372.5;
		t.text = "0";
		t.top = 429;
		return t;
	};
	_proto.killfish01Label_i = function () {
		var t = new eui.Label();
		this.killfish01Label = t;
		t.horizontalCenter = 464.5;
		t.text = "0";
		t.top = 428;
		return t;
	};
	return FishGameNumfish;
})(eui.Skin);generateEUI.paths['resource/skins/games/fishGame/FishGameRate.exml'] = window.FishGameRateSkin = (function (_super) {
	__extends(FishGameRateSkin, _super);
	var FishGameRateSkin$Skin15 = 	(function (_super) {
		__extends(FishGameRateSkin$Skin15, _super);
		function FishGameRateSkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameRateSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "guanbi";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FishGameRateSkin$Skin15;
	})(eui.Skin);

	function FishGameRateSkin() {
		_super.call(this);
		this.skinParts = ["closebtn"];
		
		this.height = 620;
		this.width = 1085;
		this.elementsContent = [this._Image1_i(),this.closebtn_i()];
	}
	var _proto = FishGameRateSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 620;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.width = 1085;
		return t;
	};
	_proto.closebtn_i = function () {
		var t = new uiCore.Button();
		this.closebtn = t;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.skinName = FishGameRateSkin$Skin15;
		return t;
	};
	return FishGameRateSkin;
})(eui.Skin);generateEUI.paths['resource/skins/games/fishGame/FishGameScene.exml'] = window.FishGameSceneSkin = (function (_super) {
	__extends(FishGameSceneSkin, _super);
	var FishGameSceneSkin$Skin16 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin16, _super);
		function FishGameSceneSkin$Skin16() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "set";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin16;
	})(eui.Skin);

	var FishGameSceneSkin$Skin17 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin17, _super);
		function FishGameSceneSkin$Skin17() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Ratebtn";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin17;
	})(eui.Skin);

	var FishGameSceneSkin$Skin18 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin18, _super);
		function FishGameSceneSkin$Skin18() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "jiesuan";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin18;
	})(eui.Skin);

	var FishGameSceneSkin$Skin19 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin19, _super);
		function FishGameSceneSkin$Skin19() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "lock";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin19;
	})(eui.Skin);

	var FishGameSceneSkin$Skin20 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin20, _super);
		function FishGameSceneSkin$Skin20() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "jisu";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin20;
	})(eui.Skin);

	var FishGameSceneSkin$Skin21 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin21, _super);
		function FishGameSceneSkin$Skin21() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "auto";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin21;
	})(eui.Skin);

	var FishGameSceneSkin$Skin22 = 	(function (_super) {
		__extends(FishGameSceneSkin$Skin22, _super);
		function FishGameSceneSkin$Skin22() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGameSceneSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "fishjiantou";
			t.percentWidth = 100;
			return t;
		};
		return FishGameSceneSkin$Skin22;
	})(eui.Skin);

	function FishGameSceneSkin() {
		_super.call(this);
		this.skinParts = ["fishBG0","fishBG1","fishBG2","downGroup","waterLightGroup","bulletGroup","fishsetbtn","FishRateBtn","fishgetnumbtn","featuresGroupLeft","lockbg","fastbg","autobg","fishlockbtn","fishfastbtn","fishautobtn","lockmc","fastmc","automc","arrowbtn","featuresGroupRight","upGroup","shuangciGroup","noticeLabel","noticeScroller","noticeItemGroup","pingView"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this.fishBG0_i(),this.fishBG1_i(),this.fishBG2_i(),this._MovieClipGroup1_i(),this._MovieClipGroup2_i(),this.downGroup_i(),this.bulletGroup_i(),this.upGroup_i(),this.shuangciGroup_i(),this.noticeItemGroup_i(),this.pingView_i()];
	}
	var _proto = FishGameSceneSkin.prototype;

	_proto.fishBG0_i = function () {
		var t = new eui.Image();
		this.fishBG0 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg0_png";
		t.top = 0;
		return t;
	};
	_proto.fishBG1_i = function () {
		var t = new eui.Image();
		this.fishBG1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg1_png";
		t.top = 0;
		return t;
	};
	_proto.fishBG2_i = function () {
		var t = new eui.Image();
		this.fishBG2 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg2_png";
		t.top = 0;
		return t;
	};
	_proto._MovieClipGroup1_i = function () {
		var t = new MovieClipGroup();
		t.horizontalCenter = 100;
		t.rameLabel = "swimming";
		t.source = "fishAnimation4";
		t.sourceName = "haidan";
		t.verticalCenter = -100;
		return t;
	};
	_proto._MovieClipGroup2_i = function () {
		var t = new MovieClipGroup();
		t.horizontalCenter = -200;
		t.rameLabel = "swimming";
		t.source = "fishAnimation4";
		t.sourceName = "haixing";
		t.verticalCenter = 0;
		return t;
	};
	_proto.downGroup_i = function () {
		var t = new eui.Group();
		this.downGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.bulletGroup_i = function () {
		var t = new eui.Group();
		this.bulletGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.waterLightGroup_i()];
		return t;
	};
	_proto.waterLightGroup_i = function () {
		var t = new uiCore.Animation();
		this.waterLightGroup = t;
		t.animationSource = "caustic_{0}_png";
		t.autoPlay = true;
		t.frameNum = 6;
		t.frameRate = 80;
		t.horizontalCenter = 0;
		t.loop = true;
		t.source = "caustic_01_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.upGroup_i = function () {
		var t = new eui.Group();
		this.upGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchThrough = true;
		t.elementsContent = [this.featuresGroupLeft_i(),this.featuresGroupRight_i()];
		return t;
	};
	_proto.featuresGroupLeft_i = function () {
		var t = new eui.Group();
		this.featuresGroupLeft = t;
		t.left = 30;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.elementsContent = [this.fishsetbtn_i(),this.FishRateBtn_i(),this.fishgetnumbtn_i()];
		return t;
	};
	_proto.fishsetbtn_i = function () {
		var t = new uiCore.Button();
		this.fishsetbtn = t;
		t.verticalCenter = -150;
		t.skinName = FishGameSceneSkin$Skin16;
		return t;
	};
	_proto.FishRateBtn_i = function () {
		var t = new uiCore.Button();
		this.FishRateBtn = t;
		t.verticalCenter = 0;
		t.skinName = FishGameSceneSkin$Skin17;
		return t;
	};
	_proto.fishgetnumbtn_i = function () {
		var t = new uiCore.Button();
		this.fishgetnumbtn = t;
		t.verticalCenter = 150;
		t.skinName = FishGameSceneSkin$Skin18;
		return t;
	};
	_proto.featuresGroupRight_i = function () {
		var t = new eui.Group();
		this.featuresGroupRight = t;
		t.right = 30;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this.fishlockbtn_i(),this.fishfastbtn_i(),this.fishautobtn_i(),this.lockmc_i(),this.fastmc_i(),this.automc_i(),this.arrowbtn_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.right = 50;
		t.verticalCenter = -150;
		t.width = 0;
		t.elementsContent = [this.lockbg_i()];
		return t;
	};
	_proto.lockbg_i = function () {
		var t = new eui.Image();
		this.lockbg = t;
		t.anchorOffsetX = 76.5;
		t.anchorOffsetY = 76.5;
		t.source = "bg";
		t.visible = false;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.right = 50;
		t.verticalCenter = 0;
		t.width = 0;
		t.elementsContent = [this.fastbg_i()];
		return t;
	};
	_proto.fastbg_i = function () {
		var t = new eui.Image();
		this.fastbg = t;
		t.anchorOffsetX = 76.5;
		t.anchorOffsetY = 76.5;
		t.source = "bg";
		t.visible = false;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.right = 50;
		t.verticalCenter = 150;
		t.width = 0;
		t.elementsContent = [this.autobg_i()];
		return t;
	};
	_proto.autobg_i = function () {
		var t = new eui.Image();
		this.autobg = t;
		t.anchorOffsetX = 76.5;
		t.anchorOffsetY = 76.5;
		t.source = "bg";
		t.visible = false;
		return t;
	};
	_proto.fishlockbtn_i = function () {
		var t = new uiCore.Button();
		this.fishlockbtn = t;
		t.right = 0;
		t.verticalCenter = -150;
		t.skinName = FishGameSceneSkin$Skin19;
		return t;
	};
	_proto.fishfastbtn_i = function () {
		var t = new uiCore.Button();
		this.fishfastbtn = t;
		t.right = 0;
		t.verticalCenter = 0;
		t.skinName = FishGameSceneSkin$Skin20;
		return t;
	};
	_proto.fishautobtn_i = function () {
		var t = new uiCore.Button();
		this.fishautobtn = t;
		t.right = 0;
		t.verticalCenter = 150;
		t.skinName = FishGameSceneSkin$Skin21;
		return t;
	};
	_proto.lockmc_i = function () {
		var t = new MovieClipGroup();
		this.lockmc = t;
		t.rameLabel = "play";
		t.right = 97;
		t.source = "lockRotation";
		t.sourceName = "lockrotation";
		t.touchEnabled = false;
		t.verticalCenter = -200;
		t.visible = false;
		t.width = 0;
		return t;
	};
	_proto.fastmc_i = function () {
		var t = new MovieClipGroup();
		this.fastmc = t;
		t.rameLabel = "play";
		t.right = 97;
		t.source = "lockRotation";
		t.sourceName = "lockrotation";
		t.touchEnabled = false;
		t.verticalCenter = -50;
		t.visible = false;
		t.width = 0;
		return t;
	};
	_proto.automc_i = function () {
		var t = new MovieClipGroup();
		this.automc = t;
		t.rameLabel = "play";
		t.right = 97;
		t.source = "lockRotation";
		t.sourceName = "lockrotation";
		t.touchEnabled = false;
		t.verticalCenter = 100;
		t.visible = false;
		t.width = 0;
		return t;
	};
	_proto.arrowbtn_i = function () {
		var t = new uiCore.Button();
		this.arrowbtn = t;
		t.right = 90;
		t.verticalCenter = 0;
		t.skinName = FishGameSceneSkin$Skin22;
		return t;
	};
	_proto.shuangciGroup_i = function () {
		var t = new DragonBoneGroup();
		this.shuangciGroup = t;
		t.source = "shuangci";
		t.sourceName = "Armature";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	_proto.noticeItemGroup_i = function () {
		var t = new eui.Group();
		this.noticeItemGroup = t;
		t.height = 36;
		t.horizontalCenter = -48;
		t.top = 120;
		t.width = 560;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.noticeScroller_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 41;
		t.left = 50;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "shared_top_msg_back";
		t.top = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.alpha = 0;
		t.left = 10;
		t.source = "shared_top_msg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.noticeScroller_i = function () {
		var t = new eui.Scroller();
		this.noticeScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.enabled = false;
		t.left = 60;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.viewport = this._Group4_i();
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 41;
		t.width = 505;
		t.x = -49;
		t.y = 226;
		t.elementsContent = [this.noticeLabel_i()];
		return t;
	};
	_proto.noticeLabel_i = function () {
		var t = new eui.Label();
		this.noticeLabel = t;
		t.anchorOffsetX = 0;
		t.bottom = 6;
		t.fontFamily = "微软雅黑";
		t.height = 41;
		t.size = 23;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xDEE4E5;
		t.top = 4;
		t.verticalAlign = "middle";
		t.x = 500;
		return t;
	};
	_proto.pingView_i = function () {
		var t = new PingTip();
		this.pingView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 97;
		t.right = 0;
		t.top = 0;
		t.width = 97;
		return t;
	};
	return FishGameSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/games/fishGame/FishGenScene.exml'] = window.FishGenSceneSkin = (function (_super) {
	__extends(FishGenSceneSkin, _super);
	var FishGenSceneSkin$Skin23 = 	(function (_super) {
		__extends(FishGenSceneSkin$Skin23, _super);
		function FishGenSceneSkin$Skin23() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGenSceneSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.scaleX = 0.6;
			t.scaleY = 0.6;
			t.source = "add";
			return t;
		};
		return FishGenSceneSkin$Skin23;
	})(eui.Skin);

	var FishGenSceneSkin$Skin24 = 	(function (_super) {
		__extends(FishGenSceneSkin$Skin24, _super);
		function FishGenSceneSkin$Skin24() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FishGenSceneSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.scaleX = 0.6;
			t.scaleY = 0.6;
			t.source = "down";
			return t;
		};
		return FishGenSceneSkin$Skin24;
	})(eui.Skin);

	function FishGenSceneSkin() {
		_super.call(this);
		this.skinParts = ["fishBoard","fishGen","fishSeat","fishgrade","LfireLight","RfireLight","LlittleLight","RlittleLight","addbtn","downbtn","oddsMoney","moneybg","money","playername","card","lockFishView"];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this.fishBoard_i(),this.fishGen_i(),this.fishSeat_i(),this.fishgrade_i(),this.LfireLight_i(),this.RfireLight_i(),this.LlittleLight_i(),this.RlittleLight_i(),this.addbtn_i(),this.downbtn_i(),this.oddsMoney_i(),this.moneybg_i(),this.money_i(),this.playername_i(),this.card_i(),this.lockFishView_i()];
	}
	var _proto = FishGenSceneSkin.prototype;

	_proto.fishBoard_i = function () {
		var t = new eui.Image();
		this.fishBoard = t;
		t.horizontalCenter = 0;
		t.source = "board";
		t.verticalCenter = 0;
		return t;
	};
	_proto.fishGen_i = function () {
		var t = new eui.Image();
		this.fishGen = t;
		t.anchorOffsetX = 43;
		t.anchorOffsetY = 60;
		t.source = "gun1";
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto.fishSeat_i = function () {
		var t = new eui.Image();
		this.fishSeat = t;
		t.horizontalCenter = 0;
		t.source = "seat";
		t.verticalCenter = 0;
		return t;
	};
	_proto.fishgrade_i = function () {
		var t = new eui.Image();
		this.fishgrade = t;
		t.horizontalCenter = 0;
		t.source = "disc";
		t.verticalCenter = 0;
		return t;
	};
	_proto.LfireLight_i = function () {
		var t = new ParticleGroup();
		this.LfireLight = t;
		t.particleScaleX = 0.5;
		t.particleScaleY = 0.5;
		t.source = "fireLight";
		return t;
	};
	_proto.RfireLight_i = function () {
		var t = new ParticleGroup();
		this.RfireLight = t;
		t.particleScaleX = 0.5;
		t.particleScaleY = 0.5;
		t.source = "fireLight";
		return t;
	};
	_proto.LlittleLight_i = function () {
		var t = new ParticleGroup();
		this.LlittleLight = t;
		t.source = "littleLight";
		return t;
	};
	_proto.RlittleLight_i = function () {
		var t = new ParticleGroup();
		this.RlittleLight = t;
		t.source = "littleLight";
		return t;
	};
	_proto.addbtn_i = function () {
		var t = new uiCore.Button();
		this.addbtn = t;
		t.horizontalCenter = 70;
		t.verticalCenter = 10;
		t.visible = false;
		t.skinName = FishGenSceneSkin$Skin23;
		return t;
	};
	_proto.downbtn_i = function () {
		var t = new uiCore.Button();
		this.downbtn = t;
		t.horizontalCenter = -70;
		t.verticalCenter = 10;
		t.visible = false;
		t.skinName = FishGenSceneSkin$Skin24;
		return t;
	};
	_proto.oddsMoney_i = function () {
		var t = new eui.BitmapLabel();
		this.oddsMoney = t;
		t.font = "gunFont_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	_proto.moneybg_i = function () {
		var t = new eui.Image();
		this.moneybg = t;
		t.horizontalCenter = 130;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "01";
		t.verticalCenter = -30;
		return t;
	};
	_proto.money_i = function () {
		var t = new eui.BitmapLabel();
		this.money = t;
		t.font = "gunGoldFont_fnt";
		t.horizontalCenter = 130;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.text = "0";
		t.verticalCenter = -30;
		return t;
	};
	_proto.playername_i = function () {
		var t = new eui.Label();
		this.playername = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 180;
		t.size = 20;
		t.text = "亲爱的玩家";
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalAlign = "bottom";
		t.verticalCenter = 10;
		t.width = 170;
		return t;
	};
	_proto.card_i = function () {
		var t = new CircleImage();
		this.card = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "card1";
		t.visible = false;
		t.x = -80;
		t.y = -140;
		return t;
	};
	_proto.lockFishView_i = function () {
		var t = new CircleGroup();
		this.lockFishView = t;
		t.visible = false;
		t.x = 120;
		t.y = -180;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "zzsd";
		return t;
	};
	return FishGenSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/login/LoginScene.exml'] = window.LoginSceneSkin = (function (_super) {
	__extends(LoginSceneSkin, _super);
	var LoginSceneSkin$Skin25 = 	(function (_super) {
		__extends(LoginSceneSkin$Skin25, _super);
		function LoginSceneSkin$Skin25() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginSceneSkin$Skin25.prototype;

		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSceneSkin$Skin25;
	})(eui.Skin);

	function LoginSceneSkin() {
		_super.call(this);
		this.skinParts = ["QuickLogin"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.QuickLogin_i()];
	}
	var _proto = LoginSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gamehall_loadingBg_png";
		t.top = 0;
		return t;
	};
	_proto.QuickLogin_i = function () {
		var t = new uiCore.Button();
		this.QuickLogin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 89;
		t.label = "";
		t.right = 562;
		t.verticalCenter = 227.5;
		t.width = 244;
		t.skinName = LoginSceneSkin$Skin25;
		return t;
	};
	return LoginSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Button1Skin.exml'] = window.public.Button1Skin = (function (_super) {
	__extends(Button1Skin, _super);
	function Button1Skin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("iconDisplay","horizontalCenter",0)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("labelDisplay","textColor",0x8C8C8C)
				])
		];
	}
	var _proto = Button1Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gamehall_comfirm_btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.x = 56;
		t.y = 34;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new uiCore.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "";
		t.verticalCenter = -4;
		return t;
	};
	return Button1Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/AlertSkin.exml'] = window.public.AlertSkin = (function (_super) {
	__extends(AlertSkin, _super);
	function AlertSkin() {
		_super.call(this);
		this.skinParts = ["okButton","messageLabel","txtTitle"];
		
		this.elementsContent = [this._Image1_i(),this.okButton_i(),this.messageLabel_i(),this.txtTitle_i(),this._Image2_i()];
	}
	var _proto = AlertSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(93,99,561,268);
		t.source = "NY_gamehall_tipswindow";
		t.verticalCenter = 0;
		return t;
	};
	_proto.okButton_i = function () {
		var t = new uiCore.Button();
		this.okButton = t;
		t.horizontalCenter = 0;
		t.skinName = "public.Button1Skin";
		t.verticalCenter = 139;
		return t;
	};
	_proto.messageLabel_i = function () {
		var t = new uiCore.Label();
		this.messageLabel = t;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 130;
		t.horizontalCenter = 0.5;
		t.lineSpacing = 12;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xc1c6d0;
		t.verticalAlign = "middle";
		t.verticalCenter = 34;
		t.width = 500;
		t.wordWrap = true;
		return t;
	};
	_proto.txtTitle_i = function () {
		var t = new uiCore.Label();
		this.txtTitle = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 0.5;
		t.size = 28;
		t.textAlign = "center";
		t.textColor = 0xc2a265;
		t.verticalCenter = -73;
		t.visible = false;
		t.width = 300;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "gamehall_title_tips";
		t.verticalCenter = -71;
		return t;
	};
	return AlertSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/BannerSkin.exml'] = window.public.BannerSkin = (function (_super) {
	__extends(BannerSkin, _super);
	function BannerSkin() {
		_super.call(this);
		this.skinParts = ["messageLabel"];
		
		this.height = 53;
		this.width = 1280;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BannerSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 53;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.messageLabel_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,1,21,10);
		t.source = "bannerBg";
		t.touchEnabled = false;
		t.width = 960;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,1,21,10);
		t.source = "bannerBg";
		t.touchEnabled = false;
		t.width = 960;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,1,21,10);
		t.source = "bannerBg";
		t.touchEnabled = false;
		t.width = 960;
		return t;
	};
	_proto.messageLabel_i = function () {
		var t = new uiCore.Label();
		this.messageLabel = t;
		t.fontFamily = "微软雅黑";
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xfff292;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = -1;
		t.percentWidth = 100;
		t.wordWrap = true;
		return t;
	};
	return BannerSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Button12Skin.exml'] = window.public.Button12Skin = (function (_super) {
	__extends(Button12Skin, _super);
	function Button12Skin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("iconDisplay","horizontalCenter",0)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("labelDisplay","textColor",0x8C8C8C)
				])
		];
	}
	var _proto = Button12Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 65;
		t.left = 0;
		t.right = 0;
		t.source = "gamehall_cancel_btn";
		t.top = 0;
		t.width = 180;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.x = 56;
		t.y = 34;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new uiCore.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 32;
		t.text = "";
		t.verticalCenter = -5;
		return t;
	};
	return Button12Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Button13Skin.exml'] = window.public.Button13Skin = (function (_super) {
	__extends(Button13Skin, _super);
	function Button13Skin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("iconDisplay","horizontalCenter",0)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("labelDisplay","textColor",0x8C8C8C)
				])
		];
	}
	var _proto = Button13Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 65;
		t.horizontalCenter = 0;
		t.source = "gamehall_comfirm_btn";
		t.verticalCenter = 0;
		t.width = 180;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.visible = false;
		t.x = 56;
		t.y = 34;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new uiCore.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 32;
		t.text = "";
		t.verticalCenter = -5;
		return t;
	};
	return Button13Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Button14Skin.exml'] = window.public.Button14Skin = (function (_super) {
	__extends(Button14Skin, _super);
	function Button14Skin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.height = 72;
		this.width = 72;
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("iconDisplay","horizontalCenter",0),
					new eui.SetProperty("iconDisplay","source","")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","source","")
				])
		];
	}
	var _proto = Button14Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 72;
		t.horizontalCenter = 0;
		t.source = "main_women4_png";
		t.verticalCenter = 0;
		t.width = 72;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.height = 72;
		t.horizontalCenter = 0;
		t.source = "main_women4_png";
		t.verticalCenter = 0;
		t.width = 72;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new uiCore.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 0;
		t.size = 19;
		t.text = "";
		t.verticalCenter = -1.5;
		return t;
	};
	return Button14Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/ButtonEx.exml'] = window.ButtonExSkin = (function (_super) {
	__extends(ButtonExSkin, _super);
	function ButtonExSkin() {
		_super.call(this);
		this.skinParts = ["btnImg","labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this.btnImg_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetStateProperty(this, ["hostComponent.data.downIcon"],[0],this.btnImg,"source")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("btnImg","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.upIcon"],[0],this.btnImg,"source");
	}
	var _proto = ButtonExSkin.prototype;

	_proto.btnImg_i = function () {
		var t = new eui.Image();
		this.btnImg = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonExSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/ButtonSimpleSkin.exml'] = window.ButtonSimpleSkin = (function (_super) {
	__extends(ButtonSimpleSkin, _super);
	function ButtonSimpleSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.elementsContent = [this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = ButtonSimpleSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.source = "slwh_game_rank_btn1_png";
		return t;
	};
	return ButtonSimpleSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/CheckBoxButtonSkin.exml'] = window.CheckBoxButtonSkin = (function (_super) {
	__extends(CheckBoxButtonSkin, _super);
	function CheckBoxButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "disable";
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("disable",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("upAndSelected",
				[
				])
			,
			new eui.State ("downAndSelected",
				[
				])
			,
			new eui.State ("disableAndSelected",
				[
					new eui.SetProperty("_Image2","source","a8_02_png"),
					new eui.SetProperty("_Image2","x",13)
				])
		];
	}
	var _proto = CheckBoxButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "checkBoxButton0_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "checkBoxButton1_png";
		t.x = 4;
		t.y = 6;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new uiCore.Label();
		this.labelDisplay = t;
		t.fontFamily = "微软雅黑";
		t.size = 23;
		t.text = "";
		t.textAlign = "center";
		t.x = 51;
		t.y = 9;
		return t;
	};
	return CheckBoxButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/CloseButtonSkin.exml'] = window.public.CloseButtonSkin = (function (_super) {
	__extends(CloseButtonSkin, _super);
	function CloseButtonSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","gamehall_BtnClose_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","y",1),
					new eui.SetProperty("_Image1","source","gamehall_BtnClose_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","gamehall_BtnClose_png")
				])
		];
	}
	var _proto = CloseButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "gamehall_BtnClose_png";
		return t;
	};
	return CloseButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/DialogSkin.exml'] = window.public.DialogSkin = (function (_super) {
	__extends(DialogSkin, _super);
	function DialogSkin() {
		_super.call(this);
		this.skinParts = ["messageLabel","cancelButton","okButton","txtTitle"];
		
		this.elementsContent = [this._Image1_i(),this.messageLabel_i(),this._Group1_i(),this.txtTitle_i(),this._Label1_i(),this._Image2_i()];
	}
	var _proto = DialogSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 418;
		t.horizontalCenter = 0;
		t.source = "gamehall_tipswindow";
		t.verticalCenter = 0;
		t.width = 754;
		return t;
	};
	_proto.messageLabel_i = function () {
		var t = new eui.Label();
		this.messageLabel = t;
		t.fontFamily = "微软雅黑";
		t.height = 164;
		t.horizontalCenter = 0;
		t.lineSpacing = 12;
		t.size = 28;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 650;
		t.wordWrap = true;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 126;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.cancelButton_i(),this.okButton_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.cancelButton_i = function () {
		var t = new uiCore.Button();
		this.cancelButton = t;
		t.skinName = "public.Button12Skin";
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto.okButton_i = function () {
		var t = new uiCore.Button();
		this.okButton = t;
		t.skinName = "public.Button13Skin";
		t.x = 356;
		t.y = 8;
		return t;
	};
	_proto.txtTitle_i = function () {
		var t = new eui.Label();
		this.txtTitle = t;
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 0;
		t.size = 42;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xfaffff;
		t.verticalCenter = -163;
		t.visible = false;
		t.width = 300;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 0;
		t.size = 42;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xfaffff;
		t.verticalCenter = -138;
		t.visible = false;
		t.width = 300;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 1;
		t.source = "gamehall_title_tips";
		t.verticalCenter = -133;
		return t;
	};
	return DialogSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/LoaddingSkin.exml'] = window.public.LoaddingSkin = (function (_super) {
	__extends(LoaddingSkin, _super);
	function LoaddingSkin() {
		_super.call(this);
		this.skinParts = ["progressTxt","restConnect"];
		
		this.height = 640;
		this.width = 960;
		this.elementsContent = [this._Rect1_i(),this._MovieClipGroup1_i(),this.progressTxt_i(),this.restConnect_i()];
	}
	var _proto = LoaddingSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.percentHeight = 100;
		t.strokeAlpha = 1;
		t.percentWidth = 100;
		return t;
	};
	_proto._MovieClipGroup1_i = function () {
		var t = new MovieClipGroup();
		t.height = 172;
		t.horizontalCenter = 0;
		t.rameLabel = "run";
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "fish";
		t.sourceName = "loading";
		t.verticalCenter = 0;
		t.width = 172;
		return t;
	};
	_proto.progressTxt_i = function () {
		var t = new eui.Label();
		this.progressTxt = t;
		t.horizontalCenter = 0;
		t.size = 21;
		t.text = "100%";
		t.verticalCenter = 0;
		return t;
	};
	_proto.restConnect_i = function () {
		var t = new eui.Label();
		this.restConnect = t;
		t.horizontalCenter = 0;
		t.size = 21;
		t.text = "";
		t.verticalCenter = 100;
		t.visible = false;
		return t;
	};
	return LoaddingSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/PingTipSkin.exml'] = window.PingTipSkin = (function (_super) {
	__extends(PingTipSkin, _super);
	function PingTipSkin() {
		_super.call(this);
		this.skinParts = ["pingImage","pingLable"];
		
		this.height = 98;
		this.width = 97;
		this.elementsContent = [this.pingImage_i(),this.pingLable_i()];
	}
	var _proto = PingTipSkin.prototype;

	_proto.pingImage_i = function () {
		var t = new eui.Image();
		this.pingImage = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.source = "lv5";
		t.verticalCenter = -15.5;
		t.width = 50;
		return t;
	};
	_proto.pingLable_i = function () {
		var t = new eui.Label();
		this.pingLable = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 15;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x28fb47;
		t.verticalCenter = 22;
		return t;
	};
	return PingTipSkin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Window2Skin.exml'] = window.public.Window2Skin = (function (_super) {
	__extends(Window2Skin, _super);
	var Window2Skin$Skin26 = 	(function (_super) {
		__extends(Window2Skin$Skin26, _super);
		function Window2Skin$Skin26() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","b3_selcted_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","b3_normal_png")
					])
			];
		}
		var _proto = Window2Skin$Skin26.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "b3_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Window2Skin$Skin26;
	})(eui.Skin);

	function Window2Skin() {
		_super.call(this);
		this.skinParts = ["_closeButton","contentGroup"];
		
		this.elementsContent = [this._Group1_i(),this.contentGroup_i()];
	}
	var _proto = Window2Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._closeButton_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "scale";
		t.source = "help_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.fillMode = "scale";
		t.scaleX = -1;
		t.source = "help_bg_png";
		t.x = 778;
		return t;
	};
	_proto._closeButton_i = function () {
		var t = new uiCore.Button();
		this._closeButton = t;
		t.height = 58;
		t.width = 122;
		t.x = 642;
		t.y = 13;
		t.skinName = Window2Skin$Skin26;
		return t;
	};
	_proto.contentGroup_i = function () {
		var t = new eui.Group();
		this.contentGroup = t;
		t.x = 0;
		return t;
	};
	return Window2Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/Window3Skin.exml'] = window.public.Window3Skin = (function (_super) {
	__extends(Window3Skin, _super);
	var Window3Skin$Skin27 = 	(function (_super) {
		__extends(Window3Skin$Skin27, _super);
		function Window3Skin$Skin27() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gamehall_BtnClose_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","gamehall_BtnClose_png")
					])
			];
		}
		var _proto = Window3Skin$Skin27.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gamehall_BtnClose_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Window3Skin$Skin27;
	})(eui.Skin);

	function Window3Skin() {
		_super.call(this);
		this.skinParts = ["_closeButton","contentGroup"];
		
		this.elementsContent = [this._Group1_i(),this.contentGroup_i()];
	}
	var _proto = Window3Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._closeButton_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "scale";
		t.source = "gameRecordBg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._closeButton_i = function () {
		var t = new uiCore.Button();
		this._closeButton = t;
		t.x = 856;
		t.y = 10;
		t.skinName = Window3Skin$Skin27;
		return t;
	};
	_proto.contentGroup_i = function () {
		var t = new eui.Group();
		this.contentGroup = t;
		t.x = 0;
		return t;
	};
	return Window3Skin;
})(eui.Skin);generateEUI.paths['resource/skins/public/WindowSkin.exml'] = window.public.WindowSkin = (function (_super) {
	__extends(WindowSkin, _super);
	function WindowSkin() {
		_super.call(this);
		this.skinParts = ["_closeButton","contentGroup"];
		
		this.height = 442;
		this.width = 747;
		this.elementsContent = [this._Group1_i(),this.contentGroup_i()];
	}
	var _proto = WindowSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._closeButton_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 442;
		t.source = "gamehall_SettingBg_png";
		t.width = 747;
		return t;
	};
	_proto._closeButton_i = function () {
		var t = new uiCore.Button();
		this._closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "public.CloseButtonSkin";
		t.x = 667.82;
		t.y = 25.8;
		return t;
	};
	_proto.contentGroup_i = function () {
		var t = new eui.Group();
		this.contentGroup = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return WindowSkin;
})(eui.Skin);generateEUI.paths['resource/skins/room/DeskScene.exml'] = window.DeskSceneSkin = (function (_super) {
	__extends(DeskSceneSkin, _super);
	var DeskSceneSkin$Skin28 = 	(function (_super) {
		__extends(DeskSceneSkin$Skin28, _super);
		function DeskSceneSkin$Skin28() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DeskSceneSkin$Skin28.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "desk_roomName";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0.5;
			t.horizontalCenter = 0;
			t.size = 25;
			t.verticalCenter = -2;
			return t;
		};
		return DeskSceneSkin$Skin28;
	})(eui.Skin);

	var DeskSceneSkin$Skin29 = 	(function (_super) {
		__extends(DeskSceneSkin$Skin29, _super);
		function DeskSceneSkin$Skin29() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DeskSceneSkin$Skin29.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "desk_next";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0.5;
			t.bottom = 32.5;
			t.horizontalCenter = 0;
			t.size = 25;
			return t;
		};
		return DeskSceneSkin$Skin29;
	})(eui.Skin);

	var DeskSceneSkin$Skin30 = 	(function (_super) {
		__extends(DeskSceneSkin$Skin30, _super);
		function DeskSceneSkin$Skin30() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DeskSceneSkin$Skin30.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "desk_last";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0.5;
			t.bottom = 32.5;
			t.horizontalCenter = 0;
			t.size = 25;
			return t;
		};
		return DeskSceneSkin$Skin30;
	})(eui.Skin);

	var DeskSceneSkin$Skin31 = 	(function (_super) {
		__extends(DeskSceneSkin$Skin31, _super);
		function DeskSceneSkin$Skin31() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DeskSceneSkin$Skin31.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "button_game_start";
			t.percentWidth = 100;
			return t;
		};
		return DeskSceneSkin$Skin31;
	})(eui.Skin);

	function DeskSceneSkin() {
		_super.call(this);
		this.skinParts = ["btnDeskRoomName","sharedHeader","btnDeskNext","btnDeskLast","buttonGameStart","fingerImage"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.btnDeskRoomName_i(),this.sharedHeader_i(),this.btnDeskNext_i(),this.btnDeskLast_i(),this.buttonGameStart_i(),this.fingerImage_i()];
	}
	var _proto = DeskSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 1;
		t.left = 0;
		t.right = 0;
		t.source = "desk_background_png";
		t.top = -1;
		return t;
	};
	_proto.btnDeskRoomName_i = function () {
		var t = new eui.Button();
		this.btnDeskRoomName = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.horizontalCenter = 0;
		t.label = "";
		t.top = 100;
		t.width = 178;
		t.skinName = DeskSceneSkin$Skin28;
		return t;
	};
	_proto.sharedHeader_i = function () {
		var t = new SharedSceneView();
		this.sharedHeader = t;
		t.bottom = 1;
		t.left = 0;
		t.right = 0;
		t.skinName = "SharedSceneSkin";
		t.top = 0;
		return t;
	};
	_proto.btnDeskNext_i = function () {
		var t = new eui.Button();
		this.btnDeskNext = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.label = "";
		t.right = 15;
		t.verticalCenter = -0.5;
		t.width = 35;
		t.skinName = DeskSceneSkin$Skin29;
		return t;
	};
	_proto.btnDeskLast_i = function () {
		var t = new eui.Button();
		this.btnDeskLast = t;
		t.alpha = 0;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = false;
		t.height = 80;
		t.label = "";
		t.left = 15;
		t.verticalCenter = -0.5;
		t.width = 35;
		t.skinName = DeskSceneSkin$Skin30;
		return t;
	};
	_proto.buttonGameStart_i = function () {
		var t = new uiCore.Button();
		this.buttonGameStart = t;
		t.bottom = 50;
		t.horizontalCenter = 0;
		t.skinName = DeskSceneSkin$Skin31;
		return t;
	};
	_proto.fingerImage_i = function () {
		var t = new eui.Image();
		this.fingerImage = t;
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.source = "Finger";
		return t;
	};
	return DeskSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/room/RoomScene.exml'] = window.RoomSceneSkin = (function (_super) {
	__extends(RoomSceneSkin, _super);
	var RoomSceneSkin$Skin32 = 	(function (_super) {
		__extends(RoomSceneSkin$Skin32, _super);
		function RoomSceneSkin$Skin32() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoomSceneSkin$Skin32.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "room_low_png";
			t.percentWidth = 100;
			return t;
		};
		return RoomSceneSkin$Skin32;
	})(eui.Skin);

	var RoomSceneSkin$Skin33 = 	(function (_super) {
		__extends(RoomSceneSkin$Skin33, _super);
		function RoomSceneSkin$Skin33() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoomSceneSkin$Skin33.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "room_middle_png";
			t.percentWidth = 100;
			return t;
		};
		return RoomSceneSkin$Skin33;
	})(eui.Skin);

	var RoomSceneSkin$Skin34 = 	(function (_super) {
		__extends(RoomSceneSkin$Skin34, _super);
		function RoomSceneSkin$Skin34() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoomSceneSkin$Skin34.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "room_high_png";
			t.percentWidth = 100;
			return t;
		};
		return RoomSceneSkin$Skin34;
	})(eui.Skin);

	function RoomSceneSkin() {
		_super.call(this);
		this.skinParts = ["btnRoomLow","roomLowGen","roomLowAdmittance","btnRoomMiddle","roomMiddleGen","roomMiddleAdmittance","btnRoomHigh","roomHighGen","roomHighAdmittance","sharedHeader"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i(),this.btnRoomLow_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.roomLowGen_i(),this.roomLowAdmittance_i(),this.btnRoomMiddle_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.roomMiddleGen_i(),this.roomMiddleAdmittance_i(),this.btnRoomHigh_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this.roomHighGen_i(),this.roomHighAdmittance_i(),this.sharedHeader_i()];
	}
	var _proto = RoomSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gamehall_bigBg";
		t.top = 0;
		return t;
	};
	_proto.btnRoomLow_i = function () {
		var t = new eui.Button();
		this.btnRoomLow = t;
		t.left = 80;
		t.verticalCenter = 0;
		t.skinName = RoomSceneSkin$Skin32;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 179;
		t.source = "otherJunior02";
		t.verticalCenter = 86.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 178;
		t.source = "otherJunior01";
		t.verticalCenter = 123.5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.left = 236;
		t.source = "otherCoin";
		t.verticalCenter = 125;
		return t;
	};
	_proto.roomLowGen_i = function () {
		var t = new eui.Label();
		this.roomLowGen = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.left = 247;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 89.5;
		return t;
	};
	_proto.roomLowAdmittance_i = function () {
		var t = new eui.Label();
		this.roomLowAdmittance = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.left = 272;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 128.5;
		return t;
	};
	_proto.btnRoomMiddle_i = function () {
		var t = new eui.Button();
		this.btnRoomMiddle = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.skinName = RoomSceneSkin$Skin33;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -81;
		t.source = "otherIntermediate02";
		t.verticalCenter = 79.5;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -81.5;
		t.source = "otherIntermediate01";
		t.verticalCenter = 119.5;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -37;
		t.source = "otherCoin";
		t.verticalCenter = 122;
		return t;
	};
	_proto.roomMiddleGen_i = function () {
		var t = new eui.Label();
		this.roomMiddleGen = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 35;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 83.5;
		t.width = 160;
		return t;
	};
	_proto.roomMiddleAdmittance_i = function () {
		var t = new eui.Label();
		this.roomMiddleAdmittance = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.horizontalCenter = 52;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 124.5;
		t.width = 140;
		return t;
	};
	_proto.btnRoomHigh_i = function () {
		var t = new eui.Button();
		this.btnRoomHigh = t;
		t.right = 80;
		t.verticalCenter = 0;
		t.skinName = RoomSceneSkin$Skin34;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.right = 333;
		t.source = "otherAdvanced02";
		t.verticalCenter = 79.5;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.right = 333;
		t.source = "otherAdvanced01";
		t.verticalCenter = 118.5;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.right = 299;
		t.source = "otherCoin";
		t.verticalCenter = 119;
		return t;
	};
	_proto.roomHighGen_i = function () {
		var t = new eui.Label();
		this.roomHighGen = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.right = 156;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 83.5;
		t.width = 160;
		return t;
	};
	_proto.roomHighAdmittance_i = function () {
		var t = new eui.Label();
		this.roomHighAdmittance = t;
		t.bold = true;
		t.fontFamily = "微软雅黑";
		t.right = 152;
		t.size = 22;
		t.textColor = 0xffffff;
		t.verticalCenter = 119.5;
		t.width = 140;
		return t;
	};
	_proto.sharedHeader_i = function () {
		var t = new SharedSceneView();
		this.sharedHeader = t;
		t.bottom = 3;
		t.left = 0;
		t.right = 0;
		t.skinName = "SharedSceneSkin";
		t.top = -3;
		return t;
	};
	return RoomSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/room/SingleDeskSkin.exml'] = window.SingleDeskSkin = (function (_super) {
	__extends(SingleDeskSkin, _super);
	var SingleDeskSkin$Skin35 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin35, _super);
		function SingleDeskSkin$Skin35() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin35.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin35;
	})(eui.Skin);

	var SingleDeskSkin$Skin36 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin36, _super);
		function SingleDeskSkin$Skin36() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin36.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin36;
	})(eui.Skin);

	var SingleDeskSkin$Skin37 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin37, _super);
		function SingleDeskSkin$Skin37() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin37.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin37;
	})(eui.Skin);

	var SingleDeskSkin$Skin38 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin38, _super);
		function SingleDeskSkin$Skin38() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin38.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin38;
	})(eui.Skin);

	var SingleDeskSkin$Skin39 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin39, _super);
		function SingleDeskSkin$Skin39() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin39.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin39;
	})(eui.Skin);

	var SingleDeskSkin$Skin40 = 	(function (_super) {
		__extends(SingleDeskSkin$Skin40, _super);
		function SingleDeskSkin$Skin40() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SingleDeskSkin$Skin40.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 75;
			t.horizontalCenter = 0;
			t.source = "desk_sit";
			t.verticalCenter = 0;
			t.width = 45;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.alpha = 0;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SingleDeskSkin$Skin40;
	})(eui.Skin);

	function SingleDeskSkin() {
		_super.call(this);
		this.skinParts = ["btnJoinSeat0","btnJoinSeat1","btnJoinSeat2","btnJoinSeat4","btnJoinSeat5","btnJoinSeat3","lblDeskName"];
		
		this.height = 600;
		this.width = 640;
		this.elementsContent = [this.btnJoinSeat0_i(),this.btnJoinSeat1_i(),this.btnJoinSeat2_i(),this.btnJoinSeat4_i(),this.btnJoinSeat5_i(),this.btnJoinSeat3_i(),this.lblDeskName_i()];
	}
	var _proto = SingleDeskSkin.prototype;

	_proto.btnJoinSeat0_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat0 = t;
		t.height = 90;
		t.label = "0";
		t.left = 400;
		t.top = 190;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin35;
		return t;
	};
	_proto.btnJoinSeat1_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat1 = t;
		t.height = 90;
		t.label = "1";
		t.left = 480;
		t.top = 150;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin36;
		return t;
	};
	_proto.btnJoinSeat2_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat2 = t;
		t.height = 90;
		t.label = "2";
		t.left = 420;
		t.top = 40;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin37;
		return t;
	};
	_proto.btnJoinSeat4_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat4 = t;
		t.height = 90;
		t.label = "4";
		t.left = 80;
		t.top = 70;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin38;
		return t;
	};
	_proto.btnJoinSeat5_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat5 = t;
		t.height = 90;
		t.label = "5";
		t.left = 70;
		t.top = 180;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin39;
		return t;
	};
	_proto.btnJoinSeat3_i = function () {
		var t = new eui.Button();
		this.btnJoinSeat3 = t;
		t.height = 90;
		t.label = "3";
		t.left = 200;
		t.top = 40;
		t.width = 80;
		t.skinName = SingleDeskSkin$Skin40;
		return t;
	};
	_proto.lblDeskName_i = function () {
		var t = new uiCore.Label();
		this.lblDeskName = t;
		t.anchorOffsetX = 0;
		t.size = 40;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xfff700;
		t.verticalAlign = "middle";
		t.width = 130;
		t.x = 304;
		t.y = 55;
		return t;
	};
	return SingleDeskSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/CustomerChatSkin.exml'] = window.CustomerChatSkin = (function (_super) {
	__extends(CustomerChatSkin, _super);
	var CustomerChatSkin$Skin41 = 	(function (_super) {
		__extends(CustomerChatSkin$Skin41, _super);
		function CustomerChatSkin$Skin41() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CustomerChatSkin$Skin41.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_close_btn";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CustomerChatSkin$Skin41;
	})(eui.Skin);

	function CustomerChatSkin() {
		_super.call(this);
		this.skinParts = ["btnCloseWindow","lblCustomerWeChat","copyWeChatGroup","copyQQGroup","lblCustomerQQ","lblCustomerDesc"];
		
		this.height = 380;
		this.width = 900;
		this.elementsContent = [this._Image1_i(),this.btnCloseWindow_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.lblCustomerWeChat_i(),this._Image6_i(),this._Image7_i(),this.copyWeChatGroup_i(),this.copyQQGroup_i(),this.lblCustomerQQ_i(),this.lblCustomerDesc_i()];
	}
	var _proto = CustomerChatSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 1;
		t.left = 21;
		t.right = 21;
		t.source = "setting_background_png";
		t.top = 26;
		return t;
	};
	_proto.btnCloseWindow_i = function () {
		var t = new eui.Button();
		this.btnCloseWindow = t;
		t.height = 88;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.width = 85;
		t.skinName = CustomerChatSkin$Skin41;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 81;
		t.horizontalCenter = 0;
		t.source = "setting_game_setting_bar";
		t.width = 469;
		t.y = 26;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_customer";
		t.top = 41;
		t.width = 79;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 62;
		t.horizontalCenter = 0;
		t.source = "setting_background_line";
		t.width = 367;
		t.y = 127;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 62;
		t.horizontalCenter = 0;
		t.source = "setting_background_line";
		t.width = 367;
		t.y = 225;
		return t;
	};
	_proto.lblCustomerWeChat_i = function () {
		var t = new eui.Label();
		this.lblCustomerWeChat = t;
		t.anchorOffsetX = 0;
		t.text = "";
		t.width = 283.33;
		t.x = 296.38;
		t.y = 140;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 76;
		t.source = "shared_icon_wechat";
		t.width = 70;
		t.x = 220.38;
		t.y = 116.35;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 76;
		t.source = "shared_icon_qq";
		t.width = 70;
		t.x = 219.71;
		t.y = 213.49;
		return t;
	};
	_proto.copyWeChatGroup_i = function () {
		var t = new eui.Group();
		this.copyWeChatGroup = t;
		t.x = 585;
		t.y = 127;
		t.elementsContent = [this._Image8_i(),this._Image9_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 55;
		t.horizontalCenter = 0;
		t.source = "setting_background_btn";
		t.verticalCenter = 0;
		t.width = 159;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_copy";
		t.verticalCenter = 0;
		t.width = 70;
		return t;
	};
	_proto.copyQQGroup_i = function () {
		var t = new eui.Group();
		this.copyQQGroup = t;
		t.x = 585;
		t.y = 225;
		t.elementsContent = [this._Image10_i(),this._Image11_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 55;
		t.horizontalCenter = 0;
		t.source = "setting_background_btn";
		t.verticalCenter = 1;
		t.width = 159;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_copy";
		t.verticalCenter = 0;
		t.width = 70;
		return t;
	};
	_proto.lblCustomerQQ_i = function () {
		var t = new eui.Label();
		this.lblCustomerQQ = t;
		t.anchorOffsetX = 0;
		t.text = "";
		t.width = 283.33;
		t.x = 296.38;
		t.y = 239;
		return t;
	};
	_proto.lblCustomerDesc_i = function () {
		var t = new eui.Label();
		this.lblCustomerDesc = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "";
		t.textAlign = "center";
		t.width = 734;
		t.y = 310;
		return t;
	};
	return CustomerChatSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/GameBgmSlider.exml'] = window.GameBgmSlider = (function (_super) {
	__extends(GameBgmSlider, _super);
	function GameBgmSlider() {
		_super.call(this);
		this.skinParts = ["track","trackHighlight","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.trackHighlight_i(),this.thumb_i()];
	}
	var _proto = GameBgmSlider.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.source = "setting_tab_background";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.trackHighlight_i = function () {
		var t = new eui.Image();
		this.trackHighlight = t;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "setting_game_slider";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 76;
		t.source = "setting_game_icon_music";
		t.verticalCenter = 0;
		t.width = 76;
		return t;
	};
	return GameBgmSlider;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/GameMusicSlider.exml'] = window.GameMusicSlider = (function (_super) {
	__extends(GameMusicSlider, _super);
	function GameMusicSlider() {
		_super.call(this);
		this.skinParts = ["track","trackHighlight","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.trackHighlight_i(),this.thumb_i()];
	}
	var _proto = GameMusicSlider.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.source = "setting_tab_background";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.trackHighlight_i = function () {
		var t = new eui.Image();
		this.trackHighlight = t;
		t.scale9Grid = new egret.Rectangle(10,10,50,50);
		t.source = "setting_game_slider";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 76;
		t.source = "setting_game_icon_bgm";
		t.verticalCenter = 0;
		t.width = 76;
		return t;
	};
	return GameMusicSlider;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/GameSettingSkin.exml'] = window.GameSettingSkin = (function (_super) {
	__extends(GameSettingSkin, _super);
	var GameSettingSkin$Skin42 = 	(function (_super) {
		__extends(GameSettingSkin$Skin42, _super);
		function GameSettingSkin$Skin42() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameSettingSkin$Skin42.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_close_btn";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameSettingSkin$Skin42;
	})(eui.Skin);

	function GameSettingSkin() {
		_super.call(this);
		this.skinParts = ["btnCloseWindow","musicSlider","bgmSlider"];
		
		this.height = 380;
		this.width = 900;
		this.elementsContent = [this._Image1_i(),this.btnCloseWindow_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.musicSlider_i(),this.bgmSlider_i()];
	}
	var _proto = GameSettingSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 21;
		t.right = 21;
		t.source = "setting_background_png";
		t.top = 27;
		return t;
	};
	_proto.btnCloseWindow_i = function () {
		var t = new eui.Button();
		this.btnCloseWindow = t;
		t.height = 88;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.width = 85;
		t.skinName = GameSettingSkin$Skin42;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 81;
		t.horizontalCenter = 0;
		t.source = "setting_game_setting_bar";
		t.width = 469;
		t.y = 26;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_set";
		t.top = 41;
		t.width = 79;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 250;
		t.horizontalCenter = 0;
		t.left = 50;
		t.right = 50;
		t.scale9Grid = new egret.Rectangle(50,50,50,50);
		t.source = "setting_background_border";
		t.y = 101;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 48;
		t.horizontalCenter = -190;
		t.source = "setting_game_chinese_bgm";
		t.width = 89;
		t.y = 166;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 48;
		t.horizontalCenter = -190;
		t.source = "setting_game_chinese_music";
		t.width = 89;
		t.y = 251.5;
		return t;
	};
	_proto.musicSlider_i = function () {
		var t = new eui.HSlider();
		this.musicSlider = t;
		t.height = 20;
		t.maximum = 1.0;
		t.minimum = 0.0;
		t.skinName = "GameMusicSlider";
		t.snapInterval = 0.1;
		t.width = 421;
		t.x = 322.33;
		t.y = 180;
		return t;
	};
	_proto.bgmSlider_i = function () {
		var t = new eui.HSlider();
		this.bgmSlider = t;
		t.height = 20;
		t.horizontalCenter = 80;
		t.maximum = 1;
		t.skinName = "GameBgmSlider";
		t.snapInterval = 0.1;
		t.width = 421;
		t.y = 266;
		return t;
	};
	return GameSettingSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/SettingWindowSkin.exml'] = window.SettingWindowSkin = (function (_super) {
	__extends(SettingWindowSkin, _super);
	var SettingWindowSkin$Skin43 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin43, _super);
		function SettingWindowSkin$Skin43() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin43.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_btn_exit";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin43;
	})(eui.Skin);

	var SettingWindowSkin$Skin44 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin44, _super);
		function SettingWindowSkin$Skin44() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin44.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_chinese_exitgame";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin44;
	})(eui.Skin);

	var SettingWindowSkin$Skin45 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin45, _super);
		function SettingWindowSkin$Skin45() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin45.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_close_btn";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin45;
	})(eui.Skin);

	var SettingWindowSkin$Skin46 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin46, _super);
		function SettingWindowSkin$Skin46() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin46.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_select_tab";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin46;
	})(eui.Skin);

	var SettingWindowSkin$Skin47 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin47, _super);
		function SettingWindowSkin$Skin47() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin47.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_chinese_set";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin47;
	})(eui.Skin);

	var SettingWindowSkin$Skin48 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin48, _super);
		function SettingWindowSkin$Skin48() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin48.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_select_tab";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin48;
	})(eui.Skin);

	var SettingWindowSkin$Skin49 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin49, _super);
		function SettingWindowSkin$Skin49() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin49.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_chinese_set";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin49;
	})(eui.Skin);

	var SettingWindowSkin$Skin50 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin50, _super);
		function SettingWindowSkin$Skin50() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin50.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_select_tab";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin50;
	})(eui.Skin);

	var SettingWindowSkin$Skin51 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin51, _super);
		function SettingWindowSkin$Skin51() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin51.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_chinese_feedback";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin51;
	})(eui.Skin);

	var SettingWindowSkin$Skin52 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin52, _super);
		function SettingWindowSkin$Skin52() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin52.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_btn_logout";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin52;
	})(eui.Skin);

	var SettingWindowSkin$Skin53 = 	(function (_super) {
		__extends(SettingWindowSkin$Skin53, _super);
		function SettingWindowSkin$Skin53() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin$Skin53.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_chinese_logout";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin$Skin53;
	})(eui.Skin);

	function SettingWindowSkin() {
		_super.call(this);
		this.skinParts = ["btnCloseWindow","lblBGMSwitchDesc","groupBGMSwitch"];
		
		this.height = 664;
		this.width = 1127;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.btnCloseWindow_i(),this._Image2_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Image3_i(),this._Image4_i(),this.groupBGMSwitch_i(),this._Group5_i()];
	}
	var _proto = SettingWindowSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 620;
		t.horizontalCenter = 0;
		t.source = "setting_background_png";
		t.verticalCenter = 5;
		t.width = 1085;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.x = 585;
		t.y = 500;
		t.elementsContent = [this._Button1_i(),this._Button2_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.height = 86;
		t.label = "";
		t.width = 210;
		t.x = 0;
		t.y = 0;
		t.skinName = SettingWindowSkin$Skin43;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.skinName = SettingWindowSkin$Skin44;
		return t;
	};
	_proto.btnCloseWindow_i = function () {
		var t = new eui.Button();
		this.btnCloseWindow = t;
		t.height = 88;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.width = 85;
		t.skinName = SettingWindowSkin$Skin45;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.height = 50;
		t.horizontalCenter = 0;
		t.source = "setting_tab_background";
		t.top = 60;
		t.width = 479;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.height = 50;
		t.horizontalCenter = -160;
		t.top = 60;
		t.width = 161;
		t.elementsContent = [this._Button3_i(),this._Button4_i()];
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.alpha = 1;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.label = "";
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.skinName = SettingWindowSkin$Skin46;
		return t;
	};
	_proto._Button4_i = function () {
		var t = new eui.Button();
		t.height = 30;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 60;
		t.skinName = SettingWindowSkin$Skin47;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 50;
		t.horizontalCenter = 0;
		t.top = 60;
		t.width = 161;
		t.elementsContent = [this._Button5_i(),this._Button6_i()];
		return t;
	};
	_proto._Button5_i = function () {
		var t = new eui.Button();
		t.alpha = 1;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.label = "";
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.skinName = SettingWindowSkin$Skin48;
		return t;
	};
	_proto._Button6_i = function () {
		var t = new eui.Button();
		t.height = 30;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 60;
		t.skinName = SettingWindowSkin$Skin49;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.height = 50;
		t.horizontalCenter = 160;
		t.width = 161;
		t.y = 60;
		t.elementsContent = [this._Button7_i(),this._Button8_i()];
		return t;
	};
	_proto._Button7_i = function () {
		var t = new eui.Button();
		t.alpha = 1;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.label = "";
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.skinName = SettingWindowSkin$Skin50;
		return t;
	};
	_proto._Button8_i = function () {
		var t = new eui.Button();
		t.height = 30;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 60;
		t.skinName = SettingWindowSkin$Skin51;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.source = "setting_chinese_bgm";
		t.width = 181.32;
		t.x = 324;
		t.y = 300.33;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 63;
		t.source = "setting_closebgm_background";
		t.width = 207;
		t.x = 534;
		t.y = 300.33;
		return t;
	};
	_proto.groupBGMSwitch_i = function () {
		var t = new eui.Group();
		this.groupBGMSwitch = t;
		t.x = 614;
		t.y = 301;
		t.elementsContent = [this._Image5_i(),this.lblBGMSwitchDesc_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 64;
		t.source = "setting_closebgm_change";
		t.width = 135;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lblBGMSwitchDesc_i = function () {
		var t = new eui.Image();
		this.lblBGMSwitchDesc = t;
		t.height = 39;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_open";
		t.verticalCenter = 0;
		t.width = 39;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.alpha = 0;
		t.x = 345;
		t.y = 500;
		t.elementsContent = [this._Button9_i(),this._Button10_i()];
		return t;
	};
	_proto._Button9_i = function () {
		var t = new eui.Button();
		t.height = 86;
		t.label = "";
		t.width = 210;
		t.x = 0;
		t.y = 0;
		t.skinName = SettingWindowSkin$Skin52;
		return t;
	};
	_proto._Button10_i = function () {
		var t = new eui.Button();
		t.height = 51;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 100;
		t.skinName = SettingWindowSkin$Skin53;
		return t;
	};
	return SettingWindowSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shared/SettingWindowSkin2.exml'] = window.SettingWindowSkin2 = (function (_super) {
	__extends(SettingWindowSkin2, _super);
	var SettingWindowSkin2$Skin54 = 	(function (_super) {
		__extends(SettingWindowSkin2$Skin54, _super);
		function SettingWindowSkin2$Skin54() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingWindowSkin2$Skin54.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "setting_close_btn";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingWindowSkin2$Skin54;
	})(eui.Skin);

	function SettingWindowSkin2() {
		_super.call(this);
		this.skinParts = ["btnCloseWindow","lblBGMSwitchDesc","groupBGMSwitch"];
		
		this.height = 380;
		this.width = 900;
		this.elementsContent = [this._Image1_i(),this.btnCloseWindow_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.groupBGMSwitch_i()];
	}
	var _proto = SettingWindowSkin2.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 21;
		t.right = 21;
		t.source = "setting_background_png";
		t.top = 27;
		return t;
	};
	_proto.btnCloseWindow_i = function () {
		var t = new eui.Button();
		this.btnCloseWindow = t;
		t.height = 88;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.width = 85;
		t.skinName = SettingWindowSkin2$Skin54;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 81;
		t.horizontalCenter = 0;
		t.source = "setting_game_setting_bar";
		t.width = 469;
		t.y = 26;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_set";
		t.top = 41;
		t.width = 79;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 250;
		t.horizontalCenter = 0;
		t.left = 50;
		t.right = 50;
		t.scale9Grid = new egret.Rectangle(50,50,50,50);
		t.source = "setting_background_border";
		t.y = 100;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.source = "setting_chinese_bgm";
		t.verticalCenter = 30;
		t.width = 180;
		t.x = 229.68;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 63;
		t.source = "setting_closebgm_background";
		t.verticalCenter = 30;
		t.width = 207;
		t.x = 469;
		return t;
	};
	_proto.groupBGMSwitch_i = function () {
		var t = new eui.Group();
		this.groupBGMSwitch = t;
		t.x = 549.35;
		t.y = 189.35;
		t.elementsContent = [this._Image7_i(),this.lblBGMSwitchDesc_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 64;
		t.source = "setting_closebgm_change";
		t.width = 135;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lblBGMSwitchDesc_i = function () {
		var t = new eui.Image();
		this.lblBGMSwitchDesc = t;
		t.height = 39;
		t.horizontalCenter = 0;
		t.source = "setting_chinese_open";
		t.verticalCenter = 0;
		t.width = 39;
		return t;
	};
	return SettingWindowSkin2;
})(eui.Skin);