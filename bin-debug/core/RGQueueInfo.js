var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var RGQueueInfo = (function () {
        function RGQueueInfo() {
            this.rInfos = [];
        }
        RGQueueInfo.prototype.removeResInfo = function (resInfo) {
            var rInfo;
            for (var i = this.rInfos.length - 1; i >= 0; i--) {
                rInfo = this.rInfos[i];
                if (rInfo == resInfo) {
                    this.rInfos.splice(i, 1);
                }
            }
            if (this.rInfos.length == 0) {
                if (this.overFn && this.overThis) {
                    this.overFn.call(this.overThis, this.rgId, resInfo.value, resInfo.key);
                }
                this.rInfos = null;
                this.overFn = this.overThis = null;
            }
        };
        RGQueueInfo.prototype.cancel = function () {
            for (var _i = 0, _a = this.rInfos; _i < _a.length; _i++) {
                var rInfo = _a[_i];
                rInfo.removeRGInfo(this);
            }
            this.rInfos = null;
            this.overFn = this.overThis = null;
        };
        return RGQueueInfo;
    }());
    core.RGQueueInfo = RGQueueInfo;
    __reflect(RGQueueInfo.prototype, "core.RGQueueInfo");
})(core || (core = {}));
//# sourceMappingURL=RGQueueInfo.js.map