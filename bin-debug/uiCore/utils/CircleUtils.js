var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var CircleUtils = (function () {
        function CircleUtils() {
        }
        CircleUtils.getCirclePoint = function (centerPoint, radius, angle) {
            this.resultPoint.x = centerPoint.x + radius * Math.cos(angle * Math.PI / 180);
            this.resultPoint.y = centerPoint.y + radius * Math.sin(angle * Math.PI / 180);
            return this.resultPoint;
        };
        CircleUtils.resultPoint = new egret.Point();
        return CircleUtils;
    }());
    uiCore.CircleUtils = CircleUtils;
    __reflect(CircleUtils.prototype, "uiCore.CircleUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=CircleUtils.js.map