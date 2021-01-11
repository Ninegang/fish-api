var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CreateBullet_request = (function () {
    function CreateBullet_request() {
        this.ListBulletContract = [];
    }
    return CreateBullet_request;
}());
__reflect(CreateBullet_request.prototype, "CreateBullet_request");
var CatchFish_request = (function () {
    function CatchFish_request() {
        this.ListHitFishContract = [];
    }
    return CatchFish_request;
}());
__reflect(CatchFish_request.prototype, "CatchFish_request");
var bombFish_request = (function () {
    function bombFish_request() {
        this.CatchFishList = [];
    }
    return bombFish_request;
}());
__reflect(bombFish_request.prototype, "bombFish_request");
var FishGameController = (function () {
    function FishGameController() {
    }
    FishGameController.timerSendMesasge = function () {
        if (this.creatBullets.length > 0) {
            var CreateBulletRpc_request = new CreateBullet_request();
            CreateBulletRpc_request.ListBulletContract = this.creatBullets;
            Net.GameService.send(FishGameContractType.CREATE_BULLET, CreateBulletRpc_request, GameData.getInstance().userData("serverid"));
            this.creatBullets = [];
        }
        if (this.bulletHitFishs.length > 0) {
            var CatchFishRpc_request = new CatchFish_request();
            CatchFishRpc_request.ListHitFishContract = this.bulletHitFishs;
            Net.GameService.send(FishGameContractType.CATCH_FISH, CatchFishRpc_request, GameData.getInstance().userData("serverid"));
            this.bulletHitFishs = [];
        }
    };
    //以后可能可以要改的 
    FishGameController.sendLogin = function (gameID, serverID) {
        GameData.getInstance().setUserData("serverid", serverID);
        var username = GameData.getInstance().userData("username");
        var sign = GameData.getInstance().userData("signText");
        var agetid = GameData.getInstance().userData("agentId");
        var content = { AccountName: username, Sign: sign, AgentID: agetid, LoginDeviceID: uiCore.Utils.getIMEI(), GameID: gameID, ServerID: serverID };
        Net.GameService.send(HallSocketType.LoginGame, content, serverID);
        uiCore.Application.addSetTimeCloseLoaddingTip();
    };
    FishGameController.onLogin = function (result) {
        if (result.LoginResultType == 0) {
            //重连
            if (this.currentDesk != null && this.currentDesk.succeed == true) {
                this.currentDeskisOnGame = true;
                this.currentDesk.JoinMode = 3; //优先原来的位置，没有就自动坐桌
                //进入游戏
                this.sendJoinDesk(this.currentDesk, this.maxPlay);
            }
            else {
                this.currentDeskisOnGame = false;
                DeskController.init();
            }
        }
        else {
            var message = uiCore.LangUtils.getMsgById(13);
            if (result.LoginResultType == 4) {
                message = uiCore.LangUtils.getMsgById(7);
            }
            else if (result.LoginResultType == 5) {
                message = uiCore.LangUtils.getMsgById(14);
            }
            uiCore.Application.closeLoaddingTip(message);
            //返回到大厅 或者桌子界面
        }
    };
    //告诉服务器可以装载完成
    FishGameController.sendLoadComplete = function (isReconnect) {
        Net.GameService.send(FishGameContractType.LOAD_COMPLETE, { isReconnect: isReconnect }, GameData.getInstance().userData("serverid"));
    };
    //可以创建鱼
    FishGameController.sendGetCreatedFish = function () {
        Net.GameService.send(FishGameContractType.CREATED_FISH, {}, GameData.getInstance().userData("serverid"));
    };
    //服务器返回桌子界面数据 可以创建桌子
    FishGameController.onDesk = function (DeskRpc) {
    };
    //加入桌子
    FishGameController.sendJoinDesk = function (JoinDeskRpc_request, deskMaxPlay) {
        this.ServerCurStateTwo = 0;
        this.ServerCurState = 0;
        this.currentDesk = JoinDeskRpc_request;
        this.currentDesk.succeed = false;
        this.maxPlay = deskMaxPlay;
        Net.GameService.send(FishGameContractType.LOGIJOIN_DESKN, JoinDeskRpc_request, GameData.getInstance().userData("serverid"));
        uiCore.Application.addSetTimeCloseLoaddingTip();
    };
    //加入桌子返回
    FishGameController.onJoinDesk = function (JoinDeskRpc_response) {
        if (JoinDeskRpc_response.gamePlayerContract.userId == GameData.getInstance().userData("userId")) {
            this.selfplayerInfo = JoinDeskRpc_response.gamePlayerContract;
        }
        //重连
        //this.sendQuitDesk();
        if (this.isLoadFishGameRoot) {
            if (JoinDeskRpc_response.gamePlayerContract.userId == this.selfplayerInfo.userId) {
                // alert("onJoinDesk()"+this.selfplayerInfo.userId);
                if (this.currentDesk != null) {
                    this.currentDesk.succeed = true;
                }
                this.ServerCurStateTwo = 1;
                if (this.currentDeskisOnGame == true) {
                    this.sendLoadComplete(true);
                    this.sendGetCreatedFish();
                }
                else if (this.isOnGame && this.ServerCurState == 1) {
                    this.gameView.initSelfPlayerInfo(this.selfplayerInfo);
                }
                else {
                    uiCore.Application.openGameTips();
                }
            }
            else if (this.isOnGame) {
                this.gameView.initPlayer(JoinDeskRpc_response.gamePlayerContract);
            }
        }
        else {
            if (JoinDeskRpc_response.gamePlayerContract.userId == GameData.getInstance().userData("userId")) {
                if (this.currentDesk != null) {
                    this.currentDesk.succeed = true;
                }
                this.createFishGame();
            }
        }
    };
    //背景音乐
    FishGameController.ChangeBgAudio = function (bgId) {
        if (uiCore.ExternalInterfaceUtils.inGame) {
            uiCore.SoundByteManager.playMusic(this.Audios[bgId + 15]);
        }
    };
    FishGameController.PlayFishAudio = function (indx) {
        if (indx == 13 || indx == 14) {
            uiCore.SoundByteManager.playEffect(this.Audios[indx]);
        }
        else {
            uiCore.SoundByteManager.playEffect(this.Audios[indx]);
        }
    };
    FishGameController.playGenAudio = function (isCannon) {
        var audionameIndex = 21;
        if (isCannon) {
            audionameIndex = 22;
        }
        uiCore.SoundByteManager.playEffect(this.Audios[audionameIndex]);
    };
    FishGameController.createFishGame = function () {
        //记载背景 加载loading   
        if (this.gameView || FishGameManager.checkFishConfig()) {
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(15), function () {
                uiCore.Utils.reloadPage();
            });
            return;
        }
        uiCore.ZipManager.initFont(["fishAndPillarFont", "gunFont", "gunGoldFont", "powerFont", "silverFont"]);
        this.gameView = new FishGameSceneView();
        uiCore.Application.changeScene(this.gameView);
        this.isLoadFishGameRoot = true;
        this.gameView.initMaxPlay(this.currentDesk.maxPlay);
        this.gameView.reset();
        DeskController.destroy();
        this.noOperateTime = 0;
        this.showExitTipTimer = new egret.Timer(1000, 0);
        this.showExitTipTimer.addEventListener(egret.TimerEvent.TIMER, this.ExitTipTimer, this);
        this.showExitTipTimer.start();
    };
    FishGameController.ExitTipTimer = function () {
        // let startTime:number=egret.getTimer();
        this.noOperateTime++;
        if (this.gameSetting != null) {
            if (this.noOperateTime >= this.gameSetting.TimeToTip / 2) {
                if (this.gameView != null) {
                    this.tipslabel--;
                    this.gameView.FishtipsLable(true, this.tipslabel);
                }
            }
            if (this.noOperateTime > this.gameSetting.TimeToTip - 1) {
                FishGameController.sendQuitDesk();
            }
        }
        if (this.gameView && this.gameView.allFishes) {
            this.gameView.allFishes.checkPoolNum();
            // if(this.gameView.allFishes.fishPoolArray.length>150||this.gameView.allFishes.fishPoolSiwimmingMap.length>100){
            //     console.log("fishPoolArray:"+this.gameView.allFishes.fishPoolArray.length);
            //     console.log("fishPoolSiwimmingMap:"+this.gameView.allFishes.fishPoolSiwimmingMap.length);
            // }
        }
        // var diffTime:number=egret.getTimer()-startTime;
        // if(diffTime>10){
        // 	console.log("ExitTipTimer:"+diffTime);
        // }
    };
    //第一次进入钓场算法服务器有没有断开
    FishGameController.onFishGameSetting = function (FishGameSettingRpc_response) {
        this.gameSetting = FishGameSettingRpc_response;
        this.tipslabel = this.gameSetting.TimeToTip / 2;
        this.ServerCurState = this.gameSetting.ServerStateCode || 0;
        if (this.ServerCurState != 1) {
            uiCore.Application.openGameTips();
            return;
        }
        this.isOnGame = true;
        this.gameView.isInFishArray = this.gameSetting.OnFishArry;
        this.gameView.fishArrayType = this.gameSetting.FishArrayType;
        this.gameView.setFireDuration(this.gameSetting.FireRate);
        if (this.currentDeskisOnGame == true) {
            this.gameView.initSelfPlayerInfo(this.selfplayerInfo);
        }
    };
    //算法服务器状态
    FishGameController.onOutForServer = function (result) {
        this.ServerCurState = result.code;
        if (result.code != 1) {
            if (this.isOnGame) {
                uiCore.Application.openGameTips();
            }
        }
    };
    FishGameController.isOnLine = function () {
        return (this.ServerCurState == 1 && this.ServerCurStateTwo == 1);
    };
    //接收创建鱼的消息
    FishGameController.onCreateFish = function (CreateFishRpc_response) {
        if (this.isOnGame) {
            this.gameView.createFishInfo(CreateFishRpc_response);
        }
    };
    //接收是否鱼阵的消息
    FishGameController.onCreateFishArray = function (CreateFishRpc_response) {
        if (this.isOnGame) {
            this.gameView.createFishArray(CreateFishRpc_response);
        }
    };
    //发送炸弹鱼的消息
    FishGameController.sendBombFish = function (bombFishContract) {
        var bombFishRpc_request = new bombFish_request();
        bombFishRpc_request.CatchFishList = bombFishContract;
        Net.GameService.send(FishGameContractType.BOMB_FISH, bombFishRpc_request, GameData.getInstance().userData("serverid"));
    };
    //接收炸弹鱼的消息
    FishGameController.onBombFish = function (BombFishRpc_response) {
        if (this.isOnGame && BombFishRpc_response) {
            this.gameView.bombFish(BombFishRpc_response);
        }
    };
    FishGameController.getFishGameSetting = function () {
        return this.gameSetting;
    };
    FishGameController.getGameView = function () {
        return this.gameView;
    };
    FishGameController.getSelfPlayerInfo = function () {
        return this.selfplayerInfo;
    };
    //打中鱼
    FishGameController.onCatchFish = function (CatchFishRpc_response) {
        if (this.isOnGame) {
            this.gameView.catchFish(CatchFishRpc_response.CatchFish);
        }
    };
    //发射子弹
    FishGameController.sendCreateBullet = function (BulletContract, isMyGen) {
        //0是极速 1是正常速度
        BulletContract.DelayTime = 0;
        if (isMyGen) {
            this.noOperateTime = 0; // 重新计时
            if (this.gameView != null) {
                this.tipslabel = this.gameSetting.TimeToTip / 2;
                this.gameView.FishtipsLable(false, 50); //调用提示;
                if (!this.gameView.fastbg.visible) {
                    BulletContract.DelayTime = 1;
                }
            }
        }
        //子弹列表创建
        if (Net.SocketService.instance.connected && uiCore.ExternalInterfaceUtils.inGame) {
            this.creatBullets.push(BulletContract);
        }
    };
    //退出
    FishGameController.sendQuitDesk = function () {
        uiCore.Application.addGameOutTime();
        DeskController.init();
        Net.GameService.send(FishGameContractType.QUIT_DESK, { PlayerID: GameData.getInstance().userData("userId") }, GameData.getInstance().userData("serverid"));
        this.clearGame();
    };
    FishGameController.onQuitDesk = function (QuitDeskRpc_response) {
        if (this.isOnGame) {
            this.gameView.quitPlayer(QuitDeskRpc_response.gamePlayerContract);
        }
    };
    //发送碰到鱼的列表
    FishGameController.sendCatchFish = function (HitFishContract) {
        // if (HitFishContract.FishId == 0){
        // }
        this.bulletHitFishs.push(HitFishContract);
    };
    //玩家锁定鱼的消息
    FishGameController.onLockFish = function (LockFishRpc_response) {
        if (this.isOnGame) {
            this.gameView.setLockFish(LockFishRpc_response);
        }
    };
    //接收机器人打鱼倍率
    FishGameController.GetRobotHitFishOdds = function (odds, SeatNo) {
        if (this.isOnGame) {
            this.gameView.RootGetHitFish(odds, SeatNo);
        }
    };
    //子弹消息
    FishGameController.onCreateBullet = function (CreateBullet_response) {
        if (this.isOnGame) {
            this.gameView.createBullet(CreateBullet_response);
        }
    };
    FishGameController.onCannon = function (CannonRpc_response) {
        if (this.isOnGame) {
            this.gameView.setCannonGen(CannonRpc_response);
        }
    };
    FishGameController.onRobotAgent = function (RobotRpc_response) {
        if (this.isOnGame) {
            this.gameView.setRobot(RobotRpc_response);
        }
    };
    //结算请求
    FishGameController.sendCatchFishBalance = function () {
        Net.GameService.send(FishGameContractType.CATCH_FISH_RECORD, {}, GameData.getInstance().userData("serverid"));
    };
    //向服务器发送玩家锁定鱼的消息
    FishGameController.sendLockFish = function (lockfish) {
        if (this.isOnGame) {
            Net.GameService.send(FishGameContractType.LOCK_FISH, lockfish, GameData.getInstance().userData("serverid"));
        }
    };
    FishGameController.clearGame = function () {
        if (this.gameView) {
            if (this.showExitTipTimer) {
                this.showExitTipTimer.stop();
                this.showExitTipTimer.removeEventListener(egret.TimerEvent.TIMER, this.ExitTipTimer, this);
            }
            // this.gameView.removeAllFishs();
            this.gameView.isInFishArray = false;
            // this.gameView.resetPlayerInfo();
            FishnetPool.Dispose();
            this.currentDesk = null;
            this.currentDeskisOnGame = false;
            this.isOnGame = false;
            this.isLoadFishGameRoot = false;
            this.gameView.Destroy();
            this.gameView = null;
        }
    };
    FishGameController.currentDeskisOnGame = false;
    FishGameController.isLoadFishGameRoot = false;
    FishGameController.ServerCurState = 0; // 算法服务器状态0:断开,1:连接正常
    FishGameController.ServerCurStateTwo = 0; // 服务器状态0:断开(重连状态),1:连接正常
    FishGameController.noOperateTime = 0; //长时间不发射子弹退出
    FishGameController.tipslabel = 0;
    FishGameController.creatBullets = []; //子弹列表
    FishGameController.bulletHitFishs = [];
    FishGameController.Audios = {
        "1": "voice1",
        "2": "voice2",
        "3": "voice3",
        "4": "voice4",
        "5": "voice5",
        "6": "voice6",
        "7": "voice7",
        "8": "voice8",
        "9": "voice9",
        "10": "voice10",
        "11": "voice11",
        "12": "voice13",
        "13": "Wave",
        "14": "HitCoin",
        "15": "BG0_1",
        "16": "BG0_2",
        "17": "BG0_3",
        "19": "net1",
        "20": "net2",
        "21": "pao1",
        "22": "pao2",
    };
    return FishGameController;
}());
__reflect(FishGameController.prototype, "FishGameController");
//# sourceMappingURL=FishGameController.js.map