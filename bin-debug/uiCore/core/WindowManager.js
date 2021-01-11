var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 窗口管理器
     */
    var WindowManager = (function () {
        function WindowManager() {
            this.windowList = [];
            this.modalList = [];
            this.autoCloseList = [];
        }
        WindowManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new WindowManager();
            }
            return this._instance;
        };
        Object.defineProperty(WindowManager.prototype, "windowCount", {
            /**
             * 已经打开的窗口个数
             */
            get: function () {
                return this.windowList.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 强制关闭指定类型的窗口
         * @param typeName 窗口的完全限定名
         */
        WindowManager.prototype.closeWindowByType = function (typeName) {
            for (var i = 0; i < this.windowList.length; i++) {
                var window = this.windowList[i];
                if (egret.is(window, typeName)) {
                    window.forceClose();
                }
            }
        };
        WindowManager.prototype.init = function (container, bgAlpha, bgColor) {
            if (bgAlpha === void 0) { bgAlpha = 0.5; }
            if (bgColor === void 0) { bgColor = 0; }
            this.container = container;
            this.bg = new eui.Rect(this.container.width, this.container.height, bgColor);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
            this.bg.left = this.bg.right = this.bg.top = this.bg.bottom = 0;
            this.bg.alpha = bgAlpha;
            this.bg.touchEnabled = true;
        };
        WindowManager.prototype.onBg = function (event) {
            var win = this.windowList[this.windowList.length - 1];
            if (this.autoCloseList[this.windowList.length - 1]) {
                if (win instanceof uiCore.Window) {
                    win.close();
                }
                else {
                    this.closeWindow(win);
                }
            }
        };
        WindowManager.prototype.updateBg = function () {
            this.bg.scaleX = this.container.width / this.bg.width;
            this.bg.scaleY = this.container.height / this.bg.height;
        };
        WindowManager.prototype.addWindow = function (window, modal, center, autoClose, inList) {
            if (modal === void 0) { modal = true; }
            if (center === void 0) { center = true; }
            if (autoClose === void 0) { autoClose = false; }
            if (inList === void 0) { inList = true; }
            if (window.parent == this.container) {
                return;
            }
            if (egret.is(window, "uiCore.Window") && uiCore.Application.loadClass) {
                var nextWindow = window;
                if (nextWindow.resourceList.length && !nextWindow.isLoaded) {
                    var loadWindow = new uiCore.Application.loadClass();
                    this.addWindow(loadWindow, false, true, false, false);
                    nextWindow.isLoaded = false;
                    var resourceLoader = new uiCore.ResourceLoader();
                    if (nextWindow.resourceList.indexOf("preload") == -1) {
                        nextWindow.resourceList.push("preload");
                    }
                    resourceLoader.loadGroups(nextWindow.resourceList, this.onResourceComplete, this, loadWindow, nextWindow, modal, center, autoClose);
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
        };
        WindowManager.prototype.onResourceComplete = function (loadWindow, nextWindow, modal, center, autoClose) {
            if (modal === void 0) { modal = true; }
            if (center === void 0) { center = true; }
            if (autoClose === void 0) { autoClose = false; }
            this.closeWindow(loadWindow);
            nextWindow.isLoaded = true;
            this.addWindow(nextWindow, modal, center, autoClose);
        };
        WindowManager.prototype.closeWindow = function (window) {
            if (!window || window.parent != this.container) {
                return;
            }
            else if (window.parent) {
                var windowIndex = this.windowList.indexOf(window);
                if (windowIndex != -1) {
                    this.windowList.splice(windowIndex, 1);
                    this.modalList.splice(windowIndex, 1);
                    this.autoCloseList.splice(windowIndex, 1);
                    this.updateModal();
                }
                window.parent.removeChild(window);
            }
        };
        WindowManager.prototype.closeAll = function () {
            var otherChildren = [];
            for (var i = 0; i < this.windowList.length; i++) {
                var children = this.windowList[i];
                if (!egret.is(children, "uiCore.Alert") && !egret.is(children, "uiCore.Dialog")) {
                    otherChildren.push(children);
                }
            }
            while (otherChildren.length) {
                this.closeWindow(otherChildren.shift());
            }
        };
        WindowManager.prototype.closeLast = function () {
            if (this.windowList.length > 0) {
                if (this.windowList[this.windowList.length - 1] instanceof uiCore.Alert
                    || this.windowList[this.windowList.length - 1] instanceof uiCore.Dialog) {
                    return;
                }
                this.closeWindow(this.windowList[this.windowList.length - 1]);
            }
        };
        WindowManager.prototype.updateModal = function () {
            if (this.windowList.length) {
                for (var i = this.windowList.length - 1; i >= 0; i--) {
                    var window = this.windowList[i];
                    var modal = this.modalList[i];
                    if (window && modal) {
                        if (this.bg.parent) {
                            this.container.removeChild(this.bg);
                        }
                        else {
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
        };
        return WindowManager;
    }());
    uiCore.WindowManager = WindowManager;
    __reflect(WindowManager.prototype, "uiCore.WindowManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=WindowManager.js.map