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
var RoomSceneView = (function (_super) {
    __extends(RoomSceneView, _super);
    function RoomSceneView() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoomSceneSkin";
        return _this;
    }
    RoomSceneView.prototype.start = function () {
        this.sharedHeader.setBtnGobackState(false);
        this.initEvent();
        uiCore.SoundByteManager.playMusic("BgMusic");
        // 设置返回的页面
        if (GameData.getInstance().userData("UserType") != 3) {
            this.sharedHeader.setBackScene(MainSceneView, this.sendExitGame);
        }
        GameData.getInstance().setUserData("position", 1);
        this.initRoom();
    };
    RoomSceneView.prototype.initRoom = function () {
        var serverInfo = SceneManager.getGameInfo(uiCore.Application.currGameId);
        if (serverInfo) {
            var server0 = serverInfo[0].Min;
            var server1 = serverInfo[1].Min;
            var server2 = serverInfo[2].Min;
            var genBei0Array = String(serverInfo[0].Times).split(",");
            var genBei1Array = String(serverInfo[1].Times).split(",");
            var genBei2Array = String(serverInfo[2].Times).split(",");
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                server0 = (server0 / SceneManager.exchangeValue).toFixed(2);
                server1 = (server1 / SceneManager.exchangeValue).toFixed(2);
                server2 = (server2 / SceneManager.exchangeValue).toFixed(2);
                genBei0Array[0] = (Number(genBei0Array[0]) / SceneManager.exchangeValue).toFixed(2);
                genBei0Array[1] = (Number(genBei0Array[1]) / SceneManager.exchangeValue).toFixed(2);
                genBei1Array[0] = (Number(genBei1Array[0]) / SceneManager.exchangeValue).toFixed(2);
                genBei1Array[1] = (Number(genBei1Array[1]) / SceneManager.exchangeValue).toFixed(2);
                genBei2Array[0] = (Number(genBei2Array[0]) / SceneManager.exchangeValue).toFixed(2);
                genBei2Array[1] = (Number(genBei2Array[1]) / SceneManager.exchangeValue).toFixed(2);
            }
            this.roomLowAdmittance.text = server0;
            this.roomMiddleAdmittance.text = server1;
            this.roomHighAdmittance.text = server2;
            this.roomLowGen.text = genBei0Array[0] + "~" + genBei0Array[1];
            this.roomMiddleGen.text = genBei1Array[0] + "~" + genBei1Array[1];
            this.roomHighGen.text = genBei2Array[0] + "~" + genBei2Array[1];
            this.UserDataChange();
        }
    };
    RoomSceneView.prototype.initEvent = function () {
        this.btnRoomLow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinLowRoom, this);
        this.btnRoomMiddle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinMiddleRoom, this);
        this.btnRoomHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHighRoom, this);
    };
    RoomSceneView.prototype.UserDataChange = function () {
        this.sharedHeader.UserDataChange();
    };
    //进入房间
    RoomSceneView.prototype.JoinRoom = function (roomInfo, idx) {
        if (roomInfo.IsFreeJoin == false) {
            var MoneyA = GameData.getInstance().userData("moneya");
            var MoneyB = GameData.getInstance().userData("moneyb");
            var Gold_num = GameData.getInstance().userData("gold_num");
            if (MoneyA == 0) {
                uiCore.Application.removeLoadding();
                uiCore.Alert.show(uiCore.LangUtils.getMsgById(6));
                return;
            }
            if (MoneyA < roomInfo.Min && MoneyB > 0) {
                uiCore.Application.removeLoadding();
                uiCore.Alert.show(uiCore.LangUtils.getMsgById(6));
                return;
            }
            if (Gold_num < roomInfo.Min) {
                uiCore.Application.removeLoadding();
                uiCore.Alert.show(uiCore.LangUtils.getMsgById(7));
                return;
            }
        }
        // 清空桌子控制器
        DeskController.destroy();
        FishGameController.sendLogin(uiCore.Application.currGameId, roomInfo.SID);
        DeskController.RoomInfo = roomInfo;
        DeskController.RoomIdx = idx;
    };
    //退出游戏
    RoomSceneView.prototype.sendExitGame = function () {
        Net.GameService.send(HallSocketType.ExitGame, {}, 0);
    };
    RoomSceneView.prototype.readyJoin = function (gameID) {
        return SceneManager.getGameInfo(gameID);
    };
    RoomSceneView.prototype.onJoinLowRoom = function () {
        this.onJoinRoom(0);
    };
    RoomSceneView.prototype.onJoinMiddleRoom = function () {
        this.onJoinRoom(1);
    };
    RoomSceneView.prototype.onJoinHighRoom = function () {
        this.onJoinRoom(2);
    };
    RoomSceneView.prototype.onJoinRoom = function (roomId) {
        uiCore.Application.addLoadding();
        var room = this.readyJoin(uiCore.Application.currGameId);
        if (room) {
            this.JoinRoom(room[roomId], roomId);
        }
        else {
            uiCore.Application.closeLoaddingTip();
        }
    };
    RoomSceneView.prototype.removeEvent = function () {
        this.btnRoomLow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinLowRoom, this);
        this.btnRoomMiddle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinMiddleRoom, this);
        this.btnRoomHigh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHighRoom, this);
    };
    RoomSceneView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    return RoomSceneView;
}(uiCore.Scene));
__reflect(RoomSceneView.prototype, "RoomSceneView");
//# sourceMappingURL=RoomSceneView.js.map