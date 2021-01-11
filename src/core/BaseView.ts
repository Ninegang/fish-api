namespace core {
    /**
     * 界面
     */
    export class BaseView extends eui.Component 
    {
        public userData: any;

        protected enableResizeEvt:boolean = false;

        protected isDispose: boolean = false;

        public autoDispose: boolean = true;

        /**
         * 界面
         */
        public constructor() 
        {
            super();

            this.addEventListener(egret.Event.COMPLETE, this.onInitExml, this);
        }

        private onInitExml(evt: egret.Event): void 
        {
            this.removeEventListener(egret.Event.COMPLETE, this.onInitExml, this);

            this.initExmlOk();
        }

        /**
         * 当子项创建完成，推荐重写start
         */
        protected childrenCreated(): void 
        {
            super.childrenCreated();

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);

            this.onAwake();

            this.onLastAwake();

            this.onEnable();

            this.checkLang();

            this.execAutoAlign();
            this.viewResize();
        }

        public setMouseWheel(wheel: number): void 
        {

        }

        /** 是否还活着 */
        public get isActived(): boolean 
        {
            return !this.isDispose;
        }

        //---------------------------------------------------------------------------------------------

        /** 开始游戏 */
        private onResume(event: egret.Event): void 
        {
            this.onApplicationFocus();
        }

        //--------------------------------------------------------------
        private mPauseFns:{fn:()=>void, fnThis:any}[];

        private get pauseFns():{fn:()=>void, fnThis:any}[]
        {
            if (!this.mPauseFns)
            {
                this.mPauseFns = [];
            }
            return this.mPauseFns;
        }
        /** 注册切屏回调 */
        protected addPauseFn(fn:()=>void, fnThis?:any):void
        {
            if (core.CoreConfig.backRun)
            {
                fn.call(fnThis);
            }
            else
            {
                this.pauseFns.push({fn:fn, fnThis:fnThis});
            }
        }

        protected removePauseFn(fn:()=>void, fnThis?:any):void
        {
            for (let i:number = this.pauseFns.length - 1; i >= 0; i--)
            {
                if (this.pauseFns[i].fn == fn && this.pauseFns[i].fnThis == fnThis)
                {
                    this.pauseFns.splice(i, 1);
                }
            }
        }

        protected clearAllPauseFn():void
        {
            this.pauseFns.length = 0;
        }
        

        protected execAllPauseFn():void
        {
            for (let fnObj of this.pauseFns)
            {
                fnObj.fn.call(fnObj.fnThis);
            }
            this.pauseFns.length = 0;
        }

        //--------------------------------------------------------------

        /** 暂停游戏 */
        private onPause(event: egret.Event): void 
        {
            this.execAllPauseFn();

            this.onApplicationPause();
        }

        //------------------------------------------------------------------------------------

        /**
         * 应用得到焦点
         */
        public onApplicationFocus(): void 
        {
            
        }

        /**
         * 应用失去焦点
         */
        public onApplicationPause(): void 
        {
            this.execAllAutoTimeout();
        }

        //-------------------------------------------------------------------
        // 延时执行函数
        
        private autoTimeoutList:{timeId:number, listener:(thisObj:any, ...arg)=>void, thisObj:any, param:any}[] = [];
        protected setAutoTimeout<Z>(listener: (this: Z, ...arg) => void, thisObject: Z, delay: number, ...args: any[]):number
        {
            let timeId:number = -1;
            
            if (core.CoreConfig.backRun)
            {
                listener.apply(thisObject, args);
            }
            else
            {
                timeId = egret.setTimeout(()=>
                {
                    this.clearAutoTimeout(timeId);

                    listener.apply(thisObject, args);
                }, this, delay);

                this.autoTimeoutList.push({timeId:timeId, listener:listener, thisObj:thisObject, param:args});
            }

            return timeId;
        }

        protected clearAutoTimeout(timeId:number):void
        {
            egret.clearTimeout(timeId);

            for (let i:number = 0; i < this.autoTimeoutList.length; i++)
            {
                if (this.autoTimeoutList[i].timeId == timeId)
                {
                    core.ArrayUtil.removeIdx(this.autoTimeoutList, i);
                    break;
                }
            }
        }

        protected execAllAutoTimeout():void
        {
            if (!this.autoTimeoutList) return;
            for (let timeoutObj of this.autoTimeoutList)
            {
                egret.clearTimeout(timeoutObj.timeId);
            
                timeoutObj.listener.call(timeoutObj.thisObj, timeoutObj.param);
            }
            this.autoTimeoutList.length = 0;
        }

        protected clearAllAutoTimeout():void
        {
            for (let timeoutObj of this.autoTimeoutList)
            {
                egret.clearTimeout(timeoutObj.timeId);
            }
            this.autoTimeoutList.length = 0;
        }

        //---------------------------------------------------------------------------------------------

        private alignObjs: { x: number, y: number, disObj: egret.DisplayObject }[] = [];
        protected addAutoAlign(disObj: egret.DisplayObject): void 
        {
            this.alignObjs.push({ x: disObj.x, y: disObj.y, disObj: disObj });
        }

        private onViewResize(evt: egret.Event): void 
        {
            this.execAutoAlign();

            this.viewResize();
        }

        protected viewResize(): void 
        {

        }

        private execAutoAlign(): void 
        {
            let sx: number = this.stage.stageWidth / core.CoreConfig.STAGE_W;
            let sy: number = this.stage.stageHeight / core.CoreConfig.STAGE_H;

            for (let obj of this.alignObjs) 
            {
                obj.disObj.x = obj.x * sx;
                obj.disObj.y = obj.y * sy;
                obj.disObj.scaleX = sx;
                obj.disObj.scaleY = sy;
            }
        }

        //---------------------------------------------------------------------------------------------

        /**  */
        protected onLastAwake(): void 
        {

        }

        /** 初始化内部皮肤完成 */
        protected initExmlOk(): void
        {

        }

        /** 首次加载到场景初始化 */
        protected onAwake(): void 
        {

        }

        /** 在场景中显示时执行 */
        protected onEnable(): void 
        {
            if (this.isDispose == false)
            {
                uiCore.EventManager["_instance"].on(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
                uiCore.EventManager["_instance"].on(uiCore.Application.APPEVENT_RESUME, this.onResume, this);

                if (this.enableResizeEvt)
                {
                    // ErmjGameScene.inst.stage.addEventListener(egret.Event.RESIZE, this.onViewResize, this);
                }
            }
        }

        /** 从场景中移除时执行 */
        protected onDisable(): void 
        {
            uiCore.EventManager["_instance"].off(uiCore.Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["_instance"].off(uiCore.Application.APPEVENT_RESUME, this.onResume, this);

            // ErmjGameScene.inst.stage.removeEventListener(egret.Event.RESIZE, this.onViewResize, this);
        }

        /** 析构 */
        public destroy(): void 
        {
            if (!this.isDispose) 
            {
                this.isDispose = true;

                this.onDisable();

                this.onDestroy();
            }
        }

        /** 析构 */
        protected onDestroy(): void 
        {
            this.removeAllAutoView();
            
            for (let timeObj of this.autoTimeoutList)
            {
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

            DisplayUtil.removeDisplay(this);
        }

        //----------------------------------------------------------------------------------------------

        private onAddToStage(evt: egret.Event): void 
        {
            this.onEnable();
        }

        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        private onRemovedFromStage(evt: egret.Event): void 
        {
            if (this.autoDispose) 
            {
                this.destroy();
            }
            else 
            {
                this.onDisable();
            }
        }

        //----------------------------------------------------------------------------------------------
        // 多语言
        private curLang: string;

        // private onLanguageChange(evt:egret.Event):void
        // {
        //     this.checkLang();
        // }

        private checkLang(): void {
            // if (Config.LANGUAGE !== this.curLang)
            // {
            //     this.curLang = Config.LANGUAGE;

            //     this.updateLang();
            // }
        }

        /** 更新语言 */
        protected updateLang(): void 
        {
            UILanaguageUtil.convert(this);
        }

        //------------------------------------------------------------------------------------------------------------------------------------

        private evtCtl: EventControl = new EventControl();

        protected addEvt(target: egret.EventDispatcher, evtType: string, backFn: (evt: egret.Event) => void, backThis: any = null): void 
        {
            this.evtCtl.addEvtListener(target, evtType, backFn, backThis || this);
        }

        protected removeEvt(target: egret.EventDispatcher, evtType: string, backFn: (evt: egret.Event) => void, backThis: any = null): void 
        {
            this.evtCtl.removeEvtListener(target, evtType, backFn, backThis);
        }

        //------------------------------------------------------------------------------------------------------------------------------------
        
        private autoViews:core.BaseView[] = [];

        public pushAutoView(view:core.BaseView):void
        {
            this.autoViews.push(view);    
        }

        public removeAutoView(view:core.BaseView):void
        {
            view.destroy();

            let viewIdx:number = this.autoViews.indexOf(view);
            if (viewIdx != -1)
            {
                core.ArrayUtil.removeIdx(this.autoViews, viewIdx);
            }
        }

        public removeAllAutoView():void
        {
            for (let view of this.autoViews)
            {
                view.destroy();
            }
            this.autoViews.length = 0;
        }
        //---------------------------------------------------------------

    }
}
