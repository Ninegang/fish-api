class RoomSceneView extends uiCore.Scene{
	
	public btnRoomLow: uiCore.Button;
	public btnRoomMiddle: uiCore.Button;
	public btnRoomHigh: uiCore.Button;
	public sharedHeader: SharedSceneView;

	public roomLowAdmittance: eui.Label;
	public roomMiddleAdmittance: eui.Label;
	public roomHighAdmittance: eui.Label;

	public roomLowGen: egret.BitmapText;
	public roomMiddleGen: egret.BitmapText;
	public roomHighGen: egret.BitmapText;
	public constructor() {
		super();
		this.skinName = "RoomSceneSkin";
	}

	public start(): void {
		this.sharedHeader.setBtnGobackState(false);
		this.initEvent();
		uiCore.SoundByteManager.playMusic("BgMusic");
		// 设置返回的页面
		if(GameData.getInstance().userData("UserType")!=3){
			this.sharedHeader.setBackScene(MainSceneView,this.sendExitGame);
		}
		GameData.getInstance().setUserData("position", 1);
		this.initRoom();
	}

	public initRoom():void{
		var serverInfo = SceneManager.getGameInfo(uiCore.Application.currGameId);
		if(serverInfo){
			var server0 = serverInfo[0].Min;
			var server1 = serverInfo[1].Min;
			var server2 = serverInfo[2].Min;
			var genBei0Array:string[] = String(serverInfo[0].Times).split(",");
			var genBei1Array:string[] = String(serverInfo[1].Times).split(",");
			var genBei2Array:string[] = String(serverInfo[2].Times).split(",");
			if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
				server0 = (server0/SceneManager.exchangeValue).toFixed(2);
				server1 = (server1/SceneManager.exchangeValue).toFixed(2);
				server2 = (server2/SceneManager.exchangeValue).toFixed(2);
				genBei0Array[0]=(Number(genBei0Array[0])/SceneManager.exchangeValue).toFixed(2);
				genBei0Array[1]=(Number(genBei0Array[1])/SceneManager.exchangeValue).toFixed(2);
				genBei1Array[0]=(Number(genBei1Array[0])/SceneManager.exchangeValue).toFixed(2);
				genBei1Array[1]=(Number(genBei1Array[1])/SceneManager.exchangeValue).toFixed(2);
				genBei2Array[0]=(Number(genBei2Array[0])/SceneManager.exchangeValue).toFixed(2);
				genBei2Array[1]=(Number(genBei2Array[1])/SceneManager.exchangeValue).toFixed(2);
			}
			this.roomLowAdmittance.text = server0;
			this.roomMiddleAdmittance.text = server1;
			this.roomHighAdmittance.text = server2;
			this.roomLowGen.text = genBei0Array[0]+"~"+genBei0Array[1];
			this.roomMiddleGen.text = genBei1Array[0]+"~"+genBei1Array[1];
			this.roomHighGen.text = genBei2Array[0]+"~"+genBei2Array[1];
			this.UserDataChange();
		}
	}
	public initEvent() {
        this.btnRoomLow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinLowRoom, this);
		this.btnRoomMiddle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinMiddleRoom, this);
		this.btnRoomHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHighRoom, this);
    }
	public UserDataChange():void{
		this.sharedHeader.UserDataChange();
	}

	//进入房间
	public JoinRoom(roomInfo, idx):void{
		if (roomInfo.IsFreeJoin==false){
			let MoneyA = GameData.getInstance().userData("moneya");
			let MoneyB = GameData.getInstance().userData("moneyb");
			let Gold_num = GameData.getInstance().userData("gold_num");
			if (MoneyA==0){
				uiCore.Application.removeLoadding();
				uiCore.Alert.show(uiCore.LangUtils.getMsgById(6));
				return;
			}
			if (MoneyA<roomInfo.Min&&MoneyB>0){
				uiCore.Application.removeLoadding();
				uiCore.Alert.show(uiCore.LangUtils.getMsgById(6));
				return;
			}
			if(Gold_num<roomInfo.Min){
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
	}
	//退出游戏
	public sendExitGame():void{
		Net.GameService.send(HallSocketType.ExitGame,{},0);
	} 	 

	public readyJoin(gameID: number):any {
		return SceneManager.getGameInfo(gameID);
	}
	public onJoinLowRoom():void{
		this.onJoinRoom(0);
	}
	public onJoinMiddleRoom():void{
		this.onJoinRoom(1);
	}
	public onJoinHighRoom():void{
		this.onJoinRoom(2);
	}

	private onJoinRoom(roomId:number):void{
		uiCore.Application.addLoadding();
		let room = this.readyJoin(uiCore.Application.currGameId);
		if(room){
			this.JoinRoom(room[roomId], roomId);
		}else{
			uiCore.Application.closeLoaddingTip();
		}
	}
	
	public removeEvent() {
        this.btnRoomLow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinLowRoom, this);
		this.btnRoomMiddle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinMiddleRoom, this);
		this.btnRoomHigh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHighRoom, this);
    }

    public onDestroy() {
        this.removeEvent();
		super.onDestroy();
    }
}