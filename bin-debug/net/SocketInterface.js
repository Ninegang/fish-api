var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var SocketInterface = (function () {
        function SocketInterface() {
        }
        /**
         * 创建接收数据包（必须），格式为：function():Packet
         */
        SocketInterface.createRecvPacket = function () {
            return new Net.Packet;
        };
        /**
         * 输出错误日志，格式为：function( msg:string ):void
         */
        SocketInterface.errorLog = console.log;
        /**
         * 输出调试日志，格式为：function( msg:string ):void
         */
        SocketInterface.debugLog = console.log;
        return SocketInterface;
    }());
    Net.SocketInterface = SocketInterface;
    __reflect(SocketInterface.prototype, "Net.SocketInterface");
})(Net || (Net = {}));
//# sourceMappingURL=SocketInterface.js.map