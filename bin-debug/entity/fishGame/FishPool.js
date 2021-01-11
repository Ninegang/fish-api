var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
[[
    通用鱼池
    使用要求
    1、对象必须要有 IsRunning() 及 Dispose()
    2、必须提供对象实例化函数createObjFunc()
    id、鱼的类型
]]
*/
var FishPool = (function () {
    function FishPool(createObjFunc) {
        this.fishPoolArray = [];
        this.fishPoolSiwimmingMap = [];
        this.createObjFunc = createObjFunc;
        this.fishPoint = new egret.Point();
        this.resultFish = new Array();
        this.fishcatchContractArray = new Array();
    }
    FishPool.prototype.getObject = function (id) {
        if (this.fishPoolArray.length > 0) {
            for (var i = 0; i < this.fishPoolArray.length; i++) {
                if (this.fishPoolArray[i].FishId == id && !this.fishPoolArray[i].isRunning) {
                    if (!this.fishPoolArray[i].hasEventListener(egret.Event.ENTER_FRAME)) {
                        this.fishPoolArray[i].addEventListener(egret.Event.ENTER_FRAME, this.fishPoolArray[i].update, this.fishPoolArray[i]);
                    }
                    return this.fishPoolArray[i];
                }
            }
        }
        var fish = this.createObjFunc(id);
        if (fish) {
            fish.FishId = id;
            this.fishPoolArray.push(fish);
            FishGameController.getGameView().downGroup.addChild(fish);
            this.setFishAnchorOff(fish);
        }
        return fish;
    };
    FishPool.prototype.setFishAnchorOff = function (fish) {
        if (fish.FishId == 1) {
            fish.anchorOffsetX = 60;
            fish.anchorOffsetY = 11;
        }
        else if (fish.FishId == 2) {
            fish.anchorOffsetX = 50;
            fish.anchorOffsetY = 20;
        }
        else if (fish.FishId == 3) {
            fish.anchorOffsetX = 50;
            fish.anchorOffsetY = 20;
        }
        else if (fish.FishId == 4) {
            fish.anchorOffsetX = 60;
            fish.anchorOffsetY = 30;
        }
        else if (fish.FishId == 5) {
            fish.anchorOffsetX = 90;
            fish.anchorOffsetY = 25;
        }
        else if (fish.FishId == 6) {
            fish.anchorOffsetX = 80;
            fish.anchorOffsetY = 30;
        }
        else if (fish.FishId == 7) {
            fish.anchorOffsetX = 80;
            fish.anchorOffsetY = 23;
        }
        else if (fish.FishId == 8) {
            fish.anchorOffsetX = 90;
            fish.anchorOffsetY = 30;
        }
        else if (fish.FishId == 9) {
            fish.anchorOffsetX = 80;
            fish.anchorOffsetY = 30;
        }
        else if (fish.FishId == 10) {
            fish.anchorOffsetX = 60.5;
            fish.anchorOffsetY = 70;
        }
        else if (fish.FishId == 11) {
            fish.anchorOffsetX = 118;
            fish.anchorOffsetY = 45;
        }
        else if (fish.FishId == 12) {
            fish.anchorOffsetX = 100;
            fish.anchorOffsetY = 80;
        }
        else if (fish.FishId == 13) {
            fish.anchorOffsetX = 125;
            fish.anchorOffsetY = 40;
        }
        else if (fish.FishId == 14) {
            fish.anchorOffsetX = 150;
            fish.anchorOffsetY = 50;
        }
        else if (fish.FishId == 15) {
            fish.anchorOffsetX = 130;
            fish.anchorOffsetY = 125;
        }
        else if (fish.FishId == 16) {
            fish.anchorOffsetX = 200;
            fish.anchorOffsetY = 60;
        }
        else if (fish.FishId == 17) {
            fish.anchorOffsetX = 200;
            fish.anchorOffsetY = 60;
        }
        else if (fish.FishId == 18) {
            fish.anchorOffsetX = 300; //小 Y上
            fish.anchorOffsetY = 40; //大 x左
        }
        else if (fish.FishId == 19) {
            fish.anchorOffsetX = 100;
            fish.anchorOffsetY = 150;
        }
        else if (fish.FishId == 20) {
            fish.anchorOffsetX = 98;
            fish.anchorOffsetY = 98;
        }
        else if (fish.FishId == 21) {
            fish.anchorOffsetX = 200;
            fish.anchorOffsetY = 230;
        }
        else if (fish.FishId == 22) {
            fish.anchorOffsetX = 30; //小 右
            fish.anchorOffsetY = 180;
        }
        else if (fish.FishId == 23) {
            fish.anchorOffsetX = 230;
            fish.anchorOffsetY = 100;
        }
        else if (fish.FishId == 24) {
            fish.anchorOffsetX = 220;
            fish.anchorOffsetY = 180;
        }
        else if (fish.FishId == 25) {
            fish.anchorOffsetX = 75;
            fish.anchorOffsetY = 75;
        }
        else if (fish.FishId == 26) {
            fish.anchorOffsetX = 90;
            fish.anchorOffsetY = 90;
        }
        else if (fish.FishId == 27) {
            fish.anchorOffsetX = 120;
            fish.anchorOffsetY = 80;
        }
    };
    FishPool.prototype.checkPoolNum = function () {
        if (this.fishPoolArray.length > 110) {
            var index = 0;
            var fishTotal = this.fishPoolArray.length;
            for (var i = 0; i < fishTotal; i++) {
                if (this.fishPoolArray[i] && !this.fishPoolArray[i].isRunning) {
                    var fishs = this.fishPoolArray.splice(i, 1);
                    fishs[0].Dispose();
                    index++;
                    if (index > fishTotal - 110) {
                        break;
                    }
                }
            }
        }
    };
    //删除字鱼
    // public clearFishByTag(fishTag: number): void {
    // 	for (var i = 0; i < this.fishPoolArray.length; i++) {
    // 		if (this.fishPoolArray[i].FishTag == fishTag) {
    // 			let fishs:Array<Fish>=this.fishPoolArray.splice(i,1);
    // 			fishs[0].Dispose();
    // 			break;
    // 		}
    // 	}
    // }
    FishPool.prototype.getFishByType = function (type) {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].FishId == type && this.fishPoolArray[i].isRunning == true) {
                this.fishPoint.x = this.fishPoolArray[i].x;
                this.fishPoint.y = this.fishPoolArray[i].y;
                if (this.fishPoolArray[i].checkInScreen(this.fishPoint)) {
                    return this.fishPoolArray[i];
                }
            }
        }
        return null;
    };
    FishPool.prototype.markFish = function () {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].isRunning) {
                this.fishPoolSiwimmingMap.push(this.fishPoolArray[i].FishTag);
                // if (!this.fishPoolArray[i].checkInScreen(new egret.Point(this.fishPoolArray[i].gameObject.x, this.fishPoolArray[i].gameObject.y))) {
                //停掉鱼运动 停掉鱼线
                // }
            }
        }
    };
    //找出所有正在游的同类鱼
    FishPool.prototype.getAllTheTypeFish = function (type) {
        var result = new Array();
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].FishId == type && this.fishPoolArray[i].isRunning == true) {
                result.push(this.fishPoolArray[i]);
            }
        }
        return result;
    };
    //找出爆炸范围内的鱼
    FishPool.prototype.getAllFishInBombRange = function (posX, posY, bombRange, catchFishContract) {
        this.fishcatchContractArray = [];
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].isRunning && this.fishPoolArray[i].canLock) {
                if (this.isInRange(posX, posY, this.fishPoolArray[i].x, this.fishPoolArray[i].y, bombRange)) {
                    var info = new Fishcatch_Contract();
                    info.SeatNo = catchFishContract.SeatNo;
                    info.FishTag = this.fishPoolArray[i].FishTag;
                    info.FishId = this.fishPoolArray[i].FishId;
                    info.BulletId = catchFishContract.BulletId;
                    info.WinMoney = this.fishPoolArray[i].fishInfo.Odds * catchFishContract.BulletOdds;
                    this.fishcatchContractArray.push(info);
                }
            }
        }
        return this.fishcatchContractArray;
    };
    FishPool.prototype.getAllActiveFish = function () {
        this.resultFish = [];
        for (var key in this.fishPoolArray) {
            if (this.fishPoolArray[key].isRunning) {
                this.resultFish.push(this.fishPoolArray[key]);
            }
        }
        return this.resultFish;
    };
    FishPool.prototype.FixedScreen = function (fixedTimes) {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].isRunning) {
                this.fishPoolArray[i].FixedScreen(fixedTimes);
            }
        }
    };
    FishPool.prototype.FixedScreenEnd = function () {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].isRunning) {
                this.fishPoolArray[i].FixedScreenEnd();
            }
        }
        ;
    };
    FishPool.prototype.getFish = function (fishTag) {
        for (var key in this.fishPoolArray) {
            if (this.fishPoolArray[key].FishTag == fishTag && this.fishPoolArray[key].isRunning == true) {
                return this.fishPoolArray[key];
            }
        }
        return null;
    };
    FishPool.prototype.recovery = function (fishTag) {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].FishTag == fishTag) {
                this.fishPoolArray[i].recovery();
                break;
            }
        }
    };
    FishPool.prototype.bossEatFish = function (id, Odds) {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].FishTag == id) {
                this.fishPoolArray[i].eatFish(Odds);
                return;
            }
        }
    };
    FishPool.prototype.fishDie = function (fishTag) {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            if (this.fishPoolArray[i].FishTag == fishTag) {
                this.fishPoolArray[i].die();
            }
        }
    };
    FishPool.prototype.recoveryAllMark = function () {
        for (var i = 0; i < this.fishPoolSiwimmingMap.length; i++) {
            for (var j = 0; j < this.fishPoolArray.length; j++) {
                if (this.fishPoolArray[j].FishTag == this.fishPoolSiwimmingMap[i]) {
                    this.fishPoolArray[j].recovery();
                    break;
                }
            }
        }
        this.fishPoolSiwimmingMap = [];
    };
    FishPool.prototype.getAllSiwimming = function () {
        var result = new Array();
        for (var i = 0; i < this.fishPoolSiwimmingMap.length; i++) {
            for (var j = 0; j < this.fishPoolArray.length; j++) {
                if (this.fishPoolArray[j].FishTag == this.fishPoolSiwimmingMap[i]) {
                    result.push(this.fishPoolArray[j]);
                }
            }
        }
        return result;
    };
    FishPool.prototype.recoveryAllFish = function () {
        for (var i = 0; i < this.fishPoolArray.length; i++) {
            this.fishPoolArray[i].recovery();
        }
    };
    FishPool.prototype.reconnectAllFish = function () {
        if (this.fishPoolArray.length > 0) {
            for (var i = this.fishPoolArray.length; i > 0; i--) {
                this.fishPoolArray.pop().Dispose();
            }
        }
        this.fishPoolArray = [];
    };
    FishPool.prototype.isInRange = function (originX, originY, targetX, targetY, range) {
        if (range == -1) {
            return true;
        }
        return (Math.sqrt(Math.floor(originX - targetX) * Math.floor(originX - targetX) + Math.floor(originY - targetY) * Math.floor(originY - targetY))) < range;
    };
    return FishPool;
}());
__reflect(FishPool.prototype, "FishPool");
var Fishcatch_Contract = (function () {
    function Fishcatch_Contract() {
    }
    return Fishcatch_Contract;
}());
__reflect(Fishcatch_Contract.prototype, "Fishcatch_Contract");
//# sourceMappingURL=FishPool.js.map