namespace uiCore {
	/**
	 * 只带信息提示和确认按钮的弹窗组件。
	 * 可同时存在多个。
	 * @author none
	 *
	 */
    export class Alert extends uiCore.Window {
    	/**
    	 * 用来显示提示信息的文本
    	 */
        public messageLabel: uiCore.Label;

        /**
    	 * 显示标题
    	 */
        public txtTitle: uiCore.Label;
        /**
         * 确定按钮
         */
        public okButton: uiCore.Button;
        private message: string;
        private title: string;
        private buttonLable: string;
        private okHandler: Function;
        private thisObject: any;
        public constructor(message: string, title: string, buttonLable: string, okHandler?: Function, thisObject?: any, autoClose?: boolean) {
            super();
            this.skinName = uiCore.Alert.skinName;
            this.message = message;
            this.title = title;
            this.buttonLable = buttonLable;
            this.okHandler = okHandler;
            this.thisObject = thisObject;
        }
        public childrenCreated(): void {
            if (this.txtTitle)
                this.txtTitle.text = this.title;
            // this.okButton.label = this.buttonLable || this.okButton.label;
            this.okButton.label = uiCore.LangUtils.getMsgById(21);
            this.messageLabel.textFlow = uiCore.StringUtils.textToRichText(this.message);
            this.okButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
        }
        private onOKButton(event: egret.TouchEvent): void {
            this.okButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButton, this);
            Application.closeWindow(this);
            if (this.okHandler) {
                this.okHandler.apply(this.thisObject);
            }
        }
        private static skinName: any;
        /**
         * ALERT的标题
         */
        public static titleString: string;
        /**
         * ALERT的按钮文字
         */
        public static buttonLableString: string;
        /**
         * 初始化弹窗，在游戏启动的时候调用
         * @param skinName {string} 弹窗皮肤
         */
        public static init(skinName: any): void {
            this.skinName = skinName;
        }
        /**
         * 显示一个弹窗
         * @param message {string} 提示文字
         * @param okHandler {Function} 按下确定按钮执行的方法
         * @param thisObject {any} 按下确定按钮执行的方法的上下文
         * @returns {uiCore.Alert} 弹窗的实例
         */
        public static show(message: string, okHandler?: Function, thisObject?: any, title?: string, buttonLable?: string, autoClose: boolean = false): uiCore.Alert {
            var windowList: Array<eui.Component> = uiCore.WindowManager.getInstance().windowList;
            for (var i = 0; i < windowList.length; i++) {
                if (windowList[i] instanceof uiCore.Alert) {
                    var alert: uiCore.Alert = <uiCore.Alert>windowList[i];
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
            var alert: uiCore.Alert = new uiCore.Alert(message, title, buttonLable, okHandler, thisObject, autoClose);
            Application.addWindow(alert, true, true, autoClose);
            return alert;
        }
    }
}
