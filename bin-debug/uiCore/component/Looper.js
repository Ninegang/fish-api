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
var uiCore;
(function (uiCore) {
    /**
     * 载入中
     * @author none
     *
     */
    var Looper = (function (_super) {
        __extends(Looper, _super);
        function Looper() {
            var _this = _super.call(this) || this;
            _this.timeoutId = -1;
            _this.tick = 0;
            _this.autoPlay = false;
            _this.timeGap = 300;
            return _this;
        }
        Looper.prototype.start = function () {
            this.totalTick = this.looperGroup.numChildren + 1;
            if (this.autoPlay)
                this.play();
        };
        Looper.prototype.play = function () {
            var _this = this;
            this.visible = true;
            var displayObj;
            (this.timeoutId != -1) && clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function () {
                clearTimeout(_this.timeoutId);
                _this.timeoutId = -1;
                if (_this.tick === 0) {
                    _this.stop();
                    _this.tick++;
                    _this.play();
                }
                else if (_this.tick === _this.totalTick) {
                    _this.tick = 0;
                    _this.play();
                }
                else {
                    displayObj = _this.looperGroup.getChildAt(_this.tick - 1);
                    displayObj.visible = true;
                    _this.tick++;
                    _this.play();
                }
            }, this.timeGap);
        };
        Looper.prototype.stop = function () {
            this.visible = false;
            clearTimeout(this.timeoutId);
            this.timeoutId = -1;
            for (var i = 0; i < this.totalTick - 1; i++) {
                this.looperGroup.getChildAt(i).visible = false;
            }
        };
        Looper.prototype.onDestroy = function () {
            clearTimeout(this.timeoutId);
        };
        return Looper;
    }(uiCore.View));
    uiCore.Looper = Looper;
    __reflect(Looper.prototype, "uiCore.Looper");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Looper.js.map