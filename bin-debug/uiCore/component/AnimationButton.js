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
     * 帧动画按钮
     * @author none
     */
    var AnimationButton = (function (_super) {
        __extends(AnimationButton, _super);
        function AnimationButton() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AnimationButton.prototype, "getanimDisplay", {
            get: function () {
                return this.animDisplay;
            },
            enumerable: true,
            configurable: true
        });
        return AnimationButton;
    }(uiCore.Button));
    uiCore.AnimationButton = AnimationButton;
    __reflect(AnimationButton.prototype, "uiCore.AnimationButton");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=AnimationButton.js.map