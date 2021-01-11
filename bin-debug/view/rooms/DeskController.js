var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeskController = (function () {
    function DeskController() {
    }
    /*********************************************************************************************************/
    DeskController.init = function () {
        if (this.DeskScene == null) {
            this.DeskScene = new DeskSceneView();
            this.DeskPlayers = {};
        }
    };
    DeskController.destroy = function () {
        this.DeskScene = null;
        this.DeskPlayers = null;
    };
    /*********************************************************************************************************/
    DeskController.ws_onDeskList = function (res) {
        var _this = this;
        uiCore.Application.closeSetTime();
        if (FishGameController.getGameView() == null) {
            if (this.DeskScene) {
                SceneManager.changeSceneView(this.DeskScene, false);
                this.DeskScene.createDesk(res.ListDeskContract);
            }
        }
        res.ListDeskContract.forEach(function (desk) {
            if (desk.ListGamePlayerContract != null) {
                desk.ListGamePlayerContract.forEach(function (element) {
                    _this.someoneJoinDesk(desk.DeskID, element);
                });
            }
        });
    };
    DeskController.ws_onSomeoneJoinDesk = function (res) {
        uiCore.Application.closeSetTime();
        if (res.gamePlayerContract.userId != GameData.getInstance().userData("userId")) {
            // somebody join the game
            this.someoneJoinDesk(res.gamePlayerContract.deskId, res.gamePlayerContract);
        }
        //else myself join game	
        FishGameController.onJoinDesk(res);
    };
    DeskController.ws_onSomeoneLeaveDesk = function (res) {
        this.someoneLeaveDesk(res.gamePlayerContract.deskId, res.gamePlayerContract);
    };
    DeskController.onJoinDesk = function (req) {
        FishGameController.sendJoinDesk(req, 6);
    };
    /*********************************************************************************************************/
    DeskController.someoneJoinDesk = function (deskID, contract) {
        if (this.DeskPlayers != null && (this.DeskPlayers[deskID] == null || this.DeskPlayers[deskID][contract.SeatNo] == null)) {
            var seatDic;
            if (this.DeskPlayers[deskID] == null)
                seatDic = {};
            else
                seatDic = this.DeskPlayers[deskID];
            seatDic[contract.SeatNo] = contract;
            this.DeskPlayers[deskID] = seatDic;
            this.DeskScene.someoneJoinSeat(deskID, contract);
        }
        else {
            // the desk is not null
        }
    };
    DeskController.someoneLeaveDesk = function (deskID, contract) {
        if (this.DeskPlayers != null && this.DeskPlayers[deskID] != null && this.DeskPlayers[deskID][contract.SeatNo] != null) {
            var seatDic = this.DeskPlayers[deskID];
            seatDic[contract.SeatNo] = null;
            this.DeskPlayers[deskID] = seatDic;
            this.DeskScene.someoneLeaveSeat(deskID, contract);
        }
        else {
            // the desk is null
        }
    };
    return DeskController;
}());
__reflect(DeskController.prototype, "DeskController");
//# sourceMappingURL=DeskController.js.map