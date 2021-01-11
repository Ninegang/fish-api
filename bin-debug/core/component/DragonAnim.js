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
var core;
(function (core) {
    /**
     * 龙骨动画组件
     */
    var DragonAnim = (function (_super) {
        __extends(DragonAnim, _super);
        function DragonAnim() {
            var _this = _super.call(this) || this;
            //----------------------------------------------------------------------------------------------------------
            _this.loadPri = 0;
            /** 资源根目录 */
            _this.animSource = "";
            /** //默认动画 */
            _this.defaultAnimationName = "";
            /** //自动播放 */
            _this.autoPlay = true;
            /** //播放一次 */
            _this.playOnce = false;
            /** //在停止状态下是否隐藏 */
            _this.stopLaterHide = false;
            //----------------------------------------------------------------------------------------------------------
            _this.loopNum = 0;
            _this._isLoaded = false;
            _this.touchEnabled = false;
            return _this;
        }
        DragonAnim.createDA = function (daName, autoPlay, playOnce) {
            if (autoPlay === void 0) { autoPlay = true; }
            if (playOnce === void 0) { playOnce = false; }
            var animator = new DragonAnim();
            animator.animSource = daName;
            animator.autoPlay = autoPlay;
            animator.playOnce = playOnce;
            return animator;
        };
        Object.defineProperty(DragonAnim.prototype, "isPlaying", {
            get: function () {
                if (!this.armatureDisplay) {
                    return false;
                }
                return this.armatureDisplay.animation.isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonAnim.prototype, "isLoaded", {
            /**
             * 是否加载完成
             */
            get: function () {
                return this._isLoaded;
            },
            enumerable: true,
            configurable: true
        });
        DragonAnim.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            if (this.playOnce) {
                this.loopNum = 1;
            }
            else {
                this.loopNum = 0;
            }
            this.setAnimSrc(this.animSource, this.defaultAnimationName, this.loadFn, this.loadThis);
        };
        DragonAnim.prototype.setAnimSrc = function (animSrc, animName, loadFn, loadThis) {
            this.animSource = animSrc;
            this.animName = animName;
            if (!!this.animSource) {
                this.setLoadFn(loadFn, loadThis);
                if (core.CoreConfig.isWebp && RES.hasRes(this.animSource + "_tex_webp")) {
                    this.imgSrc = this.animSource + "_tex_webp";
                }
                else {
                    this.imgSrc = this.animSource + "_tex_png";
                }
                core.LoaderManager.instance.loadResList([this.animSource + "_ske_json", this.animSource + "_tex_json", this.imgSrc], this.loadRESComplete, this, this.loadPri + core.LoaderManager.ONE_RES_EFFECT_PRI);
            }
        };
        DragonAnim.prototype.loadRESComplete = function () {
            if (!this.isDispose) {
                this.initAnim();
            }
        };
        DragonAnim.prototype.clearArmature = function () {
            if (this.armatureDisplay) {
                this.armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
                this.armatureDisplay.dispose(true);
                core.DisplayUtil.removeDisplay(this.armatureDisplay);
            }
        };
        DragonAnim.prototype.initAnim = function () {
            this._isLoaded = true;
            var dragonbonesData = RES.getRes(this.animSource + "_ske_json");
            var textureData = RES.getRes(this.animSource + "_tex_json");
            var texture = RES.getRes(this.imgSrc);
            if (!dragonbonesData || !textureData || !texture) {
                console.warn("资源" + this.animSource + "不存在");
                return;
            }
            this.clearArmature();
            var egretFactory = dragonBones.EgretFactory.factory;
            if (!egretFactory.getDragonBonesData(this.animSource)) {
                egretFactory.parseDragonBonesData(dragonbonesData);
                egretFactory.parseTextureAtlasData(textureData, texture);
            }
            this.armatureDisplay = egretFactory.buildArmatureDisplay(this.animSource);
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
            this.visible = !this.stopLaterHide;
            if (this.autoPlay) {
                var playAnimName = this.armatureDisplay.animation.animationNames.indexOf(this.animName) == -1 ? this.armatureDisplay.animation.animationNames[0] : this.animName;
                this.play(playAnimName, this.loopNum);
            }
            this.addChild(this.armatureDisplay);
            if (this.loadFn) {
                this.loadFn.call(this.loadThis);
                this.loadFn = null;
                this.loadThis = null;
            }
        };
        DragonAnim.prototype.onAnimationComplete = function (event) {
            this.visible = !this.stopLaterHide;
            this.execOverFn();
        };
        //播放动作（动作名，循环）
        DragonAnim.prototype.play = function (animationName, loopNum, overFn, overThis, duration) {
            this.autoPlay = true;
            this.animName = animationName;
            this.loopNum = loopNum;
            if (this.armatureDisplay && this.armatureDisplay.animation) {
                this.visible = true;
                this.armatureDisplay.animation.play(animationName, loopNum);
            }
            if (overFn && overThis && duration) {
                this.setOverFn(overFn, overThis, duration);
            }
        };
        DragonAnim.prototype.fadeIn = function (animationName, loopNum) {
            this.animName = animationName;
            if (this.armatureDisplay && this.armatureDisplay.animation) {
                this.visible = true;
                this.armatureDisplay.animation.fadeIn(animationName, 0.5, loopNum);
            }
        };
        DragonAnim.prototype.stop = function () {
            if (this.armatureDisplay && this.armatureDisplay.animation) {
                this.armatureDisplay.animation.stop();
                this.visible = !this.stopLaterHide;
            }
        };
        /**
         * 获取特效持续时间
         * @return duration {number} 默认帧率下(0.01) 即为毫秒数
         */
        DragonAnim.prototype.getAnimDuration = function () {
            return this.armatureDisplay.animation.getState(this.armatureDisplay.animation.animationList[0]).totalTime * 1000; //this.armature.animation.armatureData.getAnimationData(this.armature.animation.animationList[0]).duration;
        };
        /** 获取特定的插糟 */
        DragonAnim.prototype.getSlotByName = function (name) {
            if (this.armatureDisplay) {
                return this.armatureDisplay.armature.getSlot(name);
            }
            return null;
        };
        /**
         * 添加完成回调函数
         */
        DragonAnim.prototype.setOverFn = function (overFn, overThis, duration) {
            var _this = this;
            this.overFn = overFn;
            this.overThis = overThis;
            egret.clearTimeout(this.overTimeId);
            if (duration) {
                this.overTimeId = egret.setTimeout(function () {
                    _this.execOverFn();
                }, this, duration);
            }
        };
        DragonAnim.prototype.execOverFn = function () {
            if (this.overFn) {
                this.overFn.apply(this.overThis);
                this.overFn = null;
                this.overThis = null;
            }
            egret.clearTimeout(this.overTimeId);
        };
        DragonAnim.prototype.setLoadFn = function (loadFn, loadThis) {
            if (this._isLoaded) {
                if (loadFn) {
                    loadFn.call(loadThis);
                }
            }
            else {
                this.loadFn = loadFn;
                this.loadThis = loadThis;
            }
        };
        DragonAnim.prototype.onDestroy = function () {
            this.clearArmature();
            this.armatureDisplay = null;
            this.overFn = null;
            this.overThis = null;
            this.loadFn = null;
            this.loadThis = null;
            egret.clearTimeout(this.overTimeId);
            _super.prototype.onDestroy.call(this);
        };
        return DragonAnim;
    }(core.BaseView));
    core.DragonAnim = DragonAnim;
    __reflect(DragonAnim.prototype, "core.DragonAnim");
})(core || (core = {}));
//# sourceMappingURL=DragonAnim.js.map