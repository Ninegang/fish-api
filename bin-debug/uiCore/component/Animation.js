var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var uiCore;
(function (uiCore) {
    /**
     * 序列帧动画组件，可加入到布局
     * 官方提供的工具是egret.MovieClip类型的，当时感觉无法配合GUI来布局，所以这里提供了自定义的
     * 目前看来，应该官方提供的也可以参与布局，尽管如此，动画组件还是用这个类，后续把官方支持集成进来就行
     * 一轮播放完成会抛出egret.Event.COMPLETE事件
     * @author none
     *
     */
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation(animationSource) {
            var _this = _super.call(this) || this;
            /**
             * 名称过滤，即图集中只有相关的名称资源才加入序列帧列表中
             */
            _this.animationSource = "demo{0}_png";
            /**
             * 是否自动播放
             */
            _this.autoPlay = true;
            /**
             * 是否循环播放
             */
            _this.loop = true;
            /**
             * 循环间隔
             */
            _this.loopTime = 0;
            /**
             * 动画帧频
             */
            _this.frameRate = 24;
            /*
             *帧数
             */
            _this.frameNum = 0;
            /**
             * 播放到某一帧停止
             */
            _this.stopIndex = 0;
            //在停止状态下是否隐藏
            _this.stopAndVisible = false;
            _this.loopID = -1;
            _this.frames = new Array();
            _this._currentFrame = -1;
            _this._isPlaying = false;
            _this.reverse = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.animationSource = animationSource;
            return _this;
        }
        Object.defineProperty(Animation.prototype, "isPlaying", {
            /**
             * 是否正在播放
             */
            get: function () {
                return this._isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.onRemoved = function (event) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.stop();
        };
        Animation.prototype.onAdded = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.refresh();
        };
        Animation.prototype.childrenCreated = function () {
            this.getResources();
        };
        Animation.prototype.getResources = function () {
            this.frames = [];
            if (this.frameNum == 0) {
                var i = 1;
                var str = "01";
                while (!!RES.getRes(uiCore.StringUtils.format(this.animationSource, str))) {
                    this.frames.push(uiCore.StringUtils.format(this.animationSource, str));
                    i++;
                    str = i + "";
                    if (i < 10) {
                        str = "0" + i;
                    }
                }
            }
            else {
                for (var i = 1; i <= this.frameNum; i++) {
                    var str = i + "";
                    if (i < 10) {
                        str = "0" + str;
                    }
                    this.frames.push(uiCore.StringUtils.format(this.animationSource, str));
                }
            }
        };
        /**
         * 播放动画
         */
        Animation.prototype.play = function () {
            this.reverse = false;
            this.visible = true;
            if (this._isPlaying) {
                this.stop();
            }
            this.timerID = egret.setInterval(this.onInterval, this, this.frameRate);
            this._isPlaying = true;
        };
        /**
         * 倒序播放
         */
        Animation.prototype.reversePlay = function () {
            this.reverse = true;
            this.visible = true;
            if (this._isPlaying) {
                this.stop();
            }
            this.timerID = egret.setInterval(this.onInterval, this, this.frameRate);
            this._isPlaying = true;
        };
        /**
         * 播放动画到某一帧后停止
         */
        Animation.prototype.playToIndex = function (index) {
            this.visible = true;
            if (this._isPlaying) {
                this.stop();
            }
            if (index > this.frameNum - 1) {
                index = this.frameNum - 1;
            }
            this.stopIndex = index;
            this.timerID = egret.setInterval(this.onIntervalControlByIndex, this, this.frameRate);
            this._isPlaying = true;
        };
        /**
         * 停止动画
         */
        Animation.prototype.stop = function () {
            this.currentFrame = 0;
            egret.clearInterval(this.timerID);
            this._isPlaying = false;
            if (this.loopID != -1) {
                egret.clearTimeout(this.loopID);
            }
        };
        /**
         * 停止动画到某一帧
         */
        Animation.prototype.stopToIndex = function (index) {
            this.setFrame(index);
            this.currentFrame = index;
        };
        Object.defineProperty(Animation.prototype, "currentFrame", {
            set: function (frame) {
                this._currentFrame = frame;
            },
            enumerable: true,
            configurable: true
        });
        // public get currentFrame(): number {
        //     return this._currentFrame;
        // }
        /**设置某一帧资源 */
        Animation.prototype.setFrame = function (index) {
            this.stop();
            if (index > this.frameNum - 1) {
                index = this.frameNum - 1;
            }
            this.source = this.frames[index];
            this.visible = true;
        };
        /**
         * 获取当前播放的帧数
         */
        Animation.prototype.getCurrentFrame = function () {
            return this._currentFrame;
        };
        /**
         * 刷新动画
         */
        Animation.prototype.refresh = function () {
            this.stop();
            if (this.autoPlay) {
                this.onInterval();
                this.play();
            }
            else {
                this.source = this.frames[this._currentFrame];
            }
        };
        Animation.prototype.onInterval = function () {
            if (uiCore.Utils.checkRealVisible(this)) {
                if (this.reverse) {
                    this.source = this.frames.concat().reverse()[this._currentFrame];
                }
                else {
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
                    }
                    else {
                        this.stop();
                        this.visible = !this.stopAndVisible;
                    }
                    if (!this.completeEvent) {
                        this.completeEvent = new egret.Event(egret.Event.ENDED);
                    }
                    this.dispatchEvent(this.completeEvent); //抛出一轮播放完成事件
                }
            }
        };
        Animation.prototype.onIntervalControlByIndex = function () {
            if (!uiCore.Utils.checkRealVisible(this))
                return;
            this.source = this.frames[this._currentFrame];
            this.currentFrame = this._currentFrame + 1;
            if (this._currentFrame == this.frames.length) {
                this.currentFrame = 0;
                this.play();
            }
            if (this._currentFrame == this.stopIndex) {
                this.stopToIndex(this.stopIndex); // 停止动画到某一帧
                if (!this.completeEvent) {
                    this.completeEvent = new egret.Event(egret.Event.ENDED);
                }
                this.dispatchEvent(this.completeEvent); //抛出一轮播放完成事件
            }
        };
        return Animation;
    }(eui.Image));
    uiCore.Animation = Animation;
    __reflect(Animation.prototype, "uiCore.Animation");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Animation.js.map