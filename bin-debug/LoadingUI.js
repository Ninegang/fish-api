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
 * 游戏初始的载入界面
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.tipTextIndex = 1;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    LoadingUI.prototype.onStageResize = function (event) {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    };
    LoadingUI.prototype.onRemovedFromStage = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
        this.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
    };
    LoadingUI.prototype.createView = function () {
        this.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.createView, this);
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        var bg = new eui.Image();
        bg.source = "gamehall_loadingBg_png";
        bg.left = bg.right = bg.top = bg.bottom = 0;
        this.addChild(bg);
        document.getElementsByTagName("body")[0].style.backgroundImage = "none";
        if (LibCore.GameConfig.tipTextArray && LibCore.GameConfig.tipTextArray.length > 0 && uiCore.LangUtils.getLangType() == uiCore.LangUtils.ZH_CN) {
            this.tipText = new uiCore.Label();
            this.tipText.bottom = 150;
            this.tipText.horizontalCenter = 0;
            this.tipText.fontFamily = "微软雅黑";
            this.tipText.size = 23;
            this.tipText.textAlign = "center";
            this.tipText.bold = true;
            this.tipText.textColor = 0xfec66f;
            this.tipText.text = LibCore.GameConfig.tipTextArray[0];
            this.addChild(this.tipText);
            this.tipTextSetInterval = egret.setInterval(this.changeTipText, this, 4000);
        }
        var progressBackgroud = new eui.Image();
        progressBackgroud.source = "gamehall_loadingBarBg";
        progressBackgroud.horizontalCenter = 0;
        progressBackgroud.bottom = 115;
        progressBackgroud.height = 31;
        progressBackgroud.width = 600;
        this.addChild(progressBackgroud);
        this.progress = new eui.Image();
        this.progress.source = "gamehall_loadingBar";
        this.progress.bottom = 115;
        this.progress.horizontalCenter = 0;
        this.progress.height = 31;
        this.progress.width = 0;
        this.addChild(this.progress);
        this.labelProgress = new uiCore.Label();
        this.labelProgress.bottom = 80;
        this.labelProgress.horizontalCenter = 0;
        this.labelProgress.fontFamily = "微软雅黑";
        this.labelProgress.size = 16;
        this.labelProgress.textAlign = "center";
        this.addChild(this.labelProgress);
        this.dispatchEventWith(egret.Event.COMPLETE); //告诉HowMain，加载界面初始化完成
    };
    LoadingUI.prototype.changeTipText = function () {
        this.tipText.text = LibCore.GameConfig.tipTextArray[this.tipTextIndex % LibCore.GameConfig.tipTextArray.length];
        this.tipTextIndex++;
    };
    LoadingUI.prototype.setProgress = function (percent, current, total) {
        if (current === void 0) { current = 0; }
        if (total === void 0) { total = 0; }
        if (this.progress) {
            var width = this.progress.width = 6 * percent;
            this.progress.horizontalCenter = (width - 600) / 2.07;
            var progressMsg = uiCore.StringUtils.format(uiCore.LangUtils.getMsgById(3) + "{0}%，{1}/{2}", percent, current, total);
            this.setText(progressMsg);
        }
    };
    LoadingUI.prototype.setText = function (text) {
        if (this.labelProgress) {
            this.labelProgress.text = text;
        }
    };
    return LoadingUI;
}(eui.Group));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map