var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var uiCore;
(function (uiCore) {
    /**
     * 只带信息提示和确认按钮的弹窗组件。
     * 可同时存在多个。
     * @author none
     *
     */
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert(message, title, buttonLable, okHandler, thisObject, autoClose) {
            var _this = _super.call(this) || this;
            _this.skinName = uiCore.Alert.skinName;
            _this.message = message;
            _this.title = title;
            _this.buttonLable = buttonLable;
            _this.okHandler = okHandler;
            _this.thisObject = thisObject;
            return _this;
        }
        Alert.prototype.childrenCreated = function () {
            if (this.txtTitle)
                this.txtTitle.text = this.title;
            // this.okButton.label = this.buttonLable || this.okButton.label;
            this.okButton.label = uiCore.LangUtils.getMsgById(21);
            this.messageLabel.textFlow = uiCore.StringUtils.textToRichText(this.message);
            this.okButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
        };
        Alert.prototype.onOKButton = function (event) {
            this.okButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
            uiCore.Application.closeWindow(this);
            if (this.okHandler) {
                this.okHandler.apply(this.thisObject);
            }
        };
        /**
         * 初始化弹窗，在游戏启动的时候调用
         * @param skinName {string} 弹窗皮肤
         */
        Alert.init = function (skinName) {
            this.skinName = skinName;
        };
        /**
         * 显示一个弹窗
         * @param message {string} 提示文字
         * @param okHandler {Function} 按下确定按钮执行的方法
         * @param thisObject {any} 按下确定按钮执行的方法的上下文
         * @returns {uiCore.Alert} 弹窗的实例
         */
        Alert.show = function (message, okHandler, thisObject, title, buttonLable, autoClose) {
            if (autoClose === void 0) { autoClose = false; }
            var windowList = uiCore.WindowManager.getInstance().windowList;
            for (var i = 0; i < windowList.length; i++) {
                if (windowList[i] instanceof uiCore.Alert) {
                    var alert = windowList[i];
                    if (alert.messageLabel.text == message) {
                        return alert;
                    }
                }
            }
            title = title || uiCore.Alert.titleString;
            buttonLable = buttonLable || uiCore.Alert.buttonLableString;
            if (!this.skinName) {
                warn("Alert弹窗未初始化，将不会被显示，请先调用uiCore.Alert.init()。");
            }
            var alert = new uiCore.Alert(message, title, buttonLable, okHandler, thisObject, autoClose);
            uiCore.Application.addWindow(alert, true, true, autoClose);
            return alert;
        };
        return Alert;
    }(uiCore.Window));
    uiCore.Alert = Alert;
    __reflect(Alert.prototype, "uiCore.Alert");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Alert.js.map