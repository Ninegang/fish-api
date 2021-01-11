var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LunziPool = (function () {
    function LunziPool() {
    }
    LunziPool.getLunziObject = function () {
        if (this.LunziList.length > 0) {
            // if(this.LunziList.length>30){
            //     console.log("LunziList:"+this.LunziList.length);
            // }
            for (var key in this.LunziList) {
                if (!this.LunziList[key].getRunning) {
                    if (this.LunziList[key].checkLunzigold()) {
                        return this.LunziList[key];
                    }
                    else {
                        this.LunziList.splice(Number(key), 1);
                    }
                }
            }
        }
        var result = new Lunzi();
        this.LunziList.push(result);
        return result;
    };
    LunziPool.Dispose = function () {
        if (this.LunziList.length > 0) {
            for (var key in this.LunziList) {
                this.LunziList[key].cleanLunzi();
            }
        }
        this.LunziList = [];
    };
    LunziPool.LunziList = [];
    return LunziPool;
}());
__reflect(LunziPool.prototype, "LunziPool");
//# sourceMappingURL=LunziPool.js.map