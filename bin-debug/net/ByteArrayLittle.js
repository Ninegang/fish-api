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
var Net;
(function (Net) {
    var ByteArrayLittle = (function (_super) {
        __extends(ByteArrayLittle, _super);
        function ByteArrayLittle() {
            var _this = _super.call(this) || this;
            _this.endian = egret.Endian.LITTLE_ENDIAN;
            return _this;
        }
        ByteArrayLittle.prototype.toString = function () {
            return "<ByteArrayLittle len=" + this.length + ",pos=" + this.position + ">";
        };
        return ByteArrayLittle;
    }(egret.ByteArray));
    Net.ByteArrayLittle = ByteArrayLittle;
    __reflect(ByteArrayLittle.prototype, "Net.ByteArrayLittle");
})(Net || (Net = {}));
//# sourceMappingURL=ByteArrayLittle.js.map