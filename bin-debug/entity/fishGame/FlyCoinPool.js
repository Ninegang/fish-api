var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FlyCoinPool = (function () {
    function FlyCoinPool() {
    }
    FlyCoinPool.getFlyCoinObject = function (flyCoinType, isSelf) {
        if (this.FlyCoinList.length > 0) {
            for (var key in this.FlyCoinList) {
                if (!this.FlyCoinList[key].getRunning && this.FlyCoinList[key].getFlyCoinType == flyCoinType && this.FlyCoinList[key].getIsGold == isSelf) {
                    if (this.FlyCoinList[key].checkFlyCoinMc()) {
                        return this.FlyCoinList[key];
                    }
                    else {
                        this.FlyCoinList.splice(Number(key), 1);
                    }
                }
            }
        }
        var result = new FlyCoin(flyCoinType, isSelf);
        this.FlyCoinList.push(result);
        return result;
    };
    FlyCoinPool.Dispose = function () {
        if (this.FlyCoinList.length > 0) {
            for (var key in this.FlyCoinList) {
                this.FlyCoinList[key].cleanFlyCoin();
            }
        }
        this.FlyCoinList = [];
    };
    FlyCoinPool.FlyCoinList = [];
    return FlyCoinPool;
}());
__reflect(FlyCoinPool.prototype, "FlyCoinPool");
//# sourceMappingURL=FlyCoinPool.js.map