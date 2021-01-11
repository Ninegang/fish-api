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
var SettingWindow = (function (_super) {
    __extends(SettingWindow, _super);
    function SettingWindow() {
        var _this = _super.call(this) || this;
        _this.kSwitchXChange = 80;
        _this.kSettingOpenBGMImg = "setting_chinese_open";
        _this.kSettingCloseBGMImg = "setting_chinese_close";
        _this.skinName = "SettingWindowSkin2";
        return _this;
    }
    SettingWindow.prototype.start = function () {
        this.initEvent();
        // 读取本地存储的状态
        this._bgmIsMute = uiCore.SoundByteManager.musicValue == 0;
        if (this._bgmIsMute) {
            this.groupBGMSwitch.x -= this.kSwitchXChange;
            this.lblBGMSwitchDesc.source = this.kSettingCloseBGMImg;
        }
    };
    SettingWindow.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    SettingWindow.prototype.initEvent = function () {
        this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
        this.groupBGMSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeStatus, this);
    };
    SettingWindow.prototype.removeEvent = function () {
        this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
        this.groupBGMSwitch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeStatus, this);
    };
    SettingWindow.prototype.onBtnCloseWindow = function () {
        uiCore.Application.closeWindow(this);
    };
    SettingWindow.prototype.onBtnChangeStatus = function () {
        if (this._bgmIsMute) {
            this.groupBGMSwitch.x = 549;
            this.lblBGMSwitchDesc.source = this.kSettingOpenBGMImg;
        }
        else {
            this.groupBGMSwitch.x -= this.kSwitchXChange;
            this.lblBGMSwitchDesc.source = this.kSettingCloseBGMImg;
        }
        this._bgmIsMute = !this._bgmIsMute;
        egret.localStorage.setItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, this._bgmIsMute ? "0" : "0.5");
        egret.localStorage.setItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, this._bgmIsMute ? "0" : "0.8");
        uiCore.SoundByteManager.musicValue = this._bgmIsMute ? 0 : 0.5;
        uiCore.SoundByteManager.soundValue = this._bgmIsMute ? 0 : 0.8;
        uiCore.SoundByteManager.setVolumes();
    };
    return SettingWindow;
}(uiCore.Window));
__reflect(SettingWindow.prototype, "SettingWindow");
//# sourceMappingURL=SettingWindow.js.map