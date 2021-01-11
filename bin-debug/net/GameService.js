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
    var GameService = (function (_super) {
        __extends(GameService, _super);
        function GameService() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GameService.prototype, "socketSvc", {
            get: function () {
                if (!this._socketSvc) {
                    this._socketSvc = Net.SocketService.instance;
                }
                return this._socketSvc;
            },
            enumerable: true,
            configurable: true
        });
        GameService.connect = function () {
            if (!GameService.instance._connInfo) {
                GameService.instance._connInfo = new Net.ConnectInfo(LibCore.GameConfig.SVR_HOST, LibCore.GameConfig.SVR_PORT);
            }
            GameService.instance.socketSvc.connect(GameService.instance._connInfo);
        };
        GameService.send = function (type, content, serverId) {
            if (content === void 0) { content = {}; }
            // console.log("发送："+type);
            var packet = Net.SocketInterface.createRecvPacket();
            //let serverId:number = GameData.getInstance().userData("serverId")
            packet.write(serverId, GameData.getInstance().userData("username"), type, content);
            Net.SocketService.instance.sendPacket(packet);
        };
        GameService.instance = new GameService();
        return GameService;
    }(egret.HashObject));
    Net.GameService = GameService;
    __reflect(GameService.prototype, "Net.GameService");
})(Net || (Net = {}));
//# sourceMappingURL=GameService.js.map