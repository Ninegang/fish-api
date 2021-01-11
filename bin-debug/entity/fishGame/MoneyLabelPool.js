var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoneyLabelPool = (function () {
    function MoneyLabelPool() {
    }
    MoneyLabelPool.getMoneyLabelObject = function () {
        if (this.MoneyLabelList.length > 0) {
            // if(this.MoneyLabelList.length>200){
            //     console.log("MoneyLabelList:"+this.MoneyLabelList.length);
            // }
            for (var key in this.MoneyLabelList) {
                if (!this.MoneyLabelList[key].getRunning) {
                    if (this.MoneyLabelList[key].checkMoneyBit()) {
                        return this.MoneyLabelList[key];
                    }
                    else {
                        this.MoneyLabelList.splice(Number(key), 1);
                    }
                }
            }
        }
        var result = new MoneyLabel();
        this.MoneyLabelList.push(result);
        return result;
    };
    MoneyLabelPool.Dispose = function () {
        if (this.MoneyLabelList.length > 0) {
            for (var key in this.MoneyLabelList) {
                this.MoneyLabelList[key].cleanMoneyLabel();
            }
        }
        this.MoneyLabelList = [];
    };
    MoneyLabelPool.MoneyLabelList = [];
    return MoneyLabelPool;
}());
__reflect(MoneyLabelPool.prototype, "MoneyLabelPool");
//# sourceMappingURL=MoneyLabelPool.js.map