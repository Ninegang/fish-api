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
     * 界面
     * @author none
     *
     */
    var View = (function (_super) {
        __extends(View, _super);
        /**
         * 界面
         */
        function View() {
            var _this = _super.call(this) || this;
            /**
             * 界面所需资源是否加载完成
             */
            _this.isLoaded = false;
            /**
             * 用于中间层验证，如果有视图中间层，请在其构造中把他的类路径push进来，否则会有个警告产生
             * 例如： this.baseClasses.push("base.View")
             */
            _this.baseClasses = ["uiCore.Window", "uiCore.Scene"];
            /*************************************************动画 定时器 管理*********************************************/
            _this.effectList = [];
            _this.timeList = [];
            _this.intervalList = [];
            _this.animationList = [];
            _this.animatorList = [];
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            _this.awake();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            return _this;
        }
        Object.defineProperty(View.prototype, "resourceList", {
            /**
            * 子类重写此get函数来告诉底层本场景用到的资源组
            * 部分界面如果资源过多，需要等资源加载完成并显示到时候，就需要重写此属性并返回资源组
            * */
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 当添加到舞台时
         * @param event 事件对象
         */
        View.prototype.onAddedToStage = function (event) {
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        };
        /**
         * 查找某个容器所有的子孙控件
         * @param parent 父容器
         * @param result 查询结果
         */
        View.prototype.findChildren = function (parent, result) {
            if (result === void 0) { result = []; }
            for (var i = 0; i < parent.numChildren; i++) {
                var child = parent.getChildAt(i);
                result.push(child);
                if (egret.is(child, "egret.DisplayObjectContainer")) {
                    this.findChildren(child, result);
                }
            }
            return result;
        };
        /**
         * 每次渲染都会调用
         */
        View.prototype.onRender = function () {
        };
        /**
         * 拉伸UI至铺满舞台
         */
        View.prototype.stretch = function () {
            this.left = this.right = this.top = this.bottom = 0;
        };
        View.prototype.onExit = function (event) {
            if (!this.onApplicationQuit()) {
                event.preventDefault();
            }
        };
        View.prototype.onResume = function (event) {
            this.onApplicationFocus();
        };
        View.prototype.onPause = function (event) {
            this.onApplicationPause();
        };
        /**
         * 在应用退出之前调用，如果返回false可以阻止应用退出
         */
        View.prototype.onApplicationQuit = function () {
            return true;
        };
        /**
         * 应用得到焦点
         */
        View.prototype.onApplicationFocus = function () {
            this.removeAllAnimation();
            this.removeAllEffectList();
            this.removeAllTimeList();
            this.removeAllIntervalList();
        };
        /**
         * 应用失去焦点
         */
        View.prototype.onApplicationPause = function () {
        };
        /**
         * 按下返回键
         */
        View.prototype.onBack = function () {
        };
        /**
        * 脚本初始化完成
        * */
        View.prototype.awake = function () {
        };
        /**
         * 模块初始化完成
         */
        View.prototype.onModuleInit = function () {
        };
        /**
         * 每帧都会调用
         */
        View.prototype.update = function () {
        };
        /**
         * 当子项创建完成，推荐重写start
         */
        View.prototype.childrenCreated = function () {
            this.dispatchEventWith("childrenCreated");
            this.start();
        };
        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        View.prototype.onRemovedFromStage = function (event) {
            this.destroyResources();
            egret.Tween.removeTweens(this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
            this.onDestroy();
        };
        /**
         * 销毁所用资源，由resourceList指定
         */
        View.prototype.destroyResources = function () {
        };
        /**
        * 显示对象初始化完成
        */
        View.prototype.start = function () {
        };
        /**
         * 被移除的时候调用，可以当作析构函数使用，用来移除事件监听，清除引用等防止内存泄漏
         */
        View.prototype.onDestroy = function () {
        };
        View.prototype.pushAnimation = function (name) {
            this.deleteAnimation(name);
            if (this.animationList.indexOf(name) < 0) {
                this.animationList.push(name);
            }
        };
        View.prototype.deleteAnimation = function (name) {
            var index = this.animationList.indexOf(name);
            if (index > -1) {
                this[name].stop();
                this[name].visible = false;
                this[name].source = "";
                this.animationList.splice(index, 1);
            }
        };
        View.prototype.removeAllAnimation = function () {
            for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
                this[list[i]].stop();
                this[list[i]].visible = false;
            }
            this.animationList = [];
        };
        View.prototype.pushTimeList = function (name) {
            this.deleteTimeList(name);
            if (this.timeList.indexOf(name) < 0) {
                this.timeList.push(name);
            }
        };
        View.prototype.deleteTimeList = function (name) {
            var index = this.timeList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.clearTimeout(this[name]);
                    this[name] = -1;
                }
                this.timeList.splice(index, 1);
            }
        };
        View.prototype.removeAllTimeList = function () {
            for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.clearTimeout(this[list[i]]);
                    this[list[i]] = -1;
                }
            }
            this.timeList = [];
        };
        View.prototype.pushIntervalList = function (name) {
            this.deleteIntervalList(name);
            if (this.intervalList.indexOf(name) < 0) {
                this.intervalList.push(name);
            }
        };
        View.prototype.deleteIntervalList = function (name) {
            var index = this.intervalList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.clearInterval(this[name]);
                    this[name] = -1;
                }
                this.intervalList.splice(index, 1);
            }
        };
        View.prototype.removeAllIntervalList = function () {
            for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.clearInterval(this[list[i]]);
                    this[list[i]] = -1;
                }
            }
            this.intervalList = [];
        };
        View.prototype.pushEffectList = function (name) {
            this.deleteEffectList(name);
            if (this.effectList.indexOf(name) < 0) {
                this.effectList.push(name);
            }
        };
        View.prototype.deleteEffectList = function (name) {
            var index = this.effectList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.Tween.removeTweens(this[name]);
                }
                this.effectList.splice(index, 1);
            }
        };
        View.prototype.removeAllEffectList = function () {
            for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.Tween.removeTweens(this[list[i]]);
                }
            }
            this.effectList = [];
        };
        // 龙骨动画
        View.prototype.pushAnimator = function (animator) {
            this.deleAnimator(animator);
            if (this.animatorList.indexOf(animator) < 0) {
                this.animatorList.push(animator);
            }
        };
        // 
        View.prototype.deleAnimator = function (animator) {
            var idx = this.animatorList.indexOf(animator);
            if (idx > -1) {
                if (!!this[animator]) {
                    animator.parent && animator.parent.removeChild();
                }
                this.animatorList.splice(idx, 1);
            }
        };
        View.prototype.removeAllAnimator = function () {
            var len = this.animatorList.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var name = this.animatorList[i];
                    if (!!this[name]) {
                        this.removeChild(this[name]);
                    }
                }
            }
            this.animatorList = [];
        };
        return View;
    }(eui.Component));
    uiCore.View = View;
    __reflect(View.prototype, "uiCore.View", ["uiCore.IBehaviour"]);
})(uiCore || (uiCore = {}));
//# sourceMappingURL=View.js.map