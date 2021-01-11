namespace uiCore {
	import Map = egret.MapLike;
	export class ProtobufManager {
		public static spObject:any;
		private static returnCallFunMap:Map<(result:any) => void>;
		public constructor() {

		}
		public static init(res:string):void{
			this.sprotoCreateNew(res);
		}
		private static sprotoCreateNew(res:string){
			var data=RES.getRes(res);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.file('protocol.spb').async('array').then(array => {
						ProtobufManager.spObject=sproto.createNew(array);
						this.initReturnCallFunMap();
					})
				});
			}else{
				RES.getResAsync(res, this.checkSprotoCreateNew, this);
			}
		}
		private static checkSprotoCreateNew(data:any,key:string){
			this.sprotoCreateNew(key);
		}
		private static initReturnCallFunMap():void{
			this.returnCallFunMap={};
			this.addReturnCallFunMap(HallSocketType.LOGIN,this.callLogin);
			this.addReturnCallFunMap(HallSocketType.KICK_OUT,this.callKickOut);
			this.addReturnCallFunMap(HallSocketType.OutForServer,this.callOutForServer);
			this.addReturnCallFunMap(HallSocketType.LoginHall,this.callLoginHall);
			this.addReturnCallFunMap(HallSocketType.UserInfo,this.callUserInfo);
			this.addReturnCallFunMap(HallSocketType.LoginGame,this.callLoginGame);
			this.addReturnCallFunMap(HallSocketType.ExitGame,this.callExitGame);
			this.addReturnCallFunMap(HallSocketType.UpdateSystemMsg,this.callUpdateSystemMsg);
			this.addReturnCallFunMap(HallSocketType.UpdateDataCMD,this.callUpdateDataCMD);
			this.addReturnCallFunMap(HallSocketType.UpDownGoldState,this.callUpDownGoldState);
			this.addReturnCallFunMap(HallSocketType.UpDownGold,this.callUpDownGold);
			this.addReturnCallFunMap(HallSocketType.GameBank,this.callGameBank);
			this.addReturnCallFunMap(HallSocketType.UpDownGoldCancel,this.callUpDownGoldCancel);
			this.addReturnCallFunMap(HallSocketType.InMailMessage,this.callInMailMessage);
			this.addReturnCallFunMap(HallSocketType.InFormMessage,this.callInFormMessage);
			this.addReturnCallFunMap(HallSocketType.InMailTrueMessage,this.callInMailTrueMessage);
			this.addReturnCallFunMap(HallSocketType.MissionMessage,this.callMissionMessage);
			this.addReturnCallFunMap(HallSocketType.LimitMessage,this.callLimitMessage);
			this.addReturnCallFunMap(HallSocketType.TipsMessage,this.callTipsMessage);
			this.addReturnCallFunMap(HallSocketType.FishActivityMessage,this.callFishActivityMessage);
			this.addReturnCallFunMap(HallSocketType.HEARDBEAT,this.callHeardbeat);
			this.addReturnCallFunMap(FishGameContractType.DESK_LIST,this.callDeskList);
			this.addReturnCallFunMap(FishGameContractType.LOGIJOIN_DESKN,this.callLogijoinDeskn);
			this.addReturnCallFunMap(FishGameContractType.QUIT_DESK,this.callQuitDesk);
			//this.addReturnCallFunMap(FishGameContractType.LOAD_COMPLETE,this.callLoadComplete);
			this.addReturnCallFunMap(FishGameContractType.ROBOT_AGENT,this.callRobotAgent);
			this.addReturnCallFunMap(FishGameContractType.CREATE_BULLET,this.callCreateBullet);
			this.addReturnCallFunMap(FishGameContractType.FISH_GAME_SETTING,this.callFishGameSetting);
			this.addReturnCallFunMap(FishGameContractType.CANNON,this.callCannon);
			this.addReturnCallFunMap(FishGameContractType.LOCK_FISH,this.callLockFish);
			this.addReturnCallFunMap(FishGameContractType.BOMB_FISH,this.callBombFish);
			this.addReturnCallFunMap(FishGameContractType.CREATE_FISH,this.callCreateFish);
			this.addReturnCallFunMap(FishGameContractType.BOSS_EAT_FISH,this.callBossEatFish);
			this.addReturnCallFunMap(FishGameContractType.CATCH_FISH,this.callCatchFish);
			this.addReturnCallFunMap(FishGameContractType.CATCH_FISH_RECORD,this.callCatchFishRecord);
			//this.addReturnCallFunMap(FishGameContractType.CREATED_FISH,this.callCreatedFish);
			this.addReturnCallFunMap(FishGameContractType.CREATE_FISH_ARRAY,this.callCreateFishArray);
		}
		
		private static addReturnCallFunMap(type:number,callFun:(result:any) => void):void{
			if(!this.returnCallFunMap[type]){
				this.returnCallFunMap[type]=callFun;
			}
		}

		public static getReturnCallFunMap(type:number):(result:any) => void{
			if(this.returnCallFunMap[type]){
				return this.returnCallFunMap[type];
			}
			return null;
		}
		//登录
		public static callLogin(result:any):void{

		}
		//踢人
		public static callKickOut(result: any): void {
			Net.GameService.instance.socketSvc.disconnect();
			uiCore.Alert.show(uiCore.LangUtils.getMsgById(17),function(){
				uiCore.Utils.reloadPage();
			}); 
		}
		//算法服务器状态
		public static callOutForServer(result:any):void{
			if (result){
				FishGameController.onOutForServer(result);
			}
		}
		//登录大厅
		public static callLoginHall(result:any):void{ 
			
			Heardbeat.getInstance().begin();
			if(result.LoginResultType==1){
				if(SceneManager.gameOpenControl==null||uiCore.Utils.checkNullObj(SceneManager.gameOpenControl)||SceneManager.OpenControl==null||SceneManager.OpenControl.length==0){
					SceneManager.OpenControl();
				}
				let position:number=GameData.getInstance().userData("position");
				if(!position){
					position=1;
				}
				if(position!=1){
					new RoomSceneView().JoinRoom(DeskController.RoomInfo, DeskController.RoomIdx);
					uiCore.Application.addGameSetTime();
				}
				SceneManager.isNeetReconnect();
			}else if(result.LoginResultType==9){
				uiCore.Alert.show(uiCore.LangUtils.getMsgById(26));
			}else{
				let userType= GameData.getInstance().userData("UserType");
				if(userType!=null&&userType==3){
					uiCore.Utils.reloadPage();
				}else{
					net.RestConnect.RestConnectHttp();
				}	
			}
		}
		// 心跳包
		public static callHeardbeat(result:any):void{
			Heardbeat.ws_onHeartbeat();
		}
		//玩家信息
		public static callUserInfo(result:any):void{
			if (result.UserID)
				GameData.getInstance().setUserData("userId",result.UserID); 
			if (result.NickName)
				GameData.getInstance().setUserData("nickname",result.NickName);  
			if (result.MoneyA>=0)
				GameData.getInstance().setUserData("moneya",result.MoneyA);
			if (result.MoneyB>=0)
				GameData.getInstance().setUserData("moneyb",result.MoneyB);
			if (result.BankMoneyA>=0)
				GameData.getInstance().setUserData("bankmoneya",result.BankMoneyA);
			if (result.BankMoneyB>=0)
				GameData.getInstance().setUserData("bankmoneyb",result.BankMoneyB);
			if(result.UserType>=0)
				GameData.getInstance().setUserData("UserType",result.UserType);
			if (result.BankMoneyA>=0||result.BankMoneyB>=0)
				GameData.getInstance().setUserData("bankgoldnum",result.BankMoneyA+result.BankMoneyB);			
			if (result.MoneyA>=0||result.MoneyB>=0){
				GameData.getInstance().setUserData("gold_num",result.MoneyA+result.MoneyB);
				SceneManager.UserDataChange();
				if(FishGameController.isLoadFishGameRoot&&FishGameController.gameView){
					if(FishGameController.gameView.thisFishGen){
						FishGameController.gameView.thisFishGen.setGoldNum(Number(result.MoneyA+result.MoneyB));
					}
				}
			}	
		}
		//登录具体游戏
		public static callLoginGame(result:any):void{
			if (result){				 
				FishGameController.onLogin(result);
			}else{
				uiCore.Application.closeLoaddingTip();
			}
		}
		//退出具体游戏
		public static callExitGame(result:any):void{
			
		}
		//更新系统消息
		public static callUpdateSystemMsg(result: any): void {
			if (result) {
				SystemMsg.ws_onSystemMsg(result.Msgs);
			}
		}
		//更新数据命令
		public static callUpdateDataCMD(result:any):void{

		}
		//上下分状态
		public static callUpDownGoldState(result:any):void{

		}
		//上下分
		public static callUpDownGold(result:any):void{

		}
		//银行
		public static callGameBank(result:any):void{

		}
		//上下分取消
		public static callUpDownGoldCancel(result:any):void{

		}
		//站内信
		public static callInMailMessage(result:any):void{

		}
		//系统公告
		public static callInFormMessage(result:any):void{

		}
		//是否阅读
		public static callInMailTrueMessage(result:any):void{

		}
		//任务
		public static callMissionMessage(result:any):void{

		}
		//幸运报喜
		public static callLimitMessage(result:any):void{

		} 
		//提示消息
		public static callFishActivityMessage(result:any):void{

		}
		//桌子返回
		public static callDeskList(result:any):void{
			if (result && result.ListDeskContract.length > 0){
				uiCore.Application.hideGameOut();
				DeskController.ws_onDeskList(result);
			}else if(uiCore.Application.gameOutIndex!=null){
				uiCore.Application.showGameOut();
			}else{
				uiCore.Application.closeLoaddingTip();
			}
		}
		//加入桌子
		public static callLogijoinDeskn(result:any):void{
			if (result){
				DeskController.ws_onSomeoneJoinDesk(result);	
			}else if(FishGameController.isOnGame){
				uiCore.Application.openGameTips();
			}else{
				uiCore.Application.closeLoaddingTip();
			}
		}
		//退出桌子
		public static callQuitDesk(result:any):void{
			if (result){
				DeskController.ws_onSomeoneLeaveDesk(result);
				FishGameController.onQuitDesk(result);
			}
		}
		// //客户端准备完成
		// public static callLoadComplete(result:any):void{

		// }
		//座位号
		public static callRobotAgent(result:any):void{
			if (result){
				FishGameController.onRobotAgent(result);
			} 
		}
		//创建子弹
		public static callCreateBullet(result:any):void{
			if (result&&uiCore.ExternalInterfaceUtils.inGame){
				FishGameController.onCreateBullet(result);
			}
		}
		//第一次进入钓场算法服务器有没有断开
		public static callFishGameSetting(result:any):void{
			// alert("callFishGameSetting()"+result);
			if (result){
				FishGameController.onFishGameSetting(result);
			}else{
				uiCore.Application.openGameTips(); 
			}  
		}
		//创建炮
		public static callCannon(result:any):void{
			if (result){
				FishGameController.onCannon(result);
			}			
		}
		//玩家锁定鱼的消息
		public static callLockFish(result:any):void{
			if(result&&uiCore.ExternalInterfaceUtils.inGame){
				FishGameController.onLockFish(result);
			}
		}
		//炸弹鱼
		public static callBombFish(result:any):void{
			if (result&&uiCore.ExternalInterfaceUtils.inGame){
				FishGameController.onBombFish(result); 
			} 
		}
		
		public static callTipsMessage(result:any):void{
		
		}
		//接收创建鱼的消息
		public static callCreateFish(result:any):void{
			if (result&&uiCore.ExternalInterfaceUtils.inGame){
				FishGameController.onCreateFish(result);
			} 
		}
		//打中鱼的列表
		public static callBossEatFish(result:any):void{
			
		}
		
		//打中鱼的列表
		public static callCatchFish(result:any):void{
			if (result){
				FishGameController.onCatchFish(result); 
			}
		}
		//请求捕鱼结算
		public static callCatchFishRecord(result:any):void{
			if (result&&FishGameController.getGameView()) {
				FishGameController.getGameView().jiesuanView.getCathFishNum(result);
			} 
		}
		// //创建的鱼
		// public static callCreatedFish(result:any):void{

		// }
		//鱼阵
		public static callCreateFishArray(result:any):void{
			if (result&&uiCore.ExternalInterfaceUtils.inGame){
 				FishGameController.onCreateFishArray(result);
			} 
		}
	}
}