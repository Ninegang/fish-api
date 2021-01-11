var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 应用管理器，提供初始化应用，场景切换等功能
     */
    var Application = (function () {
        /**
         * 应用管理器，禁止实例化
         */
        function Application() {
        }
        Object.defineProperty(Application, "app", {
            /**
             * 应用
             */
            get: function () {
                return this._app;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 把场景缓存成位图以优化渲染
         * @param onCache 是否缓存
         */
        Application.cacheSceneAsBitmap = function (onCache) {
            if (onCache === void 0) { onCache = false; }
            this._guiLayer.cacheAsBitmap = onCache;
        };
        Object.defineProperty(Application, "APPEVENT_RIGHTCLICK", {
            /**
             * 应用右键事件
             */
            get: function () { return "app_rightclick"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_EXIT", {
            /**
             * 应用退出事件
             */
            get: function () { return "app_exit"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_BACK", {
            /**
             * 应用返回事件
             */
            get: function () { return "app_back"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_RESUME", {
            /**
             * 应用继续事件
             */
            get: function () { return "app_resume"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_PAUSE", {
            /**
             * 应用暂停事件
             */
            get: function () { return "app_pause"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_RESIZE", {
            /**
            * 应用大小改变
            */
            get: function () { return "app_resize"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_WINDOW_OPEN", {
            /**
            * 窗口被打开
            */
            get: function () { return "app_window_open"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "APPEVENT_WINDOW_CLOSE", {
            /**
            * 窗口被关闭
            */
            get: function () { return "app_window_close"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "CHANGESCENE", {
            /**
            * 切换场景
            */
            get: function () { return "app_changeScene"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "currentScene", {
            /**
            * 当前场景
            * */
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application, "loadClass", {
            /**
             * 加载资源的进度界面
             */
            get: function () {
                return this._loadClass;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 初始化应用
        * @param app {uiCore.BaseMain} 应用所在容器
        * */
        Application.init = function (app, loadClass) {
            if (loadClass === void 0) { loadClass = null; }
            this._loadClass = loadClass;
            this._app = app;
            this._guiLayer = this.createLayer();
            this._guiLayer.percentWidth = this._guiLayer.percentHeight = 100;
            this._windowLayer = this.createLayer();
            this._windowLayer.percentWidth = this._windowLayer.percentHeight = 100;
            this._windowLayer.touchEnabled = false;
            uiCore.WindowManager.getInstance().init(this._windowLayer);
            uiCore.ExternalInterfaceUtils.init();
            this.setfishPathMultiple();
            app.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            // app.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStage, this);
            return this._guiLayer;
        };
        Application.setfishPathMultiple = function () {
            // this.fishPathXmultiple=this._app.stage.stageWidth/900;
            // this.fishPathYmultiple=this._app.stage.stageHeight/550;
            this.fishPathXmultiple = this._app.stage.stageWidth / 1220;
            this.fishPathYmultiple = this._app.stage.stageHeight / 600;
        };
        Application.setbulletSuDu = function () {
            this.bulletSuDu = (Math.sqrt(this._app.stage.stageWidth * this._app.stage.stageWidth + this._app.stage.stageHeight * this._app.stage.stageHeight) / 60) * (FishGameManager.deltaTime == 0 ? 1 : FishGameManager.deltaTime / 15);
        };
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
        Application.changeScene = function (newScene) {
            this.assetAdapter.stopLoadRes();
            var resourceLoader = new uiCore.ResourceLoader();
            resourceLoader.loadGroups(newScene.resourceList, this.onResourceComplete, this, newScene);
        };
        Application.onResourceComplete = function (nextScene) {
            if (this._currentScene) {
                this._guiLayer.removeChild(this._currentScene);
            }
            else {
                this.app.removeLoadding();
            }
            this.removeLoadding();
            this.assetAdapter.startLoadRes();
            this._currentScene = nextScene;
            nextScene.isLoaded = true;
            this._guiLayer.addChild(nextScene);
        };
        Application.createLayer = function () {
            var layer = new eui.Group();
            layer.width = this._app.stage.stageWidth;
            layer.height = this._app.stage.stageHeight;
            layer.left = layer.right = layer.top = layer.bottom = 0;
            this._app.addChild(layer);
            return layer;
        };
        /**
         * 打开窗口
         * @param windowType 窗口类型
         * @param modal 是否是模态窗口
         * @param center  是否默认居中
         * @param autoClose 点击窗口以为区域是否自动关闭
         * @param inList 是否加入窗口渲染列表
         */
        Application.openWindow = function (windowType, modal, center, autoClose, inList) {
            if (modal === void 0) { modal = true; }
            if (center === void 0) { center = true; }
            if (autoClose === void 0) { autoClose = true; }
            if (inList === void 0) { inList = true; }
            var window = new windowType();
            uiCore.WindowManager.getInstance().addWindow(window, modal, center, autoClose, inList);
            return window;
        };
        /**
        * 加入窗口
        * @param window {egret.gui.IVisualElement} 窗口实例
        * @param modal {boolean} 是否是模态窗口
        * @param center {boolean} 是否默认居中
        */
        Application.addWindow = function (window, modal, center, autoClose, inList) {
            if (modal === void 0) { modal = true; }
            if (center === void 0) { center = true; }
            if (autoClose === void 0) { autoClose = true; }
            if (inList === void 0) { inList = true; }
            uiCore.WindowManager.getInstance().addWindow(window, modal, center, autoClose, inList);
        };
        /**
         * 显示载入进度界面
         */
        Application.addLoadding = function (flag) {
            if (flag === void 0) { flag = false; }
            this.removeLoadding();
            this.loadUI = new Application.loadClass(flag);
            this.addWindow(this.loadUI, false, true, false, false);
            return this.loadUI;
        };
        /**
         * 移除载入进度界面
         */
        Application.removeLoadding = function () {
            this.loadUI && this.loadUI.parent && this.closeWindow(this.loadUI);
        };
        /**
         * 关闭窗口
         * @param window {egret.gui.IVisualElement} 窗口实例
         */
        Application.closeWindow = function (window) {
            uiCore.WindowManager.getInstance().closeWindow(window);
        };
        Application.onStageResize = function (event) {
            uiCore.WindowManager.getInstance().updateBg();
            this.setfishPathMultiple();
            if (FishGameController.getGameView() && FishGameController.getGameView().shuangciGroup) {
                FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.scaleX = this._app.stage.stageWidth / (FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.width - 600);
                FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.scaleY = this._app.stage.stageHeight / FishGameController.getGameView().shuangciGroup.getDragonBonesEgret.height;
                FishGameController.getGameView().waterLightResize();
                FishGameController.getGameView().fishGenResize();
            }
        };
        Application.closeLoaddingTip = function (message) {
            if (message === void 0) { message = uiCore.LangUtils.getMsgById(1); }
            if (!SceneManager.tryTimer.running) {
                if (this.loadUI && this.loadUI.parent) {
                    this.closeWindow(this.loadUI);
                    uiCore.Alert.show(message);
                    this.closeSetTime();
                }
            }
        };
        Application.addSetTimeCloseLoaddingTip = function () {
            if (this.timeOutIndex == null && !SceneManager.tryTimer.running && this.loadUI && this.loadUI.parent) {
                this.timeOutIndex = egret.setTimeout(function () {
                    this.timeOutIndex = null;
                    this.closeLoaddingTip();
                }, this, 20000);
            }
        };
        Application.closeSetTime = function () {
            if (this.timeOutIndex != null) {
                egret.clearTimeout(this.timeOutIndex);
                this.timeOutIndex = null;
            }
        };
        Application.openGameTips = function () {
            this.closeGameSetTime();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(15), function () {
                FishGameController.sendQuitDesk();
            });
        };
        Application.addGameSetTime = function () {
            if (this.gameTimeOutIndex == null) {
                this.gameTimeOutIndex = egret.setTimeout(function () {
                    this.gameTimeOutIndex = null;
                    if (!FishGameController.isOnLine()) {
                        this.openGameTips();
                    }
                }, this, 20000);
            }
        };
        Application.closeGameSetTime = function () {
            if (this.gameTimeOutIndex != null) {
                egret.clearTimeout(this.gameTimeOutIndex);
                this.gameTimeOutIndex = null;
            }
        };
        Application.addGameOutTime = function () {
            if (this.gameOutIndex == null) {
                this.gameOutIndex = egret.setTimeout(function () {
                    this.gameOutIndex = null;
                    this.showGameOut();
                }, this, 20000);
            }
        };
        Application.showGameOut = function () {
            this.hideGameOut();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(18), function () {
                FishGameController.sendQuitDesk();
            });
        };
        Application.hideGameOut = function () {
            if (this.gameOutIndex != null) {
                egret.clearTimeout(this.gameOutIndex);
                this.gameOutIndex = null;
            }
        };
        /**
         * 振动屏幕
         */
        Application.vibrationScreen = function () {
            if (!this.vibrationScreenAbled) {
                return;
            }
            this._app.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
            this.i = 0;
            this._app.addEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
        };
        Application.onSceneEnterFrame = function () {
            if (this.i < this.vibrationArrayY.length) {
                this._app.y = this.vibrationArrayY[this.i];
                this._app.x = this.vibrationArrayX[this.i];
            }
            else {
                this._app.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
                this.i = 0;
            }
            this.i++;
        };
        Application.fishPathXmultiple = 1;
        Application.fishPathYmultiple = 1;
        Application.bulletSuDu = 30;
        Application.currGameId = 30300601;
        Application.lockminfish = 0;
        /**
         * 振动屏幕开关
         */
        Application.vibrationScreenAbled = true;
        Application.vibrationArrayY = [-8, 8, -6, 6, -4, 4, -2, 2, 0];
        Application.vibrationArrayX = [-5, 7, -3, 9, -2, 3, -1, 1, 0];
        Application.i = 0;
        return Application;
    }());
    uiCore.Application = Application;
    __reflect(Application.prototype, "uiCore.Application");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Application.js.map