class DeskController {
	public static DeskScene: DeskSceneView;
	public static RoomInfo: any;
	public static RoomIdx: number;
	private static DeskPlayers: Map<Map<any>>;

	/*********************************************************************************************************/
	public static init():void {
		if (this.DeskScene == null) {
			this.DeskScene = new DeskSceneView();
			this.DeskPlayers = {};
		}
	}

	public static destroy() {
		this.DeskScene = null;
		this.DeskPlayers = null;
	}

	/*********************************************************************************************************/
	public static ws_onDeskList(res: any):void{
		uiCore.Application.closeSetTime();
		if (FishGameController.getGameView() == null) {
			if(this.DeskScene){
				SceneManager.changeSceneView(this.DeskScene, false);
				this.DeskScene.createDesk(res.ListDeskContract);
			}
		}
		res.ListDeskContract.forEach(desk => {
			if (desk.ListGamePlayerContract != null) {
				desk.ListGamePlayerContract.forEach(element => {
					this.someoneJoinDesk(desk.DeskID, element);
				});
			}
		});
    }

	public static ws_onSomeoneJoinDesk(res: any) {
		uiCore.Application.closeSetTime();
		if(res.gamePlayerContract.userId!=GameData.getInstance().userData("userId")){
			// somebody join the game
			this.someoneJoinDesk(res.gamePlayerContract.deskId, res.gamePlayerContract);
		}
		//else myself join game	
		FishGameController.onJoinDesk(res);
	}

	public static ws_onSomeoneLeaveDesk(res: any) {
		this.someoneLeaveDesk(res.gamePlayerContract.deskId, res.gamePlayerContract);
	}
	public static onJoinDesk(req) {
		FishGameController.sendJoinDesk(req, 6);
	}
	/*********************************************************************************************************/
	private static someoneJoinDesk(deskID, contract) {
		if (this.DeskPlayers != null && (this.DeskPlayers[deskID] == null || this.DeskPlayers[deskID][contract.SeatNo] == null)) {
			var seatDic: Map<any>;
			if (this.DeskPlayers[deskID] == null) seatDic = {};
			else seatDic = this.DeskPlayers[deskID];

			seatDic[contract.SeatNo] = contract;
			this.DeskPlayers[deskID] = seatDic;
			this.DeskScene.someoneJoinSeat(deskID, contract);
		} else {
			// the desk is not null
		}
	}
	private static someoneLeaveDesk(deskID, contract) {
		if (this.DeskPlayers != null && this.DeskPlayers[deskID] != null && this.DeskPlayers[deskID][contract.SeatNo] != null) {
			var seatDic: Map<any> = this.DeskPlayers[deskID];
			seatDic[contract.SeatNo] = null;
			this.DeskPlayers[deskID] = seatDic;
			this.DeskScene.someoneLeaveSeat(deskID, contract);
		}else {
			// the desk is null
		}
	}
}