var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        this.loadDownImageIndex = 0;
    }
    SceneManager.init = function () {
        this.tryTimer = new egret.Timer(5000, 0);
        this.tryTimer.addEventListener(egret.TimerEvent.TIMER, this.restConnect, this);
    };
    SceneManager.restConnect = function () {
        this.reconnectIndex++;
        if (!this.tryTimer.running) {
            uiCore.Application.addLoadding(true);
            this.tryTimer.start();
        }
        if (this.reconnectIndex > 5) {
            uiCore.Dialog.show(uiCore.LangUtils.getMsgById(25), function () {
                location.reload();
            }, null, this);
            this.isNeetReconnect();
            return;
        }
        Net.GameService.connect();
    };
    SceneManager.isNeetReconnect = function () {
        this.reconnectIndex = 0;
        if (this.tryTimer.running) {
            this.tryTimer.stop();
            this.tryTimer.delay = 5000;
            uiCore.Application.removeLoadding();
        }
    };
    SceneManager.changeSceneView = function (scene, isCreate) {
        if (isCreate === void 0) { isCreate = true; }
        if (scene) {
            if (isCreate) {
                this.sceneView = new scene();
            }
            else {
                this.sceneView = scene;
            }
            uiCore.Application.changeScene(this.sceneView);
        }
    };
    SceneManager.UserDataChange = function () {
        if (this.sceneView) {
            this.sceneView.UserDataChange();
        }
    };
    SceneManager.OpenControl = function () {
        this.gameOpenControl = {};
        var agetid = GameData.getInstance().userData("agentId");
        var json = { AgentID: agetid };
        var timeD = new Date().getTime() + "";
        var sign = uiCore.Utils.md5(HttpContractType.OpenControl.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.OpenControl, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_port + LibCore.GameConfig.http_login_url, params, egret.URLRequestMethod.POST, function (data) {
            var response = JSON.parse(data.Data);
            if (response != null) {
                for (var i = 0; i < response.length; i++) {
                    this.gameOpenControl[response[i].GID] = response[i];
                }
                if (this.sceneView instanceof RoomSceneView) {
                    this.sceneView.initRoom();
                    uiCore.Application.removeLoadding();
                }
            }
            else {
                SceneManager.OpenControl();
            }
        }, function () {
            egret.setTimeout(function () {
                SceneManager.OpenControl();
            }, this, 1000);
        }, this);
    };
    SceneManager.getExchange = function () {
        var agetid = GameData.getInstance().userData("useragentid");
        var json = { AgentID: agetid, PayType: 0 };
        var timeD = new Date().getTime() + "";
        var sign = uiCore.Utils.md5(HttpContractType.RequireGoodsList.toString() + JSON.stringify(json) + LibCore.GameConfig.http_pay_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.RequireGoodsList, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_pay_port + LibCore.GameConfig.http_login_url, params, egret.URLRequestMethod.POST, function (data) {
            if (data.Code == 1) {
                var response = JSON.parse(data.Data);
                this.exchangeValue = response.Exchange;
                SceneManager.UserDataChange();
            }
            else {
                SceneManager.getExchange();
            }
        }, function () {
            egret.setTimeout(function () {
                SceneManager.getExchange();
            }, this, 1000);
        }, this);
    };
    SceneManager.loadDownImage = function (strUrl) {
        egret.ImageLoader.crossOrigin = "anonymouse";
        var imgLoader = new egret.ImageLoader;
        imgLoader.load(strUrl);
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            if (evt.currentTarget.data) {
                this.loadDownImageIndex = 0;
                var texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                uiCore.ZipManager.setSubkeyImageMap("playerHeadImage", texture);
            }
            else {
                this.loadDownImageIndex++;
                if (this.loadDownImageIndex < 4) {
                    SceneManager.loadDownImage(strUrl);
                }
                else {
                    this.loadDownImageIndex = 0;
                }
            }
        }, this);
    };
    SceneManager.getGameInfo = function (gameId) {
        if (this.gameOpenControl[gameId]) {
            var roominfo = this.gameOpenControl[gameId].Services;
            if (roominfo && roominfo.length > 0) {
                return roominfo;
            }
        }
        return null;
    };
    SceneManager.gameOpenControl = {};
    SceneManager.reconnectIndex = 0;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map