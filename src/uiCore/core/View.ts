namespace uiCore {
	/**
	 * 界面
	 * @author none
	 *
	 */
    export class View extends eui.Component implements IBehaviour {
        /**
         * 界面所需资源是否加载完成
         */
        public isLoaded: boolean = false;
        /**
        * 子类重写此get函数来告诉底层本场景用到的资源组
        * 部分界面如果资源过多，需要等资源加载完成并显示到时候，就需要重写此属性并返回资源组
        * */
        public get resourceList(): Array<string> {
            return [];
        }
        /**
         * 用于中间层验证，如果有视图中间层，请在其构造中把他的类路径push进来，否则会有个警告产生
         * 例如： this.baseClasses.push("base.View")
         */
        protected baseClasses: Array<string> = ["uiCore.Window", "uiCore.Scene"];
        /**
         * 界面
         */
        public constructor() {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.awake();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        }
        /**
         * 当添加到舞台时
         * @param event 事件对象
         */
        protected onAddedToStage(event: egret.Event): void {
            uiCore.EventManager["getInstance"]().on(Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().on(Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["getInstance"]().on(Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().on(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        }
        /**
         * 查找某个容器所有的子孙控件
         * @param parent 父容器
         * @param result 查询结果
         */
        public findChildren(parent: egret.DisplayObjectContainer, result: Array<egret.DisplayObject> = []): Array<egret.DisplayObject> {
            for (var i: number = 0; i < parent.numChildren; i++) {
                var child: egret.DisplayObject = parent.getChildAt(i);
                result.push(child);
                if (egret.is(child, "egret.DisplayObjectContainer")) {
                    this.findChildren(<egret.DisplayObjectContainer>child, result);
                }
            }
            return result;
        }
        /**
         * 每次渲染都会调用
         */
        public onRender(): void {

        }
        /**
         * 拉伸UI至铺满舞台
         */
        public stretch(): void {
            this.left = this.right = this.top = this.bottom = 0;
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
        /**
         * 在应用退出之前调用，如果返回false可以阻止应用退出
         */
        public onApplicationQuit(): boolean {
            return true;
        }
        /**
         * 应用得到焦点
         */
        public onApplicationFocus(): void {
            this.removeAllAnimation();
            this.removeAllEffectList();
            this.removeAllTimeList();
            this.removeAllIntervalList();
        }
        /**
         * 应用失去焦点
         */
        public onApplicationPause(): void {

        }
        /**
         * 按下返回键
         */
        public onBack(): void {

        }
		/**
		* 脚本初始化完成
		* */
        public awake(): void {

        }
        /**
         * 模块初始化完成
         */
        public onModuleInit(): void {

        }
      
        /**
         * 每帧都会调用
         */
        public update(): void {

        }
        /**
         * 当子项创建完成，推荐重写start
         */
        public childrenCreated(): void {
            this.dispatchEventWith("childrenCreated");
            this.start();
        }

        /**
         * 当从舞台移除时，推荐重写onDestroy
         * @param event 事件对象
         */
        protected onRemovedFromStage(event: egret.Event): void {
            this.destroyResources();
            egret.Tween.removeTweens(this);
            uiCore.EventManager["getInstance"]().off(Application.APPEVENT_BACK, this.onBack, this);
            uiCore.EventManager["getInstance"]().off(Application.APPEVENT_PAUSE, this.onPause, this);
            uiCore.EventManager["getInstance"]().off(Application.APPEVENT_RESUME, this.onResume, this);
            uiCore.EventManager["getInstance"]().off(uiCore.Application.APPEVENT_EXIT, this.onExit, this);
            this.onDestroy();
        }
        /**
         * 销毁所用资源，由resourceList指定
         */
        public destroyResources(): void {
        }
        /**
        * 显示对象初始化完成
        */
        public start(): void {
        }
        /**
         * 被移除的时候调用，可以当作析构函数使用，用来移除事件监听，清除引用等防止内存泄漏
         */
        public onDestroy(): void {
        }

        /*************************************************动画 定时器 管理*********************************************/
        private effectList: Array<string> = [];
        private timeList: Array<string> = [];
        private intervalList: Array<string> = [];
        private animationList: Array<string> = [];
        private animatorList: Array<any> = [];
        public pushAnimation(name: string) {
            this.deleteAnimation(name);
            if (this.animationList.indexOf(name) < 0) {
                this.animationList.push(name);
            }
        }
        public deleteAnimation(name: string) {
            var index = this.animationList.indexOf(name);
            if (index > -1) {
                this[name].stop();
                this[name].visible = false;
                this[name].source = "";
                this.animationList.splice(index, 1);
            }
        }
        public removeAllAnimation() {
            for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
                this[list[i]].stop();
                this[list[i]].visible = false;
            }
            this.animationList = [];
        }
        public pushTimeList(name: string) {
            this.deleteTimeList(name);
            if (this.timeList.indexOf(name) < 0) {
                this.timeList.push(name);
            }
        }
        public deleteTimeList(name: string) {
            var index = this.timeList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.clearTimeout(this[name]);
                    this[name] = -1;
                }
                this.timeList.splice(index, 1);
            }
        }
        public removeAllTimeList() {
            for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.clearTimeout(this[list[i]]);
                    this[list[i]] = -1;
                }
            }
            this.timeList = [];
        }

        public pushIntervalList(name: string) {
            this.deleteIntervalList(name);
            if (this.intervalList.indexOf(name) < 0) {
                this.intervalList.push(name);
            }
        }
        public deleteIntervalList(name: string) {
            var index = this.intervalList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.clearInterval(this[name]);
                    this[name] = -1;
                }
                this.intervalList.splice(index, 1);
            }
        }
        public removeAllIntervalList() {
            for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.clearInterval(this[list[i]]);
                    this[list[i]] = -1;
                }
            }
            this.intervalList = [];
        }
        public pushEffectList(name: string) {
            this.deleteEffectList(name);
            if (this.effectList.indexOf(name) < 0) {
                this.effectList.push(name);
            }
        }
        public deleteEffectList(name: string) {
            var index = this.effectList.indexOf(name);
            if (index > -1) {
                if (this[name] != -1) {
                    egret.Tween.removeTweens(this[name]);
                }
                this.effectList.splice(index, 1);
            }
        }
        public removeAllEffectList() {
            for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
                if (this[list[i]] != -1) {
                    egret.Tween.removeTweens(this[list[i]]);
                }
            }
            this.effectList = [];
        }

        // 龙骨动画
        public pushAnimator(animator): void {
            this.deleAnimator(animator);
            if (this.animatorList.indexOf(animator) < 0) {
                this.animatorList.push(animator);
            }
        }
        // 
        public deleAnimator(animator): void {
            var idx = this.animatorList.indexOf(animator);
            if (idx > -1) {
                if (!!this[animator]) {
                    animator.parent && animator.parent.removeChild();
                }
                this.animatorList.splice(idx, 1);
            }
        }
        public removeAllAnimator(): void {
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
        }
    }
}
