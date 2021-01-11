namespace uiCore {
	/**
	 * 游戏入口类的基类
	 */
    export class BaseMain extends eui.UILayer implements uiCore.IBehaviour {
       
        private appLoadingClass: any;
        private windowLoadingClass: any;
        private loadingView: egret.DisplayObject;
        /**
         * 用来显示进度的UI
         */
        public get loadingUI(): egret.DisplayObject {
            return this.loadingView;
        }
        private indexGroups: Array<string>;
        private resource: string;
        private resourceUrl: string;
        private total: number;
        private current: number = 1;
        private themePath: string;
        /**
         * 游戏入口的基类
         * @param loadingClass 初始加载界面的类
         * @param resource 资源配置路径
         * @param resourceUrl 资源地址
         * @param indexGroups 初始加载所需资源
         * @param windowLoadingClass 运行时新界面的资源加载条的类
         */
        public constructor(loadingClass: any, resource: string = "default_zh.res.json", resourceUrl: string = "resource/", themePath: string = "default.thm.json", indexGroups: Array<string> = [],windowLoadingClass: any = null) {
            super();
            this.appLoadingClass = loadingClass;
            this.indexGroups = indexGroups;
            this.resource = resource;
            this.resourceUrl = resourceUrl;
            this.windowLoadingClass = windowLoadingClass;
            this.total = indexGroups.length;
            this.themePath = resourceUrl + themePath;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
            uiCore.EventManager["getInstance"]().addEventListener(Application.APPEVENT_PAUSE, this.onPause, this);//失去焦点
            uiCore.EventManager["getInstance"]().addEventListener(Application.APPEVENT_RESUME, this.onResume, this);//获得焦点
        }

        public onRender(): void {

        }
        private onExit(event: egret.Event): void {
            if (!this.onApplicationQuit()) {
                event.preventDefault();
            }
        }
        private onResume(event: egret.Event): void {
            this.onApplicationFocus();
        }
        private onPause(event: egret.Event): void {
            this.onApplicationPause();
        }
        public onApplicationQuit(): boolean {
            return true;
        }
        //获得焦点
        public onApplicationFocus(): void {
			uiCore.SoundByteManager.onAppResume();
        }
        //失去焦点
        public onApplicationPause(): void {
            if (FishGameController.getGameView() != null) {
                FishGameController.getGameView().ReconnectAllFish();
            }
            uiCore.SoundByteManager.onAppPause();
        }
     
        public awake(): void {

        }
        public update() {

        }
        public onDestroy() {

        }

        private _onAddToStage(event: egret.Event) {
            Application.init(this,this.windowLoadingClass);
            //注入自定义的素材解析器
            Application.assetAdapter = new AssetAdapter();
            this.stage.registerImplementation("eui.IAssetAdapter", Application.assetAdapter);
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig('resource/' + this.resource, "resource/");
        }
        private onLoadingComplete(event: egret.Event) {
            if (this.loadingView) {
                this.loadingView.removeEventListener(egret.Event.COMPLETE, this.onLoadingComplete, this);
            }
            this.init();
            this.awake();
        }
        /**
         * 开始初始化
         */
        public init(): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.loadGroup();
        }
		/**
		* 配置文件加载完成,开始预加载preload资源组。
		*/
        private onConfigComplete(event: RES.ResourceEvent): void {
            if (this.appLoadingClass) {
                this.loadingView = new this.appLoadingClass();
                this.loadingView.addEventListener(egret.Event.COMPLETE, this.onLoadingComplete, this);
                this.addChildAt(this.loadingView, 0);
            }else {
                this.onLoadingComplete(null);
            }
        }
		/**
		* 资源组加载出错
		* Resource group loading failed
		*/
        private onResourceLoadError(event: RES.ResourceEvent): void {
            this.onLoaddingError(event);
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        }
        private loadGroup(): void {
            if (this.indexGroups.length > 0) {
                var loadGroup: string = this.indexGroups.shift();
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
        }
        /**
         * 所有组资源加载完成
         */
        protected onAllGroupComplete(): void {

        }
        /**
         * 主题文件加载完成
         */
        private onThemeLoadComplete(): void {
            this.start();
        }
        /**
         * 移除进度条
         */
        public removeLoadding(): void {
            if (this.loadingView) {
                this.removeChild(this.loadingView);
                this.loadingView = null;
            }
        }
        /**
         * 子类继承获取准备加载下一个组
         */
        protected onLoadGroupReady(groupName: string): void {
            trace("资源[" + groupName + "]:准备加载");
        }
        /**
        * 子类继承获取组加载完成
        */
        protected onLoadGroupComplete(event: RES.ResourceEvent): void {
            trace("资源[" + event.groupName + "]:加载完成");
        }
        /**
        * preload资源组加载完成
        * preload resource group is loaded
        */
        protected onResourceLoadComplete(event: RES.ResourceEvent): void {
            this.onLoadGroupComplete(event);
            this.loadGroup();
            this.current++;
        }
		/**
		* preload资源组加载进度
		* loading process of preload resource
		*/
        protected onResourceProgress(event: RES.ResourceEvent): void {
            if(event.resItem.name.lastIndexOf("_zip")>=0){
                uiCore.ZipManager.zipResourceProgress(event.resItem.name);
            }
            var percent: number = event.itemsLoaded / event.itemsTotal * 100;
            percent = Math.ceil(percent);
            this.onLoaddingProgress(percent, this.current, this.total);
        }
        /**
         * 子类继承获取加载失败
         */
        protected onLoaddingError(event: RES.ResourceEvent): void {
            trace("资源[" + event.groupName + "]:加载失败");
        }
		/**
		 * 子类继承获取加载进度
		 */
        protected onLoaddingProgress(percent: number, current: number, total: number): void {

        }
        public start(): void {

        }
    }
    /**
     * 主题解析器
     */
    class ThemeAdapter implements eui.IThemeAdapter {
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param onError 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {

            function onResGet(e: string): void {
                onSuccess.call(thisObject, e);
            }
            function onResError(e: RES.ResourceEvent): void {
                if (e.resItem.url == url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                    onError.call(thisObject);
                }
            }

            if (typeof generateEUI !== 'undefined') {
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else if (typeof generateEUI2 !== 'undefined') {
                RES.getResByUrl("resource/gameEui.json", (data, url) => {
                    window["JSONParseClass"]["setData"](data);
                    egret.callLater(() => {
                        onSuccess.call(thisObject, generateEUI2);
                    }, this);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        }
    }

    declare var generateEUI: { paths: string[], skins: any }
    declare var generateEUI2: { paths: string[], skins: any }
    /**
     * 素材解析器
     */
    class AssetAdapter implements eui.IAssetAdapter {
        public loadResList = [];
        public currLoadCount = 0;
        public isStopload = false;
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        public getAsset(source: string, compFunc: Function, thisObject: any): void {
            
            function onGetRes(data: any): void {
                compFunc.call(thisObject, data, source);
            }
            
            if (RES.hasRes(source)) {
                var data = RES.getRes(source);
                if (data) {
                    onGetRes(data);
                } else {
                    this.addLoadResQueue(source, compFunc, thisObject);
                }
            } else {
                var imageData;
                if(source.indexOf("_fnt")>=0){
                    imageData = uiCore.ZipManager.getFontImageMap(source);
                }else{
                    imageData = uiCore.ZipManager.getSubkeyImageMap(source);
                }
                if (imageData) {
                    onGetRes(imageData);
                } else {
                    RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        }
        public addLoadResQueue(source: string, compFunc: Function, thisObject: any) {
            this.loadResList.push({ source: source, compFunc: compFunc, thisObject: thisObject });
            this.loadResAsync();
        }
        public loadResAsync() {
            if (this.isStopload) {
                return;
            }
            if (this.currLoadCount < RES["queue"].thread) {
                var resData = this.loadResList.shift();
                if (resData) {
                    this.currLoadCount++;
                    RES.getResAsync(resData.source, (data) => {
                        resData.compFunc.call(resData.thisObject, data, resData.source);
                        this.currLoadCount--;
                        this.loadResAsync();
                    }, this);
                }
            }
        }
        public stopLoadRes() {
            this.isStopload = true;
            this.loadResList = [];
            this.currLoadCount = 0;
        }
        public startLoadRes() {
            this.isStopload = false;
        }
    }
}
