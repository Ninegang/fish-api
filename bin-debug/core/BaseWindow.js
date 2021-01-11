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
var core;
(function (core) {
    /**
     * 所有窗口的基类，窗口在舞台的生命周期包括awake、openEffect、start、close、closeEffect、onDestroy这6个阶段
     */
    var BaseWindow = (function (_super) {
        __extends(BaseWindow, _super);
        //-------------------------------------------------------------------------------
        function BaseWindow() {
            var _this = _super.call(this) || this;
            /** 是否显示背景 */
            _this.showBg = true;
            /** 点击背景自动关闭 */
            _this.autoClose = true;
            /**
            * 子类重写此get函数来告诉底层本场景用到的资源组
            * 部分界面如果资源过多，需要等资源加载完成并显示到时候，就需要重写此属性并返回资源组
            * */
            _this.__resList = [];
            return _this;
        }
        Object.defineProperty(BaseWindow.prototype, "resourceList", {
            get: function () {
                return this.__resList;
            },
            enumerable: true,
            configurable: true
        });
        BaseWindow.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
            this.openEffect();
        };
        /**
        * 打开特效，子类可以继承并返回false来禁止播放打开特效
        * */
        BaseWindow.prototype.openEffect = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            this.alpha = 0.5;
            egret.Tween.get(this).
                to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, egret.Ease.cubicOut).
                call(this.onOpenScaleComplete, this);
        };
        /**
         * 当打开特效完成
         */
        BaseWindow.prototype.onOpenScaleComplete = function () {
            var _this = this;
            egret.callLater(function () {
                _this.alpha = _this.scaleX = _this.scaleY = 1;
            }, this);
        };
        /**
        * 关闭窗口
        * */
        BaseWindow.prototype.closeWindow = function () {
            uiCore.WindowManager.getInstance().closeWindow(this);
        };
        return BaseWindow;
    }(core.BaseView));
    core.BaseWindow = BaseWindow;
    __reflect(BaseWindow.prototype, "core.BaseWindow");
})(core || (core = {}));
//# sourceMappingURL=BaseWindow.js.map