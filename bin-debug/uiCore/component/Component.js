var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * how组件工具类
     */
    var ComponentUtils = (function () {
        /**
         * how组件工具类，提供批量初始化组件功能
         */
        function ComponentUtils() {
        }
        /**
         * 初始化how组件
         */
        ComponentUtils.init = function (alertSkin, dialogSkin, bannerSkin, loaddingSkin, callBack, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            uiCore.Alert.init(alertSkin);
            uiCore.Dialog.init(dialogSkin);
            uiCore.Banner.init(bannerSkin);
            uiCore.Loadding.init(loaddingSkin);
            if (callBack)
                callBack.apply(thisObject);
        };
        return ComponentUtils;
    }());
    uiCore.ComponentUtils = ComponentUtils;
    __reflect(ComponentUtils.prototype, "uiCore.ComponentUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Component.js.map