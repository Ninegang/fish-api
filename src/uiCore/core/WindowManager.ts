namespace uiCore {
	/**
	 * 窗口管理器
	 */
    export class WindowManager {
        private static _instance: WindowManager;
        public constructor() {
            this.windowList = [];
            this.modalList = [];
            this.autoCloseList = [];
        }
        public static getInstance(): WindowManager {
            if (!this._instance) {
                this._instance = new WindowManager();
            }
            return this._instance;
        }
        private container: eui.Group;
        private bg: eui.Rect;
        public windowList: Array<eui.Component>;
        private modalList: Array<boolean>;
        private autoCloseList: Array<boolean>;
        /**
         * 已经打开的窗口个数
         */
        public get windowCount(): number {
            return this.windowList.length;
        }
        /**
         * 强制关闭指定类型的窗口
         * @param typeName 窗口的完全限定名 
         */
        public closeWindowByType(typeName: string): void {
            for (var i = 0; i < this.windowList.length; i++) {
                var window: uiCore.Window = <uiCore.Window>this.windowList[i];
                if (egret.is(window, typeName)) {
                    window.forceClose();
                }
            }
        }
        public init(container: eui.Group, bgAlpha: number = 0.5, bgColor: number = 0): void {
            this.container = container;
            this.bg = new eui.Rect(this.container.width, this.container.height, bgColor);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
            this.bg.left = this.bg.right = this.bg.top = this.bg.bottom = 0;
            this.bg.alpha = bgAlpha;
            this.bg.touchEnabled = true;
        }
        private onBg(event: egret.TouchEvent): void {
            var win: eui.Component = this.windowList[this.windowList.length - 1];
            if (this.autoCloseList[this.windowList.length - 1]) {
                if (win instanceof uiCore.Window) {
                    win.close();
                }
                else {
                    this.closeWindow(win);
                }
            }
        }
        public updateBg(): void {
            this.bg.scaleX = this.container.width / this.bg.width;
            this.bg.scaleY = this.container.height / this.bg.height;
        }
        public addWindow(window: eui.Component, modal: boolean = true, center: boolean = true, autoClose: boolean = false, inList: boolean = true): void {
            if (window.parent == this.container) {
                return;
            }
            if (egret.is(window, "uiCore.Window") && Application.loadClass) {
                var nextWindow: uiCore.Window = <uiCore.Window>window;
                if (nextWindow.resourceList.length && !nextWindow.isLoaded) {
                    var loadWindow: eui.Component = new Application.loadClass();
                    this.addWindow(loadWindow, false, true, false, false);
                    nextWindow.isLoaded = false;
                    var resourceLoader: uiCore.ResourceLoader = new uiCore.ResourceLoader();
                    if (nextWindow.resourceList.indexOf("preload") == -1) {
                        nextWindow.resourceList.push("preload");
                    }
                    resourceLoader.loadGroups(nextWindow.resourceList, this.onResourceComplete,
                        this, loadWindow, nextWindow, modal, center, autoClose);
                    return;
                }
            }
            if (center) {
                window.horizontalCenter = window.verticalCenter = 0;
            }
            this.container.addChild(window);
            if (inList) {
                this.windowList.push(window);
                this.modalList.push(modal);
                this.autoCloseList.push(autoClose);
                this.updateModal();
            }
        }
        private onResourceComplete(loadWindow: eui.Component, nextWindow: uiCore.Window, modal: boolean = true, center: boolean = true, autoClose: boolean = false): void {
            this.closeWindow(loadWindow);
            nextWindow.isLoaded = true;
            this.addWindow(nextWindow, modal, center, autoClose);
        }
        public closeWindow(window: eui.Component): void {
            if (!window || window.parent != this.container) {
                return;
            }
            else if (window.parent) {
                var windowIndex: number = this.windowList.indexOf(window);
                if (windowIndex != -1) {
                    this.windowList.splice(windowIndex, 1);
                    this.modalList.splice(windowIndex, 1);
                    this.autoCloseList.splice(windowIndex, 1);
                    this.updateModal();
                }
                window.parent.removeChild(window);
            }
        }
        public closeAll(): void {
            var otherChildren: eui.Component[] = [];
            for (var i = 0; i < this.windowList.length; i++) {
                var children: eui.Component = this.windowList[i];
                if (!egret.is(children, "uiCore.Alert") && !egret.is(children, "uiCore.Dialog")) {
                    otherChildren.push(children);
                }
            }
            while (otherChildren.length) {
                this.closeWindow(otherChildren.shift());
            }
        }
        public closeLast(): void {
            if (this.windowList.length > 0) {
                if (this.windowList[this.windowList.length - 1] instanceof uiCore.Alert
                    || this.windowList[this.windowList.length - 1] instanceof uiCore.Dialog) {
                    return
                }
                this.closeWindow(this.windowList[this.windowList.length - 1]);
            }
        }
        private updateModal(): void {
            if (this.windowList.length) {
                for (var i = this.windowList.length - 1; i >= 0; i--) {
                    var window: eui.Component = this.windowList[i];
                    var modal: boolean = this.modalList[i];
                    if (window && modal) {
                        if (this.bg.parent) {
                            this.container.removeChild(this.bg);
                        } else {
                            this.container.addChildAt(this.bg, this.container.numChildren - 1);
                        }
                        this.container.addChildAt(this.bg, this.container.numChildren - 2);
                        break;
                    }
                    else {
                        if (this.bg.parent) {
                            this.container.removeChild(this.bg);
                        }
                    }
                }
            }
            else {
                if (this.bg.parent) {
                    this.container.removeChild(this.bg);
                }
            }
        }
    }
}