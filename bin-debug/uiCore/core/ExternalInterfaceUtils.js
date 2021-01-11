var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var ExternalInterfaceUtils = (function () {
        function ExternalInterfaceUtils() {
        }
        ExternalInterfaceUtils.init = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                document.addEventListener('visibilitychange', function () {
                    if (document.hidden) {
                        ExternalInterfaceUtils.onPause();
                    }
                    else {
                        ExternalInterfaceUtils.onResume();
                    }
                });
            }
            else if (egret.Capabilities.isMobile) {
                egret.lifecycle.onPause = function () {
                    ExternalInterfaceUtils.onPause();
                };
                egret.lifecycle.onResume = function () {
                    ExternalInterfaceUtils.onResume();
                };
            }
        };
        ExternalInterfaceUtils.onResume = function () {
            this.inGame = true;
            uiCore.EventManager["getInstance"]().dispatchEvent(uiCore.Application.APPEVENT_RESUME);
        };
        ExternalInterfaceUtils.onPause = function () {
            this.inGame = false;
            uiCore.EventManager["getInstance"]().dispatchEvent(uiCore.Application.APPEVENT_PAUSE);
        };
        ExternalInterfaceUtils.inGame = true;
        return ExternalInterfaceUtils;
    }());
    uiCore.ExternalInterfaceUtils = ExternalInterfaceUtils;
    __reflect(ExternalInterfaceUtils.prototype, "uiCore.ExternalInterfaceUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ExternalInterfaceUtils.js.map