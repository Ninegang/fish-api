namespace core
{
    
    export class LoaderManager 
    {

        //--------------------------------------------------------------------------------------------------

        public static GAME_BACK_RES:number = -50000;
        
        public static GAME_RES:number = -20000;

        public static UI_EFFECT_PRI:number = -10000;
        

        public static SCENE_PRI:number = 30000;

        public static UI_PRI:number = 50000;

        //--------------------------------------------------------------------------------------------------

        private static pri_idx:number = 0;

        private static _instance:LoaderManager;
        public static get instance():LoaderManager
        {
            if(!this._instance)
            {
                this._instance = new LoaderManager();
            }
            return this._instance;
        }

        //----------------------------------------------------------------------------------------------------
        /** 后台加载 */
        public static ONE_RES_BACK_PRI:number = -500000;

        public static ONE_RES_MAIN_EFFECT_PRI:number = -400000;
        
        /** 特效加载 */
        public static ONE_RES_SOUND_PRI:number = -300000;
        
        public static ONE_RES_EFFECT_PRI:number = -100000;
        /** 默认加载（皮肤中使用的） */
        public static ONE_RES_DEF_PRI:number = 0;

        private static rgId:number = 1;

        private queueCount:number = 0;
        private maxQueue:number = 4;

        // 自定义加载
        private resInfosDirty:boolean = true;
        private resInfos:RQueueInfo[] = [];

        private resIdMap:{[resId:string]:RQueueInfo} = {};


        private sortResInfos():void
        {
            if (this.resInfosDirty)
            {
                this.resInfosDirty = false;

                this.resInfos.sort((infoA, infoB)=>
                {
                    return infoB.priority - infoA.priority;
                });
            }
        }

        private createR(resId:string, pri:number):RQueueInfo
        {
            let rQueueInfo = new RQueueInfo();
            rQueueInfo.resId = resId;
            rQueueInfo.priority = pri;

            return rQueueInfo;
        }

        private createRG(rgId:number, overFn:(rgId?:number, value?:any, key?:string)=>void, overThis:any):RGQueueInfo
        {
            let rgInfo = new RGQueueInfo();
            rgInfo.rgId = rgId;
            rgInfo.overFn = overFn;
            rgInfo.overThis = overThis;

            return rgInfo;
        }

        public loadOneRes(resId:string, overFn:(rgId?:number, value?:any, key?:string)=>void, overThis:any, pri:number = 0):number
        {
            if (!RES.getRes(resId))
            {
                let rgInfo = this.createRG(LoaderManager.rgId++, overFn, overThis);

                let rInfo = this.resIdMap[resId];
                if (!rInfo)
                {
                    this.resIdMap[resId] = rInfo = this.createR(resId, pri);
                }
                else
                {
                    rInfo.priority = Math.max(pri, rInfo.priority);
                }

                rInfo.rgInfos.push(rgInfo);
                rgInfo.rInfos.push(rInfo);

                this.resInfos.push(rInfo);
                this.resInfosDirty = true;

                egret.callLater(this.checkResLoad, this);

                return rgInfo.rgId;
            }

            if (overFn && overThis)
            {
                overFn.call(overThis);
            }
            return 0;
        }

        public backLoadGroup(groupN:string, pri?:number):void
        {
            let resItems = RES.getGroupByName(groupN);
            
            let resIds:string[] = [];
            for (let resItem of resItems)
            {
                resIds.push(resItem.name);
            }

            this.loadResList(resIds, null, null, pri || LoaderManager.ONE_RES_BACK_PRI);
        }

        public loadResList(resL:string[], overFn:(rgId?:number, value?:any, key?:string)=>void, overThis:any, pri:number = 0):RGQueueInfo
        {
            let rl:string[] = [];
            for (let i:number = 0; i < resL.length; i++)
            {
                if (!RES.hasRes(resL[i]))
                {
                    console.error("资源配置文件中无法找到特定的资源：" + resL[i]);
                    return;
                }

                if (!RES.getRes(resL[i]))
                {
                    rl.push(resL[i]);
                }
            }

            if (rl.length)
            {
                let rgInfo = this.createRG(LoaderManager.rgId++, overFn, overThis);

                this.resInfosDirty = true;

                for (let i:number = 0; i < rl.length; i++)
                {
                    let rInfo = this.resIdMap[rl[i]];
                    if (!rInfo)
                    {
                        this.resIdMap[rl[i]] = rInfo = this.createR(rl[i], pri);
                    }
                    else
                    {
                        rInfo.priority = Math.max(pri, rInfo.priority);
                    }

                    rInfo.rgInfos.push(rgInfo);
                    rgInfo.rInfos.push(rInfo);

                    this.resInfos.push(rInfo);
                }

                egret.callLater(this.checkResLoad, this);

                return rgInfo
            }

            if (overFn && overThis)
            {
                overFn.call(overThis);
            }
            return null;
        }

        private checkResLoad():void
        {
            if (this.resInfos.length && this.queueCount < this.maxQueue)
            {
                this.sortResInfos();

                let resInfo:RQueueInfo = this.resInfos.shift();

                while(this.resInfos.length && (!resInfo || !resInfo.rgInfos || !resInfo.rgInfos.length))
                {
                    resInfo = this.resInfos.shift();
                }
                if (resInfo)
                {
                    this.queueCount++;

                    RES.getResAsync(resInfo.resId, (value?: any, key?: string)=>
                    {
                        this.loadResOver(resInfo, value, key);
                    }, this);
                }
            }
        }

        private loadResOver(resInfo:RQueueInfo, value:any, key:string):void
        {
            this.queueCount--;
            
            delete this.resIdMap[resInfo.resId];

            resInfo.loadOk(value, key);

            this.checkResLoad();
        }
        //----------------------------------------------------------------------------------------------------

        private queueInfoObj:{[groupName:string]:GroupQueueInfo};

        public constructor() 
        {
            this.queueInfoObj = {};

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            egret.setInterval(()=>
            {
                if (this.queueCount > 0)
                {
                    this.queueCount--;
                }
            }, this, 3000);
        }

        //----------------------------------------------------------------------------------------------------
        public loadGroupByList(groupNames:string[], backFun:Function = null, errFn:()=>void, thisObj:any = null, params:any[] = null, pri:number = 0):string
        {
            let loadGNs:string[] = [];
            for (let groupName of groupNames)
            {
                if (!RES.isGroupLoaded(groupName))
                {
                    loadGNs.push(groupName);
                }
            }

            if (loadGNs.length)
            {
                let tempGroup:string;
                if (loadGNs.length == 1)
                {
                    tempGroup = loadGNs[0];
                }
                else
                {
                    tempGroup = groupNames.join("_");

                    RES.createGroup(tempGroup, loadGNs);
                }
                
                return LoaderManager.instance.loadGroup(tempGroup, backFun, errFn, thisObj, params, pri);
            }

            backFun.apply(thisObj, params);
            return null;
        }

        //----------------------------------------------------------------------------------------------------

        private loadGroupCount:number = 0;
        public loadGroup(groupName:string, backFun:Function, errFn:()=>void, fnThis:any, params:any[] = null, pri:number = 0):string
        {
            if (!groupName || RES.isGroupLoaded(groupName))
            {
                if (backFun && fnThis)
                {
                    backFun.apply(fnThis, params);
                }

                return null;
            }
            let info:GroupQueueInfo = this.queueInfoObj[groupName];
            if (!info)
            {
                this.queueInfoObj[groupName] = info = new GroupQueueInfo();
            }

            if (!info.check(backFun, errFn, fnThis, params))
            {
                info.addBack(backFun, errFn, fnThis, params);
            }
            
            if (!info.loading)
            {
                this.loadGroupCount ++;

                info.loading = true;
                // console.log("---------------------->开始加载组：", groupName, this.loadGroupCount);

                info.pri = pri;
                RES.loadGroup(groupName, pri);
            }

            return groupName;
        }

        private onGroupComplete(evt:RES.ResourceEvent):void
        {
            var groupName:string = evt.groupName;

            this.execGroupOverFn(groupName);
        }

        private execGroupOverFn(groupName:string, isFail:boolean = false):void
        {
            var queueInfo:GroupQueueInfo = this.queueInfoObj[groupName];

            if (!!queueInfo)
            {
                this.loadGroupCount --;
                
                if (isFail)
                {
                    queueInfo.execFail();
                }
                else
                {
                    queueInfo.execOk();
                }

                delete this.queueInfoObj[groupName];
            }
            // console.log("---------------------->加载组完成：", groupName, this.loadGroupCount);
        }

        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        private onGroupLoadError(evt:RES.ResourceEvent):void 
        {
            var groupName:string = evt.groupName;

            console.warn(`加载资源报错：GroupName:${groupName}`);

            this.execGroupOverFn(groupName, true);
        }

        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onGroupProgress(event:RES.ResourceEvent):void
        {
            // console.log(event.resItem);
            // event.itemsLoaded / event.itemsTotal
            // if (this.loadUI)
            // {
            //    this.loadUI.setProgress(event.itemsLoaded, event.itemsTotal);
            // }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(evt:RES.ResourceEvent):void 
        {
            console.warn(`加载资源报错：FileName-->${evt.resItem.url}`);
        }
    }

    /**  */
    class GroupQueueInfo
    {
        public groupName:string;

        private backFuns:Function[] = [];
        private errFuns:Function[] = [];
        private fnThiss:any[] = [];
        private args:any[][] = [];

        public loading:boolean = false;

        public pri:number = -999999999;

        public addBack(backFn:Function, errFn:()=>void, fnThis:any, param:any):void
        {
            this.backFuns.push(backFn);
            this.errFuns.push(errFn);
            this.fnThiss.push(fnThis);
            this.args.push(param);
        }

        public check(backFn:Function, errFn:()=>void, fnThis:any, param:any[]):boolean
        {
            let len:number = this.backFuns.length;

            for (let i:number = 0; i < len; i++)
            {
                if (this.backFuns[i] == backFn && this.errFuns[i] == errFn && this.fnThiss[i] == fnThis && this.args[i] == param)
                {
                    return true;
                }
            }
            return false;
        }

        public execOk():void
        {
            let len:number = this.backFuns.length;
            for (let i:number = 0; i < len; i++)
            {
                if (this.backFuns[i])
                {
                    this.backFuns[i].apply(this.fnThiss[i], this.args[i]);
                }
            }

            this.backFuns.length = this.errFuns.length = this.fnThiss.length = this.args.length = 0;
        }

        public execFail():void
        {
            let len:number = this.errFuns.length;
            for (let i:number = 0; i < len; i++)
            {
                if (this.errFuns[i])
                {
                    this.errFuns[i].apply(this.fnThiss[i]);
                }
            }

            this.backFuns.length = this.errFuns.length = this.fnThiss.length = this.args.length = 0;
        }
    }
}