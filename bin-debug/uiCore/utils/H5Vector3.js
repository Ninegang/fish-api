var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var H5Vector3 = (function () {
        function H5Vector3() {
        }
        H5Vector3.New = function (x, y, z) {
            var v = { x: x || 0, y: y || 0, z: z || 0 };
            return v;
        };
        H5Vector3.Clone = function () {
            return this.New(this.x, this.y, this.z);
        };
        H5Vector3.MulQuat = function (quat) {
            var num = quat.x * 2;
            var num2 = quat.y * 2;
            var num3 = quat.z * 2;
            var num4 = quat.x * num;
            var num5 = quat.y * num2;
            var num6 = quat.z * num3;
            var num7 = quat.x * num2;
            var num8 = quat.x * num3;
            var num9 = quat.y * num3;
            var num10 = quat.w * num;
            var num11 = quat.w * num2;
            var num12 = quat.w * num3;
            var x = (((1 - (num5 + num6)) * this.x) + ((num7 - num12) * this.y)) + ((num8 + num11) * this.z);
            var y = (((num7 + num12) * this.x) + ((1 - (num4 + num6)) * this.y)) + ((num9 - num10) * this.z);
            var z = (((num8 - num11) * this.x) + ((num9 + num10) * this.y)) + ((1 - (num4 + num5)) * this.z);
            return this;
        };
        H5Vector3.SqrMagnitude = function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        };
        H5Vector3.div = function (va, d) {
            return this.New(va.x / d, va.y / d, va.z / d);
        };
        H5Vector3.mul = function (va, d) {
            if (typeof (d) == "number") {
                return this.New(va.x * d, va.y * d, va.z * d);
            }
            else {
                var vec = va.Clone();
                vec.MulQuat(d);
                return vec;
            }
        };
        H5Vector3.add = function (va, vb) {
            return this.New(va.x + vb.x, va.y + vb.y, va.z + vb.z);
        };
        H5Vector3.sub = function (va, vb) {
            return this.New(va.x - vb.x, va.y - vb.y, va.z - vb.z);
        };
        H5Vector3.unm = function (va) {
            return this.New(-va.x, -va.y, -va.z);
        };
        H5Vector3.eq = function (a, b) {
            var v = a - b;
            var delta = v.SqrMagnitude();
            return delta < 1e-10;
        };
        return H5Vector3;
    }());
    uiCore.H5Vector3 = H5Vector3;
    __reflect(H5Vector3.prototype, "uiCore.H5Vector3");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=H5Vector3.js.map