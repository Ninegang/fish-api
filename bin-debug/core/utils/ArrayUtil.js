var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.removeObj = function (list, obj) {
            var idx = list.indexOf(obj);
            if (idx != -1) {
                return ArrayUtil.removeIdx(list, idx);
            }
            return null;
        };
        ArrayUtil.removeIdx = function (list, idx) {
            var tmpObj = list[idx];
            list[idx] = list[list.length - 1];
            list.pop();
            return tmpObj;
        };
        return ArrayUtil;
    }());
    core.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "core.ArrayUtil");
})(core || (core = {}));
//# sourceMappingURL=ArrayUtil.js.map