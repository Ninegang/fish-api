var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var BezierSpline = (function () {
        function BezierSpline() {
            this._length = -1;
            this.tmpPoint = egret.Point.create(0, 0);
            this.pL = [];
        }
        BezierSpline.getVal = function (len, index) {
            var valL = BezierSpline.valLL[len];
            if (!valL) {
                BezierSpline.valLL[len] = valL = [];
            }
            var val = valL[index];
            if (!val) {
                var val1 = 1;
                var val2 = 1;
                while (index > 0) {
                    val1 *= len;
                    val2 *= index;
                    len--;
                    index--;
                }
                val = val1 / val2;
            }
            return val;
        };
        BezierSpline.prototype.recyclePointL = function () {
            if (this.pL && this.pL.length > 0) {
                for (var _i = 0, _a = this.pL; _i < _a.length; _i++) {
                    var point = _a[_i];
                    egret.Point.release(point);
                }
                this.pL.length = 0;
            }
        };
        BezierSpline.prototype.setPoints = function (pL) {
            this.recyclePointL();
            for (var _i = 0, pL_1 = pL; _i < pL_1.length; _i++) {
                var point = pL_1[_i];
                this.pL.push(egret.Point.create(point.x, point.y));
            }
            this._length = -1;
            this.pLen = pL.length;
        };
        BezierSpline.prototype.getLength = function (seg) {
            if (seg === void 0) { seg = 1000; }
            if (this._length == -1) {
                this._length = 0;
                var prevPoint = egret.Point.create(this.pL[0].x, this.pL[0].y);
                var nextPoint = void 0;
                for (var i = 1; i < seg; i++) {
                    nextPoint = this.getPointByT(i / seg);
                    this._length += egret.Point.distance(prevPoint, nextPoint);
                    prevPoint.setTo(nextPoint.x, nextPoint.y);
                }
                egret.Point.release(prevPoint);
            }
            return this._length;
        };
        BezierSpline.prototype.getPointByT = function (t) {
            var diffVal = 1 - t;
            var tempP = this.tmpPoint;
            var tempPL = this.pL;
            tempP.x = tempP.y = 0;
            var tempLen = this.pLen - 1;
            var tempP1;
            var tempVal;
            for (var i = 0; i <= tempLen; i++) {
                tempP1 = tempPL[i];
                tempVal = Math.pow(diffVal, tempLen - i) * Math.pow(t, i) * BezierSpline.getVal(tempLen, i);
                tempP.x += tempP1.x * tempVal;
                tempP.y += tempP1.y * tempVal;
            }
            return this.tmpPoint;
        };
        BezierSpline.prototype.destroy = function () {
            egret.Point.release(this.tmpPoint);
            this.recyclePointL();
            this.pL = null;
        };
        BezierSpline.valLL = [];
        return BezierSpline;
    }());
    core.BezierSpline = BezierSpline;
    __reflect(BezierSpline.prototype, "core.BezierSpline");
})(core || (core = {}));
//# sourceMappingURL=BezierSpline.js.map