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
/**
* 延迟提示组件
*/
var PingTip = (function (_super) {
    __extends(PingTip, _super);
    function PingTip() {
        var _this = _super.call(this) || this;
        _this.localTime = 0;
        _this.colors = ['0xa6aaaf', '0xf00000', '0xc46a39', '0xc6c05e', '0x30ca4f', '0x28fb47'];
        _this.skinName = "PingTipSkin";
        return _this;
    }
    PingTip.prototype.start = function () {
        this.PingChange(PingTip.ping);
        this.pingImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPingtBtn, this);
        this.localTime = egret.getTimer();
        this.pingLable.text = uiCore.LangUtils.getMsgById(20) + " 3500ms";
    };
    PingTip.prototype.dataChanged = function () {
    };
    PingTip.prototype.setSelect = function (selected) {
    };
    PingTip.prototype.PingChange = function (nowPing) {
        if (nowPing < 0) {
            this.pingImage.source = "lv0";
            this.pingLable.text = uiCore.LangUtils.getMsgById(19);
            this.pingLable.textColor = this.colors[0];
        }
        else {
            if (nowPing < 100) {
                this.pingImage.source = "lv5";
                this.pingLable.textColor = this.colors[5];
            }
            else if (nowPing < 200) {
                this.pingImage.source = "lv4";
                this.pingLable.textColor = this.colors[4];
            }
            else if (nowPing < 500) {
                this.pingImage.source = "lv3";
                this.pingLable.textColor = this.colors[3];
            }
            else if (nowPing < 1000) {
                this.pingImage.source = "lv2";
                this.pingLable.textColor = this.colors[2];
            }
            else if (nowPing < 3000) {
                this.pingImage.source = "lv1";
                this.pingLable.textColor = this.colors[1];
            }
            else {
                this.pingImage.source = "lv1";
                this.pingLable.textColor = this.colors[1];
            }
            this.pingLable.text = uiCore.LangUtils.getMsgById(20) + " " + nowPing + "ms";
        }
        PingTip.ping = nowPing;
    };
    PingTip.prototype.onPingtBtn = function () {
        // if(egret.getTimer()-this.localTime<=500){
        //     return;
        // }else{
        //     this.localTime=egret.getTimer();
        // }
        // this.PingChange(uiCore.Utils.getRandom(-100,5000));
    };
    PingTip.ping = 0;
    return PingTip;
}(uiCore.ItemView));
__reflect(PingTip.prototype, "PingTip");
//# sourceMappingURL=PingTip.js.map