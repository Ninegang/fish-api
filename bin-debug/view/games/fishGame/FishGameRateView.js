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
var FishGameRateView = (function (_super) {
    __extends(FishGameRateView, _super);
    function FishGameRateView(gameid) {
        var _this = _super.call(this) || this;
        _this.skinName = "FishGameRateSkin";
        _this.gameid = gameid;
        return _this;
    }
    FishGameRateView.prototype.childrenCreated = function () {
        var icon = new eui.Image();
        //图片命名与ID重合
        icon.source = this.gameid + "rate_png";
        this.addChild(icon);
        icon.width = 900;
        icon.height = 500;
        icon.horizontalCenter = 0.5;
        icon.verticalCenter = -16;
        this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);
    };
    FishGameRateView.prototype.onClosebtn = function () {
        uiCore.Application.closeWindow(this);
    };
    FishGameRateView.prototype.removeEvent = function () {
        this.closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);
    };
    FishGameRateView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    return FishGameRateView;
}(uiCore.Window));
__reflect(FishGameRateView.prototype, "FishGameRateView");
//# sourceMappingURL=FishGameRateView.js.map