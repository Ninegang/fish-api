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
var SingleDesk = (function (_super) {
    __extends(SingleDesk, _super);
    function SingleDesk(ID) {
        var _this = _super.call(this) || this;
        // 自行拼接座位号和图片类型 e.g. desk_female_1_png
        _this.kFemaleImageName = "desk_female_";
        // 自行拼接座位号和图片类型
        _this.kMaleImageName = "desk_male_";
        _this.kMaxSeatCount = 6;
        _this.singleDeskMaxWidth = 1280;
        _this.skinName = "SingleDeskSkin";
        _this.singleDeskMaxWidth = Math.floor(uiCore.Application.app.stage.stageWidth * 0.85 / 2);
        _this.width = _this.singleDeskMaxWidth;
        _this.seatUIList = {};
        _this.ID = ID;
        _this.lblDeskName.text = _this.ID + uiCore.LangUtils.getMsgById(5);
        _this.lblDeskName.x = Math.floor(_this.width / 2.2093);
        // 所有位置坐标
        _this.seatImagePoints = new Array();
        // this.seatImagePoints.push({f: {x: 324, y: 98, 	w: 154, h: 311}, m: {x: 347, y: 96, w: 140, h: 329}});
        // this.seatImagePoints.push({f: {x: 438, y: 72, 	w: 135, h: 275}, m: {x: 460, y: 65, w: 125, h: 297}});
        // this.seatImagePoints.push({f: {x: 396, y: 16, 	w: 130, h: 266}, m: {x: 400, y: 2,  w: 128, h: 285}});
        // this.seatImagePoints.push({f: {x: 210, y: 22, 	w: 120, h: 156}, m: {x: 215, y: 18, w: 113, h: 160}});
        // this.seatImagePoints.push({f: {x: 92,  y: 42, 	w: 132, h: 279}, m: {x: 105, y: 51, w: 113, h: 160}});
        // this.seatImagePoints.push({f: {x: 80,  y: 89, 	w: 164, h: 328}, m: {x: 58,  y: 89, w: 157, h: 342}});
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 1.88787), y: 140, w: Math.floor(154 * 0.85), h: Math.floor(311 * 0.85) }, m: { x: Math.floor(_this.width / 1.7851), y: 125, w: Math.floor(140 * 0.85), h: Math.floor(329 * 0.85) } });
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 1.46588), y: 110, w: Math.floor(135 * 0.85), h: Math.floor(275 * 0.85) }, m: { x: Math.floor(_this.width / 1.390625), y: 95, w: Math.floor(125 * 0.85), h: Math.floor(297 * 0.85) } });
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 1.5772), y: 37, w: Math.floor(130 * 0.85), h: Math.floor(266 * 0.85) }, m: { x: Math.floor(_this.width / 1.5974), y: 25, w: Math.floor(128 * 0.85), h: Math.floor(285 * 0.85) } });
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 2.9666), y: 46, w: Math.floor(120 * 0.85), h: Math.floor(156 * 0.85) }, m: { x: Math.floor(_this.width / 2.83181), y: 40, w: Math.floor(113 * 0.85), h: Math.floor(160 * 0.85) } });
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 5.8224), y: 65, w: Math.floor(132 * 0.85), h: Math.floor(279 * 0.85) }, m: { x: Math.floor(_this.width / 5.6636), y: 75, w: Math.floor(113 * 0.85), h: Math.floor(160 * 0.85) } });
        _this.seatImagePoints.push({ f: { x: Math.floor(_this.width / 7.7875), y: 130, w: Math.floor(164 * 0.85), h: Math.floor(328 * 0.85) }, m: { x: Math.floor(_this.width / 8.9), y: 120, w: Math.floor(157 * 0.85), h: Math.floor(342 * 0.85) } });
        _this.btnJoinSeat3.left = Math.floor(_this.width / 3.115);
        _this.btnJoinSeat0.left = Math.floor(_this.width / 1.5575);
        _this.btnJoinSeat1.left = Math.floor(_this.width / 1.297);
        _this.btnJoinSeat2.left = Math.floor(_this.width / 1.483);
        _this.btnJoinSeat4.left = Math.floor(_this.width / 7.7875);
        _this.btnJoinSeat5.left = Math.floor(_this.width / 8.9);
        return _this;
    }
    SingleDesk.prototype.start = function () {
        var _this = this;
        this.initEvent();
        for (var seatNo = 0; seatNo < this.kMaxSeatCount; seatNo++) {
            var imageData = this.seatImagePoints[seatNo].m;
            var image = new eui.Image(this.kMaleImageName + String(seatNo));
            image.x = imageData.x;
            image.y = imageData.y;
            image.width = imageData.w;
            image.height = imageData.h;
            image.alpha = 0;
            this.seatUIList[seatNo] = image;
        }
        // 加载顺序/层级
        var seatUILevel = [5, 0, 1, 2, 3, 4]; //[4, 3, 2, 1, 0, 5];
        seatUILevel.forEach(function (element) {
            _this.addChildAt(_this.seatUIList[element], 0);
        });
        this.deskBackGround = new eui.Image("desk_allSit");
        this.deskBackGround.width = this.singleDeskMaxWidth * 0.8;
        this.deskBackGround.height = 353;
        this.deskBackGround.horizontalCenter = 0;
        this.deskBackGround.verticalCenter = 0;
        this.addChildAt(this.deskBackGround, 0);
        this.deskBackGround.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeskBackGround, this);
    };
    SingleDesk.prototype.onDeskBackGround = function (e) {
        var seatNoNumber = null;
        if (this.btnJoinSeat0.enabled) {
            seatNoNumber = 0;
        }
        else if (this.btnJoinSeat1.enabled) {
            seatNoNumber = 1;
        }
        else if (this.btnJoinSeat2.enabled) {
            seatNoNumber = 2;
        }
        else if (this.btnJoinSeat3.enabled) {
            seatNoNumber = 3;
        }
        else if (this.btnJoinSeat4.enabled) {
            seatNoNumber = 4;
        }
        else if (this.btnJoinSeat5.enabled) {
            seatNoNumber = 5;
        }
        if (seatNoNumber != null) {
            uiCore.Application.addLoadding();
            if (FishGameManager.checkFishConfig()) {
                FishGameManager.initFishManager(uiCore.ZipManager.ZIP_CONFIG.projectConfig);
            }
            var JoinDeskContract = {
                DeskID: this.ID,
                SeatNo: seatNoNumber,
                JoinMode: 1
            };
            DeskController.onJoinDesk(JoinDeskContract);
            uiCore.SoundByteManager.playMusic("BG0_3");
        }
    };
    SingleDesk.prototype.initEvent = function () {
        this.btnJoinSeat0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        egret.Tween.get(this.btnJoinSeat0, { loop: true }).to({ top: this.btnJoinSeat0.top - 10 }, 500).to({ top: this.btnJoinSeat0.top }, 500);
        egret.Tween.get(this.btnJoinSeat1, { loop: true }).to({ top: this.btnJoinSeat1.top - 10 }, 500).to({ top: this.btnJoinSeat1.top }, 500);
        egret.Tween.get(this.btnJoinSeat2, { loop: true }).to({ top: this.btnJoinSeat2.top - 10 }, 500).to({ top: this.btnJoinSeat2.top }, 500);
        egret.Tween.get(this.btnJoinSeat3, { loop: true }).to({ top: this.btnJoinSeat3.top - 10 }, 500).to({ top: this.btnJoinSeat3.top }, 500);
        egret.Tween.get(this.btnJoinSeat4, { loop: true }).to({ top: this.btnJoinSeat4.top - 10 }, 500).to({ top: this.btnJoinSeat4.top }, 500);
        egret.Tween.get(this.btnJoinSeat5, { loop: true }).to({ top: this.btnJoinSeat5.top - 10 }, 500).to({ top: this.btnJoinSeat5.top }, 500);
    };
    SingleDesk.prototype.removeEvent = function () {
        this.btnJoinSeat0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        this.btnJoinSeat5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinDeskAtSeatNo, this);
        egret.Tween.removeTweens(this.btnJoinSeat0);
        egret.Tween.removeTweens(this.btnJoinSeat1);
        egret.Tween.removeTweens(this.btnJoinSeat2);
        egret.Tween.removeTweens(this.btnJoinSeat3);
        egret.Tween.removeTweens(this.btnJoinSeat4);
        egret.Tween.removeTweens(this.btnJoinSeat5);
        if (this.deskBackGround) {
            this.deskBackGround.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeskBackGround, this);
        }
    };
    SingleDesk.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    SingleDesk.prototype.onJoinDeskAtSeatNo = function (e) {
        // console.log("加入桌子:" + this.ID + ", 座位号:" + e.target.label);
        uiCore.Application.addLoadding();
        if (FishGameManager.checkFishConfig()) {
            FishGameManager.initFishManager(uiCore.ZipManager.ZIP_CONFIG.projectConfig);
        }
        var JoinDeskContract = {
            DeskID: this.ID,
            SeatNo: e.target.label,
            JoinMode: 1
        };
        DeskController.onJoinDesk(JoinDeskContract);
        uiCore.SoundByteManager.playMusic("BG0_3");
    };
    SingleDesk.prototype.onPlayerSeatStatus = function (seatNo, isJoin, contract) {
        // 需要验证座位是否有人
        this.changeJoinButtonStatus(seatNo, isJoin);
        this.changePlayerSeatStatus(seatNo, contract.Sex, isJoin);
    };
    SingleDesk.prototype.changePlayerSeatStatus = function (seatNo, isMale, isJoin) {
        var image = this.seatUIList[seatNo];
        if (!isJoin) {
            image.alpha = 0;
        }
        else {
            var imageData = isMale ? this.seatImagePoints[seatNo].m : this.seatImagePoints[seatNo].f;
            image.alpha = 1;
            image.x = imageData.x;
            image.y = imageData.y;
            image.width = imageData.w;
            image.height = imageData.h;
            image.source = isMale ? this.kMaleImageName + seatNo : this.kFemaleImageName + seatNo;
        }
        // 如果是五号座位, 避免人物图片挡住坐下的按钮, 往左移一点箭头
        if (seatNo == 5) {
            this.btnJoinSeat4.left += isJoin ? -10 : 10;
        }
    };
    SingleDesk.prototype.changeJoinButtonStatus = function (seatNo, isJoin) {
        switch (seatNo) {
            case 1:
                this.btnJoinSeat1.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat1.enabled = !isJoin;
                break;
            case 2:
                this.btnJoinSeat2.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat2.enabled = !isJoin;
                break;
            case 3:
                this.btnJoinSeat3.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat3.enabled = !isJoin;
                break;
            case 4:
                this.btnJoinSeat4.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat4.enabled = !isJoin;
                break;
            case 5:
                this.btnJoinSeat5.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat5.enabled = !isJoin;
                break;
            default:
                this.btnJoinSeat0.alpha = isJoin ? 0 : 1;
                this.btnJoinSeat0.enabled = !isJoin;
        }
    };
    return SingleDesk;
}(uiCore.View));
__reflect(SingleDesk.prototype, "SingleDesk");
//# sourceMappingURL=SingleDesk.js.map