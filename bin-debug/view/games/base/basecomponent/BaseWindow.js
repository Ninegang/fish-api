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
/**
 * BaseWindow
 */
var BaseWindow = (function (_super) {
    __extends(BaseWindow, _super);
    function BaseWindow() {
        var _this = _super.call(this) || this;
        _this.stretch();
        return _this;
    }
    BaseWindow.prototype.start = function () {
        this.closeBTN && this.closeBTN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.bgRect && this.bgRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    BaseWindow.prototype.onDestroy = function () {
        this.closeBTN && this.closeBTN.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.bgRect && this.bgRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    return BaseWindow;
}(uiCore.Window));
__reflect(BaseWindow.prototype, "BaseWindow");
//# sourceMappingURL=BaseWindow.js.map