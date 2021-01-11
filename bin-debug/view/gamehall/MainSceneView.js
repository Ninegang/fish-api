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
var MainSceneView = (function (_super) {
    __extends(MainSceneView, _super);
    function MainSceneView() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainSceneSkin";
        return _this;
    }
    MainSceneView.prototype.start = function () {
        this.initEvent();
        this.UserDataChange();
    };
    MainSceneView.prototype.UserDataChange = function () {
        this.sharedHeader.UserDataChange();
    };
    MainSceneView.prototype.initEvent = function () {
        this.goRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoRoomClick, this);
        this.goDSRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoDSRoomClick, this);
        this.btnLanguage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLanguageClick, this);
    };
    MainSceneView.prototype.onGoRoomClick = function () {
        if (SceneManager.getGameInfo(uiCore.Application.currGameId) == null) {
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(16));
            return;
        }
        SceneManager.changeSceneView(RoomSceneView);
        //this.sharedHeader.validateProperties();//     validateNow..sys.Validator.validateClient();
        GameData.getInstance().setUserData("GameID", uiCore.Application.currGameId);
    };
    MainSceneView.prototype.onGoDSRoomClick = function () {
        uiCore.Application.currGameId = 30300101;
        if (SceneManager.getGameInfo(uiCore.Application.currGameId) == null) {
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(16));
            return;
        }
        SceneManager.changeSceneView(RoomSceneView);
        //this.sharedHeader.validateProperties();//     validateNow..sys.Validator.validateClient();
        GameData.getInstance().setUserData("GameID", uiCore.Application.currGameId);
    };
    MainSceneView.prototype.onLanguageClick = function () {
        if (uiCore.LangUtils.getLangType() == uiCore.LangUtils.EN_US) {
            uiCore.Dialog.show("Make sure to switch to Chinese version ?", function () {
                uiCore.LangUtils.setLangType(uiCore.LangUtils.ZH_CN);
                location.reload();
            }, null, this);
        }
        else {
            uiCore.Dialog.show("确定切换到英文版本 ?", function () {
                uiCore.LangUtils.setLangType(uiCore.LangUtils.EN_US);
                location.reload();
            }, null, this);
        }
    };
    MainSceneView.prototype.removeEvent = function () {
        this.goRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoRoomClick, this);
        this.btnLanguage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLanguageClick, this);
    };
    MainSceneView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    return MainSceneView;
}(uiCore.Scene));
__reflect(MainSceneView.prototype, "MainSceneView");
//# sourceMappingURL=MainSceneView.js.map