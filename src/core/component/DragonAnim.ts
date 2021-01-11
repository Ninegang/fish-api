namespace core
{
    /**
     * 龙骨动画组件
     */
    export class DragonAnim extends BaseView
    {
        public static createDA(daName:string, autoPlay:boolean = true, playOnce:boolean = false):DragonAnim
        {
            var animator:DragonAnim = new DragonAnim();
            animator.animSource = daName;
            animator.autoPlay = autoPlay;
            animator.playOnce = playOnce;
            return animator;
        }

        //----------------------------------------------------------------------------------------------------------
        public loadPri:number = 0;
        /** 资源根目录 */
        public animSource = "";
        /** //默认动画 */
        public defaultAnimationName: string = "";
        /** //自动播放 */
        public autoPlay: boolean = true;
        /** //播放一次 */
        public playOnce: boolean = false;
        /** //在停止状态下是否隐藏 */
        public stopLaterHide: boolean = false;
        
        //----------------------------------------------------------------------------------------------------------
        
        private loopNum:number = 0;

        private _isLoaded: boolean = false;
        private armatureDisplay: dragonBones.EgretArmatureDisplay;

        private imgSrc:string;

        public get isPlaying(): boolean 
        {
            if (!this.armatureDisplay) 
            {
                return false;
            }
            return this.armatureDisplay.animation.isPlaying;
        }

        /**
         * 是否加载完成
         */
        public get isLoaded(): boolean 
        {
            return this._isLoaded;
        }

        private overFn:()=>void;
        private overThis: any;

        private loadFn:()=>void;
        private loadThis:any;

        public constructor() 
        {
            super();
            
            this.touchEnabled = false;
        }

        protected onAwake():void
        {
            super.onAwake();

            if (this.playOnce)
            {
                this.loopNum = 1;
            }
            else
            {
                this.loopNum = 0;
            }

            this.setAnimSrc(this.animSource, this.defaultAnimationName, this.loadFn, this.loadThis);
        }

        public setAnimSrc(animSrc:string, animName:string, loadFn?:()=>void, loadThis?:any):void
        {
            this.animSource = animSrc;
            this.animName = animName;

            if (!!this.animSource) 
            {
                this.setLoadFn(loadFn, loadThis);
                
                if (CoreConfig.isWebp && RES.hasRes(this.animSource + "_tex_webp"))
                {
                    this.imgSrc = this.animSource + "_tex_webp";
                }
                else
                {
                    this.imgSrc = this.animSource + "_tex_png";
                }

                core.LoaderManager.instance.loadResList([this.animSource + "_ske_json", this.animSource + "_tex_json", this.imgSrc], this.loadRESComplete, this, this.loadPri + core.LoaderManager.ONE_RES_EFFECT_PRI);
            }
        }

        public loadRESComplete():void 
        {
            if (!this.isDispose)
            {
                this.initAnim();
            }
        }

        private clearArmature():void
        {
            if (this.armatureDisplay) 
            {
                this.armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
                this.armatureDisplay.dispose(true);
                DisplayUtil.removeDisplay(this.armatureDisplay);
            }
        }

        protected initAnim(): void 
        {
            this._isLoaded = true;
            
            var dragonbonesData = RES.getRes(this.animSource + "_ske_json");
            var textureData = RES.getRes(this.animSource + "_tex_json");
            var texture = RES.getRes(this.imgSrc);
            
            if (!dragonbonesData || !textureData || !texture) 
            {
                console.warn("资源" + this.animSource + "不存在");
                return;
            }

            this.clearArmature();
            
            var egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
            if (!egretFactory.getDragonBonesData(this.animSource)) 
            {
                egretFactory.parseDragonBonesData(dragonbonesData);
                egretFactory.parseTextureAtlasData(textureData, texture);
            }
            
            this.armatureDisplay = egretFactory.buildArmatureDisplay(this.animSource);
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);

            this.visible = !this.stopLaterHide;

            if (this.autoPlay) 
            {
                let playAnimName = this.armatureDisplay.animation.animationNames.indexOf(this.animName) == -1 ? this.armatureDisplay.animation.animationNames[0] : this.animName;
                this.play(playAnimName, this.loopNum);
            }

            this.addChild(this.armatureDisplay);

            if (this.loadFn)
            {
                this.loadFn.call(this.loadThis);

                this.loadFn = null;
                this.loadThis = null;
            }
        }

        private onAnimationComplete(event: dragonBones.AnimationEvent): void 
        {
            this.visible = !this.stopLaterHide;

            this.execOverFn();
        }

        private animName:string;
        //播放动作（动作名，循环）
        public play(animationName?: string, loopNum?: number, overFn?:()=>void, overThis?:any, duration?:number): void 
        {
            this.autoPlay = true;
            this.animName = animationName;
            this.loopNum = loopNum;

            if (this.armatureDisplay && this.armatureDisplay.animation) 
            {
                this.visible = true;
                this.armatureDisplay.animation.play(animationName, loopNum);
            }

            if (overFn && overThis && duration)
            {
                this.setOverFn(overFn, overThis, duration);
            }
        }

        public fadeIn(animationName?: string, loopNum?: number):void
        {
            this.animName = animationName;

            if (this.armatureDisplay && this.armatureDisplay.animation) 
            {
                this.visible = true;
                this.armatureDisplay.animation.fadeIn(animationName, 0.5, loopNum);
            }
        }

        public stop(): void 
        {
            if (this.armatureDisplay && this.armatureDisplay.animation) 
            {
                this.armatureDisplay.animation.stop();
                this.visible = !this.stopLaterHide;
            }
        }

        /**
         * 获取特效持续时间
         * @return duration {number} 默认帧率下(0.01) 即为毫秒数
         */
        public getAnimDuration(): number 
        {
            return this.armatureDisplay.animation.getState(this.armatureDisplay.animation.animationList[0]).totalTime * 1000;//this.armature.animation.armatureData.getAnimationData(this.armature.animation.animationList[0]).duration;
        }

        /** 获取特定的插糟 */
        public getSlotByName(name:string):dragonBones.Slot
        {
            if (this.armatureDisplay)
            {
                return this.armatureDisplay.armature.getSlot(name);
            }
            return null;
        }

        private overTimeId:number;
        /**
         * 添加完成回调函数
         */
        public setOverFn(overFn:()=>void, overThis:any, duration?:number):void 
        {
            this.overFn = overFn;
            this.overThis = overThis;

            egret.clearTimeout(this.overTimeId);
            if (duration)
            {
                this.overTimeId = egret.setTimeout(()=>
                {
                    this.execOverFn();
                }, this, duration);
            }
        }

        private execOverFn():void
        {
            if (this.overFn) 
            {
                this.overFn.apply(this.overThis);

                this.overFn = null;
                this.overThis = null;
            }
            
            egret.clearTimeout(this.overTimeId);
        }

        public setLoadFn(loadFn:()=>void, loadThis:any):void
        {
            if (this._isLoaded)
            {
                if (loadFn)
                {
                    loadFn.call(loadThis);
                }
            }
            else
            {
                this.loadFn = loadFn;
                this.loadThis = loadThis;
            }
        }

        public onDestroy(): void 
        {
            this.clearArmature();

            this.armatureDisplay = null;
            this.overFn = null;
            this.overThis = null;

            this.loadFn = null;
            this.loadThis = null;
            egret.clearTimeout(this.overTimeId);

            super.onDestroy();
        }
    }
}