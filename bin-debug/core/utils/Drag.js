var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var Drag = (function () {
        function Drag() {
            this.startPointB = new egret.Point();
            this.tmpPoint = new egret.Point();
        }
        Object.defineProperty(Drag, "inst", {
            get: function () {
                if (!Drag._inst) {
                    Drag._inst = new Drag();
                }
                return Drag._inst;
            },
            enumerable: true,
            configurable: true
        });
        Drag.prototype.setup = function (stage) {
            this.stage = stage;
        };
        Drag.prototype.start = function (disObj, startPoint, rect, moveEnd, moveFn) {
            if (moveFn === void 0) { moveFn = null; }
            this.disObj = disObj;
            this.startPointA = startPoint.clone();
            this.rect = rect;
            this.moveFn = moveFn;
            this.moveEnd = moveEnd;
            this.startPointB.x = this.disObj.x;
            this.startPointB.y = this.disObj.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMoveEnd, this);
        };
        Drag.prototype.onMove = function (evt) {
            this.tmpPoint.x = (evt.stageX - this.startPointA.x) + this.startPointB.x;
            this.tmpPoint.y = evt.stageY - this.startPointA.y + this.startPointB.y;
            if (this.tmpPoint.x < this.rect.x) {
                this.disObj.x = this.rect.x;
            }
            else if (this.tmpPoint.x > this.rect.right) {
                this.disObj.x = this.rect.right;
            }
            else {
                this.disObj.x = this.tmpPoint.x;
            }
            if (this.tmpPoint.y < this.rect.y) {
                this.disObj.y = this.rect.y;
            }
            else if (this.tmpPoint.y > this.rect.bottom) {
                this.disObj.y = this.rect.bottom;
            }
            else {
                this.disObj.y = this.tmpPoint.y;
            }
            if (this.moveFn) {
                this.moveFn(this.disObj);
            }
        };
        Drag.prototype.onMoveEnd = function (evt) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMoveEnd, this);
            if (this.moveEnd) {
                this.moveEnd(this.disObj);
            }
            this.disObj = null;
            this.moveFn = null;
            this.moveEnd = null;
            this.rect = null;
        };
        return Drag;
    }());
    core.Drag = Drag;
    __reflect(Drag.prototype, "core.Drag");
})(core || (core = {}));
//# sourceMappingURL=Drag.js.map