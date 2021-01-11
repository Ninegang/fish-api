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
     * 游戏入口类的基类
     */
    var BaseMain = (function (_super) {
        __extends(BaseMain, _super);
        /**
         * 游戏入口的基类
         * @param loadingClass 初始加载界面的类
         * @param resource 资源配置路径
         * @param resourceUrl 资源地址
         * @param indexGroups 初始加载所需资源
         * @param windowLoadingClass 运行时新界面的资源加载条的类
         */
        function BaseMain(loadingClass, resource, resourceUrl, themePath, indexGroups, windowLoadingClass) {
            if (resource === void 0) { resource = "default_zh.res.json"; }
            if (resourceUrl === void 0) { resourceUrl = "resource/"; }
            if (themePath === void 0) { themePath = "default.thm.json"; }
            if (indexGroups === void 0) { indexGroups = []; }
            if (windowLoadingClass === void 0) { windowLoadingClass = null; }
            var _this = _super.call(this) || this;
            _this.current = 1;
            _this.appLoadingClass = loadingClass;
            _this.indexGroups = indexGroups;
            _this.resource = resource;
            _this.resourceUrl = resourceUrl;
            _this.windowLoadingClass = windowLoadingClass;
            _this.total = indexGroups.length;
            _this.themePath = resourceUrl + themePath;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._onAddToStage, _this);
            uiCore.EventManager["getInstance"]().addEventListener(uiCore.Application.APPEVENT_PAUSE, _this.onPause, _this); //失去焦点
            uiCore.EventManager["getInstance"]().addEventListener(uiCore.Application.APPEVENT_RESUME, _this.onResume, _this); //获得焦点
            return _this;
        }
        Object.defineProperty(BaseMain.prototype, "loadingUI", {
            /**
             * 用来显示进度的UI
             */
            get: function () {
                return this.loadingView;
            },
            enumerable: true,
            configurable: true
        });
        BaseMain.prototype.onRender = function () {
        };
        BaseMain.prototype.onExit = function (event) {
            if (!this.onApplicationQuit()) {
                event.preventDefault();
            }
        };
        BaseMain.prototype.onResume = function (event) {
            this.onApplicationFocus();
        };
        BaseMain.prototype.onPause = function (event) {
            this.onApplicationPause();
        };
        BaseMain.prototype.onApplicationQuit = function () {
            return true;
        };
        //获得焦点
        BaseMain.prototype.onApplicationFocus = function () {
            uiCore.SoundByteManager.onAppResume();
        };
        //失去焦点
        BaseMain.prototype.onApplicationPause = function () {
            if (FishGameController.getGameView() != null) {
                FishGameController.getGameView().ReconnectAllFish();
            }
            uiCore.SoundByteManager.onAppPause();
        };
        BaseMain.prototype.awake = function () {
        };
        BaseMain.prototype.update = function () {
        };
        BaseMain.prototype.onDestroy = function () {
        };
        BaseMain.prototype._onAddToStage = function (event) {
            uiCore.Application.init(this, this.windowLoadingClass);
            //注入自定义的素材解析器
            uiCore.Application.assetAdapter = new AssetAdapter();
            this.stage.registerImplementation("eui.IAssetAdapter", uiCore.Application.assetAdapter);
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig('resource/' + this.resource, "resource/");
        };
        BaseMain.prototype.onLoadingComplete = function (event) {
            if (this.loadingView) {
                this.loadingView.removeEventListener(egret.Event.COMPLETE, this.onLoadingComplete, this);
            }
            this.init();
            this.awake();
        };
        /**
         * 开始初始化
         */
        BaseMain.prototype.init = function () {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.loadGroup();
        };
        /**
        * 配置文件加载完成,开始预加载preload资源组。
        */
        BaseMain.prototype.onConfigComplete = function (event) {
            if (this.appLoadingClass) {
                this.loadingView = new this.appLoadingClass();
                this.loadingView.addEventListener(egret.Event.COMPLETE, this.onLoadingComplete, this);
                this.addChildAt(this.loadingView, 0);
            }
            else {
                this.onLoadingComplete(null);
            }
        };
        /**
        * 资源组加载出错
        * Resource group loading failed
        */
        BaseMain.prototype.onResourceLoadError = function (event) {
            this.onLoaddingError(event);
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        };
        BaseMain.prototype.loadGroup = function () {
            if (this.indexGroups.length > 0) {
                var loadGroup = this.indexGroups.shift();
                this.onLoadGroupReady(loadGroup);
                RES.loadGroup(loadGroup);
            }
            else {
                this.onAllGroupComplete();
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                var theme = new eui.Theme(this.themePath, this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            }
        };
        /**
         * 所有组资源加载完成
         */
        BaseMain.prototype.onAllGroupComplete = function () {
        };
        /**
         * 主题文件加载完成
         */
        BaseMain.prototype.onThemeLoadComplete = function () {
            this.start();
        };
        /**
         * 移除进度条
         */
        BaseMain.prototype.removeLoadding = function () {
            if (this.loadingView) {
                this.removeChild(this.loadingView);
                this.loadingView = null;
            }
        };
        /**
         * 子类继承获取准备加载下一个组
         */
        BaseMain.prototype.onLoadGroupReady = function (groupName) {
            trace("资源[" + groupName + "]:准备加载");
        };
        /**
        * 子类继承获取组加载完成
        */
        BaseMain.prototype.onLoadGroupComplete = function (event) {
            trace("资源[" + event.groupName + "]:加载完成");
        };
        /**
        * preload资源组加载完成
        * preload resource group is loaded
        */
        BaseMain.prototype.onResourceLoadComplete = function (event) {
            this.onLoadGroupComplete(event);
            this.loadGroup();
            this.current++;
        };
        /**
        * preload资源组加载进度
        * loading process of preload resource
        */
        BaseMain.prototype.onResourceProgress = function (event) {
            if (event.resItem.name.lastIndexOf("_zip") >= 0) {
                uiCore.ZipManager.zipResourceProgress(event.resItem.name);
            }
            var percent = event.itemsLoaded / event.itemsTotal * 100;
            percent = Math.ceil(percent);
            this.onLoaddingProgress(percent, this.current, this.total);
        };
        /**
         * 子类继承获取加载失败
         */
        BaseMain.prototype.onLoaddingError = function (event) {
            trace("资源[" + event.groupName + "]:加载失败");
        };
        /**
         * 子类继承获取加载进度
         */
        BaseMain.prototype.onLoaddingProgress = function (percent, current, total) {
        };
        BaseMain.prototype.start = function () {
        };
        return BaseMain;
    }(eui.UILayer));
    uiCore.BaseMain = BaseMain;
    __reflect(BaseMain.prototype, "uiCore.BaseMain", ["uiCore.IBehaviour"]);
    /**
     * 主题解析器
     */
    var ThemeAdapter = (function () {
        function ThemeAdapter() {
        }
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param onError 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
            var _this = this;
            function onResGet(e) {
                onSuccess.call(thisObject, e);
            }
            function onResError(e) {
                if (e.resItem.url == url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                    onError.call(thisObject);
                }
            }
            if (typeof generateEUI !== 'undefined') {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else if (typeof generateEUI2 !== 'undefined') {
                RES.getResByUrl("resource/gameEui.json", function (data, url) {
                    window["JSONParseClass"]["setData"](data);
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateEUI2);
                    }, _this);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        };
        return ThemeAdapter;
    }());
    __reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
    /**
     * 素材解析器
     */
    var AssetAdapter = (function () {
        function AssetAdapter() {
            this.loadResList = [];
            this.currLoadCount = 0;
            this.isStopload = false;
        }
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(data) {
                compFunc.call(thisObject, data, source);
            }
            if (RES.hasRes(source)) {
                var data = RES.getRes(source);
                if (data) {
                    onGetRes(data);
                }
                else {
                    this.addLoadResQueue(source, compFunc, thisObject);
                }
            }
            else {
                var imageData;
                if (source.indexOf("_fnt") >= 0) {
                    imageData = uiCore.ZipManager.getFontImageMap(source);
                }
                else {
                    imageData = uiCore.ZipManager.getSubkeyImageMap(source);
                }
                if (imageData) {
                    onGetRes(imageData);
                }
                else {
                    RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        };
        AssetAdapter.prototype.addLoadResQueue = function (source, compFunc, thisObject) {
            this.loadResList.push({ source: source, compFunc: compFunc, thisObject: thisObject });
            this.loadResAsync();
        };
        AssetAdapter.prototype.loadResAsync = function () {
            var _this = this;
            if (this.isStopload) {
                return;
            }
            if (this.currLoadCount < RES["queue"].thread) {
                var resData = this.loadResList.shift();
                if (resData) {
                    this.currLoadCount++;
                    RES.getResAsync(resData.source, function (data) {
                        resData.compFunc.call(resData.thisObject, data, resData.source);
                        _this.currLoadCount--;
                        _this.loadResAsync();
                    }, this);
                }
            }
        };
        AssetAdapter.prototype.stopLoadRes = function () {
            this.isStopload = true;
            this.loadResList = [];
            this.currLoadCount = 0;
        };
        AssetAdapter.prototype.startLoadRes = function () {
            this.isStopload = false;
        };
        return AssetAdapter;
    }());
    __reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
})(uiCore || (uiCore = {}));
//# sourceMappingURL=BaseMain.js.map