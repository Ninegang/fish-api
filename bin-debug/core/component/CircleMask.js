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
var core;
(function (core) {
    var CircleMask = (function (_super) {
        __extends(CircleMask, _super);
        function CircleMask(size) {
            var _this = _super.call(this) || this;
            _this.size = size;
            _this.setRate(0);
            return _this;
        }
        CircleMask.prototype.setRate = function (rate) {
            var tmpAngle = Math.min(1, rate) * 2 * Math.PI;
            this.graphics.clear();
            this.graphics.beginFill(0xff0000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(0, -this.size);
            this.graphics.drawArc(0, 0, this.size, 0, tmpAngle, true);
            this.graphics.lineTo(0, 0);
            this.graphics.endFill();
        };
        return CircleMask;
    }(egret.Shape));
    core.CircleMask = CircleMask;
    __reflect(CircleMask.prototype, "core.CircleMask");
})(core || (core = {}));
//# sourceMappingURL=CircleMask.js.map