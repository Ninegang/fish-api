var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 全局事件管理器，可以抛出、监听全局事件，只允许底层框架内部使用
     * @author none
     *
     */
    var EventManager = (function () {
        function EventManager() {
            this.dispatcher = new egret.EventDispatcher();
        }
        /**
         * 获取事件管理器的唯一实例
         */
        EventManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new EventManager();
            }
            return this._instance;
        };
        /**
         * 抛出事件
         */
        EventManager.prototype.dispatch = function (event) {
            return this.dispatcher.dispatchEvent(event);
        };
        /**
         * 抛出事件
         *
         */
        EventManager.prototype.dispatchEvent = function (type, data) {
            if (data === void 0) { data = null; }
            return this.dispatcher.dispatchEventWith(type, false, data);
        };
        /**
         * 添加事件监听
         */
        EventManager.prototype.addEventListener = function (type, func, thisObject) {
            this.dispatcher.addEventListener(type, func, thisObject);
        };
        /**
         * 添加事件监听
         */
        EventManager.prototype.on = function (type, func, thisObject) {
            this.addEventListener(type, func, thisObject);
        };
        /**
         * 执行1次就自动移除的监听
         */
        EventManager.prototype.once = function (type, func, thisObject) {
            this.dispatcher.once(type, func, thisObject);
        };
        /**
        * 取消事件监听
        */
        EventManager.prototype.off = function (type, func, thisObject) {
            this.removeEventListener(type, func, thisObject);
        };
        /**
         * 取消事件监听
         */
        EventManager.prototype.removeEventListener = function (type, func, thisObject) {
            this.dispatcher.removeEventListener(type, func, thisObject);
        };
        return EventManager;
    }());
    uiCore.EventManager = EventManager;
    __reflect(EventManager.prototype, "uiCore.EventManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=EventManager.js.map