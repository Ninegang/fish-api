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
var CircleGroup = (function (_super) {
    __extends(CircleGroup, _super);
    function CircleGroup() {
        var _this = _super.call(this) || this;
        _this.centerPoint = new egret.Point();
        return _this;
    }
    CircleGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.startX = this.x;
        this.startY = this.y;
    };
    Object.defineProperty(CircleGroup.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.centerPoint.x = this.startX - 30;
            this.centerPoint.y = this.startY;
            var resultPoint = uiCore.CircleUtils.getCirclePoint(this.centerPoint, 30, value);
            this.x = resultPoint.x;
            this.y = resultPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    return CircleGroup;
}(eui.Group));
__reflect(CircleGroup.prototype, "CircleGroup");
//# sourceMappingURL=CircleGroup.js.map