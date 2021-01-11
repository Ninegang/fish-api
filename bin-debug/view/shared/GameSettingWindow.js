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
var GameSettingWindow = (function (_super) {
    __extends(GameSettingWindow, _super);
    function GameSettingWindow() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSettingSkin";
        // 获取初始音量大小
        _this.musicSlider.value = uiCore.SoundByteManager.soundValue;
        _this.bgmSlider.value = uiCore.SoundByteManager.musicValue;
        return _this;
    }
    GameSettingWindow.prototype.start = function () {
        this.initEvent();
    };
    GameSettingWindow.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    GameSettingWindow.prototype.initEvent = function () {
        this.bgmSlider.addEventListener(egret.Event.CHANGE, this.bgmChangeHandler, this);
        this.musicSlider.addEventListener(egret.Event.CHANGE, this.musicChangeHandler, this);
        this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
    };
    GameSettingWindow.prototype.removeEvent = function () {
        this.bgmSlider.removeEventListener(egret.Event.CHANGE, this.bgmChangeHandler, this);
        this.musicSlider.removeEventListener(egret.Event.CHANGE, this.musicChangeHandler, this);
        this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
    };
    GameSettingWindow.prototype.onBtnCloseWindow = function () {
        uiCore.Application.closeWindow(this);
    };
    GameSettingWindow.prototype.bgmChangeHandler = function (evt) {
        // console.log("调节游戏内音乐至:" + evt.target.value);
        egret.localStorage.setItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, evt.target.value);
        uiCore.SoundByteManager.musicValue = evt.target.value;
        uiCore.SoundByteManager.setVolumes(0);
    };
    GameSettingWindow.prototype.musicChangeHandler = function (evt) {
        // console.log("调节游戏内音效至:" + evt.target.value);
        egret.localStorage.setItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, evt.target.value);
        uiCore.SoundByteManager.soundValue = evt.target.value;
        uiCore.SoundByteManager.setVolumes(1);
    };
    return GameSettingWindow;
}(uiCore.Window));
__reflect(GameSettingWindow.prototype, "GameSettingWindow");
//# sourceMappingURL=GameSettingWindow.js.map