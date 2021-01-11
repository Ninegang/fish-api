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
var LoginSceneView = (function (_super) {
    __extends(LoginSceneView, _super);
    function LoginSceneView() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginSceneSkin";
        _this.QuickLogin.skinName = "public.Button12Skin";
        return _this;
    }
    LoginSceneView.prototype.start = function () {
        this.initEvent();
        this.QuickLogin.label = uiCore.LangUtils.getMsgById(23);
        this.QuickLogin.visible = LibCore.GameConfig.IsLoginOpen;
    };
    LoginSceneView.prototype.initEvent = function () {
        this.QuickLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.QuickLoginFunc, this);
    };
    LoginSceneView.prototype.removeEvent = function () {
        this.QuickLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.QuickLoginFunc, this);
    };
    LoginSceneView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    //快速登录
    LoginSceneView.prototype.QuickLoginFunc = function () {
        uiCore.Application.addLoadding();
        var json = { openIMEI: uiCore.Utils.getIMEI(), agent: LibCore.GameConfig.agentid };
        // var json ={openIMEI:"67f1b473-ee45-4fc8-ae11-efc0e1e95dc7",agent:LibCore.GameConfig.agentid};
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_visterlogin_url, json, egret.URLRequestMethod.POST, function (data) {
            if (data.code == 1) {
                GameData.getInstance().clearUserData();
                GameData.getInstance().setUserData("signText", data.LoginSign);
                GameData.getInstance().setUserData("username", data.AccountName);
                GameData.getInstance().setUserData("userId", data.UserID);
                GameData.getInstance().setUserData("passward", data.Password);
                GameData.getInstance().setUserData("bankgoldnum", data.BankMoney);
                GameData.getInstance().setUserData("gold_num", data.Money);
                GameData.getInstance().setUserData("iconid", data.SystemIconID);
                GameData.getInstance().setUserData("viplevel", data.Viplevel);
                GameData.getInstance().setUserData("isnicknamechange", data.IsNickNameChange);
                GameData.getInstance().setUserData("agentId", LibCore.GameConfig.agentid);
                GameData.getInstance().setUserData("nickname", data.nickName);
                GameData.getInstance().setUserData("useragentid", data.UserAgentID);
                SceneManager.getExchange();
                GameData.getInstance().requestLoggedInData();
                this.chageScene();
                Net.GameService.connect();
                // 加载登录成功之后的数据
            }
            else {
                uiCore.Application.removeLoadding();
                uiCore.Alert.show(uiCore.LangUtils.getMsgById(11));
            }
        }, function () {
            uiCore.Application.removeLoadding();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(11));
        }, this);
        uiCore.SoundByteManager.playMusic("BgMusic");
    };
    LoginSceneView.prototype.chageScene = function () {
        SceneManager.changeSceneView(MainSceneView);
    };
    return LoginSceneView;
}(uiCore.Scene));
__reflect(LoginSceneView.prototype, "LoginSceneView");
//# sourceMappingURL=LoginSceneView.js.map