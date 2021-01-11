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
var FishGameSceneView = (function (_super) {
    __extends(FishGameSceneView, _super);
    function FishGameSceneView() {
        var _this = _super.call(this) || this;
        _this.clearIndx = 10;
        //座位是否上 下
        _this.isUpSideDown = false;
        _this.isInFishArray = false;
        //是否浪花
        _this.isPlayingWave = false;
        _this.IsAutoFire = false; //自动
        //长时间不操作退出
        _this.ExitTips = new eui.Label();
        //鼠标事件
        _this.PosToViewPort = new egret.Point();
        _this.fishPoint = new egret.Point();
        _this.currTime = 0;
        _this.skinName = "FishGameSceneSkin";
        _this.preloadFishs = new Array();
        _this.bulletMap = {};
        _this.fishGens = [];
        _this.bulletPool = [];
        _this.isInFishArray = false;
        _this.fireRate = 200;
        _this.fireTimer = new egret.Timer(200, 0);
        _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.thisGenFire, _this);
        _this.isShowSelfPlayerGenPosion = false;
        return _this;
    }
    FishGameSceneView.prototype.start = function () {
        uiCore.Application.addGameSetTime();
        this.waterLightResize();
        this.robotTimer = new egret.Timer(100, 0);
        this.robotTimer.addEventListener(egret.TimerEvent.TIMER, this.robotFire, this);
        this.robotTimer.start();
        uiCore.MovieClipManager.init(["fish", "goldone", "goldten", "lockRotation", "waterupdate", "GoldSilverCoin"]);
        uiCore.MovieClipManager.init(["fish1", "fish2", "fish3", "fish4", "fish5", "fish6"]);
        uiCore.MovieClipManager.init(["fish7"]);
        uiCore.ParticleManager.init(["bowen"]);
        FishGameController.sendLoadComplete(false);
        FishGameController.sendGetCreatedFish();
        this.initEvent();
        this.showExitTips();
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true); //开启后会影响性能 不开启监听不了鼠标移动事件
        //开启显示对象的触摸0
        this.touchEnabled = true;
        if (egret.Capabilities.isMobile) {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.getMouseMove, this);
        }
        else {
            this.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.getMouseMove, this);
        }
        this.bulletGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.fireEventBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.fireEventEnd, this);
        GameData.getInstance().setUserData("position", 3);
        var flag = true;
        if (uiCore.LangUtils.getLangType() != uiCore.LangUtils.ZH_CN && !LibCore.GameConfig.IsMessageOpen) {
            flag = false;
        }
        this.noticeItemGroup.visible = flag;
        if (flag) {
            SystemMsg.getInstance().skin(this.noticeItemGroup, this.noticeLabel, this.noticeScroller);
        }
    };
    FishGameSceneView.prototype.waterLightResize = function () {
        this.waterLightGroup.scaleX = this.stage.stageWidth / 1280;
        this.waterLightGroup.scaleY = this.stage.stageHeight / 720;
    };
    FishGameSceneView.prototype.robotFire = function () {
        for (var seatNo in this.bulletMap) {
            var fishGen = this.getFishGenBySeatNo(Number(seatNo));
            var bulletArray = this.bulletMap[seatNo];
            // console.log("座位号："+seatNo+"    数量："+bulletArray.length);
            if (fishGen && bulletArray && bulletArray.length > 0) {
                var bulletContract = bulletArray.shift();
                if (bulletContract.DelayTime == 0) {
                    fishGen.createBullet(bulletContract);
                }
                else {
                    bulletContract.DelayTime = 0;
                    bulletArray.unshift(bulletContract);
                }
            }
        }
    };
    FishGameSceneView.prototype.DoubleFalse = function () {
        var btnRotation = 0;
        var btnValue = 30;
        if (this.arrowbtn.rotation == 0) {
            btnRotation = 180;
            btnValue = -110;
        }
        egret.Tween.get(this.featuresGroupLeft).to({ left: btnValue }, 500).call(function () {
            egret.Tween.removeTweens(this.featuresGroupLeft);
        }, this);
        egret.Tween.get(this.featuresGroupRight).to({ right: btnValue }, 500).call(function () {
            egret.Tween.removeTweens(this.featuresGroupRight);
            this.arrowbtn.rotation = btnRotation;
        }, this);
    };
    FishGameSceneView.prototype.getMouseMove = function (pos) {
        this.PosToViewPort.x = pos.stageX;
        this.PosToViewPort.y = pos.stageY;
    };
    FishGameSceneView.prototype.fireEventEnd = function (evn) {
        if (!this.autobg.visible && this.fireTimer.running) {
            this.fireEventOutTimeId = egret.setTimeout(function () {
                this.fireTimer.stop();
            }, this, this.fireTimerdelay);
        }
    };
    //点击锁定鱼	
    FishGameSceneView.prototype.fireEventBegin = function (evn) {
        this.PosToViewPort.x = evn.stageX;
        this.PosToViewPort.y = evn.stageY;
        if (this.lockbg.visible) {
            var allfish = this.getAllFishes();
            if (allfish.length > 0) {
                for (var key in allfish) {
                    if (allfish[key].isRunning && this.fishGens && allfish[key].FishId > uiCore.Application.lockminfish) {
                        if (allfish[key].hitTestPoint(evn.stageX, evn.stageY, false)) {
                            allfish[key].OnPress();
                            break;
                        }
                    }
                }
            }
        }
        if (!this.autobg.visible && !this.fireTimer.running) {
            if (this.fireEventOutTimeId) {
                egret.clearTimeout(this.fireEventOutTimeId);
            }
            this.fireTimer.start();
            this.fireTimer.delay = this.fireTimerdelay;
        }
    };
    //在初始化各种 炮台 渔场 等等
    FishGameSceneView.prototype.reset = function () {
        this.bulletPool = ["xbullet1_01", "xbullet2_01", "xbullet3_01", "xbullet4_01", "xbullet5_01", "xbullet6_01"];
        //加载6个炮台
        for (var i = 0; i < this.maxPlay; i++) {
            this.fishGens[i] = new FishGen();
            var onePercent = uiCore.Application.app.stage.stageWidth / 100;
            if (i < this.maxPlay / 2) {
                this.fishGens[i].bottom = 0;
                this.fishGens[i].left = 25 * onePercent + (i * 33 * onePercent) - ((i + 1) * 80);
            }
            else {
                this.fishGens[i].top = 0;
                this.fishGens[i].right = 25 * onePercent + ((i - 3) * 33 * onePercent) - ((i - 2) * 80);
                this.fishGens[i].rotation = 180;
            }
            this.fishGens[i].name = i + "";
            this.fishGens[i].SetId(i);
            this.upGroup.addChild(this.fishGens[i]);
        }
        this.allFishes = new FishPool(this.fishBorn);
    };
    FishGameSceneView.prototype.fishGenResize = function () {
        for (var i = 0; i < this.maxPlay; i++) {
            var onePercent = uiCore.Application.app.stage.stageWidth / 100;
            if (i < this.maxPlay / 2) {
                this.fishGens[i].left = 25 * onePercent + (i * 33 * onePercent) - ((i + 1) * 80);
            }
            else {
                this.fishGens[i].right = 25 * onePercent + ((i - 3) * 33 * onePercent) - ((i - 2) * 80);
            }
        }
    };
    //真正创建成功一条鱼，鱼图片加载到场景中
    FishGameSceneView.prototype.fishBorn = function (id, isInitialization) {
        if (isInitialization === void 0) { isInitialization = true; }
        var gameId = uiCore.Application.currGameId;
        var mc = uiCore.MovieClipManager.getGenerateMovieClipData(id + "");
        if (mc != null) {
            var fishSet = void 0;
            //var s = Date.parse(new Date().toString());
            for (var i = 0; i < FishGameManager.fishObjects.length; i++) {
                if (FishGameManager.fishObjects[i].gameId == gameId) {
                    if (FishGameManager.fishObjects[i].id == id) {
                        fishSet = FishGameManager.fishObjects[i];
                        //var e = Date.parse(new Date().toString());
                        //var pass=e-s;
                        break;
                    }
                }
            }
            if (fishSet) {
                var fish = new Fish(fishSet, isInitialization);
                fish.addChild(mc);
                return fish;
            }
        }
        return null;
    };
    // private aaaaabbbb:number=0;
    //服务器下发的鱼消息
    FishGameSceneView.prototype.createFishInfo = function (fishInfos) {
        if (this.isInFishArray) {
            //创建鱼阵
            if (this.fishArrayType == "groupfont") {
                //创建自鱼鱼阵
                // this.createFontFish(fishInfos);
            }
            else {
                for (var i = 0; i < fishInfos.FishList.length; i++) {
                    fishInfos.FishList[i].isFishArray = true;
                    fishInfos.FishList[i].isFishFont = false;
                    this.preloadFishs.push(fishInfos.FishList[i]);
                }
            }
        }
        else {
            for (var i = 0; i < fishInfos.FishList.length; i++) {
                fishInfos.FishList[i].isFishArray = false;
                fishInfos.FishList[i].isFishFont = false;
                this.preloadFishs.push(fishInfos.FishList[i]);
            }
        }
        // this.aaaaabbbb++;
        // if(this.aaaaabbbb<2){
        // 	this.isInFishArray=true;
        // 	let aaa={FishDelay:3000,FishId:15,FishTag:11707,FishWay:"group_1_0",FixedScreen:0,Odds:25,Roat:0,Speed:100,isFishArray:true,isFishFont:false};
        // 	let bbb={FishDelay:3000,FishId:15,FishTag:11707,FishWay:"group_1_1",FixedScreen:0,Odds:25,Roat:0,Speed:100,isFishArray:true,isFishFont:false};
        // 	this.preloadFishs.push(aaa);
        // 	this.preloadFishs.push(bbb);
        // }
    };
    //创建鱼 --0小鱼，1大鱼，2炸弹，3组合鱼，4同类鱼，5海胆，6李逵,7定屏炸弹，8组合同类鱼
    FishGameSceneView.prototype.createOneFish = function (fishInfo) {
        var fish = this.allFishes.getObject(fishInfo.FishId);
        if (fish) {
            //判断是不是组合鱼
            if (fish.fishSet.type == 3 || fish.fishSet.type == 8) {
                for (var i = 0; i < fishInfo.GroupFishId; i++) {
                    if (fish.numChildren > 1)
                        break;
                    if (fishInfo.GroupFishId[i] < 1)
                        break;
                    var mc = uiCore.MovieClipManager.getGenerateMovieClipData(fishInfo.GroupFishId[i] + "");
                    if (mc) {
                        fish.addChild(mc);
                        //this.setMcAnchorOff(mc,fishInfo.GroupFishId[0]);
                    }
                }
            }
            else if (fish.fishSet.type == 4) {
                if (fish.numChildren > 1) {
                    for (var i = 1; i < fish.numChildren; i++) {
                        fish.removeChildAt(i);
                    }
                }
                var mc = uiCore.MovieClipManager.getGenerateMovieClipData(fishInfo.GroupFishId[0] + ""); //fishInfo.GroupFishId[0]+
                if (mc) {
                    fish.addChild(mc);
                    this.setMcAnchorOff(mc, fishInfo.GroupFishId[0]);
                    fish.globalToLocal(fish.x, fish.y, this.fishPoint);
                    mc.x = this.fishPoint.x;
                    mc.y = this.fishPoint.y;
                }
            }
            // else if(fish.fishSet.isMutiFish){//是否是单条组合鱼
            // }	
            fish.initInfo(fishInfo);
        }
    };
    FishGameSceneView.prototype.setMcAnchorOff = function (mc, fishId) {
        if (fishId == 1) {
            mc.anchorOffsetX = 60;
            mc.anchorOffsetY = 11;
        }
        else if (fishId == 2) {
            mc.anchorOffsetX = 50;
            mc.anchorOffsetY = 20;
        }
        else if (fishId == 3) {
            mc.anchorOffsetX = 50;
            mc.anchorOffsetY = 20;
        }
        else if (fishId == 4) {
            mc.anchorOffsetX = 60;
            mc.anchorOffsetY = 30;
        }
        else if (fishId == 5) {
            mc.anchorOffsetX = 90;
            mc.anchorOffsetY = 25;
        }
        else if (fishId == 6) {
            mc.anchorOffsetX = 80;
            mc.anchorOffsetY = 30;
        }
        else if (fishId == 7) {
            mc.anchorOffsetX = 80;
            mc.anchorOffsetY = 23;
        }
        else if (fishId == 8) {
            mc.anchorOffsetX = 90;
            mc.anchorOffsetY = 30;
        }
        else if (fishId == 9) {
            mc.anchorOffsetX = 80;
            mc.anchorOffsetY = 30;
        }
        else if (fishId == 10) {
            mc.anchorOffsetX = 60.5;
            mc.anchorOffsetY = 70;
        }
        else if (fishId == 11) {
            mc.anchorOffsetX = 118;
            mc.anchorOffsetY = 45;
        }
        else if (fishId == 12) {
            mc.anchorOffsetX = 100;
            mc.anchorOffsetY = 80;
        }
        else if (fishId == 13) {
            mc.anchorOffsetX = 125;
            mc.anchorOffsetY = 40;
        }
        else if (fishId == 14) {
            mc.anchorOffsetX = 150;
            mc.anchorOffsetY = 50;
        }
        else if (fishId == 15) {
            mc.anchorOffsetX = 130;
            mc.anchorOffsetY = 125;
        }
        else if (fishId == 16) {
            mc.anchorOffsetX = 200;
            mc.anchorOffsetY = 60;
        }
        else if (fishId == 17) {
            mc.anchorOffsetX = 200;
            mc.anchorOffsetY = 60;
        }
        else if (fishId == 18) {
            mc.anchorOffsetX = 200; //小 Y上
            mc.anchorOffsetY = 80; //大 x左
        }
        else if (fishId == 19) {
            mc.anchorOffsetX = 100;
            mc.anchorOffsetY = 150;
        }
        else if (fishId == 20) {
            mc.anchorOffsetX = 98;
            mc.anchorOffsetY = 98;
        }
        else if (fishId == 21) {
            mc.anchorOffsetX = 200;
            mc.anchorOffsetY = 230;
        }
        else if (fishId == 22) {
            mc.anchorOffsetX = 30; //小 右
            mc.anchorOffsetY = 180;
        }
        else if (fishId == 23) {
            mc.anchorOffsetX = 230;
            mc.anchorOffsetY = 100;
        }
        else if (fishId == 24) {
            mc.anchorOffsetX = 220;
            mc.anchorOffsetY = 180;
        }
        else if (fishId == 25) {
            mc.anchorOffsetX = 70;
            mc.anchorOffsetY = 70;
        }
        else if (fishId == 26) {
            mc.anchorOffsetX = 80;
            mc.anchorOffsetY = 80;
        }
        else if (fishId == 27) {
            mc.anchorOffsetX = 120;
            mc.anchorOffsetY = 80;
        }
        else {
            mc.anchorOffsetX = mc.width / 2;
            mc.anchorOffsetY = mc.height / 2;
        }
    };
    FishGameSceneView.prototype.getFishPathByname = function (name) {
        return FishGameManager.fishDic[name];
    };
    //删除所有鱼
    FishGameSceneView.prototype.removeAllFishs = function () {
        for (var key in this.fishGens) {
            this.fishGens[key].setLockFish(null);
        }
        this.allFishes.recoveryAllFish();
    };
    //清空使用
    FishGameSceneView.prototype.resetPlayerInfo = function () {
        for (var i = 0; i < this.maxPlay; i++) {
            this.fishGens[i].ResetInfo();
        }
    };
    //初始化自己信息
    FishGameSceneView.prototype.initSelfPlayerInfo = function (playerInfo) {
        // alert("initSelfPlayerInfo()"+playerInfo.SeatNo);
        this.playerInfo = playerInfo;
        GameData.getInstance().setUserData("gold_num", playerInfo.userMoney);
        if (this.playerInfo.SeatNo >= this.maxPlay / 2) {
            this.isUpSideDown = true;
        }
        else {
            this.isUpSideDown = false;
        }
        if (this.isUpSideDown == true) {
            //显示桌子 上下两排 0-2 3-5
            this.fishGens[this.playerInfo.SeatNo - this.maxPlay / 2].initInfo(playerInfo);
            //桌子号显示不能用 上下两排 1-6
            this.thisFishGen = this.fishGens[this.playerInfo.SeatNo - this.maxPlay / 2];
        }
        else {
            this.fishGens[this.playerInfo.SeatNo].initInfo(playerInfo);
            this.thisFishGen = this.fishGens[this.playerInfo.SeatNo];
        }
    };
    //玩家
    FishGameSceneView.prototype.initPlayer = function (gamePlayerContract) {
        var fishgen = this.getFishGenBySeatNo(gamePlayerContract.SeatNo);
        if (fishgen) {
            fishgen.initInfo(gamePlayerContract);
        }
    };
    //座位号
    FishGameSceneView.prototype.setRobot = function (RobotRpc_response) {
        var fishGen = this.getFishGenBySeatNo(RobotRpc_response.SeatNo);
        if (fishGen) {
            fishGen.setRobot(true);
        }
    };
    //退出桌子使用
    FishGameSceneView.prototype.quitPlayer = function (gamePlayerContract) {
        if (gamePlayerContract.userId != FishGameController.getSelfPlayerInfo().userId) {
            var fishGen = this.getFishGenBySeatNo(gamePlayerContract.SeatNo);
            if (fishGen) {
                fishGen.ResetInfo();
            }
        }
    };
    //锁定鱼使用
    FishGameSceneView.prototype.setLockFish = function (LockFishRpc_response) {
        var fish = this.getFishByTag(LockFishRpc_response.FishTag);
        var fishGen = this.getFishGenBySeatNo(LockFishRpc_response.SeatNo);
        if (fishGen && fish && !fishGen.isSelfGen) {
            if (fishGen.checkLockFishInScreen(fish)) {
                fishGen.setLockFish(fish);
            }
        }
        // alert("接收座位号："+LockFishRpc_response.SeatNo);
        // console.log("接收座位号："+LockFishRpc_response.SeatNo);
        // console.log("是不是自己："+fishGen.isSelfGen);
    };
    //--机器人打鱼倍率
    FishGameSceneView.prototype.RootGetHitFish = function (Odds, SeatNo) {
        // console.log("接收  倍率："+Odds+"     座位号："+SeatNo);
        var fishGen = this.getFishGenBySeatNo(SeatNo);
        if (fishGen) {
            fishGen.SetGenHitFish(Odds);
        }
    };
    //--服务器 下发 子弹消息
    FishGameSceneView.prototype.createBullet = function (bulletInfos) {
        if (bulletInfos && bulletInfos.ListBulletContract) {
            var ListBulletContract = bulletInfos.ListBulletContract;
            for (var i = 0; i < ListBulletContract.length; i++) {
                var bulletArray = void 0;
                if (this.bulletMap[ListBulletContract[i].SeatNo]) {
                    bulletArray = this.bulletMap[ListBulletContract[i].SeatNo];
                }
                else {
                    bulletArray = [];
                    this.bulletMap[ListBulletContract[i].SeatNo] = bulletArray;
                }
                if (bulletArray.length > 200) {
                    continue;
                }
                if (bulletArray.length == 0) {
                    ListBulletContract[i].DelayTime = 0;
                }
                bulletArray.push(ListBulletContract[i]);
            }
        }
    };
    //最大玩家
    FishGameSceneView.prototype.initMaxPlay = function (maxPlay) {
        this.maxPlay = maxPlay || 6;
    };
    //创建字鱼
    // public createOneFontFish(fishInfo):void{
    // 	let fish:Fish=this.allFishes.getObject(fishInfo.FishId);
    // 	let mc:egret.MovieClip=fish.getGameObject;
    // 	let fishSet:any=mc["fishConfigAttr"];
    // 	if (fishSet.type == 4){
    // 		let fishobj:egret.MovieClip =uiCore.MovieClipManager.getGenerateMovieClipData(fishInfo.GroupFishId[1]+"");
    // 		//绑父节点
    // 	} 
    // 	let point:any = this.fishPath.fishs[fishInfo.FishDelay/1000 + 1];
    // 	//fish.transform:SetParent(self.fishPanel.transform) //绑父节点
    // 	if (this.isUpSideDown){
    // 		mc.x = -point.x;
    // 		mc.y = -point.y;
    // 	}else{
    // 		mc.x = point.x;
    // 		mc.y = point.y;
    // 	}
    // 	fishInfo.isFishArray = true;
    // 	fishInfo.isFishFont = true;
    // 	fish.initInfo(fishInfo, fishSet);
    // 	//fish.gameObject.name = fishInfo.FishTag
    // 	if (this.fishPanelPoints[1].x > this.fishPanelPoints[2].x){
    // 		mc.scaleX = 1;
    // 		mc.scaleY = 1;
    // 	} 
    // 	this.allFontFishes.push(fishInfo.FishTag);
    // }
    //鱼阵
    FishGameSceneView.prototype.createFishArray = function (CreateFishArrayRpc_response) {
        this.isInFishArray = CreateFishArrayRpc_response.IsOpen;
        this.fishArrayType = CreateFishArrayRpc_response.ArrayType;
        if (this.isInFishArray == true) {
            this.PlayWave();
        }
    };
    //浪花
    FishGameSceneView.prototype.PlayWave = function () {
        if (this.fishGens) {
            for (var i = 0; i < this.fishGens.length; i++) {
                this.fishGens[i].setAware(true);
            }
        }
        this.isPlayingWave = true;
        this.markAllFishs();
        var fishBgNumber = 0;
        var currSign = new Date().getTime();
        if (currSign % 30 > 20) {
            fishBgNumber = 2;
        }
        else if (currSign % 30 > 10) {
            fishBgNumber = 1;
        }
        FishGameController.ChangeBgAudio(this.changeFishBGinterface(fishBgNumber));
    };
    FishGameSceneView.prototype.WaveTimer = function () {
        this.removeAllMarkFishs();
        if (this.fishGens) {
            for (var i = 0; i < this.fishGens.length; i++) {
                this.fishGens[i].setAware(false);
            }
        }
        this.isPlayingWave = false;
    };
    //是否浪花
    FishGameSceneView.prototype.isPlayWave = function () {
        return this.isPlayingWave;
    };
    FishGameSceneView.prototype.markAllFishs = function () {
        this.allFishes.markFish();
    };
    FishGameSceneView.prototype.removeAllMarkFishs = function () {
        this.allFishes.recoveryAllMark();
    };
    //添加字鱼
    // public createFontFish(fishInfos):void{
    // 	let index:number = 1;
    // 	//添加父节点
    // 	// 	if self.fishPanel == nil then
    // 	// 	self.fishPanel = GameObject()
    // 	// end
    // 	// self.fishPanel.transform:SetParent(self.fishParent)
    // 	// self.fishPanel.transform.localScale = Vector3.one
    // 	let fishInfo:any = fishInfos.FishList[1]
    // 	this.fishPath = this.getFishPathByname(fishInfo.FishWay);
    // 	this.fishPanelSpeed = this.fishPath.speed;
    // 	this.fishPanelPoints = [];
    // 	if (this.isUpSideDown){
    // 		this.fishPanelPoints[1] = new egret.Point(this.fishPath.paths[3],this.fishPath.paths[4]);
    // 		this.fishPanelPoints[2] = new egret.Point(this.fishPath.paths[1],this.fishPath.paths[2]);
    // 		this.fishPanelSpeed = -this.fishPath.speed
    // 	}else{
    // 		this.fishPanelPoints[1] = new egret.Point(this.fishPath.paths[1],this.fishPath.paths[2]);
    // 		this.fishPanelPoints[2] = new egret.Point(this.fishPath.paths[3],this.fishPath.paths[4]);
    // 	}
    // 	this.fishPanelLifeTime = 0;
    // 	if (fishInfo.LifeTime != null){
    // 		this.fishPanelLifeTime = fishInfo.LifeTime * 0.001
    // 	}
    // 	let position:any = uiCore.H5Vector3.add(this.fishPanelPoints[1],new egret.Point(this.fishPanelLifeTime * this.fishPanelSpeed,0)); 
    // 	//let position:egret.Point = new egret.Point(Points,this.fishPanelLifeTime * this.fishPanelSpeed); 
    // 	//位置
    // 	// self.fishPanel.transform.localPosition = position
    // 	this.creatFontFishDone = false
    // 	this.fishList = fishInfos.FishList;
    // }
    FishGameSceneView.prototype.ContainFishTypeInScreen = function (type) {
        return this.allFishes.getFishByType(type);
    };
    //获取所有鱼
    FishGameSceneView.prototype.getAllFishes = function () {
        return this.allFishes.getAllActiveFish();
    };
    //自己发炮
    FishGameSceneView.prototype.thisGenFire = function () {
        if (!this.thisFishGen) {
            return;
        }
        this.thisFishGen.fire();
        this.fireTimer.delay = this.fireTimerdelay;
    };
    //开火时间
    FishGameSceneView.prototype.setFireDuration = function (rate) {
        if (this.fireTimerdelay == null) {
            this.fireRate = rate;
            //时间
            this.fireTimerdelay = this.fireRate; //设置默认值
            for (var i = 0; i < this.fishGens.length; i++) {
                this.fishGens[i].setFireRate(rate);
            }
        }
    };
    //锁定 鼠标移动
    FishGameSceneView.prototype.onPress = function () {
        if (this.thisFishGen) {
            this.thisFishGen.UpdateGenRotation();
        }
    };
    //自动
    FishGameSceneView.prototype.setAutoFile = function (bool) {
        this.thisFishGen.GetAutoFile(bool);
        if (bool) {
            if (this.fireEventOutTimeId != null) {
                egret.clearTimeout(this.fireEventOutTimeId);
            }
            this.fireTimer.start();
        }
        else {
            this.fireTimer.stop();
        }
    };
    //销毁鱼
    // public removeAllFontFish():void{
    // 	if (this.allFontFishes!=null){
    // 		for(var i = 0;i<this.allFontFishes.length;i++){
    // 			this.destroyLists.push(this.allFontFishes[i]);
    // 			this.LockFishDead(this.allFontFishes[i]);
    // 		}
    // 		this.allFontFishes = [];
    // 	}
    // } 
    FishGameSceneView.prototype.bombFish = function (BombFishRpc_response) {
        for (var i = 0; i < BombFishRpc_response.CatchFishList.length; i++) {
            BombFishRpc_response.CatchFishList[i].isBomCatch = true;
            this.killFish(BombFishRpc_response.CatchFishList[i]);
        }
        if (BombFishRpc_response.CatchFishList[0] && BombFishRpc_response.CatchFishList[0].SeatNo == this.playerInfo.SeatNo) {
            egret.setTimeout(function () {
                for (var i = 0; i < 8; i++) {
                    egret.setTimeout(function () {
                        FishGameController.PlayFishAudio(14);
                    }, this, i * 100);
                }
            }, this, 800);
        }
    };
    //显示金币
    FishGameSceneView.prototype.createMoneyLabel = function (isSelf, fish, money) {
        MoneyLabelPool.getMoneyLabelObject().Init(isSelf, fish, money);
    };
    //创建打死鱼时，飞动的金币  
    FishGameSceneView.prototype.CreateFlyCoin = function (fishGun, fishPoint, Odds) {
        var coinValue = 1;
        if (Odds >= 30) {
            coinValue = 10;
        }
        else if (Odds >= 5) {
            coinValue = 5;
        }
        var coinCount = Math.floor(Odds / coinValue);
        if (coinCount < 1) {
            coinCount = 1;
        }
        if (coinCount > 10) {
            coinCount = 10;
        }
        for (var i = 0; i < coinCount; i++) {
            var fishSeatPoint = new egret.Point();
            fishGun.localToGlobal(fishGun.fishSeat.x, fishGun.fishSeat.y, fishSeatPoint);
            if (fishGun.SeatNo > 2) {
                fishSeatPoint.x -= 49;
                fishSeatPoint.y -= 40;
            }
            FlyCoinPool.getFlyCoinObject(coinValue, fishGun.isSelfGen).Init(new egret.Point(fishPoint.x, fishPoint.y), fishSeatPoint, i, coinCount);
        }
    };
    //炮台销毁
    FishGameSceneView.prototype.LockFishDead = function (fishTag) {
        if (this.fishGens) {
            for (var i = 0; i < this.fishGens.length; i++) {
                this.fishGens[i].LockFishDead(fishTag);
            }
        }
    };
    //硬币计数
    FishGameSceneView.prototype.GetCoinCount = function (fish) {
        return fish.fishSet.coinCount;
    };
    //倍率
    FishGameSceneView.prototype.GetFishOdds = function (fishi) {
        return fishi.fishInfo.Odds;
    };
    //死鱼
    FishGameSceneView.prototype.removeFish = function (fishTag) {
        this.allFishes.fishDie(fishTag);
        this.LockFishDead(fishTag);
    };
    //返回鱼场鱼
    FishGameSceneView.prototype.DestroyFish = function (fishTag) {
        this.allFishes.recovery(fishTag);
        this.LockFishDead(fishTag);
    };
    //两条的距离是否在爆炸范围内
    FishGameSceneView.prototype.IsInBombRange = function (origin, target, bombRange) {
        var x = Math.floor(origin.x - target.x);
        var y = Math.floor(origin.y - target.y);
        var dist = Math.sqrt(x * x + y * y);
        return dist;
    };
    //找出所有在爆炸范围内的鱼
    FishGameSceneView.prototype.getAllFishInBombRange = function (fish, catchFishContract) {
        // var bombFishContract = this.allFishes.getAllFishInBombRange(new egret.Point(fish.x,fish.y) ,fish.fishSet.bombRange,catchFishContract);
        // bombFishContract.push(catchFishContract);
        return this.allFishes.getAllFishInBombRange(fish.x, fish.y, fish.fishSet.bombRange, catchFishContract);
    };
    // //播放抓到鱼的特效 粒子特效 图片特效
    // public PlayCatchFishEffect( index , root, pos,duration):void{
    // }
    //播放炸弹鱼的特效
    FishGameSceneView.prototype.PlayBombFishEffect = function (bombRange) {
        //this.shakeScene();
        uiCore.Application.vibrationScreen(); //震屏
        if (bombRange < 0) {
            this.ShowActivePaticel();
            //this.PlayCatchFishEffect(2,this.fishParent, new egret.Point(fish.gameObject.x,fish.gameObject.y),2.0);
        }
        // else{
        // 	this.PlayCatchFishEffect(1, self.fishParent, new egret.Point(fish.gameObject.x,fish.gameObject.y),2.0);
        // }	 
    };
    //找出所有同类的鱼
    FishGameSceneView.prototype.getFishById = function (id) {
        return this.allFishes.getAllTheTypeFish(id);
    };
    //--杀死同类鱼
    FishGameSceneView.prototype.KillSimilarFish = function (fishGen, fish, bulletOdds) {
        this.ShowActivePaticel();
        var similarFishs = new Array();
        if (fish.fishSet.type == 4) {
            similarFishs = this.getFishById(fish.fishInfo.GroupFishId[0]);
            similarFishs.push(fish);
        }
        else if (fish.fishSet.type == 8) {
            similarFishs = this.getFishById(fish.fishInfo.GroupFishId[0]);
            var GroupSimilarFishs = new Array();
            GroupSimilarFishs = this.getFishById(fish.fishInfo.GroupFishId[1]);
            for (var i = 0; i > GroupSimilarFishs.length; i++) {
                similarFishs.push(GroupSimilarFishs[i]);
            }
            similarFishs.push(fish);
        }
        //炮台处理 
        uiCore.Application.vibrationScreen(); //震屏
        var _loop_1 = function () {
            this_1.createMoneyLabel(fishGen.isSelfGen, similarFishs[key], similarFishs[key].fishInfo.Odds * bulletOdds);
            var fishPoint = new egret.Point(similarFishs[key].x, similarFishs[key].y);
            var Odds = this_1.GetFishOdds(similarFishs[key]);
            var currFishGen = fishGen;
            egret.setTimeout(function () {
                this.CreateFlyCoin(currFishGen, fishPoint, Odds);
            }, this_1, 800);
            this_1.removeFish(similarFishs[key].FishTag);
        };
        var this_1 = this;
        for (var key in similarFishs) {
            _loop_1();
        }
        if (fishGen.isSelfGen) {
            egret.setTimeout(function () {
                for (var i = 0; i < 8; i++) {
                    egret.setTimeout(function () {
                        FishGameController.PlayFishAudio(14);
                    }, this, i * 100);
                }
            }, this, 800);
        }
    };
    //创建海明胆替身
    FishGameSceneView.prototype.CreateSeaUrchinSubstitute = function (reallyFishId, pos, FishTag, isSelfGen, winMoney, info) {
        var fish = this.allFishes.getObject(reallyFishId);
        if (fish) {
            fish.isRunning = true;
            fish.isFishFont = false;
            fish.FishTag = FishTag;
            fish.fishInfo = info;
            fish.x = pos.x;
            fish.y = pos.y;
            this.createMoneyLabel(isSelfGen, fish, winMoney);
            this.removeFish(fish.FishTag);
        }
    };
    //--杀死海胆
    FishGameSceneView.prototype.killSeaUrchin = function (fish, fishGen, winMoney) {
        //机器人
        if (fish.fishInfo.GroupFishId && fish.fishInfo.GroupFishId[0] && fish.fishInfo.GroupFishId[0] > 0) {
            this.CreateSeaUrchinSubstitute(fish.fishInfo.GroupFishId[0], new egret.Point(fish.x, fish.y), fish.FishTag, fishGen.isSelfGen, winMoney, fish.fishInfo);
            var fishPoint_1 = new egret.Point(fish.x, fish.y);
            var Odds_1 = this.GetFishOdds(fish);
            var currFishGen_1 = fishGen;
            egret.setTimeout(function () {
                this.CreateFlyCoin(currFishGen_1, fishPoint_1, Odds_1);
                if (currFishGen_1.isSelfGen) {
                    FishGameController.PlayFishAudio(14);
                }
            }, this, 800);
        }
        else {
            this.createMoneyLabel(fishGen.isSelfGen, fish, winMoney);
            this.CreateFlyCoin(fishGen, new egret.Point(fish.x, fish.y), this.GetFishOdds(fish));
            if (fishGen.isSelfGen) {
                FishGameController.PlayFishAudio(14);
            }
        }
        this.DestroyFish(fish.FishTag);
    };
    //定屏炸弹
    FishGameSceneView.prototype.killFixedScreenBomb = function (fixedTimes) {
        this.FixedScreen = fixedTimes;
        //this.PlayCatchFishEffect(4,self.fishParent, Vector3.zero,2.0)
        this.PlayFxiedEffect();
        this.allFishes.FixedScreen(fixedTimes);
    };
    //定屏特效
    FishGameSceneView.prototype.PlayFxiedEffect = function () {
        // uiCore.ParticleManager.init(["bingParticle"]);
        // var system:particle.ParticleSystem = uiCore.ParticleManager.getParticleSystem("bingParticle");
        // if(system){
        // 	this.addChild(system);
        // 	system.start();
        // 	egret.setTimeout(function(){  
        // 		 system.stop();
        // 	}, this,1500);
        // }
    };
    //播放轮子特效
    FishGameSceneView.prototype.palyLunZiEffect = function (seatNo, money) {
        var fishgen = this.getFishGenBySeatNo(seatNo);
        if (fishgen) {
            this.lunziParticle(fishgen, money);
            //如果当前座位是自己的话播放音效
            if (seatNo == this.playerInfo.SeatNo) {
                var num = 12;
                if (uiCore.LangUtils.getLangType() == uiCore.LangUtils.ZH_CN) {
                    num = uiCore.Utils.getRandom(1, 12);
                }
                FishGameController.PlayFishAudio(num);
            }
        }
    };
    FishGameSceneView.prototype.getFishByTag = function (tag) {
        return this.allFishes.getFish(tag);
    };
    //座位号，子弹数，是否是加农炮
    FishGameSceneView.prototype.getBulletPrefab = function (seatNo, isCannon) {
        var num = 1;
        num = isCannon == true && 7 || seatNo;
        return this.bulletPool[num];
    };
    //删除鱼
    FishGameSceneView.prototype.killFish = function (CatchFishContract) {
        if (CatchFishContract.SeatNo == null) {
            return;
        }
        var fish = this.getFishByTag(CatchFishContract.FishTag);
        if (fish == null) {
            return;
        }
        var fishgen = this.getFishGenBySeatNo(CatchFishContract.SeatNo);
        if (!fishgen) {
            return;
        }
        if (fish.fishSet.type > 0) {
            this.PlayLunzi(fish.fishSet.id, CatchFishContract);
        }
        //杀死同类鱼
        if (fish.fishSet.type == 4 || fish.fishSet.type == 8) {
            // 子弹的概率
            var BulletOdds = CatchFishContract.BulletOdds || 10;
            this.KillSimilarFish(fishgen, fish, BulletOdds);
        }
        else if (fish.fishSet.type == 5) {
            this.killSeaUrchin(fish, fishgen, CatchFishContract.WinMoney);
        }
        else {
            this.fishDieProcess(fish, fishgen, CatchFishContract);
        }
    };
    FishGameSceneView.prototype.PlayLunzi = function (fishid, CatchFishContract) {
        //如果当前座位是自己的话播放音效 
        if (fishid > 17) {
            if (!CatchFishContract.isBomCatch) {
                //轮子特效
                this.palyLunZiEffect(CatchFishContract.SeatNo, CatchFishContract.WinMoney);
            }
        }
    };
    //打中鱼
    FishGameSceneView.prototype.catchFish = function (CatchFish) {
        var fishgen = this.getFishGenBySeatNo(CatchFish.SeatNo);
        if (!fishgen) {
            return;
        }
        fishgen.setGoldNum(CatchFish.AllMoney);
        if (fishgen == this.thisFishGen) {
            GameData.getInstance().setUserData("gold_num", CatchFish.AllMoney);
        }
        var fish = this.getFishByTag(CatchFish.FishTag);
        if (!fish || !CatchFish.IsCatch) {
            return;
        }
        if (fishgen.isInited == true) {
            fishgen.CreateCoinColumn(CatchFish.WinMoney, fish.fishInfo.Odds);
        }
        if (fish.fishSet.type == 2) {
            FishGameController.sendBombFish(this.getAllFishInBombRange(fish, CatchFish));
            this.PlayBombFishEffect(fish.fishSet.bombRange);
            this.palyLunZiEffect(CatchFish.SeatNo, CatchFish.WinMoney);
            this.fishDieProcess(fish, fishgen, CatchFish);
        }
        else if (fish.fishSet.type == 7) {
            this.killFixedScreenBomb(FishGameController.getFishGameSetting().StopBombTime);
            this.removeFish(fish.FishTag);
        }
        else {
            this.killFish(CatchFish);
        }
    };
    FishGameSceneView.prototype.fishDieProcess = function (fish, fishGen, CatchFish) {
        var fishPoint = new egret.Point(fish.x, fish.y);
        var Odds = this.GetFishOdds(fish);
        var currFishGen = fishGen;
        var isBomCatch = CatchFish.isBomCatch;
        egret.setTimeout(function () {
            this.CreateFlyCoin(currFishGen, fishPoint, Odds);
            if (!isBomCatch) {
                if (currFishGen.isSelfGen) {
                    FishGameController.PlayFishAudio(14);
                }
            }
        }, this, 800);
        this.createMoneyLabel(fishGen.isSelfGen, fish, CatchFish.WinMoney);
        this.removeFish(fish.FishTag);
    };
    FishGameSceneView.prototype.setCannonGen = function (CannonRpc_response) {
        var fishgen = this.getFishGenBySeatNo(CannonRpc_response.SeatNo);
        if (fishgen) {
            fishgen.setCannon(CannonRpc_response.isOn);
        }
    };
    //改变背景图片
    FishGameSceneView.prototype.changeFishBGinterface = function (bgid) {
        var resultNumber = 0;
        var indexCurr;
        var imageCurr;
        var changeIndex;
        var index0 = this.getChildIndex(this.fishBG0);
        var index1 = this.getChildIndex(this.fishBG1);
        var index2 = this.getChildIndex(this.fishBG2);
        if (index0 == 2) {
            changeIndex = index0;
            if (bgid == 1) {
                imageCurr = this.fishBG1;
                indexCurr = index1;
                this.fishBG2.visible = false;
                resultNumber = 1;
            }
            else {
                imageCurr = this.fishBG2;
                indexCurr = index2;
                this.fishBG1.visible = false;
                resultNumber = 2;
            }
        }
        else if (index1 == 2) {
            changeIndex = index1;
            if (bgid == 2) {
                imageCurr = this.fishBG2;
                indexCurr = index2;
                this.fishBG0.visible = false;
                resultNumber = 2;
            }
            else {
                imageCurr = this.fishBG0;
                indexCurr = index0;
                this.fishBG2.visible = false;
            }
        }
        else {
            changeIndex = index2;
            if (bgid == 0) {
                imageCurr = this.fishBG0;
                indexCurr = index0;
                this.fishBG1.visible = false;
            }
            else {
                imageCurr = this.fishBG1;
                indexCurr = index1;
                this.fishBG0.visible = false;
                resultNumber = 1;
            }
        }
        this.changeFishBG(changeIndex, indexCurr, imageCurr);
        return resultNumber;
    };
    FishGameSceneView.prototype.changeFishBG = function (index1, index2, imageBG) {
        imageBG.visible = false;
        this.swapChildrenAt(index1, index2);
        var image = new eui.Image();
        image.source = "bg2_png";
        image.right = 0;
        image.height = this.stage.stageHeight;
        image.width = 0;
        image.visible = false;
        this.addChild(image);
        imageBG.mask = image;
        imageBG.visible = true;
        var fishwater = uiCore.MovieClipManager.getGenerateMovieClipData("waterleft");
        egret.Tween.get(image, { onChange: this.onChange, onChangeObj: image }).to({ width: this.stage.stageWidth }, 4000, egret.Ease.sineIn).call(function () {
            egret.Tween.removeTweens(image);
            if (FishGameController.getGameView()) {
                FishGameController.getGameView().removeChild(image);
                FishGameController.getGameView().WaveTimer();
            }
        });
        if (fishwater != null) {
            this.addChild(fishwater);
            fishwater.scaleY = Math.ceil(this.stage.stageHeight / fishwater.height);
            fishwater.x = this.stage.stageWidth - fishwater.width / 3;
            fishwater.gotoAndPlay("left", -1);
            egret.Tween.get(fishwater).to({ x: -fishwater.width / 3 }, 4000, egret.Ease.sineIn).call(function () {
                egret.Tween.removeTweens(fishwater);
                if (FishGameController.getGameView()) {
                    FishGameController.getGameView().removeChild(fishwater);
                }
            });
        }
    };
    FishGameSceneView.prototype.onChange = function () {
        if (FishGameController.getGameView()) {
            var fishs = FishGameController.getGameView().allFishes.getAllSiwimming();
            if (fishs.length > 0) {
                var _loop_2 = function () {
                    if (fishs[key].alpha == 1) {
                        if (this_2.hitTestPoint(fishs[key].x, fishs[key].y, false)) {
                            var fishTagObject_1 = fishs[key];
                            egret.Tween.get(fishTagObject_1).to({ alpha: 0 }, 1000).call(function () {
                                egret.Tween.removeTweens(fishTagObject_1);
                            });
                        }
                    }
                };
                var this_2 = this;
                for (var key in fishs) {
                    _loop_2();
                }
            }
        }
    };
    FishGameSceneView.prototype.mousePositionToViewPort = function () {
        return this.PosToViewPort;
    };
    FishGameSceneView.prototype.initEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.FishRateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenFishRateView, this);
        this.fishlockbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnfishlockState, this);
        this.fishautobtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnFishautoState, this);
        this.fishfastbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnFishfastState, this);
        this.fishgetnumbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenFishnumView, this);
        this.fishsetbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenSettingView, this);
        this.arrowbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.DoubleFalse, this);
        if (this.shuangciGroup && this.shuangciGroup.getDragonBonesEgret) {
            this.shuangciGroup.getDragonBonesEgret.addEventListener(dragonBones.EventObject.COMPLETE, this.dragonBoneCOMPLETE, this);
        }
    };
    //打开倍率窗口
    FishGameSceneView.prototype.OpenFishRateView = function () {
        if (!this.IsAutoFire) {
            this.fireTimer.stop();
        }
        //等服务端调通后定义一个参数id，传入，30300101 测试
        uiCore.Application.addWindow(new FishGameRateView(uiCore.Application.currGameId));
    };
    //打开结算窗口
    FishGameSceneView.prototype.OpenFishnumView = function () {
        if (!this.IsAutoFire) {
            this.fireTimer.stop();
        }
        FishGameController.sendCatchFishBalance();
        this.jiesuanView = new FishGamegetNumView(uiCore.Application.currGameId);
        uiCore.Application.addWindow(this.jiesuanView);
    };
    FishGameSceneView.prototype.OpenSettingView = function () {
        uiCore.Application.addWindow(new GameSettingWindow());
        if (!this.IsAutoFire) {
            this.fireTimer.stop();
        }
    };
    //开启锁定打鱼
    FishGameSceneView.prototype.OnfishlockState = function () {
        if (!this.IsAutoFire) {
            this.fireTimer.stop();
        }
        this.featuresManager(this.lockbg, this.lockmc);
        this.thisFishGen.setWantToLockFish(this.lockbg.visible);
    };
    FishGameSceneView.prototype.featuresManager = function (image, mcGroup) {
        var mc = mcGroup.getChildAt(0);
        if (image.visible) {
            egret.Tween.removeTweens(image);
            mc.stop();
            image.visible = false;
            mcGroup.visible = false;
        }
        else {
            egret.Tween.get(image, { loop: true }).to({ rotation: 360 }, 5000);
            mc.gotoAndPlay("play", -1);
            image.visible = true;
            mcGroup.visible = true;
        }
    };
    //开启快速打鱼
    FishGameSceneView.prototype.OnFishfastState = function () {
        if (!this.IsAutoFire) {
            this.fireTimer.stop();
        }
        this.featuresManager(this.fastbg, this.fastmc);
        if (this.fastbg.visible) {
            this.fireTimerdelay = this.fireRate / 2;
        }
        else {
            this.fireTimerdelay = this.fireRate;
        }
    };
    // 开启自动打鱼 
    FishGameSceneView.prototype.OnFishautoState = function () {
        this.IsAutoFire = !this.IsAutoFire;
        this.featuresManager(this.autobg, this.automc);
        this.setAutoFile(this.autobg.visible);
    };
    //显示轮子特效 
    FishGameSceneView.prototype.lunziParticle = function (obj, money) {
        LunziPool.getLunziObject().Init(obj.x, obj.y, money);
    };
    //显示双刺特效
    FishGameSceneView.prototype.ShowActivePaticel = function () {
        if (this.shuangciGroup) {
            this.shuangciGroup.visible = true;
            var dragonBoneShuangCi = this.shuangciGroup.getDragonBonesEgret;
            if (dragonBoneShuangCi) {
                dragonBoneShuangCi.animation.play("newAnimation", 5);
            }
        }
    };
    FishGameSceneView.prototype.dragonBoneCOMPLETE = function (evt) {
        if (this.shuangciGroup) {
            this.shuangciGroup.visible = false;
        }
    };
    Object.defineProperty(FishGameSceneView.prototype, "resourceList", {
        get: function () {
            return ["fishGameGroup"];
        },
        enumerable: true,
        configurable: true
    });
    FishGameSceneView.prototype.update = function () {
        if (this.currTime == 0) {
            this.currTime = egret.getTimer();
        }
        else {
            var nowTime = egret.getTimer();
            FishGameManager.deltaTime = nowTime - this.currTime;
            this.currTime = nowTime;
        }
        uiCore.Application.setbulletSuDu();
        // if(this.preloadFishs&&this.preloadFishs.length>100){
        // 	console.log("preloadFishs:"+this.preloadFishs.length);
        // }
        // if(FishGameController.creatBullets&&FishGameController.creatBullets.length>100){
        // 	console.log("creatBullets:"+FishGameController.creatBullets.length);
        // }
        // if(FishGameController.bulletHitFishs&&FishGameController.bulletHitFishs.length>100){
        // 	console.log("bulletHitFishs:"+FishGameController.bulletHitFishs.length);
        // }
        this.clearIndx--;
        if (this.clearIndx <= 0) {
            this.clearIndx = 10;
            FishGameController.timerSendMesasge();
        }
        if (this.preloadFishs.length > 0) {
            for (var i = 0; i < this.preloadFishs.length; i++) {
                var fish = this.preloadFishs.shift();
                //鱼的停顿时间
                fish.FixedScreen = this.FixedScreen || 0;
                this.createOneFish(fish);
            }
        }
    };
    //矩形和矩形碰撞检测
    // public hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {	
    // 	var rect1: egret.Rectangle = obj1.getBounds();
    // 	var rect2: egret.Rectangle = obj2.getBounds();
    // 	rect1.x = obj1.x;rect1.y = obj1.y;	
    // 	rect2.x = obj2.x;rect2.y = obj2.y;
    // 	return rect2.intersects(rect1);
    // } 
    FishGameSceneView.prototype.getFishGenBySeatNo = function (seatNo) {
        var fishgen;
        if (seatNo >= 0) {
            if (this.isUpSideDown) {
                if (seatNo >= this.maxPlay / 2) {
                    fishgen = this.fishGens[seatNo - this.maxPlay / 2];
                }
                else {
                    fishgen = this.fishGens[seatNo + this.maxPlay / 2];
                }
            }
            else {
                fishgen = this.fishGens[seatNo];
            }
        }
        return fishgen;
    };
    FishGameSceneView.prototype.showExitTips = function () {
        this.ExitTips.fontFamily = "Microsoft YaHei";
        this.ExitTips.size = 40;
        this.ExitTips.horizontalCenter = "0";
        this.ExitTips.verticalCenter = "0";
        this.FishtipsLable(false, 50);
        this.addChild(this.ExitTips);
    };
    FishGameSceneView.prototype.showSelfPlayerGenPosion = function (genX, genY) {
        this.isShowSelfPlayerGenPosion = true;
        var genBgImage = new eui.Image();
        genBgImage.source = "otherBlack";
        genBgImage.top = genBgImage.bottom = genBgImage.left = genBgImage.right = 0;
        genBgImage.alpha = 0.8;
        this.addChild(genBgImage);
        var genGlowImage = new eui.Image();
        genGlowImage.source = "otherGlow";
        this.addChild(genGlowImage);
        genGlowImage.x = genX + 40 - 109;
        genGlowImage.bottom = 0;
        var genOtherYourPositionImage = new eui.Image();
        genOtherYourPositionImage.source = "otherYourPositionText";
        this.addChild(genOtherYourPositionImage);
        genOtherYourPositionImage.x = genX + 40 - 67;
        genOtherYourPositionImage.y = genY - 100;
        var genOtherArrowImage = new eui.Image();
        genOtherArrowImage.source = "otherArrow";
        this.addChild(genOtherArrowImage);
        genOtherArrowImage.x = genX + 40 - 22;
        genOtherArrowImage.y = genY - 60;
        egret.setTimeout(function () {
            this.removeChild(genBgImage);
            this.removeChild(genGlowImage);
            this.removeChild(genOtherYourPositionImage);
            this.removeChild(genOtherArrowImage);
        }, this, 3000);
    };
    FishGameSceneView.prototype.FishtipsLable = function (bool, timer) {
        if (this.ExitTips.visible != bool) {
            this.ExitTips.visible = bool;
        }
        if (this.ExitTips.visible) {
            this.ExitTips.text = uiCore.StringUtils.format(uiCore.LangUtils.getMsgById(12), timer);
        }
    };
    FishGameSceneView.prototype.ReconnectAllFish = function () {
        this.removeAllFishs();
        this.allFishes.reconnectAllFish();
        this.preloadFishs = [];
    };
    FishGameSceneView.prototype.removeEvent = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.FishRateBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenFishRateView, this);
        this.fishlockbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnfishlockState, this);
        this.fishautobtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnFishautoState, this);
        this.fishfastbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnFishfastState, this);
        this.fishgetnumbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenFishnumView, this);
        this.fishsetbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenSettingView, this);
        this.arrowbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.DoubleFalse, this);
        if (egret.Capabilities.isMobile) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.getMouseMove, this);
        }
        else {
            this.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.getMouseMove, this);
        }
        this.bulletGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.fireEventBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.fireEventEnd, this);
        if (this.fireTimer) {
            this.fireTimer.stop();
            this.fireTimer.removeEventListener(egret.TimerEvent.TIMER, this.thisGenFire, this);
            this.fireTimer = null;
        }
        if (this.robotTimer) {
            this.robotTimer.stop();
            this.robotTimer.removeEventListener(egret.TimerEvent.TIMER, this.robotFire, this);
            this.robotTimer = null;
        }
        if (this.shuangciGroup && this.shuangciGroup.getDragonBonesEgret) {
            this.shuangciGroup.getDragonBonesEgret.removeEventListener(dragonBones.EventObject.COMPLETE, this.dragonBoneCOMPLETE, this);
        }
    };
    FishGameSceneView.prototype.clearGen = function () {
        if (this.fishGens) {
            for (var key in this.fishGens) {
                this.fishGens[key].Dispose();
            }
            this.fishGens = [];
        }
    };
    FishGameSceneView.prototype.Destroy = function () {
        this.clearGen();
        if (this.allFishes) {
            this.allFishes.reconnectAllFish();
        }
        LunziPool.Dispose();
        FlyCoinPool.Dispose();
        MoneyLabelPool.Dispose();
    };
    FishGameSceneView.prototype.onDestroy = function () {
        this.removeEvent();
        this.thisFishGen = null;
        this.allFishes = null;
        this.bulletMap = null;
        _super.prototype.onDestroy.call(this);
    };
    return FishGameSceneView;
}(uiCore.Scene));
__reflect(FishGameSceneView.prototype, "FishGameSceneView");
var player_info = (function () {
    function player_info() {
    }
    return player_info;
}());
__reflect(player_info.prototype, "player_info");
//# sourceMappingURL=FishGameSceneView.js.map