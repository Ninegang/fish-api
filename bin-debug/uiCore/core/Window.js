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
     * 所有窗口的基类，窗口在舞台的生命周期包括awake、openEffect、start、close、closeEffect、onDestroy这6个阶段
     * @author none
     *
     */
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            return _super.call(this) || this;
        }
        /**
         * 当添加到舞台时
         * @param event 事件对象
         */
        Window.prototype.onAddedToStage = function (event) {
            _super.prototype.onAddedToStage.call(this, event);
            uiCore.EventManager["getInstance"]().dispatchEvent(uiCore.Application.APPEVENT_WINDOW_OPEN, this);
            // uiCore.SoundManager.playEffect("window_open_mp3");
        };
        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        Window.prototype.onRemovedFromStage = function (event) {
            _super.prototype.onRemovedFromStage.call(this, event);
            uiCore.EventManager["getInstance"]().dispatchEvent(uiCore.Application.APPEVENT_WINDOW_CLOSE, this);
            // uiCore.SoundManager.playEffect("window_close_mp3");
        };
        /**
         * 当子项创建完成，推荐重写start
         */
        Window.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.window = this.numChildren > 0 ? this.getChildAt(0) : null;
            if (this.window && this.window["_closeButton"]) {
                this.window["_closeButton"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButton, this);
            }
        };
        /**
        * 打开特效，子类可以继承并返回false来禁止播放打开特效
        * */
        Window.prototype.openEffect = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            this.alpha = 0.5;
            egret.Tween.get(this).
                to({ scaleX: 1, scaleY: 1, alpha: 1 }, 100).
                // to({ scaleX: 1.05, scaleY: 1.05 }, 100).
                // to({ scaleX: 0.95, scaleY: 0.95 }, 100).
                // to({ scaleX: 1, scaleY: 1 }, 100).
                call(this.onOpenScaleComplete, this);
            // this.scaleX = 0.9;
            // this.scaleY = 0.9;
            // this.alpha = 1;
            // new uiCore.behaviour.Tween(this, 200, {
            //     scaleY: 1, scaleX: 1, alpha: 1, onComplete: this.onOpenScaleComplete, thisObject: this
            // }).exec();
            return true;
        };
        /**
        * 关闭窗口
        * */
        Window.prototype.close = function () {
            if (!this.closeEffect()) {
                uiCore.Application.closeWindow(this);
            }
        };
        /**
         * 强制关闭窗口
         */
        Window.prototype.forceClose = function () {
            uiCore.Application.closeWindow(this);
        };
        /**
        * 关闭特效，子类可以继承并返回null来禁止播放关闭特效
        * */
        Window.prototype.closeEffect = function () {
            egret.Tween.get(this).to({ scaleY: 0.9, scaleX: 0.9, alpha: 1 }, 200).call(this.onCloseScaleComplete, this);
            return true;
        };
        /**
         * 当打开特效完成
         */
        Window.prototype.onOpenScaleComplete = function () {
            var _this = this;
            egret.callLater(function () {
                _this.alpha = _this.scaleX = _this.scaleY = 1;
            }, this);
        };
        /**
         * 当关闭特效完成
         */
        Window.prototype.onCloseScaleComplete = function () {
            uiCore.Application.closeWindow(this);
        };
        /*
         *按下关闭按钮
         * */
        Window.prototype.onCloseButton = function () {
            this.close();
        };
        return Window;
    }(uiCore.View));
    uiCore.Window = Window;
    __reflect(Window.prototype, "uiCore.Window");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Window.js.map