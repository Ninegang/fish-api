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
var DeskSceneView = (function (_super) {
    __extends(DeskSceneView, _super);
    function DeskSceneView() {
        var _this = _super.call(this) || this;
        _this.isRolling = false;
        _this.kDesShowDeskMaxWidth = 1280;
        _this.skinName = "DeskSceneSkin";
        _this.kDesShowDeskMaxWidth = Math.floor(uiCore.Application.app.stage.stageWidth * 0.85);
        _this.scroller = new eui.Scroller();
        _this.scroller.width = _this.kDesShowDeskMaxWidth;
        _this.scroller.verticalCenter = 65;
        _this.scroller.horizontalCenter = 0;
        _this.scroller.bounces = false;
        _this.addChildAt(_this.scroller, 1);
        _this.btnDeskNext.right = uiCore.Application.app.stage.stageWidth * 0.05;
        _this.btnDeskLast.left = uiCore.Application.app.stage.stageWidth * 0.05;
        _this.scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.deskStartThouchEvent, _this);
        _this.scroller.addEventListener(egret.TouchEvent.TOUCH_END, _this.deskEndThouchEvent, _this);
        return _this;
    }
    DeskSceneView.prototype.deskStartThouchEvent = function (evn) {
        this.startX = evn.stageX;
    };
    DeskSceneView.prototype.deskEndThouchEvent = function (evn) {
        if (this.startX != null) {
            //向左
            if (this.startX - evn.stageX > 50) {
                if ((this.deskListCount / 2 - 1) * this.kDesShowDeskMaxWidth - this.kDesShowDeskMaxWidth >= this.scroller.viewport.scrollH) {
                    this.onBtnDeskNextClick();
                }
            }
            else if (this.startX - evn.stageX < -50) {
                if (this.scroller.viewport.scrollH > 0) {
                    this.onBtnDeskLastClick();
                }
            }
        }
    };
    DeskSceneView.prototype.start = function () {
        this.initEvent();
        this.sharedHeader.setBackScene(RoomSceneView, this.sendExitGame);
        this.deskListUI = {};
        GameData.getInstance().setUserData("position", 2);
        this.UserDataChange();
        if (DeskController.RoomIdx == 0) {
            this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(8);
        }
        else if (DeskController.RoomIdx == 1) {
            this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(9);
        }
        else {
            this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(10);
        }
        egret.Tween.get(this.fingerImage, { loop: true }).to({ bottom: this.fingerImage.bottom + 10 }, 500).to({ bottom: this.fingerImage.bottom }, 500);
    };
    //退出游戏
    DeskSceneView.prototype.sendExitGame = function () {
        Net.GameService.send(HallSocketType.ExitGame, {}, 0);
    };
    DeskSceneView.prototype.UserDataChange = function () {
        this.sharedHeader.UserDataChange();
    };
    DeskSceneView.prototype.onButtonGameStartClick = function () {
        uiCore.Application.addLoadding();
        if (FishGameManager.checkFishConfig()) {
            FishGameManager.initFishManager(uiCore.ZipManager.ZIP_CONFIG.projectConfig);
        }
        var JoinDeskContract = {
            DeskID: 1,
            SeatNo: 0,
            JoinMode: 0
        };
        DeskController.onJoinDesk(JoinDeskContract);
        uiCore.SoundByteManager.playMusic("BG0_3");
    };
    DeskSceneView.prototype.initEvent = function () {
        this.btnDeskNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskNextClick, this);
        this.btnDeskLast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskLastClick, this);
        this.buttonGameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGameStartClick, this);
    };
    DeskSceneView.prototype.removeEvent = function () {
        this.btnDeskNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskNextClick, this);
        this.btnDeskLast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskLastClick, this);
        this.scroller.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.deskStartThouchEvent, this);
        this.scroller.removeEventListener(egret.TouchEvent.TOUCH_END, this.deskEndThouchEvent, this);
        this.buttonGameStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGameStartClick, this);
        egret.Tween.removeTweens(this.scroller.viewport);
    };
    DeskSceneView.prototype.onDestroy = function () {
        egret.Tween.removeTweens(this.fingerImage);
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    DeskSceneView.prototype.someoneJoinSeat = function (deskID, contract) {
        // console.log("Some one join Desk, ID: " + deskID + ", Seat: " 
        // + contract.SeatNo + ", Player: " + contract.userName); 
        var curDesk = this.deskListUI[deskID];
        if (curDesk == null) {
            console.log("The desk is null, DeskID: " + deskID);
            return;
        }
        curDesk.onPlayerSeatStatus(contract.SeatNo, true, contract);
    };
    DeskSceneView.prototype.someoneLeaveSeat = function (deskID, contract) {
        // console.log("Some one Leave Desk, ID: " + deskID + ", Seat: " 
        // + contract.SeatNo + ", Player: " + contract.userName); 
        var curDesk = this.deskListUI[deskID];
        curDesk.onPlayerSeatStatus(contract.SeatNo, false, contract);
    };
    DeskSceneView.prototype.createDesk = function (contractes) {
        var _this = this;
        var group = new eui.Group();
        contractes.forEach(function (element) {
            var desk = new SingleDesk(element.DeskID);
            desk.top = 0;
            desk.x = (element.DeskID - 1) * desk.width;
            group.addChild(desk);
            _this.deskListUI[element.DeskID] = desk;
        });
        this.deskListCount = contractes.length;
        this.scroller.height = this.deskListUI[contractes[0].DeskID].height;
        this.scroller.viewport = group;
        this.scroller.scrollPolicyH = "ScrollPolicy.OFF";
        if (contractes.length <= 2) {
            this.btnDeskLast.alpha = 0;
            this.btnDeskLast.enabled = false;
            this.btnDeskNext.alpha = 0;
            this.btnDeskNext.enabled = false;
        }
    };
    //右边按钮
    DeskSceneView.prototype.onBtnDeskNextClick = function () {
        var _this = this;
        if (!this.isRolling) {
            this.isRolling = true;
            var tween = egret.Tween.get(this.scroller.viewport).to({ scrollH: this.scroller.viewport.scrollH + this.kDesShowDeskMaxWidth, ease: egret.Ease.quadOut }, 500)
                .call(function () {
                if (_this.scroller.viewport.scrollH + _this.kDesShowDeskMaxWidth >= _this.scroller.viewport.contentWidth) {
                    _this.btnDeskNext.alpha = 0;
                    _this.btnDeskNext.enabled = false;
                }
                _this.btnDeskLast.alpha = 1;
                _this.btnDeskLast.enabled = true;
                _this.isRolling = false;
                egret.Tween.removeTweens(tween);
            });
        }
    };
    //左边按钮
    DeskSceneView.prototype.onBtnDeskLastClick = function () {
        var _this = this;
        if (!this.isRolling) {
            this.isRolling = true;
            var tween = egret.Tween.get(this.scroller.viewport).to({ scrollH: this.scroller.viewport.scrollH - this.kDesShowDeskMaxWidth, ease: egret.Ease.quadOut }, 500)
                .call(function () {
                if (_this.scroller.viewport.scrollH - _this.kDesShowDeskMaxWidth < 0) {
                    _this.btnDeskLast.alpha = 0;
                    _this.btnDeskLast.enabled = false;
                }
                _this.btnDeskNext.alpha = 1;
                _this.btnDeskNext.enabled = true;
                _this.isRolling = false;
                egret.Tween.removeTweens(tween);
            });
        }
    };
    return DeskSceneView;
}(uiCore.Scene));
__reflect(DeskSceneView.prototype, "DeskSceneView");
//# sourceMappingURL=DeskSceneView.js.map