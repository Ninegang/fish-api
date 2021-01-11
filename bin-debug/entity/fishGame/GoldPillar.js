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
var GoldPillar = (function (_super) {
    __extends(GoldPillar, _super);
    function GoldPillar() {
        var _this = _super.call(this) || this;
        _this.Running = false;
        _this.visible = false;
        _this.bottom = 0;
        _this.alpha = 0;
        _this.pillarCopy = new eui.Image();
        _this.pillarCopy.source = "stack_s";
        _this.pillarCopy.bottom = 0;
        _this.pillarCopy.visible = false;
        _this.pillarCopy.horizontalCenter = 0;
        _this.pillar = new eui.Image();
        _this.pillar.source = "stack_s";
        _this.pillar.bottom = 0;
        _this.pillar.horizontalCenter = 0;
        _this.pillar.mask = _this.pillarCopy;
        _this.addChild(_this.pillar);
        _this.addChild(_this.pillarCopy);
        _this.bgc1 = new eui.Image();
        _this.bgc1.source = "bgc1";
        _this.bgc1.scaleX = 0.4;
        _this.bgc1.horizontalCenter = 0;
        _this.bgc2 = new eui.Image();
        _this.bgc2.source = "bgc2";
        _this.bgc2.scaleX = 0.4;
        _this.bgc2.horizontalCenter = 0;
        _this.addChild(_this.bgc1);
        _this.addChild(_this.bgc2);
        _this.mcGoldRotate = uiCore.MovieClipManager.getGenerateMovieClipData("jbzGoldRotate");
        if (_this.mcGoldRotate) {
            _this.addChild(_this.mcGoldRotate);
            _this.mcGoldRotate.scaleX = 0.36;
            _this.mcGoldRotate.scaleY = 0.36;
        }
        _this.pillarText = new egret.BitmapText();
        _this.pillarText.font = uiCore.ZipManager.getFontImageMap("fishAndPillarFont_fnt");
        _this.pillarText.textAlign = "center";
        _this.pillarText.scaleX = 0.2;
        _this.pillarText.scaleY = 0.2;
        _this.addChild(_this.pillarText);
        return _this;
    }
    GoldPillar.prototype.goldPillarReset = function () {
        this.alpha = 1;
        this.pillarCopy.scaleY = 0;
        this.bgc2.bottom = 0;
        this.bgc1.bottom = 0.3;
        this.mcGoldRotate.visible = true;
        this.mcGoldRotate.x = (this.width - this.mcGoldRotate.width * 0.36) / 2;
        this.mcGoldRotate.y = this.height - this.mcGoldRotate.height * 0.36 + this.mcGoldRotate.height * 0.36 / 6;
        this.mcGoldRotate.gotoAndPlay("start", -1);
        this.pillarText.visible = false;
        this.pillarText.x = -((this.pillarText.width * 0.2 - this.width) / 2);
    };
    Object.defineProperty(GoldPillar.prototype, "getRunning", {
        get: function () {
            return this.Running;
        },
        enumerable: true,
        configurable: true
    });
    GoldPillar.prototype.init = function (money, fishId, startPoint, startX) {
        this.Running = true;
        this.visible = true;
        if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
            money = (money / SceneManager.exchangeValue).toFixed(2);
        }
        this.pillarText.text = money;
        this.x = startX;
        this.goldPillarPlay(fishId, startPoint, startX);
    };
    GoldPillar.prototype.goldPillarPlay = function (fishId, startPoint, startX) {
        this.goldPillarReset();
        var lengthValue = Math.min(fishId, 19.5) / 64;
        var lengthTime = Math.min(Number(fishId), 30) * 30;
        egret.Tween.get(this.pillarCopy).to({ scaleY: lengthValue }, lengthTime);
        egret.Tween.get(this.bgc1).to({ bottom: this.pillar.height * lengthValue + 0.3 }, lengthTime);
        egret.Tween.get(this.bgc2).to({ bottom: this.pillar.height * lengthValue }, lengthTime);
        egret.Tween.get(this.mcGoldRotate).to({ y: this.height - this.pillar.height * lengthValue - this.mcGoldRotate.height * 0.36 }, lengthTime).call(function () {
            this.mcGoldRotate.visible = false;
            this.mcGoldRotate.stop();
            this.pillarText.y = this.mcGoldRotate.y + this.pillarText.height * 0.2;
            this.pillarText.visible = true;
            if (startX != startPoint) {
                egret.Tween.get(this).to({ x: startPoint }, FishGameManager.deltaTime * 35);
            }
            egret.Tween.get(this).to({ alpha: 0 }, 1000).call(this.recovery, this);
        }, this);
    };
    GoldPillar.prototype.recovery = function () {
        this.removeTween();
        this.Running = false;
        this.visible = false;
    };
    GoldPillar.prototype.removeTween = function () {
        if (this.pillarCopy && this.bgc1 && this.bgc2 && this.mcGoldRotate && this) {
            egret.Tween.removeTweens(this.pillarCopy);
            egret.Tween.removeTweens(this.bgc1);
            egret.Tween.removeTweens(this.bgc2);
            egret.Tween.removeTweens(this.mcGoldRotate);
            egret.Tween.removeTweens(this);
        }
    };
    GoldPillar.prototype.clearGoldPillar = function () {
        this.removeTween();
    };
    return GoldPillar;
}(eui.Group));
__reflect(GoldPillar.prototype, "GoldPillar");
//# sourceMappingURL=GoldPillar.js.map