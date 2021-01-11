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
// TypeScript file
var FishGamegetNumView = (function (_super) {
    __extends(FishGamegetNumView, _super);
    function FishGamegetNumView(gameid) {
        var _this = _super.call(this) || this;
        _this.count = 30;
        _this.skinName = "FishGameNumfish";
        _this.gameid = gameid;
        return _this;
    }
    FishGamegetNumView.prototype.start = function () {
        this.initEvent();
    };
    FishGamegetNumView.prototype.initEvent = function () {
        this.downtime.text = "30";
        var goldNum = GameData.getInstance().userData("gold_num");
        if (goldNum >= 0) {
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                goldNum = (goldNum / SceneManager.exchangeValue).toFixed(2);
            }
            this.goldnum.text = goldNum;
        }
        this.tipstim = new egret.Timer(1000, 30);
        this.tipstim.addEventListener(egret.TimerEvent.TIMER, this.FishtipsLable, this);
        this.tipstim.start();
        this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);
        this.Continuebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuebtn, this);
        this.Exitbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitgamebtn, this);
    };
    FishGamegetNumView.prototype.getCathFishNum = function (fishnum) {
        for (var i = 1; i < (fishnum.FishCatchRecord.length); i++) {
            var indexStr = i < 10 ? "0" + i : i + "";
            this["killfish" + indexStr + "Label"].text = fishnum.FishCatchRecord[i - 1];
            if (this["killfish" + indexStr + "Label"].text != "0") {
                this["killfish" + indexStr].source = "killfish_" + indexStr;
            }
        }
        if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
            fishnum.TotalCatchMoney = (fishnum.TotalCatchMoney / SceneManager.exchangeValue).toFixed(2);
        }
        this.totalgold.text = fishnum.TotalCatchMoney;
    };
    FishGamegetNumView.prototype.FishtipsLable = function () {
        this.downtime.text = "" + this.count--;
        if (this.count == 0) {
            uiCore.Application.closeWindow(this);
        }
    };
    FishGamegetNumView.prototype.onClosebtn = function () {
        uiCore.Application.closeWindow(this);
    };
    FishGamegetNumView.prototype.onExitgamebtn = function () {
        uiCore.Application.closeWindow(this);
        uiCore.Application.closeGameSetTime();
        FishGameController.sendQuitDesk();
        uiCore.SoundByteManager.playMusic("BgMusic");
    };
    FishGamegetNumView.prototype.onContinuebtn = function () {
        uiCore.Application.closeWindow(this);
        this.count = 30;
    };
    FishGamegetNumView.prototype.removeEvent = function () {
        if (this.tipstim) {
            this.tipstim.stop();
            this.tipstim.removeEventListener(egret.TimerEvent.TIMER, this.FishtipsLable, this);
        }
        this.closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);
        this.Continuebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuebtn, this);
        this.Exitbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitgamebtn, this);
    };
    FishGamegetNumView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    return FishGamegetNumView;
}(uiCore.Window));
__reflect(FishGamegetNumView.prototype, "FishGamegetNumView");
//# sourceMappingURL=FishGamegetNumView.js.map