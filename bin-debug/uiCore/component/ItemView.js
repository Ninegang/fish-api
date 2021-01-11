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
     * 项视图
     * @author none
     * 因为eui引擎问题，需要在构造函数再手动设置skinName属性一次
     */
    var ItemView = (function (_super) {
        __extends(ItemView, _super);
        function ItemView() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            _this.awake();
            return _this;
        }
        ItemView.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
        };
        /**
         * 每次渲染都会调用
         */
        ItemView.prototype.onRender = function () {
        };
        ItemView.prototype.onExit = function (event) {
            if (!this.onApplicationQuit()) {
                event.preventDefault();
            }
        };
        ItemView.prototype.onResume = function (event) {
            this.onApplicationFocus();
        };
        ItemView.prototype.onPause = function (event) {
            this.onApplicationPause();
        };
        /**
         * 在应用退出之前调用，如果返回false可以阻止应用退出
         */
        ItemView.prototype.onApplicationQuit = function () {
            return true;
        };
        /**
         * 应用得到焦点
         */
        ItemView.prototype.onApplicationFocus = function () {
        };
        /**
         * 应用失去焦点
         */
        ItemView.prototype.onApplicationPause = function () {
        };
        /**
         * 按下返回键
         */
        ItemView.prototype.onBack = function () {
        };
        /**
        * 执行控制层的方法
        */
        ItemView.prototype.report = function (request) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        /**
        * 脚本初始化完成
        * */
        ItemView.prototype.awake = function () {
        };
        /**
         * 模块初始化完成
         */
        ItemView.prototype.onModuleInit = function () {
        };
        /**
         * 每帧都会调用
         */
        ItemView.prototype.update = function () {
        };
        /**
         * 当子项创建完成，推荐重写start
         */
        ItemView.prototype.childrenCreated = function () {
            this.start();
        };
        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        ItemView.prototype.onRemovedFromStage = function (event) {
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
            this.onDestroy();
        };
        /**
        * 显示对象初始化完成
        */
        ItemView.prototype.start = function () {
        };
        /**
         * 被移除的时候调用，可以当作析构函数使用，用来移除事件监听，清除引用等防止内存泄漏
         */
        ItemView.prototype.onDestroy = function () {
        };
        return ItemView;
    }(eui.ItemRenderer));
    uiCore.ItemView = ItemView;
    __reflect(ItemView.prototype, "uiCore.ItemView", ["uiCore.IBehaviour"]);
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ItemView.js.map