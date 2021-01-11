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
var Fishnet = (function (_super) {
    __extends(Fishnet, _super);
    function Fishnet() {
        var _this = _super.call(this) || this;
        _this.Running = false;
        _this.visible = false;
        if (FishGameController.getGameView()) {
            _this.bowens = new Array();
            _this.showTime = 500;
            _this.createFishnet();
            FishGameController.getGameView().bulletGroup.addChild(_this);
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            _this.x = -200;
            _this.y = -200;
        }
        return _this;
    }
    Object.defineProperty(Fishnet.prototype, "getRunning", {
        get: function () {
            return this.Running;
        },
        enumerable: true,
        configurable: true
    });
    Fishnet.prototype.createFishnet = function () {
        for (var i = 0; i < 3; i++) {
            var bowen = uiCore.ParticleManager.getParticleSystem("bowen");
            var cobweb = new eui.Image();
            cobweb.source = "cobweb";
            cobweb.scaleX = 0.3;
            cobweb.scaleY = 0.3;
            if (i > 0) {
                cobweb.x = 360 * 0.2;
            }
            if (i == 2) {
                cobweb.y = -360 * 0.2;
            }
            if (bowen) {
                this.addChild(bowen);
                bowen.scaleX = 1.3;
                bowen.scaleY = 1.3;
                bowen.x = (360 * 0.3) / 2;
                bowen.y = (360 * 0.3) / 2;
                if (i > 0) {
                    bowen.x = bowen.x + 360 * 0.2;
                }
                if (i == 2) {
                    bowen.y = bowen.y - 360 * 0.2;
                }
                this.bowens.push(bowen);
            }
            this.addChild(cobweb);
        }
    };
    Fishnet.prototype.Init = function (bullet) {
        this.Running = true;
        this.visible = true;
        if (Number(bullet.BulletOdds) > 100) {
            this.getChildAt(this.numChildren - 1).visible = true;
            this.getChildAt(this.numChildren - 2).visible = true;
        }
        else {
            this.getChildAt(this.numChildren - 1).visible = false;
            this.getChildAt(this.numChildren - 2).visible = false;
        }
        this.x = bullet.gameObject.x;
        this.y = bullet.gameObject.y;
        if (this.bowens && this.bowens.length > 0) {
            for (var key in this.bowens) {
                this.bowens[key].start(400);
            }
        }
        egret.setTimeout(function () {
            this.recovery();
        }, this, this.showTime);
    };
    Fishnet.prototype.recovery = function () {
        this.Running = false;
        this.visible = false;
        this.x = -200;
        this.y = -200;
        if (this.bowens && this.bowens.length > 0) {
            for (var key in this.bowens) {
                this.bowens[key].stop(false);
            }
        }
    };
    return Fishnet;
}(eui.Component));
__reflect(Fishnet.prototype, "Fishnet");
//# sourceMappingURL=Fishnet.js.map