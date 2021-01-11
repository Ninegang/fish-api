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
var uiCore;
(function (uiCore) {
    /**
     * 标语提示组件，用一个自上而下的横幅来显示信息。
     * 和弹窗、对话框不同，他不会影响用户交互，也没有交互产生，用于一些弱提示。
     * 一定时间会自动消失，如果弹出多个则上一个消失及时会暂停，直到新的消失才会继续启用。
     * @author none
     *
     */
    var Banner = (function (_super) {
        __extends(Banner, _super);
        function Banner(message, okHandler, thisObject) {
            var _this = _super.call(this) || this;
            _this.skinName = uiCore.Banner.skinName;
            _this.message = message;
            _this.horizontalCenter = 0;
            _this.okHandler = okHandler;
            _this.thisObject = thisObject;
            _this.delay = message.length / 7; //计算展示时间
            if (_this.delay < 3) {
                _this.delay = 3;
            }
            else if (_this.delay > 6) {
                _this.delay = 6;
            }
            if (_this.okHandler != null) {
                _this.delay = 6;
            }
            return _this;
        }
        Banner.prototype.childrenCreated = function () {
            this.messageLabel.textFlow = uiCore.StringUtils.textToRichText(this.message);
            // this.cacheAsBitmap = true;
            this.y = -this.height;
            egret.Tween.get(this).to({ y: 0 }, 300);
            this.playTimer();
        };
        /**
         * 停止标语消失倒计时
         */
        Banner.prototype.pauseTimer = function () {
            egret.clearTimeout(this.timeID);
            var nowTime = egret.getTimer();
        };
        /**
         * 继续标语消失倒计时
         */
        Banner.prototype.playTimer = function () {
            this.timeID = egret.setTimeout(this.onTimeOut, this, this.delay * 1000);
        };
        /**
         * 重置标语倒计时
         */
        Banner.prototype.replayTimer = function () {
            this.pauseTimer();
            this.playTimer();
        };
        /**
         * 关闭本标语
         */
        Banner.prototype.close = function () {
            uiCore.Application.closeWindow(this);
            egret.clearTimeout(this.timeID);
            Banner.bannerList.pop();
            if (Banner.bannerList.length) {
                var banner = Banner.bannerList[Banner.bannerList.length - 1];
                banner.playTimer(); //继续之前的标语的倒计时
            }
            if (this.okHandler) {
                this.okHandler.apply(this.thisObject);
            }
        };
        Banner.prototype.onTimeOut = function () {
            egret.Tween.get(this).to({ y: -this.height }, 300).call(this.close, this);
        };
        /**
        * 初始化对话框，在游戏启动的时候调用
        * @param skinName {string} 弹窗皮肤
        */
        Banner.init = function (skinName, delay) {
            if (delay === void 0) { delay = 2000; }
            this.skinName = skinName;
            this.bannerList = new Array();
        };
        /**
        * 显示一个弹窗
        * @param message {string} 提示文字
        * @returns {uiCore.Banner} 弹窗的实例
        */
        Banner.show = function (message, okHandler, thisObject) {
            if (!this.skinName) {
                warn("Banner标语未初始化，将不会被显示，请先调用uiCore.Banner.init()。");
            }
            var banner = new uiCore.Banner(message, okHandler, thisObject);
            if (Banner.bannerList.length) {
                var currentBanner = Banner.bannerList[Banner.bannerList.length - 1];
                currentBanner.pauseTimer(); //停止当前标语的消失倒计时
                if (currentBanner.message == message && currentBanner.okHandler == okHandler && currentBanner.thisObject == thisObject) {
                    currentBanner.replayTimer();
                }
            }
            this.bannerList.push(banner);
            uiCore.Application.addWindow(banner, false, false, false, false);
            return banner;
        };
        return Banner;
    }(eui.Component));
    uiCore.Banner = Banner;
    __reflect(Banner.prototype, "uiCore.Banner");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Banner.js.map