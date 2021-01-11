namespace uiCore {
    /**
    * 资源加载类，加载一批资源组
    * @author none
    *
    */
    export class ResourceLoader extends egret.EventDispatcher {
        private groups: Array<string>;
        private onComplete: Function;
        private thisObject: any;
        private args: Array<any>;
        //资源加载
        private totalNumber: number = 1;
        private currentNumber: number = 0;
        private groupNumber: number = 1;
        private currentGroup: number = 0;
        private currentGroupName: string = "";
        public constructor() {
            super();
        }
        /**
         * 开始加载资源组
         * @param groups 资源组名称列表
         * @param onComplete 所有资源加载完成的回调
         * @param thisObject 回调方法的执行上下文
         * @param args 回调方法参数
         */
        public loadGroups(groups: Array<string>, onComplete: Function = null, thisObject: any = null, ...args): void {
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
        }
        private loadGroup(): void {
            if (this.groups && this.groups.length > 0) {
                var loadGroup: string = this.groups.shift();
                if (!RES.isGroupLoaded(loadGroup)) {
                    RES.loadGroup(loadGroup, 100);
                } else {
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
        }
        /**
        * 资源组加载出错
        */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
            this.dispatchEvent(event);
        }
        /**
        * 资源组加载进度
        */
        protected onResourceProgress(event: RES.ResourceEvent): void {
            if(event.resItem.name.lastIndexOf("_zip")>=0){
                uiCore.ZipManager.zipResourceProgress(event.resItem.name);
            } 
            if (this.currentGroupName != event.groupName) {
                this.currentNumber = this.totalNumber;
                this.totalNumber += event.itemsTotal;
                this.currentGroupName = event.groupName;
                this.currentGroup++;
                this.currentGroup = this.currentGroup > this.groupNumber ? this.groupNumber : this.currentGroup;
            }
            var percent: number = (event.itemsLoaded + this.currentNumber) * this.currentGroup * 100 / (this.totalNumber * this.groupNumber);
            Application.loadUI && Application.loadUI["onLoaddingProgress"] && Application.loadUI["onLoaddingProgress"](Math.ceil(percent));
        }
        /**
        * 资源组加载完成
        */
        protected onResourceLoadComplete(event: RES.ResourceEvent): void {
            trace("资源[" + event.groupName + "]:加载完成");
            this.dispatchEvent(event);
            this.loadGroup();
        }
        /**
         * 所有组资源加载完成
         */
        protected onAllGroupComplete(): void {
            if (this.onComplete) {
                this.onComplete.apply(this.thisObject, this.args);
            }
            this.dispatchEventWith(egret.Event.COMPLETE);
            this.onComplete = null;
            this.thisObject = null;
            this.args = null;
            this.groups = null;
        }
        /**
         * 清除引用
         */
        public destroy(): void {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    }
}

