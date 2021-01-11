var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var PoolUtil = (function () {
        function PoolUtil() {
        }
        //-----------------------------------------------------------------------------------------------------
        PoolUtil.recycleObj = function (type, obj, maxSize) {
            if (maxSize === void 0) { maxSize = 100; }
            var voArr = PoolUtil.pool[type];
            if (!voArr) {
                voArr = PoolUtil.pool[type] = [];
            }
            if (voArr.indexOf(obj) == -1) {
                if (voArr.length < maxSize) {
                    obj.poolClear();
                    voArr.push(obj);
                }
                else {
                    obj.clear();
                }
            }
            else {
                console.log(obj);
            }
        };
        PoolUtil.getPoolObj = function (type, cls) {
            var obj;
            var voArr = PoolUtil.pool[type];
            if (voArr && voArr.length > 0) {
                obj = voArr.pop();
            }
            else {
                obj = new cls();
            }
            obj.poolInit();
            return obj;
        };
        //-----------------------------------------------------------------------------------------------------
        PoolUtil.pool = {};
        return PoolUtil;
    }());
    core.PoolUtil = PoolUtil;
    __reflect(PoolUtil.prototype, "core.PoolUtil");
})(core || (core = {}));
//# sourceMappingURL=PoolUtil.js.map