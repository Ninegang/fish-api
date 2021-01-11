namespace core
{
    /**
     * 所有窗口的基类，窗口在舞台的生命周期包括awake、openEffect、start、close、closeEffect、onDestroy这6个阶段
     */
    export class BaseWindow extends BaseView 
    {
        /** 是否显示背景 */
        public showBg:boolean = true;
        /** 点击背景自动关闭 */
        public autoClose:boolean = true;

        /**
        * 子类重写此get函数来告诉底层本场景用到的资源组
        * 部分界面如果资源过多，需要等资源加载完成并显示到时候，就需要重写此属性并返回资源组
        * */
        private __resList:string[] = [];
        public get resourceList():string[]
        {
            return this.__resList;
        }

        //-------------------------------------------------------------------------------

        public constructor() 
        {
            super();
        }

        protected onEnable():void
        {
            super.onEnable();

            this.openEffect();
        }

        /**
        * 打开特效，子类可以继承并返回false来禁止播放打开特效
        * */
        protected openEffect():void 
        {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            this.alpha = 0.5;
            egret.Tween.get(this).
                to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, egret.Ease.cubicOut).
                call(this.onOpenScaleComplete, this);
        }

        /**
         * 当打开特效完成
         */
        protected onOpenScaleComplete(): void 
        {
            egret.callLater(() => 
            {
                this.alpha = this.scaleX = this.scaleY = 1;
            }, this);
        }
        

        /**
        * 关闭窗口
        * */
        public closeWindow(): void 
        {
            uiCore.WindowManager.getInstance().closeWindow(this);
        }
    }
}
    