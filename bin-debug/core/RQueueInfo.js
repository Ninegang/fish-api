var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var RQueueInfo = (function () {
        function RQueueInfo() {
            this.rgInfos = [];
            /** 优化权限（大的优化加载 */
            this.priority = -99999999;
        }
        RQueueInfo.prototype.loadOk = function (value, key) {
            this.value = value;
            this.key = key;
            for (var _i = 0, _a = this.rgInfos; _i < _a.length; _i++) {
                var rgInfo = _a[_i];
                rgInfo.removeResInfo(this);
            }
            this.rgInfos.length = null;
        };
        RQueueInfo.prototype.removeRGInfo = function (rgInfo) {
            var trgInfo;
            for (var i = this.rgInfos.length - 1; i >= 0; i--) {
                if (this.rgInfos[i] == rgInfo) {
                    this.rgInfos.splice(i, 1);
                    break;
                }
            }
        };
        return RQueueInfo;
    }());
    core.RQueueInfo = RQueueInfo;
    __reflect(RQueueInfo.prototype, "core.RQueueInfo");
})(core || (core = {}));
//# sourceMappingURL=RQueueInfo.js.map