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
     * 页面切换控件
     * @author none
     *
     */
    var PageView = (function (_super) {
        __extends(PageView, _super);
        function PageView() {
            var _this = _super.call(this) || this;
            //滚动灵敏度（像素）
            _this.rate = 200;
            //滚动时间（毫秒）
            _this.scrollerSpeed = 500;
            //回弹时间（毫秒）
            _this.boundSpeed = 300;
            //正在滚动
            _this.isScrolling = false;
            _this.throwSpeed = 0;
            return _this;
        }
        PageView.prototype.childrenCreated = function () {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
            this.addEventListener(eui.UIEvent.CHANGE_START, this.touchBegin, this);
            this.addEventListener(eui.UIEvent.CHANGE_END, this.touchEnd, this);
            this.group = this.getChildAt(0);
            this.isLand = egret.is(this.group.layout, "eui.VerticalLayout") ? "scrollV" : "scrollH";
            this.start();
        };
        PageView.prototype.touchBegin = function (evt) {
            if (this.isScrolling) {
                return;
            }
            this.scrollerCount = Math.floor(this.viewport[this.isLand] / this.width);
            this.beginPoint = this.viewport[this.isLand];
        };
        PageView.prototype.touchEnd = function (evt) {
            if (this.isScrolling) {
                return;
            }
            this.endPoint = this.viewport[this.isLand];
            this.onMove();
        };
        PageView.prototype.onMove = function () {
            this.touchEnabled = false;
            if (Math.abs(this.endPoint - this.beginPoint) >= this.rate) {
                if (this.endPoint - this.beginPoint > 0) {
                    this.scrollerCount++;
                    this.scrollerCount = this.scrollerCount >= this.group.numChildren ? this.group.numChildren - 1 : this.scrollerCount;
                }
                else {
                    this.scrollerCount--;
                    this.scrollerCount = this.scrollerCount < 0 ? 0 : this.scrollerCount;
                }
                egret.Tween.get(this.viewport).to((_a = {}, _a[this.isLand] = this.width * this.scrollerCount, _a), this.scrollerSpeed).call(this._scrollerend, this, [true]);
                this.isScrolling = true;
            }
            else {
                egret.Tween.get(this.viewport).to((_b = {}, _b[this.isLand] = this.width * this.scrollerCount, _b), this.boundSpeed).call(this._scrollerend, this, [false]);
                this.isScrolling = true;
            }
            var _a, _b;
        };
        PageView.prototype.onDestroy = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
            this.removeEventListener(eui.UIEvent.CHANGE_START, this.touchBegin, this);
            this.removeEventListener(eui.UIEvent.CHANGE_END, this.touchEnd, this);
            this.end();
        };
        PageView.prototype._scrollerend = function (data) {
            this.touchEnabled = true;
            this.isScrolling = false;
            this.scrollerEnd(data);
        };
        PageView.prototype.scrollerEnd = function (isScroller) { };
        PageView.prototype.start = function () { };
        PageView.prototype.end = function () { };
        return PageView;
    }(eui.Scroller));
    uiCore.PageView = PageView;
    __reflect(PageView.prototype, "uiCore.PageView");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=PageView.js.map