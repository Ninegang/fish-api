var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Lunzi = (function () {
    function Lunzi() {
        this.Running = false;
        if (FishGameController.getGameView()) {
            this.lunzigold = new eui.Image();
            this.lunzigold.source = "fishlunzi";
            this.lunziMoney = new eui.BitmapLabel();
            this.lunziMoney.font = uiCore.ZipManager.getFontImageMap("powerFont_fnt");
            this.lunziMoney.textAlign = "center";
            FishGameController.getGameView().addChild(this.lunzigold);
            FishGameController.getGameView().addChild(this.lunziMoney);
            this.lunzigold.visible = false;
            this.lunziMoney.visible = false;
            this.lunzigold.x = -500;
            this.lunzigold.y = -500;
            this.lunzigold.anchorOffsetX = this.lunzigold.width / 2;
            this.lunzigold.anchorOffsetY = this.lunzigold.height / 2;
            this.lunziMoney.x = -500;
            this.lunziMoney.y = -500;
            egret.Tween.get(this.lunzigold, { loop: true }).to({ rotation: 180 }, 500).to({ rotation: -60 }, 500);
            egret.Tween.pauseTweens(this.lunzigold);
        }
    }
    Object.defineProperty(Lunzi.prototype, "getRunning", {
        get: function () {
            return this.Running;
        },
        enumerable: true,
        configurable: true
    });
    Lunzi.prototype.checkLunzigold = function () {
        if (this.lunzigold) {
            return true;
        }
        return false;
    };
    Lunzi.prototype.Init = function (pointX, pointY, money) {
        this.Running = true;
        this.lunzigold.visible = true;
        this.lunziMoney.visible = true;
        egret.Tween.resumeTweens(this.lunzigold);
        if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
            money = (money / SceneManager.exchangeValue).toFixed(2);
        }
        this.lunziMoney.text = money;
        if (pointY > 300) {
            pointX = pointX + 40;
            pointY = pointY - this.lunzigold.height / 2 - 30;
        }
        else {
            pointX = pointX - 40;
            pointY = pointY + this.lunzigold.height / 2 + 30;
        }
        this.lunzigold.x = pointX;
        this.lunzigold.y = pointY;
        pointX = pointX - this.lunziMoney.width / 2;
        pointY = pointY - this.lunziMoney.height / 2;
        this.lunziMoney.x = pointX;
        this.lunziMoney.y = pointY;
        egret.setTimeout(function () {
            this.recovery();
        }, this, 1500);
    };
    Lunzi.prototype.recovery = function () {
        this.Running = false;
        this.lunzigold.visible = false;
        this.lunziMoney.visible = false;
        this.lunzigold.x = -500;
        this.lunzigold.y = -500;
        this.lunziMoney.x = -500;
        this.lunziMoney.y = -500;
        egret.Tween.pauseTweens(this.lunzigold);
    };
    Lunzi.prototype.cleanLunzi = function () {
        if (this.lunzigold) {
            egret.Tween.removeTweens(this.lunzigold);
        }
    };
    return Lunzi;
}());
__reflect(Lunzi.prototype, "Lunzi");
//# sourceMappingURL=Lunzi.js.map