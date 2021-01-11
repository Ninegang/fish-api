var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SharedSceneView = (function (_super) {
    __extends(SharedSceneView, _super);
    function SharedSceneView() {
        var _this = _super.call(this) || this;
        _this.kStaticUserIcon = "player_icon_";
        _this.skinName = "SharedSceneSkin";
        return _this;
    }
    SharedSceneView.prototype.start = function () {
        this.initEvent();
        var flag = true;
        if (uiCore.LangUtils.getLangType() != uiCore.LangUtils.ZH_CN && !LibCore.GameConfig.IsMessageOpen) {
            flag = false;
        }
        this.noticeItemGroup.visible = flag;
        if (flag) {
            SystemMsg.getInstance().skin(this.noticeItemGroup, this.noticeLabel, this.noticeScroller);
        }
        if (GameData.getInstance().userData("playerHeadId")) {
            this.btnUserInfo.iconDisplay.source = GameData.getInstance().userData("playerHeadId");
        }
        else {
            this.btnUserInfo.iconDisplay.source = this.kStaticUserIcon + GameData.getInstance().userData("iconid");
        }
    };
    // private playerHeadImageIndex:number=0;
    // private playerHeadImageTime:number;
    // private setPlayerHeadImage():void{
    // 	if(uiCore.ZipManager.getSubkeyImageMap("playerHeadImage")){
    // 		this.btnUserInfo.iconDisplay.source = uiCore.ZipManager.getSubkeyImageMap("playerHeadImage");
    // 		this.playerHeadImageIndex=0;
    // 		this.playerHeadImageTime=null;
    // 	}else{
    // 		this.playerHeadImageIndex++;
    // 		if(this.playerHeadImageIndex<10){
    // 			this.playerHeadImageTime=egret.setTimeout(function () {
    // 				this.setPlayerHeadImage();
    // 				this.playerHeadImageTime=null;
    // 			}, this, 1000); 
    // 		}else{
    // 			this.btnUserInfo.iconDisplay.source = this.kStaticUserIcon + GameData.getInstance().userData("iconid");
    // 			this.playerHeadImageIndex=0;
    // 			this.playerHeadImageTime=null;
    // 		}
    // 	}
    // }
    SharedSceneView.prototype.UserDataChange = function () {
        this.userID.text = "ID:" + GameData.getInstance().userData("userId");
        this.nickname.text = GameData.getInstance().userData("nickname");
        var goldNum = GameData.getInstance().userData("gold_num");
        if (goldNum >= 0) {
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                goldNum = (goldNum / SceneManager.exchangeValue).toFixed(2);
            }
            this.goldnum.text = goldNum;
        }
    };
    SharedSceneView.prototype.initEvent = function () {
        this.btnTopSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSettingClick, this);
        this.btnGoback.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBackClick, this);
        // this.btnTopCustomer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCustomerClick, this);
    };
    SharedSceneView.prototype.removeEvent = function () {
        this.btnTopSetting.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSettingClick, this);
        this.btnGoback.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBackClick, this);
        // this.btnTopCustomer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCustomerClick, this);
    };
    SharedSceneView.prototype.onDestroy = function () {
        // if(this.playerHeadImageTime!=null){
        // 	egret.clearTimeout(this.playerHeadImageTime);
        // 	this.playerHeadImageTime=null;
        // }
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    SharedSceneView.prototype.onBtnSettingClick = function () {
        uiCore.Application.addWindow(new SettingWindow());
    };
    SharedSceneView.prototype.onBtnCustomerClick = function () {
        uiCore.Application.addWindow(new CustomerChatView());
    };
    SharedSceneView.prototype.onBtnBackClick = function () {
        if (this.backScene) {
            SceneManager.changeSceneView(this.backScene);
        }
        else {
            location.reload();
        }
        if (this.callback)
            this.callback();
    };
    SharedSceneView.prototype.setBackScene = function (scene, callback) {
        this.backScene = scene;
        this.callback = callback;
    };
    SharedSceneView.prototype.setBtnGobackState = function (isEnabled) {
        this.btnGoback.visible = isEnabled;
    };
    return SharedSceneView;
}(uiCore.Scene));
__reflect(SharedSceneView.prototype, "SharedSceneView");
//# sourceMappingURL=SharedSceneView.js.map