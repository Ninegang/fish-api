var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishnetPool = (function () {
    function FishnetPool() {
    }
    FishnetPool.getFishnetObject = function () {
        if (this.fishNetList.length > 0) {
            // if(this.fishNetList.length>200){
            //     console.log("fishNetList:"+this.fishNetList.length);
            // }
            for (var key in this.fishNetList) {
                if (!this.fishNetList[key].getRunning) {
                    return this.fishNetList[key];
                }
            }
        }
        var result = new Fishnet();
        this.fishNetList.push(result);
        return result;
    };
    FishnetPool.Dispose = function () {
        if (this.fishNetList.length > 0 && FishGameController.getGameView()) {
            for (var key in this.fishNetList) {
                FishGameController.getGameView().bulletGroup.removeChild(this.fishNetList[key]);
            }
        }
        this.fishNetList = [];
    };
    FishnetPool.fishNetList = [];
    return FishnetPool;
}());
__reflect(FishnetPool.prototype, "FishnetPool");
//# sourceMappingURL=FishnetPool.js.map