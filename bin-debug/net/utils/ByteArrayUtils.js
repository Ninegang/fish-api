var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var ByteArrayUtils = (function () {
        function ByteArrayUtils() {
        }
        /**
         * 判断两个字节流内容是否相同
         * @param bytes1	字节流1
         * @param bytes2	字节流2
         * @return			是否相同
         */
        ByteArrayUtils.isEqual = function (bytes1, bytes2) {
            var len = bytes1.length;
            if (len != bytes2.length)
                return false;
            var bytes1_arr = ByteArrayUtils.getBytes(bytes1);
            var bytes2_arr = ByteArrayUtils.getBytes(bytes2);
            for (var i = 0; i < len; i++) {
                if (bytes1_arr[i] != bytes2_arr[i])
                    return false;
            }
            return true;
        };
        /**
         * 连接两个字节流
         * @param bytes1	字节流1
         * @param bytes		字节流2
         * @param createNew	是否创建新字节流（取字节流1的类型，否则将把字节流2连接到字节流1的最后）
         * @return			连接后的字节流（将定位到字节流最后）
         */
        ByteArrayUtils.concat = function (bytes1, bytes2, createNew) {
            if (createNew === void 0) { createNew = false; }
            var bytes = createNew ? new bytes1.constructor : bytes1;
            var len = bytes.length;
            bytes.position = len;
            bytes.writeBytes(bytes2);
            return bytes;
        };
        /**
         * 将给定字节流（或一部分）转为16进制字符串
         * @param bytes		给定字节流
         * @param sep		每个16进制数之间的分隔符
         * @param cursor	当前位置光标的指示符
         * @param offset	要转换部分的起始偏移量（若&lt;0，则从末尾往前数，若超出字节流长度，则取末尾）
         * @param length	要转换部分的长度（若为0或超出字节流offset后的长度，则取末尾）
         */
        ByteArrayUtils.toHex = function (bytes, sep, cursor, offset, length) {
            if (sep === void 0) { sep = " "; }
            if (cursor === void 0) { cursor = ""; }
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            offset = offset < 0 ? Math.max(0, bytes.length + offset) : Math.min(offset, bytes.length);
            length = Math.min(bytes.length - offset, length || 0x7fffffff);
            if (length > 0) {
                var hex_arr = [];
                var bytes_arr = new Uint8Array(bytes.buffer);
                for (var i = 0; i < length; i++) {
                    var hex = bytes_arr[i + offset].toString(16);
                    hex_arr[i] = (cursor && i + offset == bytes.position ? cursor : "") + (hex.length == 1 ? "0" + hex : hex);
                }
                return hex_arr.join(sep);
            }
            return "";
        };
        ///////////////////////////////////////////////////
        // SB新老版本不兼容的问题
        ///////////////////////////////////////////////////////////////
        ByteArrayUtils.readAvailable = function (bytes) {
            return bytes.length - bytes.position;
        };
        ByteArrayUtils.getBytes = function (bytes) {
            // 新的版本用bytes代替只读
            if (bytes['bytes']) {
                return bytes["bytes"];
            }
            return new Uint8Array(bytes.buffer);
        };
        return ByteArrayUtils;
    }());
    Net.ByteArrayUtils = ByteArrayUtils;
    __reflect(ByteArrayUtils.prototype, "Net.ByteArrayUtils");
})(Net || (Net = {}));
//# sourceMappingURL=ByteArrayUtils.js.map