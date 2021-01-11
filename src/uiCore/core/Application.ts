namespace uiCore {
	/**
	 * 应用管理器，提供初始化应用，场景切换等功能
	 */
    export class Application {
        /**
         * 应用管理器，禁止实例化
         */
        public constructor() {

        }
        private static _app: BaseMain;
        private static _guiLayer: eui.Group;
        private static _windowLayer: eui.Group;
        private static _currentScene: eui.Component;
        public static fishPathXmultiple:number=1;
        public static fishPathYmultiple:number=1;
        public static bulletSuDu:number=30;
        public static currGameId:number=30300601;
        public static readonly lockminfish:number=0;
        /**
         * 应用
         */
        public static get app(): BaseMain {
            return this._app;
        }
        /**
         * 振动屏幕开关
         */
        public static vibrationScreenAbled: boolean = true;
       
        /**
         * 把场景缓存成位图以优化渲染
         * @param onCache 是否缓存
         */
        public static cacheSceneAsBitmap(onCache: boolean = false): void {
            this._guiLayer.cacheAsBitmap = onCache;
        }
        /**
         * 应用右键事件
         */
        public static get APPEVENT_RIGHTCLICK(): string { return "app_rightclick" }
        /**
         * 应用退出事件
         */
        public static get APPEVENT_EXIT(): string { return "app_exit" }
        /**
         * 应用返回事件
         */
        public static get APPEVENT_BACK(): string { return "app_back" }
        /**
         * 应用继续事件
         */
        public static get APPEVENT_RESUME(): string { return "app_resume" }
        /**
         * 应用暂停事件
         */
        public static get APPEVENT_PAUSE(): string { return "app_pause" }
        /**
        * 应用大小改变
        */
        public static get APPEVENT_RESIZE(): string { return "app_resize" }
        /**
        * 窗口被打开
        */
        public static get APPEVENT_WINDOW_OPEN(): string { return "app_window_open" }
        /**
        * 窗口被关闭
        */
        public static get APPEVENT_WINDOW_CLOSE(): string { return "app_window_close" }
        /**
        * 切换场景
        */
        public static get CHANGESCENE(): string { return "app_changeScene" }
        /**
        * 当前场景
        * */
        public static get currentScene(): any {
            return this._currentScene;
        }
        private static _loadClass: any;
      
        /**
         * 加载资源的进度界面
         */
        public static get loadClass(): any {
            return this._loadClass;
        }
        public static loadUI: eui.Component;
        public static assetAdapter: any;


        /**
        * 初始化应用
        * @param app {uiCore.BaseMain} 应用所在容器
        * */
        public static init(app: BaseMain, loadClass: any = null): eui.Group {
            this._loadClass = loadClass;
            this._app = app;
            this._guiLayer = this.createLayer();
            this._guiLayer.percentWidth = this._guiLayer.percentHeight = 100;
            this._windowLayer = this.createLayer();
            this._windowLayer.percentWidth = this._windowLayer.percentHeight = 100;
            this._windowLayer.touchEnabled = false;
            WindowManager.getInstance().init(this._windowLayer);
            ExternalInterfaceUtils.init();
            this.setfishPathMultiple();
            app.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            // app.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStage, this);
            return this._guiLayer;
        }

        public static setfishPathMultiple():void{
            // this.fishPathXmultiple=this._app.stage.stageWidth/900;
            // this.fishPathYmultiple=this._app.stage.stageHeight/550;
            this.fishPathXmultiple=this._app.stage.stageWidth/1220;
            this.fishPathYmultiple=this._app.stage.stageHeight/600;
        }

        public static setbulletSuDu():void{
            this.bulletSuDu=(Math.sqrt(this._app.stage.stageWidth*this._app.stage.stageWidth+this._app.stage.stageHeight*this._app.stage.stageHeight)/60)*(FishGameManager.deltaTime==0?1:FishGameManager.deltaTime/15);
        }
        // public static onTouchStage(): void {
        //     this.app.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStage, this);
        //     if(uiCore.SoundByteManager.currMusic){
		// 		uiCore.SoundByteManager.playMusic(uiCore.SoundByteManager.currMusic.getSoundName);
		// 	}else{
		// 		uiCore.SoundByteManager.playMusic("BgMusic");
		// 	}
        // }
        /**
        * 切换场景
        * @param newScene {Scene} 要切换的目标场景
        */
        public static changeScene(newScene: Scene): void {
            this.assetAdapter.stopLoadRes();
            var resourceLoader: ResourceLoader = new ResourceLoader();
            resourceLoader.loadGroups(newScene.resourceList, this.onResourceComplete, this, newScene);
        }
        private static onResourceComplete(nextScene: Scene): void {
            if (this._currentScene) {
                this._guiLayer.removeChild(this._currentScene);
            } else {
                this.app.removeLoadding();
            }
            this.removeLoadding();
            this.assetAdapter.startLoadRes();
            this._currentScene = nextScene;
            nextScene.isLoaded = true;
            this._guiLayer.addChild(nextScene);
        }
        private static createLayer(): eui.Group {
            var layer: eui.Group = new eui.Group();
            layer.width = this._app.stage.stageWidth;
            layer.height = this._app.stage.stageHeight;
            layer.left = layer.right = layer.top = layer.bottom = 0;
            this._app.addChild(layer);
            return layer;
        }
        /**
         * 打开窗口
         * @param windowType 窗口类型
         * @param modal 是否是模态窗口
         * @param center  是否默认居中
         * @param autoClose 点击窗口以为区域是否自动关闭
         * @param inList 是否加入窗口渲染列表
         */
        public static openWindow(windowType: any, modal: boolean = true, center: boolean = true, autoClose: boolean = true, inList: boolean = true): eui.Component {
            var window: eui.Component = new windowType();
            WindowManager.getInstance().addWindow(window, modal, center, autoClose, inList);
            return window;
        }
        /**
        * 加入窗口
        * @param window {egret.gui.IVisualElement} 窗口实例
        * @param modal {boolean} 是否是模态窗口
        * @param center {boolean} 是否默认居中
        */
        public static addWindow(window: eui.Component, modal: boolean = true, center: boolean = true, autoClose: boolean = true, inList: boolean = true): void {
            WindowManager.getInstance().addWindow(window, modal, center, autoClose, inList);
        }
        /**
         * 显示载入进度界面
         */
        public static addLoadding(flag:boolean=false): eui.Component {
            this.removeLoadding();
            this.loadUI = new Application.loadClass(flag);
            this.addWindow(this.loadUI, false, true, false, false);
            return this.loadUI;
        }

        /**
         * 移除载入进度界面
         */
        public static removeLoadding(): void {
            this.loadUI && this.loadUI.parent && this.closeWindow(this.loadUI);
        }
        /**
         * 关闭窗口
         * @param window {egret.gui.IVisualElement} 窗口实例
         */
        public static closeWindow(window: eui.Component): void {
            WindowManager.getInstance().closeWindow(window);
        }
        private static onStageResize(event: egret.Event): void {
            WindowManager.getInstance().updateBg();
            this.setfishPathMultiple();
            if(FishGameController.getGameView()&&FishGameController.getGameView().shuangciGroup){
                FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.scaleX=this._app.stage.stageWidth/(FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.width-600);
                FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.scaleY=this._app.stage.stageHeight/FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.height;
                FishGameController.getGameView().waterLightResize();
                FishGameController.getGameView().fishGenResize();
            }
        }
        private static timeOutIndex;
        public static closeLoaddingTip(message:string=uiCore.LangUtils.getMsgById(1)):void{
            if(!SceneManager.tryTimer.running){
                if(this.loadUI && this.loadUI.parent){
                    this.closeWindow(this.loadUI);
                    uiCore.Alert.show(message);	
                    this.closeSetTime();
                }
            }
        }
        public static addSetTimeCloseLoaddingTip():void{
            if(this.timeOutIndex==null && !SceneManager.tryTimer.running && this.loadUI && this.loadUI.parent){
                this.timeOutIndex=egret.setTimeout(function () {
                    this.timeOutIndex=null;
                    this.closeLoaddingTip();
                }, this, 20000);
            }
        }
        public static closeSetTime():void{
            if(this.timeOutIndex!=null){
                egret.clearTimeout(this.timeOutIndex);
                this.timeOutIndex=null;
            }
        }
        private static gameTimeOutIndex;
        public static openGameTips():void{
            this.closeGameSetTime();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(15),function(){
                FishGameController.sendQuitDesk();
            });
        }
        public static addGameSetTime():void{
            if(this.gameTimeOutIndex==null){
                this.gameTimeOutIndex=egret.setTimeout(function () {
                    this.gameTimeOutIndex=null;
                    if(!FishGameController.isOnLine()){
                        this.openGameTips();
                    }
                }, this, 20000);
            }
        }
        public static closeGameSetTime():void{
            if(this.gameTimeOutIndex!=null){
                egret.clearTimeout(this.gameTimeOutIndex);
                this.gameTimeOutIndex=null;
            }
        }
        public static gameOutIndex;
        public static addGameOutTime():void{
            if(this.gameOutIndex==null){
                this.gameOutIndex=egret.setTimeout(function () {
                    this.gameOutIndex=null;
                    this.showGameOut();
                }, this, 20000);
            }
        }
        public static showGameOut():void{
            this.hideGameOut();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(18),function(){
                FishGameController.sendQuitDesk();
            });
        }
        public static hideGameOut():void{
            if(this.gameOutIndex!=null){
                egret.clearTimeout(this.gameOutIndex);
                this.gameOutIndex=null;
            }
        }
        /**
         * 振动屏幕
         */
        public static vibrationScreen(): void {
            if (!this.vibrationScreenAbled) {
                return;
            }
            this._app.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
            this.i = 0;
            this._app.addEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
        }
        private static vibrationArrayY: Array<number> = [-8, 8, -6, 6, -4, 4, -2, 2, 0];
        private static vibrationArrayX: Array<number> = [-5, 7, -3, 9, -2, 3, -1, 1, 0];
        private static i: number = 0;
        private static onSceneEnterFrame() {
            if (this.i < this.vibrationArrayY.length) {
                this._app.y = this.vibrationArrayY[this.i];
                this._app.x = this.vibrationArrayX[this.i];
            }
            else {
                this._app.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
                this.i = 0;
            }
            this.i++;
        }
    }
}
