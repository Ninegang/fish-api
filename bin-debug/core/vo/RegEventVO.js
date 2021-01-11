var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var RegEventVO = (function () {
        function RegEventVO() {
        }
        RegEventVO.create = function (target, type, backFn, backThis) {
            var evtVo = new RegEventVO();
            evtVo.target = target;
            evtVo.type = type;
            evtVo.backFn = backFn;
            evtVo.backThis = this;
            return evtVo;
        };
        return RegEventVO;
    }());
    core.RegEventVO = RegEventVO;
    __reflect(RegEventVO.prototype, "core.RegEventVO");
})(core || (core = {}));
//# sourceMappingURL=RegEventVO.js.map