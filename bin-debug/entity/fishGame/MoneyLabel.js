var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoneyLabel = (function () {
    function MoneyLabel() {
        this.Running = false;
        if (FishGameController.getGameView()) {
            this.moneyBit = new eui.BitmapLabel();
            this.moneyBit.textAlign = "center";
            FishGameController.getGameView().addChild(this.moneyBit);
            this.moneyBit.x = -500;
            this.moneyBit.y = -500;
            this.moneyBit.visible = false;
        }
    }
    Object.defineProperty(MoneyLabel.prototype, "getRunning", {
        get: function () {
            return this.Running;
        },
        enumerable: true,
        configurable: true
    });
    MoneyLabel.prototype.checkMoneyBit = function () {
        if (this.moneyBit) {
            return true;
        }
        return false;
    };
    MoneyLabel.prototype.Init = function (isGreen, fish, money) {
        if (fish && money != "undefined") {
            this.Running = true;
            this.moneyBit.visible = true;
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                money = (money / SceneManager.exchangeValue).toFixed(2);
            }
            this.moneyBit.text = money;
            this.moneyBit.x = fish.x;
            this.moneyBit.y = fish.y;
            if (isGreen) {
                this.moneyBit.font = uiCore.ZipManager.getFontImageMap("powerFont_fnt");
            }
            else {
                this.moneyBit.font = uiCore.ZipManager.getFontImageMap("silverFont_fnt");
            }
            egret.Tween.get(this.moneyBit).to({ y: this.moneyBit.y + 20 }, 100).to({ y: this.moneyBit.y - 80 }, 100).to({ y: this.moneyBit.y }, 800).call(function () {
                this.recovery();
            }, this);
        }
    };
    MoneyLabel.prototype.recovery = function () {
        this.Running = false;
        this.moneyBit.visible = false;
        this.moneyBit.x = -500;
        this.moneyBit.y = -500;
        this.cleanMoneyLabel();
    };
    MoneyLabel.prototype.cleanMoneyLabel = function () {
        if (this.moneyBit) {
            egret.Tween.removeTweens(this.moneyBit);
        }
    };
    return MoneyLabel;
}());
__reflect(MoneyLabel.prototype, "MoneyLabel");
//# sourceMappingURL=MoneyLabel.js.map