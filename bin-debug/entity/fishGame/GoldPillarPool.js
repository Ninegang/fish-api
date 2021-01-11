var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoldPillarPool = (function () {
    function GoldPillarPool(fishGen) {
        this.goldPillarList = [];
        this.fishGen = fishGen;
    }
    GoldPillarPool.prototype.initGoldPillarPool = function () {
        if (this.goldPillarList && this.goldPillarList.length > 0) {
            for (var key in this.goldPillarList) {
                this.goldPillarList[key].Running = false;
                this.goldPillarList[key].alpha = 0;
                this.goldPillarList[key].visible = false;
            }
        }
    };
    GoldPillarPool.prototype.getGoldPillarObject = function () {
        if (this.goldPillarList && this.goldPillarList.length > 0) {
            // if(this.goldPillarList.length>100){
            //     console.log("goldPillarList:"+this.goldPillarList.length);
            // }
            for (var key in this.goldPillarList) {
                if (!this.goldPillarList[key].getRunning) {
                    return this.goldPillarList[key];
                }
            }
        }
        var result = new GoldPillar();
        this.goldPillarList.push(result);
        this.fishGen.addChild(result);
        return result;
    };
    GoldPillarPool.prototype.getGoldPillarCount = function () {
        var index = 0;
        if (this.goldPillarList.length > 0) {
            for (var key in this.goldPillarList) {
                if (this.goldPillarList[key].getRunning) {
                    index++;
                }
            }
        }
        return index;
    };
    GoldPillarPool.prototype.Dispose = function () {
        if (this.goldPillarList && this.goldPillarList.length > 0) {
            for (var key in this.goldPillarList) {
                this.goldPillarList[key].clearGoldPillar();
            }
        }
    };
    return GoldPillarPool;
}());
__reflect(GoldPillarPool.prototype, "GoldPillarPool");
//# sourceMappingURL=GoldPillarPool.js.map