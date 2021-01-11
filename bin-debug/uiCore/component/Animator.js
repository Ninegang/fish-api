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
     * 龙骨动画组件
     * @author none
     *
     */
    var Animator = (function (_super) {
        __extends(Animator, _super);
        function Animator() {
            var _this = _super.call(this) || this;
            /**
             * 资源根目录
             */
            _this.source = "";
            /**
             * 资源根目录
             */
            _this.sourceGroup = "";
            /**
             * 数据越小，播放速度越慢
             */
            _this.speed = 1;
            _this.autoPlay = true; //自动播放
            _this.playOnce = false; //播放一次
            _this.defentAnimationName = ""; //默认动画
            _this.stopAndVisible = false; //在停止状态下是否隐藏
            _this._isLoaded = false;
            return _this;
        }
        Object.defineProperty(Animator.prototype, "isPlaying", {
            get: function () {
                if (!this.armature) {
                    return false;
                }
                return this.armature.animation.isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "isLoaded", {
            /**
             * 是否加载完成
             */
            get: function () {
                return this._isLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Animator.prototype.getResource = function () {
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
                    }
                    else {
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.loadGroup(this.sourceGroup);
                    }
                }
                else {
                    if (this.loadRESComplete()) {
                        RES.getResAsync(this.source + "_ske_json", this.loadRESComplete, this);
                        RES.getResAsync(this.source + "_tex_json", this.loadRESComplete, this);
                        RES.getResAsync(this.source + "_tex_png", this.loadRESComplete, this);
                    }
                }
            }
        };
        Animator.prototype.loadRESComplete = function () {
            if (RES.getRes(this.source + "_ske_json") && RES.getRes(this.source + "_tex_json") && RES.getRes(this.source + "_tex_png")) {
                this.init();
                return false;
            }
            return true;
        };
        Animator.prototype.onResourceLoadComplete = function (event) {
            if (event.groupName != this.sourceGroup) {
                return;
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.init();
        };
        Animator.prototype.childrenCreated = function () {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.getResource();
        };
        Animator.prototype.init = function () {
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
            var egretFactory = dragonBones.EgretFactory.factory;
            if (!egretFactory.getDragonBonesData(this.source)) {
                egretFactory.parseDragonBonesData(dragonbonesData);
                egretFactory.parseTextureAtlasData(textureData, texture);
            }
            this.armature = egretFactory.buildArmatureDisplay(this.source, this.source);
            if (!this.armature) {
                // this.armature = null 说明骨架的名字和source不一样
                var dragonBonesDataMap = egretFactory.getAllDragonBonesData();
                var dragonBonesData = dragonBonesDataMap[this.source];
                var armatureName = dragonBonesData.armatureNames[0];
                this.armature = egretFactory.buildArmatureDisplay(armatureName, this.source);
            }
            this.addChild(this.armature);
            this.armature.addEventListener(dragonBones.EventObject.COMPLETE, this.onAnimationComplete, this);
            this.visible = !this.stopAndVisible;
            if (this.autoPlay) {
                var defentAnimationName = this.armature.animation.animationNames.indexOf(this.defentAnimationName) == -1 ? this.armature.animation.animationNames[0] : this.defentAnimationName;
                if (this.playOnce) {
                    this.play(defentAnimationName, 1).timeScale = this.speed;
                }
                else {
                    this.play(defentAnimationName).timeScale = this.speed;
                }
            }
            if (!Animator.isAdvanceTime) {
                egret.Ticker.getInstance().register(Animator.onTicker, this);
                Animator.isAdvanceTime = true;
            }
            this.dispatchEventWith(Animator.EVENT_LOADCOMPLETE);
        };
        Animator.onTicker = function (frameTime) {
            dragonBones.WorldClock.clock.advanceTime(frameTime / 1000);
        };
        Animator.prototype.onRemovedFromStage = function (event) {
            if (event.type != egret.Event.REMOVED || event.type != egret.Event.REMOVED_FROM_STAGE)
                return;
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
        };
        Animator.prototype.onAnimationComplete = function (event) {
            this.visible = !this.stopAndVisible;
            this.dispatchEvent(event);
            if (this.okHander) {
                this.okHander.apply(this.thisObject, this.params);
            }
        };
        Animator.prototype.play = function (animationName, loopNum) {
            if (!this.armature) {
                return;
            }
            this.armature.animation.stop();
            this.visible = true;
            return this.armature.animation.play(animationName, loopNum);
        };
        Animator.prototype.stop = function () {
            if (this.armature && this.armature.animation) {
                this.armature.animation.stop();
                this.visible = !this.stopAndVisible;
            }
        };
        /**
         * 获取特效持续时间
         * @return duration {number} 默认帧率下(0.01) 即为毫秒数
         */
        Animator.prototype.getAnimDuration = function () {
            return this.armature.animation.getState(this.armature.animation.animationNames[0]).totalTime * 1000; //this.armature.animation.armatureData.getAnimationData(this.armature.animation.animationNames[0]).duration;
        };
        /**
         * 添加完成回调函数
         */
        Animator.prototype.addHander = function (okHander, thisObject, params) {
            this.okHander = okHander;
            this.thisObject = thisObject;
            this.params = params;
        };
        /**
         * 节点换装
         */
        Animator.prototype.replaceSlot = function (slotName, index) {
            var slot = this.armature.armature.getSlot(slotName);
            slot.displayController = 'none';
            slot.displayIndex = index;
        };
        Object.defineProperty(Animator.prototype, "animation", {
            /**************临时添加 待完善****************** */
            get: function () {
                if (this.armature)
                    return this.armature.animation;
            },
            enumerable: true,
            configurable: true
        });
        Animator.isAdvanceTime = false;
        Animator.EVENT_LOADCOMPLETE = "loadComplete";
        return Animator;
    }(eui.Group));
    uiCore.Animator = Animator;
    __reflect(Animator.prototype, "uiCore.Animator");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Animator.js.map