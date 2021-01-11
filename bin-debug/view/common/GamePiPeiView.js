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
var GamePiPeiView = (function (_super) {
    __extends(GamePiPeiView, _super);
    function GamePiPeiView() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------------------------------
        /** 匹配提示动画循环 */
        _this.pipeiTimeId = -1;
        _this.closeTimeId = -1;
        _this.tipIndex = 0;
        return _this;
    }
    GamePiPeiView.prototype.initExmlOk = function () {
        this.addEvt(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.onHidePiPei, this);
        this.msgLabel.text = "";
        this.visible = false;
    };
    GamePiPeiView.prototype.onHidePiPei = function (evt) {
        if (this.cancelFn) {
            this.cancelFn.call(this.cancelThis);
            this.cancelFn = this.cancelThis = null;
        }
        this.hidePiPei();
    };
    GamePiPeiView.prototype.hidePiPei = function () {
        var _this = this;
        egret.clearInterval(this.pipeiTimeId);
        this.cancelFn = this.cancelThis = null;
        this.touchChildren = false;
        egret.Tween.removeTweens(this.pipeiGroup);
        egret.Tween.get(this.pipeiGroup).to({ scaleY: 0.9, scaleX: 0.9, alpha: 0.8 }, 100).call(function () {
            _this.touchChildren = true;
            _this.pipeiGroup.scaleX = _this.pipeiGroup.scaleY = 1;
            _this.visible = false;
        }, this);
    };
    GamePiPeiView.prototype.showPiPei = function (cancelFn, cancelThis) {
        this.cancelFn = cancelFn;
        this.cancelThis = cancelThis;
        this.visible = true;
        this.pipeiGroup.scaleX = this.pipeiGroup.scaleY = this.pipeiGroup.alpha = 1;
        this.tipIndex = 0;
        if (this.pipeiTimeId) {
            egret.clearInterval(this.pipeiTimeId);
            this.pipeiTimeId = -1;
        }
        this.updatePiPeiTxt();
        this.pipeiTimeId = egret.setInterval(this.updatePiPeiTxt, this, 300);
        // if (Player.instance && !Player.instance["debugFlag"])
        // {
        //     this.closeBtn.visible = false;
        //     egret.clearTimeout(this.closeTimeId);
        //     this.closeTimeId = egret.setTimeout(()=>
        //     {
        //         this.closeBtn.visible = true;
        //     }, this, 8000);
        // }
    };
    GamePiPeiView.prototype.updatePiPeiTxt = function () {
        if (this.tipIndex == 4) {
            this.tipIndex = 0;
        }
        var text = "正在为您匹配牌桌\n游戏即将开始，请耐心等待";
        for (var i = 0; i < this.tipIndex; i++) {
            text += ".";
        }
        this.msgLabel.text = text;
        this.tipIndex++;
    };
    GamePiPeiView.prototype.onDestroy = function () {
        egret.Tween.removeTweens(this.pipeiGroup);
        egret.clearTimeout(this.closeTimeId);
        egret.clearInterval(this.pipeiTimeId);
        this.pipeiTimeId = -1;
        _super.prototype.onDestroy.call(this);
    };
    return GamePiPeiView;
}(core.BaseView));
__reflect(GamePiPeiView.prototype, "GamePiPeiView");
//# sourceMappingURL=GamePiPeiView.js.map