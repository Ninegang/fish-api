var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameRateManager = (function () {
    function FrameRateManager() {
    }
    FrameRateManager.setup = function (stage) {
        FrameRateManager.stage = stage;
        FrameRateManager.resetAll();
    };
    FrameRateManager.setGameRun = function (val) {
        FrameRateManager.gameRun = val;
        FrameRateManager.updateFrameRate();
    };
    FrameRateManager.setNoticeRun = function (val) {
        FrameRateManager.noticeRun = val;
        FrameRateManager.updateFrameRate();
    };
    FrameRateManager.updateFrameRate = function () {
        if (egret.Capabilities.isMobile) {
            if (FrameRateManager.gameRun || FrameRateManager.noticeRun) {
                FrameRateManager.stage.frameRate = FrameRateManager.HIGH_RATE;
            }
            else {
                FrameRateManager.stage.frameRate = FrameRateManager.LOW_RATE;
            }
        }
    };
    FrameRateManager.resetAll = function () {
        FrameRateManager.gameRun = false;
        FrameRateManager.noticeRun = false;
        FrameRateManager.updateFrameRate();
    };
    FrameRateManager.HIGH_RATE = 60;
    FrameRateManager.LOW_RATE = 30;
    FrameRateManager.gameRun = false;
    FrameRateManager.noticeRun = false;
    return FrameRateManager;
}());
__reflect(FrameRateManager.prototype, "FrameRateManager");
//# sourceMappingURL=FrameRateManager.js.map