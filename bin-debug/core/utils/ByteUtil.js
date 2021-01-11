var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var ByteUtil = (function () {
        function ByteUtil() {
        }
        /** 字符串转成固定长度的字节 */
        ByteUtil.getFixedByteByMsg = function (msg, len) {
            var ret = new egret.ByteArray();
            ret.endian = egret.Endian.LITTLE_ENDIAN;
            ret.writeUTFBytes(msg);
            ret.length = len;
            return ret;
        };
        ByteUtil.readInt64 = function (byte) {
            return byte.readUnsignedInt() + byte.readUnsignedInt() * 4228250625;
        };
        ByteUtil.getMsgLen = function (msg) {
            var ret = new egret.ByteArray();
            ret.endian = egret.Endian.LITTLE_ENDIAN;
            ret.writeUTFBytes(msg);
            return ret.length;
        };
        ByteUtil.chkstrlen = function (str) {
            var strlen = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255)
                    strlen += 2;
                else
                    strlen++;
            }
            return strlen;
        };
        return ByteUtil;
    }());
    core.ByteUtil = ByteUtil;
    __reflect(ByteUtil.prototype, "core.ByteUtil");
})(core || (core = {}));
//# sourceMappingURL=ByteUtil.js.map