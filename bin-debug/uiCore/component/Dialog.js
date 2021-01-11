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
     * 带信息提示、确认按钮和取消按钮的对话框组件。
     * 可同时存在多个。
     * @author none
     *
     */
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog(message, title, buttonLable, okHandler, cancelHandler, thisObject) {
            var _this = _super.call(this) || this;
            _this.skinName = uiCore.Dialog.skinName;
            _this.message = message;
            _this.title = title;
            _this.buttonLable = buttonLable;
            _this.okHandler = okHandler;
            _this.cancelHandler = cancelHandler;
            _this.thisObject = thisObject;
            return _this;
        }
        Dialog.prototype.childrenCreated = function () {
            if (this.txtTitle)
                this.txtTitle.text = this.title;
            var arrBtnLabel = this.buttonLable ? this.buttonLable.split("|") : [];
            // this.okButton.label = this.okButton.label || this.buttonLable;
            // this.cancelButton.label = this.cancelButton.label || this.buttonLable;
            this.okButton.label = uiCore.LangUtils.getMsgById(21) || this.buttonLable;
            this.cancelButton.label = uiCore.LangUtils.getMsgById(22) || this.buttonLable;
            this.messageLabel.textFlow = uiCore.StringUtils.textToRichText(this.message);
            this.okButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
            this.cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelButton, this);
        };
        Dialog.prototype.onOKButton = function (event) {
            this.okButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
            uiCore.Application.closeWindow(this);
            if (this.okHandler) {
                this.okHandler.apply(this.thisObject);
            }
        };
        Dialog.prototype.onCancelButton = function (event) {
            this.cancelButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelButton, this);
            uiCore.Application.closeWindow(this);
            if (this.cancelHandler) {
                this.cancelHandler.apply(this.thisObject);
            }
        };
        /**
         * 初始化对话框，在游戏启动的时候调用
         * @param skinName {string} 弹窗皮肤
         */
        Dialog.init = function (skinName) {
            this.skinName = skinName;
        };
        /**
         * 显示一个对话框
         * @param message {string} 提示文字
         * @param okHandler {Function} 按下确定按钮执行的方法
         * @param cancelHandler {Function} 按下取消按钮执行的方法
         * @param thisObject {any} 按下按钮执行的方法的上下文
         * @returns {uiCore.Dialog} 对话框的实例
         */
        Dialog.show = function (message, okHandler, cancelHandler, thisObject, title, buttonLable) {
            var windowList = uiCore.WindowManager.getInstance().windowList;
            for (var i = 0; i < windowList.length; i++) {
                if (windowList[i] instanceof uiCore.Dialog) {
                    var dialog = windowList[i];
                    if (dialog.messageLabel.text == message) {
                        return dialog;
                    }
                }
            }
            title = title || uiCore.Dialog.titleString;
            // buttonLable = buttonLable || uiCore.Dialog.buttonLableString;
            if (!this.skinName) {
                warn("Dialog弹窗未初始化，将不会被显示，请先调用uiCore.Dialog.init()。");
            }
            var dialog = new uiCore.Dialog(message, title, buttonLable, okHandler, cancelHandler, thisObject);
            uiCore.Application.addWindow(dialog);
            return dialog;
        };
        return Dialog;
    }(uiCore.Window));
    uiCore.Dialog = Dialog;
    __reflect(Dialog.prototype, "uiCore.Dialog");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Dialog.js.map