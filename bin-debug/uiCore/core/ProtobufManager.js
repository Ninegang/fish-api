var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var ProtobufManager = (function () {
        function ProtobufManager() {
        }
        ProtobufManager.init = function (res) {
            this.sprotoCreateNew(res);
        };
        ProtobufManager.sprotoCreateNew = function (res) {
            var _this = this;
            var data = RES.getRes(res);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.file('protocol.spb').async('array').then(function (array) {
                        ProtobufManager.spObject = sproto.createNew(array);
                        _this.initReturnCallFunMap();
                    });
                });
            }
            else {
                RES.getResAsync(res, this.checkSprotoCreateNew, this);
            }
        };
        ProtobufManager.checkSprotoCreateNew = function (data, key) {
            this.sprotoCreateNew(key);
        };
        ProtobufManager.initReturnCallFunMap = function () {
            this.returnCallFunMap = {};
            this.addReturnCallFunMap(HallSocketType.LOGIN, this.callLogin);
            this.addReturnCallFunMap(HallSocketType.KICK_OUT, this.callKickOut);
            this.addReturnCallFunMap(HallSocketType.OutForServer, this.callOutForServer);
            this.addReturnCallFunMap(HallSocketType.LoginHall, this.callLoginHall);
            this.addReturnCallFunMap(HallSocketType.UserInfo, this.callUserInfo);
            this.addReturnCallFunMap(HallSocketType.LoginGame, this.callLoginGame);
            this.addReturnCallFunMap(HallSocketType.ExitGame, this.callExitGame);
            this.addReturnCallFunMap(HallSocketType.UpdateSystemMsg, this.callUpdateSystemMsg);
            this.addReturnCallFunMap(HallSocketType.UpdateDataCMD, this.callUpdateDataCMD);
            this.addReturnCallFunMap(HallSocketType.UpDownGoldState, this.callUpDownGoldState);
            this.addReturnCallFunMap(HallSocketType.UpDownGold, this.callUpDownGold);
            this.addReturnCallFunMap(HallSocketType.GameBank, this.callGameBank);
            this.addReturnCallFunMap(HallSocketType.UpDownGoldCancel, this.callUpDownGoldCancel);
            this.addReturnCallFunMap(HallSocketType.InMailMessage, this.callInMailMessage);
            this.addReturnCallFunMap(HallSocketType.InFormMessage, this.callInFormMessage);
            this.addReturnCallFunMap(HallSocketType.InMailTrueMessage, this.callInMailTrueMessage);
            this.addReturnCallFunMap(HallSocketType.MissionMessage, this.callMissionMessage);
            this.addReturnCallFunMap(HallSocketType.LimitMessage, this.callLimitMessage);
            this.addReturnCallFunMap(HallSocketType.TipsMessage, this.callTipsMessage);
            this.addReturnCallFunMap(HallSocketType.FishActivityMessage, this.callFishActivityMessage);
            this.addReturnCallFunMap(HallSocketType.HEARDBEAT, this.callHeardbeat);
            this.addReturnCallFunMap(FishGameContractType.DESK_LIST, this.callDeskList);
            this.addReturnCallFunMap(FishGameContractType.LOGIJOIN_DESKN, this.callLogijoinDeskn);
            this.addReturnCallFunMap(FishGameContractType.QUIT_DESK, this.callQuitDesk);
            //this.addReturnCallFunMap(FishGameContractType.LOAD_COMPLETE,this.callLoadComplete);
            this.addReturnCallFunMap(FishGameContractType.ROBOT_AGENT, this.callRobotAgent);
            this.addReturnCallFunMap(FishGameContractType.CREATE_BULLET, this.callCreateBullet);
            this.addReturnCallFunMap(FishGameContractType.FISH_GAME_SETTING, this.callFishGameSetting);
            this.addReturnCallFunMap(FishGameContractType.CANNON, this.callCannon);
            this.addReturnCallFunMap(FishGameContractType.LOCK_FISH, this.callLockFish);
            this.addReturnCallFunMap(FishGameContractType.BOMB_FISH, this.callBombFish);
            this.addReturnCallFunMap(FishGameContractType.CREATE_FISH, this.callCreateFish);
            this.addReturnCallFunMap(FishGameContractType.BOSS_EAT_FISH, this.callBossEatFish);
            this.addReturnCallFunMap(FishGameContractType.CATCH_FISH, this.callCatchFish);
            this.addReturnCallFunMap(FishGameContractType.CATCH_FISH_RECORD, this.callCatchFishRecord);
            //this.addReturnCallFunMap(FishGameContractType.CREATED_FISH,this.callCreatedFish);
            this.addReturnCallFunMap(FishGameContractType.CREATE_FISH_ARRAY, this.callCreateFishArray);
        };
        ProtobufManager.addReturnCallFunMap = function (type, callFun) {
            if (!this.returnCallFunMap[type]) {
                this.returnCallFunMap[type] = callFun;
            }
        };
        ProtobufManager.getReturnCallFunMap = function (type) {
            if (this.returnCallFunMap[type]) {
                return this.returnCallFunMap[type];
            }
            return null;
        };
        //登录
        ProtobufManager.callLogin = function (result) {
        };
        //踢人
        ProtobufManager.callKickOut = function (result) {
            Net.GameService.instance.socketSvc.disconnect();
            uiCore.Alert.show(uiCore.LangUtils.getMsgById(17), function () {
                uiCore.Utils.reloadPage();
            });
        };
        //算法服务器状态
        ProtobufManager.callOutForServer = function (result) {
            if (result) {
                FishGameController.onOutForServer(result);
            }
        };
        //登录大厅
        ProtobufManager.callLoginHall = function (result) {
            Heardbeat.getInstance().begin();
            if (result.LoginResultType == 1) {
                if (SceneManager.gameOpenControl == null || uiCore.Utils.checkNullObj(SceneManager.gameOpenControl) || SceneManager.OpenControl == null || SceneManager.OpenControl.length == 0) {
                    SceneManager.OpenControl();
                }
                var position = GameData.getInstance().userData("position");
                if (!position) {
                    position = 1;
                }
                if (position != 1) {
                    new RoomSceneView().JoinRoom(DeskController.RoomInfo, DeskController.RoomIdx);
                    uiCore.Application.addGameSetTime();
                }
                SceneManager.isNeetReconnect();
            }
            else if (result.LoginResultType == 9) {
                uiCore.Alert.show(uiCore.LangUtils.getMsgById(26));
            }
            else {
                var userType = GameData.getInstance().userData("UserType");
                if (userType != null && userType == 3) {
                    uiCore.Utils.reloadPage();
                }
                else {
                    net.RestConnect.RestConnectHttp();
                }
            }
        };
        // 心跳包
        ProtobufManager.callHeardbeat = function (result) {
            Heardbeat.ws_onHeartbeat();
        };
        //玩家信息
        ProtobufManager.callUserInfo = function (result) {
            if (result.UserID)
                GameData.getInstance().setUserData("userId", result.UserID);
            if (result.NickName)
                GameData.getInstance().setUserData("nickname", result.NickName);
            if (result.MoneyA >= 0)
                GameData.getInstance().setUserData("moneya", result.MoneyA);
            if (result.MoneyB >= 0)
                GameData.getInstance().setUserData("moneyb", result.MoneyB);
            if (result.BankMoneyA >= 0)
                GameData.getInstance().setUserData("bankmoneya", result.BankMoneyA);
            if (result.BankMoneyB >= 0)
                GameData.getInstance().setUserData("bankmoneyb", result.BankMoneyB);
            if (result.UserType >= 0)
                GameData.getInstance().setUserData("UserType", result.UserType);
            if (result.BankMoneyA >= 0 || result.BankMoneyB >= 0)
                GameData.getInstance().setUserData("bankgoldnum", result.BankMoneyA + result.BankMoneyB);
            if (result.MoneyA >= 0 || result.MoneyB >= 0) {
                GameData.getInstance().setUserData("gold_num", result.MoneyA + result.MoneyB);
                SceneManager.UserDataChange();
                if (FishGameController.isLoadFishGameRoot && FishGameController.gameView) {
                    if (FishGameController.gameView.thisFishGen) {
                        FishGameController.gameView.thisFishGen.setGoldNum(Number(result.MoneyA + result.MoneyB));
                    }
                }
            }
        };
        //登录具体游戏
        ProtobufManager.callLoginGame = function (result) {
            if (result) {
                FishGameController.onLogin(result);
            }
            else {
                uiCore.Application.closeLoaddingTip();
            }
        };
        //退出具体游戏
        ProtobufManager.callExitGame = function (result) {
        };
        //更新系统消息
        ProtobufManager.callUpdateSystemMsg = function (result) {
            if (result) {
                SystemMsg.ws_onSystemMsg(result.Msgs);
            }
        };
        //更新数据命令
        ProtobufManager.callUpdateDataCMD = function (result) {
        };
        //上下分状态
        ProtobufManager.callUpDownGoldState = function (result) {
        };
        //上下分
        ProtobufManager.callUpDownGold = function (result) {
        };
        //银行
        ProtobufManager.callGameBank = function (result) {
        };
        //上下分取消
        ProtobufManager.callUpDownGoldCancel = function (result) {
        };
        //站内信
        ProtobufManager.callInMailMessage = function (result) {
        };
        //系统公告
        ProtobufManager.callInFormMessage = function (result) {
        };
        //是否阅读
        ProtobufManager.callInMailTrueMessage = function (result) {
        };
        //任务
        ProtobufManager.callMissionMessage = function (result) {
        };
        //幸运报喜
        ProtobufManager.callLimitMessage = function (result) {
        };
        //提示消息
        ProtobufManager.callFishActivityMessage = function (result) {
        };
        //桌子返回
        ProtobufManager.callDeskList = function (result) {
            if (result && result.ListDeskContract.length > 0) {
                uiCore.Application.hideGameOut();
                DeskController.ws_onDeskList(result);
            }
            else if (uiCore.Application.gameOutIndex != null) {
                uiCore.Application.showGameOut();
            }
            else {
                uiCore.Application.closeLoaddingTip();
            }
        };
        //加入桌子
        ProtobufManager.callLogijoinDeskn = function (result) {
            if (result) {
                DeskController.ws_onSomeoneJoinDesk(result);
            }
            else if (FishGameController.isOnGame) {
                uiCore.Application.openGameTips();
            }
            else {
                uiCore.Application.closeLoaddingTip();
            }
        };
        //退出桌子
        ProtobufManager.callQuitDesk = function (result) {
            if (result) {
                DeskController.ws_onSomeoneLeaveDesk(result);
                FishGameController.onQuitDesk(result);
            }
        };
        // //客户端准备完成
        // public static callLoadComplete(result:any):void{
        // }
        //座位号
        ProtobufManager.callRobotAgent = function (result) {
            if (result) {
                FishGameController.onRobotAgent(result);
            }
        };
        //创建子弹
        ProtobufManager.callCreateBullet = function (result) {
            if (result && uiCore.ExternalInterfaceUtils.inGame) {
                FishGameController.onCreateBullet(result);
            }
        };
        //第一次进入钓场算法服务器有没有断开
        ProtobufManager.callFishGameSetting = function (result) {
            // alert("callFishGameSetting()"+result);
            if (result) {
                FishGameController.onFishGameSetting(result);
            }
            else {
                uiCore.Application.openGameTips();
            }
        };
        //创建炮
        ProtobufManager.callCannon = function (result) {
            if (result) {
                FishGameController.onCannon(result);
            }
        };
        //玩家锁定鱼的消息
        ProtobufManager.callLockFish = function (result) {
            if (result && uiCore.ExternalInterfaceUtils.inGame) {
                FishGameController.onLockFish(result);
            }
        };
        //炸弹鱼
        ProtobufManager.callBombFish = function (result) {
            if (result && uiCore.ExternalInterfaceUtils.inGame) {
                FishGameController.onBombFish(result);
            }
        };
        ProtobufManager.callTipsMessage = function (result) {
        };
        //接收创建鱼的消息
        ProtobufManager.callCreateFish = function (result) {
            if (result && uiCore.ExternalInterfaceUtils.inGame) {
                FishGameController.onCreateFish(result);
            }
        };
        //打中鱼的列表
        ProtobufManager.callBossEatFish = function (result) {
        };
        //打中鱼的列表
        ProtobufManager.callCatchFish = function (result) {
            if (result) {
                FishGameController.onCatchFish(result);
            }
        };
        //请求捕鱼结算
        ProtobufManager.callCatchFishRecord = function (result) {
            if (result && FishGameController.getGameView()) {
                FishGameController.getGameView().jiesuanView.getCathFishNum(result);
            }
        };
        // //创建的鱼
        // public static callCreatedFish(result:any):void{
        // }
        //鱼阵
        ProtobufManager.callCreateFishArray = function (result) {
            if (result && uiCore.ExternalInterfaceUtils.inGame) {
                FishGameController.onCreateFishArray(result);
            }
        };
        return ProtobufManager;
    }());
    uiCore.ProtobufManager = ProtobufManager;
    __reflect(ProtobufManager.prototype, "uiCore.ProtobufManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ProtobufManager.js.map