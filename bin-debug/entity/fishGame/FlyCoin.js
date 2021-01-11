var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FlyCoin = (function () {
    function FlyCoin(flyCoinType, isSelf) {
        this.isGold = isSelf;
        this.Running = false;
        this.flyCoinType = flyCoinType;
        var flyCoinTypeStr = "one";
        this.playStr = "playjinbi";
        if (this.isGold) {
            flyCoinTypeStr = "goldOneCoin";
            this.playStr = "run";
            if (flyCoinType == 5) {
                flyCoinTypeStr = "jbzGoldRotate";
                this.playStr = "start";
            }
            else if (flyCoinType == 10) {
                flyCoinTypeStr = "ten";
                this.playStr = "play";
            }
        }
        else {
            if (flyCoinType == 5) {
                flyCoinTypeStr = "silverFive";
                this.playStr = "run";
            }
            else if (flyCoinType == 10) {
                flyCoinTypeStr = "silverTen";
                this.playStr = "run";
            }
        }
        if (FishGameController.getGameView()) {
            this.flyCoinMc = uiCore.MovieClipManager.getGenerateMovieClipData(flyCoinTypeStr);
            if (this.flyCoinMc) {
                FishGameController.getGameView().addChild(this.flyCoinMc);
                this.flyCoinMc.frameRate = 15;
                this.flyCoinMc.x = -500;
                this.flyCoinMc.y = -500;
                this.flyCoinMc.visible = false;
            }
        }
    }
    FlyCoin.prototype.checkFlyCoinMc = function () {
        if (this.flyCoinMc) {
            return true;
        }
        return false;
    };
    Object.defineProperty(FlyCoin.prototype, "getRunning", {
        get: function () {
            return this.Running;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlyCoin.prototype, "getIsGold", {
        get: function () {
            return this.isGold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlyCoin.prototype, "getFlyCoinType", {
        get: function () {
            return this.flyCoinType;
        },
        enumerable: true,
        configurable: true
    });
    FlyCoin.prototype.Init = function (startPoint, endPoint, indexCoin, coinNum) {
        if (this.flyCoinMc) {
            this.Running = true;
            this.flyCoinMc.visible = true;
            var currIndex = 0;
            if (endPoint.x > startPoint.x) {
                currIndex = coinNum - indexCoin;
            }
            else {
                currIndex = indexCoin + 1;
            }
            startPoint.x += (this.flyCoinMc.width + 20) * indexCoin;
            var fx = startPoint.subtract(endPoint);
            var coinDistance = Math.abs(Math.sqrt(fx.x * fx.x + fx.y * fx.y));
            var flyTime = coinDistance + currIndex * 100 + 500;
            this.flyCoinMc.gotoAndPlay(this.playStr, -1);
            this.flyCoinMc.x = startPoint.x;
            this.flyCoinMc.y = startPoint.y;
            egret.Tween.get(this.flyCoinMc).wait(500).to({ x: endPoint.x, y: endPoint.y }, flyTime).call(function () {
                this.recovery();
            }, this);
        }
    };
    FlyCoin.prototype.recovery = function () {
        this.Running = false;
        this.flyCoinMc.visible = false;
        this.flyCoinMc.x = -500;
        this.flyCoinMc.y = -500;
        this.flyCoinMc.stop();
        this.cleanFlyCoin();
    };
    FlyCoin.prototype.cleanFlyCoin = function () {
        if (this.flyCoinMc) {
            egret.Tween.removeTweens(this.flyCoinMc);
        }
    };
    return FlyCoin;
}());
__reflect(FlyCoin.prototype, "FlyCoin");
//# sourceMappingURL=FlyCoin.js.map