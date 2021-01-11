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
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(fishSet, isInitialization) {
        if (isInitialization === void 0) { isInitialization = true; }
        var _this = _super.call(this) || this;
        if (isInitialization) {
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFish, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedFish, _this);
            _this.fishPath = new FishPath(_this);
            _this.isRunning = true;
            _this.canLock = true;
            _this.fishSet = fishSet;
        }
        return _this;
        // this.childObjs = new Array<Fish>();
        // this.childActs = new Array<Fish>();
    }
    Fish.prototype.onRemovedFish = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFish, this);
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        this.removeChildren();
    };
    Fish.prototype.onAddedFish = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedFish, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    Fish.prototype.update = function () {
        // let startTime:number=egret.getTimer();
        this.fishPath.update();
        // var diffTime:number=egret.getTimer()-startTime;
        // if(diffTime>10){
        // 	console.log("Fish:"+this.FishTag+":"+diffTime);
        // }
    };
    Fish.prototype.OnPress = function () {
        if (Number(this.fishInfo.FishId) <= uiCore.Application.lockminfish) {
            if (FishGameController.getGameView().thisFishGen.lockFish) {
                FishGameController.getGameView().thisFishGen.setLockFish(null);
            }
        }
        else if (Number(this.fishInfo.FishId) > uiCore.Application.lockminfish) {
            FishGameController.getGameView().thisFishGen.setLockFish(this);
        }
        FishGameController.getGameView().onPress();
    };
    //isPlay是ture开   false关
    Fish.prototype.playOrStopMC = function (isPlay) {
        if (this.numChildren > 0) {
            for (var i = 0; i < this.numChildren; i++) {
                var mc = this.getChildAt(i);
                if (isPlay) {
                    mc.gotoAndPlay("swimming", -1);
                }
                else {
                    if (mc.isPlaying) {
                        mc.stop();
                    }
                }
            }
        }
    };
    Fish.prototype.initInfo = function (fishInfo) {
        this.canLock = true;
        this.isRunning = true;
        this.playOrStopMC(true);
        this.isFishArray = fishInfo.isFishArray;
        this.isFishFont = fishInfo.isFishFont;
        this.FishTag = fishInfo.FishTag;
        this.fishInfo = fishInfo;
        this.fishtype = this.fishSet.type;
        this.isMutiFish = this.fishSet.isMutiFish;
        this.alpha = 1;
        this.visible = true;
        this.scaleX = 1;
        this.scaleY = 1;
        // if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish) {//组合鱼进来
        // }
        // if (this.fishtype == 3 || this.isMutiFish) {//组合鱼进来
        // 	this.isBoss = true;
        // } else {
        // 	this.isBoss = false;
        // }
        this.lifeTime = fishInfo.lifeTime;
        if (!this.isFishFont) {
            if (this.isFishArray) {
                this.setGroupPath(fishInfo);
            }
            else {
                this.setPath(fishInfo);
            }
            this.fishPath.fixedScreen = fishInfo.FixedScreen || 0;
        }
        this.fishPath.IsCanDown = this.fishSet.isCanDown;
    };
    Fish.prototype.setGroupPath = function (fishInfo) {
        this.speed = fishInfo.Speed;
        this.lifeTime = 0;
        if (fishInfo.LifeTime != undefined && fishInfo.LifeTime != null) {
            this.lifeTime = fishInfo.LifeTime * 0.001;
        }
        if (fishInfo.FishDelay != undefined && fishInfo.FishDelay != null) {
            this.lifeTime = this.lifeTime - fishInfo.FishDelay * 0.001;
        }
        var roat = fishInfo.Roat != undefined && fishInfo.Roat != null && fishInfo.Roat / 180 * Math.PI || 0;
        if (FishGameController.getGameView().isUpSideDown) {
            roat = roat + Math.PI;
        }
        this.fishPath.setGroupPath(fishInfo.FishWay, this.lifeTime, roat, this.speed, FishGameController.getGameView().isUpSideDown);
    };
    Fish.prototype.setPath = function (fishInfo) {
        this.speed = this.fishSet.move_speed * 2;
        this.lifeTime = 0;
        if (fishInfo.LifeTime != undefined && fishInfo.LifeTime != null) {
            this.lifeTime = fishInfo.LifeTime * 0.001;
        }
        var roat = fishInfo.Roat / 180 * Math.PI || 0;
        if (FishGameController.getGameView().isUpSideDown) {
            roat = roat + Math.PI;
        }
        this.isFreeGroup = false;
        if (fishInfo.FishDelay != undefined && fishInfo.FishDelay != null) {
            this.lifeTime = this.lifeTime - fishInfo.FishDelay * 0.001;
            if (fishInfo.FishId == 1 && fishInfo.FishDelay == 0) {
                this.isFreeGroup = true;
            }
        }
        this.fishPath.setPath(fishInfo.FishWay, this.lifeTime, this.isFreeGroup, roat, this.speed);
        if (this.fishSet.tweens) {
            var tweens = this.fishSet.tweens;
            if (tweens.length > 0) {
                for (var i = 0; i < tweens.length; i++) {
                    this.fishPath.addTween(tweens[i].fps, tweens[i].frames, tweens[i].weight, tweens[i].eases, tweens[i].trans);
                }
            }
            this.fishPath.setTween();
        }
    };
    Fish.prototype.FixedScreen = function (fixedTimes) {
        this.fishPath.fixedScreen = fixedTimes;
        this.playOrStopMC(false);
        // if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish == true) {
        // 	for (var i = 0; i < this.childActs.length; i++) {
        // 		this.childActs[i].gameObject.stop();
        // 	}
        // }
    };
    Fish.prototype.FixedScreenEnd = function () {
        this.fishPath.fixedScreen = 0;
        this.playOrStopMC(true);
        // if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish == true) {
        // 	for (var i = 0; i < this.childActs.length; i++) {
        // 		this.childActs[i].gameObject.play();
        // 	}
        // }
    };
    Fish.prototype.checkInScreen = function (position) {
        return position.x < uiCore.Application.app.stage.stageWidth && position.x > 0 && position.y < uiCore.Application.app.stage.stageHeight && position.y > 0;
    };
    Fish.prototype.onInScreen = function (bool) {
        this.canLock = bool;
    };
    Fish.prototype.die = function () {
        this.isRunning = false;
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        var mcNumber = this.numChildren;
        if (mcNumber > 0) {
            var index = 0;
            if (mcNumber > 1) {
                index = mcNumber - 1;
            }
            for (var i = 0; i < mcNumber; i++) {
                var dieNum = 3;
                if (this.fishInfo.FishId == 4) {
                    dieNum = 1;
                }
                else if (this.fishInfo.FishId == 6) {
                    dieNum = 1;
                }
                else if (this.fishInfo.FishId == 8) {
                    dieNum = 2;
                }
                var mc = this.getChildAt(i);
                mc.gotoAndPlay("death", dieNum);
                if (i == index) {
                    mc.addEventListener(egret.Event.COMPLETE, this.fishDieDonghua, this);
                }
            }
        }
    };
    //吃鱼
    Fish.prototype.eatFish = function (odds) {
        this.fishInfo.Odds = odds;
        //self.label.text = odds
    };
    Fish.prototype.fishDieDonghua = function (event) {
        var mc = event.currentTarget;
        mc.removeEventListener(egret.Event.COMPLETE, this.fishDieDonghua, this);
        this.x = -10000;
        this.y = 10000;
        this.visible = false;
    };
    Fish.prototype.recovery = function () {
        this.isRunning = false;
        this.playOrStopMC(false);
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        // if (this.fishtype == 3 || this.fishtype == 4){
        // 	this.childActs = [];		 
        // 	for(var i = 0;i < this.childObjs.length;i++){
        // 		let fishObj = this.childObjs.shift(); //删除并返回数组的第一个元素。
        // 		//先放着
        // 	}
        // 	this.childObjs = [];
        // }
        this.x = -10000; //移动到外面
        this.y = 10000;
        this.visible = false;
    };
    Fish.prototype.Dispose = function () {
        FishGameController.getGameView().downGroup.removeChild(this);
        // this.childActs = null
        this.fishSet = null;
        this.fishInfo = null;
    };
    return Fish;
}(eui.Group));
__reflect(Fish.prototype, "Fish");
//# sourceMappingURL=Fish.js.map