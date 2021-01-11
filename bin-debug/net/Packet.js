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
    var Packet = (function (_super) {
        __extends(Packet, _super);
        function Packet() {
            var _this = _super.call(this) || this;
            _this._content = new Net.ByteArrayLittle();
            return _this;
        }
        Object.defineProperty(Packet.prototype, "content", {
            get: function () {
                return this._content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Packet.prototype, "resultPackage", {
            get: function () {
                return this._resultPackage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Packet.prototype, "result", {
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Packet.prototype.read = function (buffer) {
            var unpackBuffer = uiCore.ProtobufManager.spObject.unpack(buffer.bytes);
            this._resultPackage = uiCore.ProtobufManager.spObject.decode("package", unpackBuffer);
            var used_sz = uiCore.ProtobufManager.spObject.objlen("package", unpackBuffer);
            var leftbuffer = unpackBuffer.slice(used_sz, unpackBuffer.length);
            var key = Net.FishGameTypeUtils.getFishGameTypeStr(this._resultPackage.type, false);
            if (key == null) {
                // Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("NO read key: " + this);
                return;
            }
            this._result = uiCore.ProtobufManager.spObject.decode(key, leftbuffer);
            // if(buffer.length>2048){
            // 	console.log("超级长度："+buffer.length);
            // 	for(let key in this._result){
            // 		console.log(key + '---' + this._result[key])
            // 	} 
            // 	console.log("----------------------------------------");
            // }
        };
        Packet.prototype.write = function (serverId, playerId, type, content) {
            if (content === void 0) { content = {}; }
            if (!uiCore.ProtobufManager.spObject) {
                // Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("Write packet content error: " + this);
                return;
            }
            var header = {
                playerId: playerId,
                type: type,
                serverId: serverId
            };
            var header_buffer = uiCore.ProtobufManager.spObject.encode("package", header);
            var key = Net.FishGameTypeUtils.getFishGameTypeStr(type, true);
            if (key == null) {
                // Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("NO write key: " + this);
                return;
            }
            var data_buffer = uiCore.ProtobufManager.spObject.encode(key, content);
            var pack_buffer = uiCore.ProtobufManager.spObject.pack(utils.arrayconcat(header_buffer, data_buffer));
            this._content = new egret.ByteArray(new Uint8Array(pack_buffer));
        };
        return Packet;
    }(egret.HashObject));
    Net.Packet = Packet;
    __reflect(Packet.prototype, "Net.Packet");
})(Net || (Net = {}));
//# sourceMappingURL=Packet.js.map