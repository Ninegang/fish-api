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
     * 所有按钮的基类
     * 带按下缩放功能，按下声音功能，按下改变颜色功能（后面2个功能暂未加入）
     * @author none
     *
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super.call(this) || this;
            _this.isNeedMask = true;
            _this.scaleDuration = 100;
            _this.scaleWhenDown = 0.98;
            _this.disableInterval = 300;
            _this.soundPath = "window_open_mp3";
            /*是否需要缩放*/
            _this.isScale = true;
            _this._visible = false;
            _this.addEventListener(egret.Event.RESIZE, _this.onSizeOne, _this);
            return _this;
        }
        Button.prototype.childrenCreated = function () {
            if (this.groupScale) {
                this._scaleGroup = this.groupScale;
            }
            else {
                this._scaleGroup = new eui.Group();
            }
            //this._visible = this.visible;
            this._scaleGroup.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutSide, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        };
        Button.prototype.setSkin = function (skin) {
            _super.prototype.setSkin.call(this, skin);
            if (this._scaleGroup && this._scaleGroup.parent) {
                this._scaleGroup.parent.removeChild(this._scaleGroup);
                this._scaleGroup = new eui.Group();
                this.initGroupScale();
            }
        };
        /*第一次接收resize事件的时候处理缩放逻辑（没有找到更好的获取组件宽高的事件）*/
        Button.prototype.onSizeOne = function () {
            this.removeEventListener(egret.Event.RESIZE, this.onSizeOne, this);
            this.initGroupScale();
        };
        Button.prototype.initGroupScale = function () {
            if (this._scaleGroup.anchorOffsetX > 0)
                return;
            //获取宽高是关键
            var mWidth = this.width;
            var mHeight = this.height;
            if (this._scaleGroup != this.groupScale && this._scaleGroup.numChildren <= 0) {
                var display = null;
                while (this.numChildren > 0) {
                    display = this.getChildAt(0);
                    this._scaleGroup.addChild(display);
                }
                this.addChild(this._scaleGroup);
            }
            this._scaleGroup.width = mWidth;
            this._scaleGroup.height = mHeight;
            this._scaleGroup.anchorOffsetX = mWidth * 0.5;
            this._scaleGroup.anchorOffsetY = mHeight * 0.5;
            this._scaleGroup.x = mWidth * 0.5;
            this._scaleGroup.y = mHeight * 0.5;
            this.width = mWidth;
            this.height = mHeight;
            this._scaleGroup.visible = true;
        };
        Button.prototype.onTouchBegin = function (e) {
            _super.prototype.onTouchBegin.call(this, e);
            if (this.isScale) {
                this._scaleGroup.scaleX = this.scaleWhenDown;
                this._scaleGroup.scaleY = this.scaleWhenDown;
            }
            if (!this.isNeedMask) {
                return;
            }
            //防止快速点击加上遮罩
            if (!Button._mask) {
                Button._mask = new eui.Group();
            }
            Button._mask.width = this.stage.width;
            Button._mask.height = this.stage.height;
            this.stage.addChild(Button._mask);
            egret.setTimeout(function (argStage) {
                argStage.removeChild(Button._mask);
            }, this, this.disableInterval, this.stage);
        };
        Button.prototype.onTouchEnd = function (e) {
            if (this.isScale) {
                this._scaleGroup.scaleX = 1;
                this._scaleGroup.scaleY = 1;
            }
        };
        Button.prototype.onTouchOutSide = function (e) {
            this.onTouchEnd(null);
            //            var target = this.stage.$hitTest(e.stageX,e.stageY);
            if (this.stage && this.stage.contains(Button._mask) && e.target.hitTestPoint(e.stageX, e.stageY)) {
                egret.TouchEvent.dispatchTouchEvent(e.target, egret.TouchEvent.TOUCH_TAP, true, true, e.stageX, e.stageX, e.touchPointID, false);
            }
        };
        //状态改变的时候设置缩放
        Button.prototype.setScaleByStatus = function () {
            var curState = this.getCurrentState();
            this.scaleX = this.scaleY = curState == "down" ? this.scaleWhenDown : 1;
        };
        return Button;
    }(eui.Button));
    uiCore.Button = Button;
    __reflect(Button.prototype, "uiCore.Button");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Button.js.map