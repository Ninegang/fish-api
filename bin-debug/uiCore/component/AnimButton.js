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
     *带动画特效的Button
     * @author none
     *
     */
    var AnimButton = (function (_super) {
        __extends(AnimButton, _super);
        function AnimButton() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AnimButton.prototype, "getanimDisplay", {
            get: function () {
                return this.animDisplay;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取按钮上的特效播放一次的持续时间
         * @return delay {number} 特效持续时间(毫秒)
         */
        AnimButton.prototype.getAnimDelay = function () {
            return this.animDisplay.getAnimDuration();
        };
        return AnimButton;
    }(uiCore.Button));
    uiCore.AnimButton = AnimButton;
    __reflect(AnimButton.prototype, "uiCore.AnimButton");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=AnimButton.js.map