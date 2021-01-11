namespace uiCore {
	/**
	 * 序列帧动画组件，可加入到布局
	 * 官方提供的工具是egret.MovieClip类型的，当时感觉无法配合GUI来布局，所以这里提供了自定义的
	 * 目前看来，应该官方提供的也可以参与布局，尽管如此，动画组件还是用这个类，后续把官方支持集成进来就行
	 * 一轮播放完成会抛出egret.Event.COMPLETE事件
	 * @author none
	 *
	 */
    export class Animation extends eui.Image {
        /**
         * 名称过滤，即图集中只有相关的名称资源才加入序列帧列表中
         */
        public animationSource: string = "demo{0}_png";
        /**
         * 是否自动播放
         */
        public autoPlay: boolean = true;
        /**
         * 是否循环播放
         */
        public loop: boolean = true;
        /**
         * 循环间隔
         */
        public loopTime: number = 0;
        /**
         * 动画帧频
         */
        public frameRate: number = 24;
        /*
         *帧数
         */
        public frameNum: number = 0;
        /**
         * 播放到某一帧停止
         */
        public stopIndex: number = 0;
        /**
         * 是否正在播放
         */
        public get isPlaying(): Boolean {
            return this._isPlaying;
        }
        //在停止状态下是否隐藏
        public stopAndVisible: boolean = false;
        private timerID: number;
        private loopID: number = -1;
        public frames: Array<string> = new Array<string>();
        public _currentFrame: number = -1;
        private completeEvent: egret.Event;
        private _isPlaying: Boolean = false;
        public reverse: boolean = false;
        public constructor(animationSource?: string) {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.animationSource = animationSource;
        }
        private onRemoved(event: egret.Event): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.stop();
        }
        private onAdded(event: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.refresh();
        }
        public childrenCreated(): void {
            this.getResources();
        }
        public getResources(): void {
            this.frames = [];
            if (this.frameNum == 0) {
                var i = 1;
                var str:string="01";
                while (!!RES.getRes(uiCore.StringUtils.format(this.animationSource, str))) {
                    this.frames.push(uiCore.StringUtils.format(this.animationSource, str));
                    i++;
                    str=i+"";
                    if(i<10){
                        str="0"+i;
                    }
                }
            } else {
                for (var i = 1; i <= this.frameNum; i++) {
                    var str:string=i+"";
                    if(i<10){
                        str="0"+str;
                    }
                    this.frames.push(uiCore.StringUtils.format(this.animationSource, str));
                }
            }
        }
        /**
         * 播放动画
         */
        public play(): void {
            this.reverse = false;
            this.visible = true;
            if (this._isPlaying) {//如果正在播放则先停止
                this.stop();
            }
            this.timerID = egret.setInterval(this.onInterval, this, this.frameRate);
            this._isPlaying = true;
        }
        /**
         * 倒序播放
         */
        public reversePlay(): void {
            this.reverse = true;
            this.visible = true;
            if (this._isPlaying) {//如果正在播放则先停止
                this.stop();
            }
            this.timerID = egret.setInterval(this.onInterval, this, this.frameRate);
            this._isPlaying = true;
        }
        /**
         * 播放动画到某一帧后停止
         */
        public playToIndex(index: number): void {
            this.visible = true;
            if (this._isPlaying) {//如果正在播放则先停止
                this.stop();
            }
            if (index > this.frameNum - 1) {
                index = this.frameNum - 1;
            }
            this.stopIndex = index;
            this.timerID = egret.setInterval(this.onIntervalControlByIndex, this, this.frameRate);
            this._isPlaying = true;
        }
        /**
         * 停止动画
         */
        public stop(): void {
            this.currentFrame = 0;
            egret.clearInterval(this.timerID);
            this._isPlaying = false;
            if (this.loopID != -1) {
                egret.clearTimeout(this.loopID);
            }
        }
        /**
         * 停止动画到某一帧
         */
        public stopToIndex(index: number): void {
            this.setFrame(index);
            this.currentFrame = index;
        }
        public set currentFrame(frame: number) {
            this._currentFrame = frame;
        }
        // public get currentFrame(): number {
        //     return this._currentFrame;
        // }
        /**设置某一帧资源 */
        public setFrame(index: number) {
            this.stop();
            if (index > this.frameNum - 1) {
                index = this.frameNum - 1;
            }
            this.source = this.frames[index];
            this.visible = true;
        }
        /**
         * 获取当前播放的帧数
         */
        public getCurrentFrame(): number {
            return this._currentFrame;
        }
        /**
         * 刷新动画
         */
        public refresh(): void {
            this.stop();
            if (this.autoPlay) {
                this.onInterval();
                this.play();
            }
            else {
                this.source = this.frames[this._currentFrame];
            }
        }
        private onInterval(): void {
            if (uiCore.Utils.checkRealVisible(this)) {
                if (this.reverse) {
                    this.source = this.frames.concat().reverse()[this._currentFrame];
                } else {
                    this.source = this.frames[this._currentFrame];
                }
                this.currentFrame = this._currentFrame + 1;
                if (this._currentFrame == this.frames.length) {
                    if (this.loop) {
                        this.currentFrame = 0;
                        if (this.loopTime > 0) {
                            this.stop();
                            this.loopID = egret.setTimeout(this.play, this, this.loopTime);
                        }
                    } else {
                        this.stop();
                        this.visible = !this.stopAndVisible;
                    }
                    if (!this.completeEvent) {
                        this.completeEvent = new egret.Event(egret.Event.ENDED);
                    }
                    this.dispatchEvent(this.completeEvent);//抛出一轮播放完成事件
                }
            }
        }
        private onIntervalControlByIndex(): void {
            if (!uiCore.Utils.checkRealVisible(this)) return;
            this.source = this.frames[this._currentFrame];
            this.currentFrame = this._currentFrame + 1;
            if (this._currentFrame == this.frames.length) {
                this.currentFrame = 0;
                this.play();
            }
            if (this._currentFrame == this.stopIndex) {
                this.stopToIndex(this.stopIndex);// 停止动画到某一帧
                if (!this.completeEvent) {
                    this.completeEvent = new egret.Event(egret.Event.ENDED);
                }
                this.dispatchEvent(this.completeEvent);//抛出一轮播放完成事件
            }
        }
    }
}
