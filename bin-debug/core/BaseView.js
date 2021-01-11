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
     * 界面
     */
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        /**
         * 界面
         */
        function BaseView() {
            var _this = _super.call(this) || this;
            _this.enableResizeEvt = false;
            _this.isDispose = false;
            _this.autoDispose = true;
            //-------------------------------------------------------------------
            // 延时执行函数
            _this.autoTimeoutList = [];
            //---------------------------------------------------------------------------------------------
            _this.alignObjs = [];
            //------------------------------------------------------------------------------------------------------------------------------------
            _this.evtCtl = new core.EventControl();
            //------------------------------------------------------------------------------------------------------------------------------------
            _this.autoViews = [];
            _this.addEventListener(egret.Event.COMPLETE, _this.onInitExml, _this);
            return _this;
        }
        BaseView.prototype.onInitExml = function (evt) {
            this.removeEventListener(egret.Event.COMPLETE, this.onInitExml, this);
            this.initExmlOk();
        };
        /**
         * 当子项创建完成，推荐重写start
         */
        BaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.onAwake();
            this.onLastAwake();
            this.onEnable();
            this.checkLang();
            this.execAutoAlign();
            this.viewResize();
        };
        BaseView.prototype.setMouseWheel = function (wheel) {
        };
        Object.defineProperty(BaseView.prototype, "isActived", {
            /** 是否还活着 */
            get: function () {
                return !this.isDispose;
            },
            enumerable: true,
            configurable: true
        });
        //---------------------------------------------------------------------------------------------
        /** 开始游戏 */
        BaseView.prototype.onResume = function (event) {
            this.onApplicationFocus();
        };
        Object.defineProperty(BaseView.prototype, "pauseFns", {
            get: function () {
                if (!this.mPauseFns) {
                    this.mPauseFns = [];
                }
                return this.mPauseFns;
            },
            enumerable: true,
            configurable: true
        });
        /** 注册切屏回调 */
        BaseView.prototype.addPauseFn = function (fn, fnThis) {
            if (core.CoreConfig.backRun) {
                fn.call(fnThis);
            }
            else {
                this.pauseFns.push({ fn: fn, fnThis: fnThis });
            }
        };
        BaseView.prototype.removePauseFn = function (fn, fnThis) {
            for (var i = this.pauseFns.length - 1; i >= 0; i--) {
                if (this.pauseFns[i].fn == fn && this.pauseFns[i].fnThis == fnThis) {
                    this.pauseFns.splice(i, 1);
                }
            }
        };
        BaseView.prototype.clearAllPauseFn = function () {
            this.pauseFns.length = 0;
        };
        BaseView.prototype.execAllPauseFn = function () {
            for (var _i = 0, _a = this.pauseFns; _i < _a.length; _i++) {
                var fnObj = _a[_i];
                fnObj.fn.call(fnObj.fnThis);
            }
            this.pauseFns.length = 0;
        };
        //--------------------------------------------------------------
        /** 暂停游戏 */
        BaseView.prototype.onPause = function (event) {
            this.execAllPauseFn();
            this.onApplicationPause();
        };
        //------------------------------------------------------------------------------------
        /**
         * 应用得到焦点
         */
        BaseView.prototype.onApplicationFocus = function () {
        };
        /**
         * 应用失去焦点
         */
        BaseView.prototype.onApplicationPause = function () {
            this.execAllAutoTimeout();
        };
        BaseView.prototype.setAutoTimeout = function (listener, thisObject, delay) {
            var _this = this;
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var timeId = -1;
            if (core.CoreConfig.backRun) {
                listener.apply(thisObject, args);
            }
            else {
                timeId = egret.setTimeout(function () {
                    _this.clearAutoTimeout(timeId);
                    listener.apply(thisObject, args);
                }, this, delay);
                this.autoTimeoutList.push({ timeId: timeId, listener: listener, thisObj: thisObject, param: args });
            }
            return timeId;
        };
        BaseView.prototype.clearAutoTimeout = function (timeId) {
            egret.clearTimeout(timeId);
            for (var i = 0; i < this.autoTimeoutList.length; i++) {
                if (this.autoTimeoutList[i].timeId == timeId) {
                    core.ArrayUtil.removeIdx(this.autoTimeoutList, i);
                    break;
                }
            }
        };
        BaseView.prototype.execAllAutoTimeout = function () {
            if (!this.autoTimeoutList)
                return;
            for (var _i = 0, _a = this.autoTimeoutList; _i < _a.length; _i++) {
                var timeoutObj = _a[_i];
                egret.clearTimeout(timeoutObj.timeId);
                timeoutObj.listener.call(timeoutObj.thisObj, timeoutObj.param);
            }
            this.autoTimeoutList.length = 0;
        };
        BaseView.prototype.clearAllAutoTimeout = function () {
            for (var _i = 0, _a = this.autoTimeoutList; _i < _a.length; _i++) {
                var timeoutObj = _a[_i];
                egret.clearTimeout(timeoutObj.timeId);
            }
            this.autoTimeoutList.length = 0;
        };
        BaseView.prototype.addAutoAlign = function (disObj) {
            this.alignObjs.push({ x: disObj.x, y: disObj.y, disObj: disObj });
        };
        BaseView.prototype.onViewResize = function (evt) {
            this.execAutoAlign();
            this.viewResize();
        };
        BaseView.prototype.viewResize = function () {
        };
        BaseView.prototype.execAutoAlign = function () {
            var sx = this.stage.stageWidth / core.CoreConfig.STAGE_W;
            var sy = this.stage.stageHeight / core.CoreConfig.STAGE_H;
            for (var _i = 0, _a = this.alignObjs; _i < _a.length; _i++) {
                var obj = _a[_i];
                obj.disObj.x = obj.x * sx;
                obj.disObj.y = obj.y * sy;
                obj.disObj.scaleX = sx;
                obj.disObj.scaleY = sy;
            }
        };
        //---------------------------------------------------------------------------------------------
        /**  */
        BaseView.prototype.onLastAwake = function () {
        };
        /** 初始化内部皮肤完成 */
        BaseView.prototype.initExmlOk = function () {
        };
        /** 首次加载到场景初始化 */
        BaseView.prototype.onAwake = function () {
        };
        /** 在场景中显示时执行 */
        BaseView.prototype.onEnable = function () {
            if (this.isDispose == false) {
                uiCore.EventManager["_instance"].on(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
                uiCore.EventManager["_instance"].on(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
                if (this.enableResizeEvt) {
                    // ErmjGameScene.inst.stage.addEventListener(egret.Event.RESIZE, this.onViewResize, this);
                }
            }
        };
        /** 从场景中移除时执行 */
        BaseView.prototype.onDisable = function () {
            uiCore.EventManager["_instance"].off(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["_instance"].off(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
            // ErmjGameScene.inst.stage.removeEventListener(egret.Event.RESIZE, this.onViewResize, this);
        };
        /** 析构 */
        BaseView.prototype.destroy = function () {
            if (!this.isDispose) {
                this.isDispose = true;
                this.onDisable();
                this.onDestroy();
            }
        };
        /** 析构 */
        BaseView.prototype.onDestroy = function () {
            this.removeAllAutoView();
            for (var _i = 0, _a = this.autoTimeoutList; _i < _a.length; _i++) {
                var timeObj = _a[_i];
                egret.clearTimeout(timeObj.timeId);
            }
            this.autoTimeoutList = null;
            this.alignObjs = null;
            this.mPauseFns = null;
            this.removeEventListener(egret.Event.COMPLETE, this.onInitExml, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.evtCtl.removeAll();
            egret.Tween.removeTweens(this);
            // this.removeChildren();
            core.DisplayUtil.removeDisplay(this);
        };
        //----------------------------------------------------------------------------------------------
        BaseView.prototype.onAddToStage = function (evt) {
            this.onEnable();
        };
        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        BaseView.prototype.onRemovedFromStage = function (evt) {
            if (this.autoDispose) {
                this.destroy();
            }
            else {
                this.onDisable();
            }
        };
        // private onLanguageChange(evt:egret.Event):void
        // {
        //     this.checkLang();
        // }
        BaseView.prototype.checkLang = function () {
            // if (Config.LANGUAGE !== this.curLang)
            // {
            //     this.curLang = Config.LANGUAGE;
            //     this.updateLang();
            // }
        };
        /** 更新语言 */
        BaseView.prototype.updateLang = function () {
            core.UILanaguageUtil.convert(this);
        };
        BaseView.prototype.addEvt = function (target, evtType, backFn, backThis) {
            if (backThis === void 0) { backThis = null; }
            this.evtCtl.addEvtListener(target, evtType, backFn, backThis || this);
        };
        BaseView.prototype.removeEvt = function (target, evtType, backFn, backThis) {
            if (backThis === void 0) { backThis = null; }
            this.evtCtl.removeEvtListener(target, evtType, backFn, backThis);
        };
        BaseView.prototype.pushAutoView = function (view) {
            this.autoViews.push(view);
        };
        BaseView.prototype.removeAutoView = function (view) {
            view.destroy();
            var viewIdx = this.autoViews.indexOf(view);
            if (viewIdx != -1) {
                core.ArrayUtil.removeIdx(this.autoViews, viewIdx);
            }
        };
        BaseView.prototype.removeAllAutoView = function () {
            for (var _i = 0, _a = this.autoViews; _i < _a.length; _i++) {
                var view = _a[_i];
                view.destroy();
            }
            this.autoViews.length = 0;
        };
        return BaseView;
    }(eui.Component));
    core.BaseView = BaseView;
    __reflect(BaseView.prototype, "core.BaseView");
})(core || (core = {}));
//# sourceMappingURL=BaseView.js.map