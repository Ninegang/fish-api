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
    * 资源加载类，加载一批资源组
    * @author none
    *
    */
    var ResourceLoader = (function (_super) {
        __extends(ResourceLoader, _super);
        function ResourceLoader() {
            var _this = _super.call(this) || this;
            //资源加载
            _this.totalNumber = 1;
            _this.currentNumber = 0;
            _this.groupNumber = 1;
            _this.currentGroup = 0;
            _this.currentGroupName = "";
            return _this;
        }
        /**
         * 开始加载资源组
         * @param groups 资源组名称列表
         * @param onComplete 所有资源加载完成的回调
         * @param thisObject 回调方法的执行上下文
         * @param args 回调方法参数
         */
        ResourceLoader.prototype.loadGroups = function (groups, onComplete, thisObject) {
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.groups = groups;
            this.onComplete = onComplete;
            this.thisObject = thisObject;
            this.args = args;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.currentGroup = 0;
            this.groupNumber = groups.length == 0 ? 1 : groups.length;
            this.loadGroup();
        };
        ResourceLoader.prototype.loadGroup = function () {
            if (this.groups && this.groups.length > 0) {
                var loadGroup = this.groups.shift();
                if (!RES.isGroupLoaded(loadGroup)) {
                    RES.loadGroup(loadGroup, 100);
                }
                else {
                    // trace("资源[" + loadGroup + "]:已经存在，无需加载");
                    this.loadGroup();
                }
            }
            else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onAllGroupComplete();
            }
        };
        /**
        * 资源组加载出错
        */
        ResourceLoader.prototype.onResourceLoadError = function (event) {
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
            this.dispatchEvent(event);
        };
        /**
        * 资源组加载进度
        */
        ResourceLoader.prototype.onResourceProgress = function (event) {
            if (event.resItem.name.lastIndexOf("_zip") >= 0) {
                uiCore.ZipManager.zipResourceProgress(event.resItem.name);
            }
            if (this.currentGroupName != event.groupName) {
                this.currentNumber = this.totalNumber;
                this.totalNumber += event.itemsTotal;
                this.currentGroupName = event.groupName;
                this.currentGroup++;
                this.currentGroup = this.currentGroup > this.groupNumber ? this.groupNumber : this.currentGroup;
            }
            var percent = (event.itemsLoaded + this.currentNumber) * this.currentGroup * 100 / (this.totalNumber * this.groupNumber);
            uiCore.Application.loadUI && uiCore.Application.loadUI["onLoaddingProgress"] && uiCore.Application.loadUI["onLoaddingProgress"](Math.ceil(percent));
        };
        /**
        * 资源组加载完成
        */
        ResourceLoader.prototype.onResourceLoadComplete = function (event) {
            trace("资源[" + event.groupName + "]:加载完成");
            this.dispatchEvent(event);
            this.loadGroup();
        };
        /**
         * 所有组资源加载完成
         */
        ResourceLoader.prototype.onAllGroupComplete = function () {
            if (this.onComplete) {
                this.onComplete.apply(this.thisObject, this.args);
            }
            this.dispatchEventWith(egret.Event.COMPLETE);
            this.onComplete = null;
            this.thisObject = null;
            this.args = null;
            this.groups = null;
        };
        /**
         * 清除引用
         */
        ResourceLoader.prototype.destroy = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        };
        return ResourceLoader;
    }(egret.EventDispatcher));
    uiCore.ResourceLoader = ResourceLoader;
    __reflect(ResourceLoader.prototype, "uiCore.ResourceLoader");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ResourceLoader.js.map