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
 * 倒计时进度条
 * @author none
 */
var CommonProgressTimer = (function (_super) {
    __extends(CommonProgressTimer, _super);
    function CommonProgressTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shapeX = 0;
        _this.shapeY = 0;
        _this._value = 0;
        _this.widthNum = 0.6;
        return _this;
    }
    Object.defineProperty(CommonProgressTimer.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            var isChanged = this._value != value;
            this._value = value;
            if (isChanged) {
                this.updateNow();
            }
        },
        enumerable: true,
        configurable: true
    });
    CommonProgressTimer.prototype.childrenCreated = function () {
        this.shapeX = this.x + this.width / 2;
        this.shapeY = this.y + this.height / 2;
    };
    /**
     * 实时更新进度显示
     */
    CommonProgressTimer.prototype.updateNow = function () {
        this.visible = this.value != 0;
        if (this.shape) {
            this.parent.removeChild(this.shape);
        }
        var percent = this.value / 100 * 360; //从无到有
        this.shape = uiCore.DisplayUtils.getSector(this.width * this.widthNum, 0, percent);
        this.shape.rotation = -90;
        this.shape.x = this.shapeX;
        this.shape.y = this.shapeY;
        this.parent.addChild(this.shape);
        this.mask = this.shape;
    };
    return CommonProgressTimer;
}(eui.Image));
__reflect(CommonProgressTimer.prototype, "CommonProgressTimer");
//# sourceMappingURL=CommonProgressTimer.js.map