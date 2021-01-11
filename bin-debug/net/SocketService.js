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
    var SocketService = (function (_super) {
        __extends(SocketService, _super);
        function SocketService() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SocketService.prototype, "connected", {
            /**
             * 是否已连接
             */
            get: function () {
                return this._socket && this._socket.connected;
            },
            enumerable: true,
            configurable: true
        });
        SocketService.prototype.connect = function (connInfo) {
            this.disconnect();
            try {
                this._connInfo = connInfo;
                // SocketInterface.debugLog && SocketInterface.debugLog("Connect to socket: " + this._connInfo);
                this.initSocket();
                var protocol = "ws://";
                if (this._connInfo.port == 0) {
                    this._socket.connectByUrl(protocol + this._connInfo.host);
                }
                else {
                    this._socket.connectByUrl(protocol + this._connInfo.host + ":" + this._connInfo.port);
                }
            }
            catch (e) {
                // SocketInterface.errorLog && SocketInterface.errorLog("Connect to socket error: " + e);
                Net.SocketInterface.service = this;
                Net.SocketInterface.onConnectFail && Net.SocketInterface.onConnectFail();
            }
        };
        SocketService.prototype.disconnect = function () {
            if (!this._socket)
                return;
            // SocketInterface.debugLog && SocketInterface.debugLog("Disconnect socket: " + this._connInfo);
            this.onDisconnect(null);
        };
        /**
         * 连接成功事件
         */
        SocketService.prototype.onConnect = function (evt) {
            // SocketInterface.debugLog && SocketInterface.debugLog("Socket connected with: " + this._connInfo);
            Net.SocketInterface.service = this;
            Net.SocketInterface.onConnect && Net.SocketInterface.onConnect();
        };
        /**
         * 连接被断开事件
         */
        SocketService.prototype.onDisconnect = function (evt) {
            this.clearSocket();
            // SocketInterface.debugLog && SocketInterface.debugLog("Socket disconnected from: " + this._connInfo);
            Net.SocketInterface.service = this;
            if (evt) {
                Net.SocketInterface.onDisconnect && Net.SocketInterface.onDisconnect();
            }
        };
        /**
         * 收到数据事件
         */
        SocketService.prototype.onData = function (evt) {
            this._socket.readBytes(this._readBuffer, this._readBuffer.length);
            //SocketInterface.debugLog && SocketInterface.debugLog("Receiving socket data: " + this._readBuffer.length);
            Net.SocketInterface.service = this;
            var readContent = new egret.ByteArray();
            var readLeng = new egret.ByteArray();
            this._readBuffer.readBytes(readLeng, 0, 4);
            this._readBuffer.readBytes(readContent);
            var packet = Net.SocketInterface.createRecvPacket();
            packet.read(readContent);
            this.readPacket(packet);
            if (this._readBuffer && Net.ByteArrayUtils.readAvailable(this._readBuffer) == 0) {
                this._readBuffer.length = 0;
            }
        };
        /**
         * 连接错误事件
         */
        SocketService.prototype.onError = function (evt) {
            // SocketInterface.errorLog && SocketInterface.errorLog("Socket connection error: " + evt);
            Net.SocketInterface.service = this;
            if (this.connected) {
                Net.SocketInterface.onError && Net.SocketInterface.onError();
            }
            else {
                Net.SocketInterface.onConnectFail && Net.SocketInterface.onConnectFail();
            }
        };
        /**
         * 初始化连接对象
         */
        SocketService.prototype.initSocket = function () {
            if (this._socket)
                return;
            this._socket = new egret.WebSocket();
            this._socket.type = egret.WebSocket.TYPE_BINARY;
            this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this._socket.addEventListener(egret.Event.CLOSE, this.onDisconnect, this);
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this._readBuffer = new Net.ByteArrayLittle();
            this._writeBuffer = new Net.ByteArrayLittle();
        };
        /**
         * 清除连接对象
         */
        SocketService.prototype.clearSocket = function () {
            if (!this._socket)
                return;
            this._socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this.onDisconnect, this);
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this._socket.connected && this._socket.close();
            this._socket = null;
            this._readBuffer.clear();
            this._readBuffer = null;
            this._writeBuffer.clear();
            this._writeBuffer = null;
        };
        SocketService.prototype.readPacket = function (packet) {
            if (!packet.resultPackage) {
                // SocketInterface.errorLog && SocketInterface.errorLog("readPacket resultPackage is null");
                return;
            }
            if (!packet.result) {
                // SocketInterface.errorLog && SocketInterface.errorLog("readPacket result is null");
                return;
            }
            // console.log("接收："+packet.resultPackage.type);
            var callFun = uiCore.ProtobufManager.getReturnCallFunMap(packet.resultPackage.type);
            if (callFun == null) {
                // SocketInterface.errorLog && SocketInterface.errorLog("readPacket callFun is null");
                return;
            }
            callFun(packet.result);
        };
        SocketService.prototype.sendPacket = function (packet) {
            if (!this.connected) {
                // SocketInterface.errorLog && SocketInterface.errorLog("Socket not connected for sending packet");
                return;
            }
            try {
                this._writeBuffer.length = packet.content.length + 4;
                this._writeBuffer.position = 0;
                this._writeBuffer.writeUnsignedInt(packet.content.length);
                this._writeBuffer.writeBytes(packet.content);
                this._socket.writeBytes(this._writeBuffer);
                this._socket.flush();
            }
            catch (e) {
                // SocketInterface.errorLog && SocketInterface.errorLog("Sending packet error: ", e);
                Net.SocketInterface.service = this;
                Net.SocketInterface.onSendError && Net.SocketInterface.onSendError(e, packet);
            }
        };
        /**
         * 释放缓存（建议定时执行）
         */
        SocketService.prototype.clearBuffer = function () {
            if (this._readBuffer && this._readBuffer.length == 0) {
                this._readBuffer.clear();
            }
            if (this._writeBuffer) {
                this._writeBuffer.clear();
            }
        };
        SocketService.instance = new SocketService();
        return SocketService;
    }(egret.HashObject));
    Net.SocketService = SocketService;
    __reflect(SocketService.prototype, "Net.SocketService");
})(Net || (Net = {}));
//# sourceMappingURL=SocketService.js.map