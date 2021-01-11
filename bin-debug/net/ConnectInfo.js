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
    var ConnectInfo = (function (_super) {
        __extends(ConnectInfo, _super);
        function ConnectInfo(host, port) {
            if (host === void 0) { host = null; }
            if (port === void 0) { port = 0; }
            var _this = _super.call(this) || this;
            _this._port = 0;
            /** 服务端地址 */
            _this.host = "127.0.0.1";
            /** 可选端口列表 */
            _this.ports = null;
            if (host)
                _this.host = host;
            if (port instanceof Array)
                _this.ports = port;
            else if (port)
                _this.port = port;
            return _this;
        }
        Object.defineProperty(ConnectInfo.prototype, "port", {
            /**
             * 实际选用端口（0表示从可选端口列表中随机选择一个）
             */
            get: function () {
                if (!this._port && this.ports && this.ports.length > 0) {
                    this._port = this.ports[Math.floor(Math.random() * this.ports.length)];
                }
                return this._port;
            },
            set: function (val) {
                this._port = val;
            },
            enumerable: true,
            configurable: true
        });
        ConnectInfo.prototype.toString = function () {
            return "host=" + this.host + ",port=" + this.port;
        };
        return ConnectInfo;
    }(egret.HashObject));
    Net.ConnectInfo = ConnectInfo;
    __reflect(ConnectInfo.prototype, "Net.ConnectInfo");
})(Net || (Net = {}));
//# sourceMappingURL=ConnectInfo.js.map