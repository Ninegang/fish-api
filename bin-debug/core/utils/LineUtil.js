var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LineUtil = (function () {
    function LineUtil() {
    }
    /** 判断两直线是否相交，求交点 */
    LineUtil.findLine2LineIntersection = function (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, intPos) {
        p0x = Math.floor(p0x);
        p0y = Math.floor(p0y);
        p1x = Math.floor(p1x);
        p1y = Math.floor(p1y);
        p2x = Math.floor(p2x);
        p2y = Math.floor(p2y);
        p3x = Math.floor(p3x);
        p3y = Math.floor(p3y);
        var tmpA1 = p1y - p0y;
        var tmpB1 = p0x - p1x;
        var tmpC1 = p1x * p0y - p0x * p1y;
        // let tmpK1:number = (p1y - p0y) / (p1x - p0x);
        var tmpA2 = p3y - p2y;
        var tmpB2 = p2x - p3x;
        var tmpC2 = p3x * p2y - p2x * p3y;
        intPos.x = Math.floor((tmpB1 * tmpC2 - tmpB2 * tmpC1) / (tmpA1 * tmpB2 - tmpA2 * tmpB1));
        intPos.y = Math.floor((tmpA2 * tmpC1 - tmpA1 * tmpC2) / (tmpA1 * tmpB2 - tmpA2 * tmpB1));
        if (Math.min(p0x, p1x) <= intPos.x && intPos.x <= Math.max(p0x, p1x) && Math.min(p0y, p1y) <= intPos.y && intPos.y <= Math.max(p0y, p1y) &&
            Math.min(p2x, p3x) <= intPos.x && intPos.x <= Math.max(p2x, p3x) && Math.min(p2y, p3y) <= intPos.y && intPos.y <= Math.max(p2y, p3y)) {
            return true;
        }
        return false;
    };
    return LineUtil;
}());
__reflect(LineUtil.prototype, "LineUtil");
//# sourceMappingURL=LineUtil.js.map