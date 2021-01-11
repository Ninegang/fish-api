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
    var ButtonEx = (function (_super) {
        __extends(ButtonEx, _super);
        function ButtonEx() {
            var _this = _super.call(this) || this;
            _this.soundPath = "window_open_mp3";
            _this._styleFrame = "";
            _this._styleBtnUp = "button_up";
            _this._styleBtnDown = "button_down";
            _this._suffName = "_png";
            _this.data = new StyleFrameData();
            _this.skinName = "ButtonExSkin";
            return _this;
        }
        ButtonEx.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        };
        ButtonEx.prototype.onTouchTab = function (ev) {
            if (RES.hasRes(this.soundPath)) {
                // uiCore.SoundManager.playEffect(this.soundPath);
            }
        };
        Object.defineProperty(ButtonEx.prototype, "styleFrame", {
            get: function () {
                return this._styleFrame;
            },
            set: function (value) {
                if (this._styleFrame != value) {
                    this._styleFrame = value;
                    this.data.upIcon = this.styleBtnUp + this._styleFrame + this._suffName;
                    this.data.downIcon = this.styleBtnDown + this._styleFrame + this._suffName;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonEx.prototype, "styleBtnUp", {
            get: function () {
                return this._styleBtnUp;
            },
            set: function (value) {
                this._styleBtnUp = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonEx.prototype, "styleBtnDown", {
            get: function () {
                return this._styleBtnDown;
            },
            set: function (value) {
                this._styleBtnDown = value;
            },
            enumerable: true,
            configurable: true
        });
        return ButtonEx;
    }(eui.Button));
    uiCore.ButtonEx = ButtonEx;
    __reflect(ButtonEx.prototype, "uiCore.ButtonEx", ["eui.UIComponent", "egret.DisplayObject"]);
    /**样式帧数据*/
    var StyleFrameData = (function () {
        function StyleFrameData() {
        }
        Object.defineProperty(StyleFrameData.prototype, "downIcon", {
            get: function () {
                return this._downIcon;
            },
            set: function (value) {
                this._downIcon = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleFrameData.prototype, "upIcon", {
            get: function () {
                return this._upIcon;
            },
            set: function (value) {
                this._upIcon = value;
            },
            enumerable: true,
            configurable: true
        });
        return StyleFrameData;
    }());
    __reflect(StyleFrameData.prototype, "StyleFrameData");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ButtonEx.js.map