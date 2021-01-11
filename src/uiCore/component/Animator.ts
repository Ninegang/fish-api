namespace uiCore {
	/**
	 * 龙骨动画组件
	 * @author none
	 *
	 */
    export class Animator extends eui.Group {
        /**
         * 资源根目录
         */
        public source = "";
        /**
         * 资源根目录
         */
        public sourceGroup = "";
        /**
         * 数据越小，播放速度越慢
         */
        public speed: number = 1;
        public static isAdvanceTime: boolean = false;
        private armature: dragonBones.EgretArmatureDisplay;
        public autoPlay: boolean = true;//自动播放
        public playOnce: boolean = false;//播放一次
        public defentAnimationName: string = "";//默认动画
        public stopAndVisible: boolean = false;//在停止状态下是否隐藏
        public static EVENT_LOADCOMPLETE: string = "loadComplete";
        private _isLoaded: boolean = false;
        public get isPlaying(): boolean {
            if (!this.armature) {
                return false;
            }
            return this.armature.animation.isPlaying;
        }
        /**
         * 是否加载完成
         */
        public get isLoaded(): boolean {
            return this._isLoaded;
        }
        private okHander: Function;
        private thisObject: any;
        private params: Array<any>;
        public constructor() {
            super();
        }
        public getResource(): void {
            if (this.source != "") {
                if (this.sourceGroup != "") {
                    if (RES.isGroupLoaded(this.sourceGroup)) {
                        if (this.armature && this.contains(this.armature)) {
                            this.armature.removeEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
                            this.removeChild(this.armature);
                        }
                        else {
                            this.init();
                        }
                    } else {
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.loadGroup(this.sourceGroup);
                    }
                } else {
                    if (this.loadRESComplete()) {
                        RES.getResAsync(this.source + "_ske_json", this.loadRESComplete, this);
                        RES.getResAsync(this.source + "_tex_json", this.loadRESComplete, this);
                        RES.getResAsync(this.source + "_tex_png", this.loadRESComplete, this);
                    }
                }
            }
        }
        public loadRESComplete(): boolean {
            if (RES.getRes(this.source + "_ske_json") && RES.getRes(this.source + "_tex_json") && RES.getRes(this.source + "_tex_png")) {
                this.init();
                return false;
            }
            return true;
        }
        protected onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName != this.sourceGroup) {
                return;
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.init();
        }
        public childrenCreated(): void {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.getResource();
        }
        protected init(): void {
            this._isLoaded = true;
            var dragonbonesData = RES.getRes(this.source + "_ske_json");
            var textureData = RES.getRes(this.source + "_tex_json");
            var texture = RES.getRes(this.source + "_tex_png");
            if (!dragonbonesData || !textureData || !texture) {
                warn("资源" + this.source + "不存在");
                return;
            }
            if (this.armature) {
                this.removeChild(this.armature);
            }
            var egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
            if (!egretFactory.getDragonBonesData(this.source)) {
                egretFactory.parseDragonBonesData(dragonbonesData);
                egretFactory.parseTextureAtlasData(textureData, texture);
            }
            this.armature = egretFactory.buildArmatureDisplay(this.source, this.source);
            if (!this.armature) {
                // this.armature = null 说明骨架的名字和source不一样
                let dragonBonesDataMap = egretFactory.getAllDragonBonesData();
                let dragonBonesData = dragonBonesDataMap[this.source];
                let armatureName = dragonBonesData.armatureNames[0];
                this.armature = egretFactory.buildArmatureDisplay(armatureName, this.source)
            }
            this.addChild(this.armature);
            this.armature.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
            this.visible = !this.stopAndVisible;
            if (this.autoPlay) {
                var defentAnimationName = this.armature.animation.animationNames.indexOf(this.defentAnimationName) == -1 ? this.armature.animation.animationNames[0] : this.defentAnimationName;
                if (this.playOnce) {
                    this.play(defentAnimationName, 1).timeScale = this.speed;
                } else {
                    this.play(defentAnimationName).timeScale = this.speed;
                }
            }
            if (!Animator.isAdvanceTime) {
                egret.Ticker.getInstance().register(Animator.onTicker, this);
                Animator.isAdvanceTime = true;
            }
            this.dispatchEventWith(Animator.EVENT_LOADCOMPLETE);
        }
        private static onTicker(frameTime: number) {
            dragonBones.WorldClock.clock.advanceTime(frameTime / 1000);
        }
        private onRemovedFromStage(event: egret.Event) {
            if (event.type != egret.Event.REMOVED || event.type != egret.Event.REMOVED_FROM_STAGE) return;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.stop();
            if (!Animator.isAdvanceTime) {
                egret.Ticker.getInstance().unregister(Animator.onTicker, this);
            }
            if (this.armature) {
                this.armature.removeEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
                this.armature.dispose(true);
                if (this.armature && this.armature.parent) {
                    this.armature.parent.removeChild(this.armature);
                }
            }
            if (dragonBones.EgretFactory.factory.getDragonBonesData(this.source)) {
                dragonBones.EgretFactory.factory.removeDragonBonesData(this.source, false);
            }
            this.armature = null;
            this.okHander = null;
            this.thisObject = null;
            this.params = null;
        }
        private onAnimationComplete(event: dragonBones.AnimationEvent): void {
            this.visible = !this.stopAndVisible;
            this.dispatchEvent(event);
            if (this.okHander) {
                this.okHander.apply(this.thisObject, this.params);
            }
        }

        public play(animationName?: string, loopNum?: number) {
            if (!this.armature) {
                return;
            }
            this.armature.animation.stop();
            this.visible = true;
            return this.armature.animation.play(animationName, loopNum);
        }

        public stop(): void {
            if (this.armature && this.armature.animation) {
                this.armature.animation.stop();
                this.visible = !this.stopAndVisible;
            }
        }
        /**
         * 获取特效持续时间
         * @return duration {number} 默认帧率下(0.01) 即为毫秒数
         */
        public getAnimDuration(): number {
            return this.armature.animation.getState(this.armature.animation.animationNames[0]).totalTime * 1000;//this.armature.animation.armatureData.getAnimationData(this.armature.animation.animationNames[0]).duration;
        }
        /**
         * 添加完成回调函数
         */
        public addHander(okHander: Function, thisObject: any, params?: Array<any>): void {
            this.okHander = okHander;
            this.thisObject = thisObject;
            this.params = params;
        }
        /**
         * 节点换装
         */
        public replaceSlot(slotName: string, index: number): void {
            var slot: dragonBones.Slot = this.armature.armature.getSlot(slotName);
            slot.displayController = 'none';
            slot.displayIndex = index;
        }

        /**************临时添加 待完善****************** */
        public get animation(): dragonBones.Animation {
            if (this.armature)
                return this.armature.animation;
        }
    }
}
