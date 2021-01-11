var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var FilterUtil = (function () {
        function FilterUtil() {
        }
        /** 灰度滤镜 */
        FilterUtil.greyFilter = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0]);
        FilterUtil.testFilter = new egret.ColorMatrixFilter([1, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0]);
        return FilterUtil;
    }());
    core.FilterUtil = FilterUtil;
    __reflect(FilterUtil.prototype, "core.FilterUtil");
})(core || (core = {}));
//# sourceMappingURL=FilterUtil.js.map