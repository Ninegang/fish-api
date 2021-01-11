class DeskSceneView extends uiCore.Scene{
	
	public sharedHeader: SharedSceneView;
	private btnDeskRoomName: uiCore.Button;
	private deskListUI: Map<SingleDesk>;
	private deskListCount: number;
	private scroller: eui.Scroller;
	private btnDeskNext: uiCore.Button;
	private btnDeskLast: uiCore.Button;
	private mScrollRect: egret.Rectangle;
	private isRolling: boolean = false;
	private buttonGameStart: uiCore.Button;
	private fingerImage:eui.Image;
	private kDesShowDeskMaxWidth = 1280;
	private startX:number;
	public constructor() {
		super();
		this.skinName = "DeskSceneSkin";
		this.kDesShowDeskMaxWidth=Math.floor(uiCore.Application.app.stage.stageWidth*0.85);
		this.scroller = new eui.Scroller();
		this.scroller.width = this.kDesShowDeskMaxWidth;
		this.scroller.verticalCenter = 65;
		this.scroller.horizontalCenter = 0;
		this.scroller.bounces = false;
		this.addChildAt(this.scroller,1);
		this.btnDeskNext.right=uiCore.Application.app.stage.stageWidth*0.05;
		this.btnDeskLast.left=uiCore.Application.app.stage.stageWidth*0.05;
		this.scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.deskStartThouchEvent,this);
		this.scroller.addEventListener(egret.TouchEvent.TOUCH_END,this.deskEndThouchEvent,this);
	}

	public deskStartThouchEvent(evn: egret.TouchEvent){
		this.startX=evn.stageX;
	}

	public deskEndThouchEvent(evn: egret.TouchEvent){
		if(this.startX!=null){
			//向左
			if(this.startX-evn.stageX>50){
				if((this.deskListCount/2-1)*this.kDesShowDeskMaxWidth-this.kDesShowDeskMaxWidth>=this.scroller.viewport.scrollH){
					this.onBtnDeskNextClick();
				}
			}else if(this.startX-evn.stageX<-50){//向右
				if(this.scroller.viewport.scrollH>0){
					this.onBtnDeskLastClick();
				}
			}
		}
	}

	public start(): void {
		this.initEvent();
		this.sharedHeader.setBackScene(RoomSceneView, this.sendExitGame);
		this.deskListUI = {};
		GameData.getInstance().setUserData("position", 2);
		this.UserDataChange();
		if (DeskController.RoomIdx == 0) {
			this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(8);
		}else if (DeskController.RoomIdx == 1) {
			this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(9);
		}else {
			this.btnDeskRoomName.label = uiCore.LangUtils.getMsgById(10);
		}
		egret.Tween.get( this.fingerImage, { loop:true} ).to({bottom:this.fingerImage.bottom + 10}, 500).to({bottom:this.fingerImage.bottom}, 500);
	}
	//退出游戏
	public sendExitGame():void{
		Net.GameService.send(HallSocketType.ExitGame,{},0);
	}
	public UserDataChange():void{
		this.sharedHeader.UserDataChange();
	}
	public onButtonGameStartClick():void{
		uiCore.Application.addLoadding();
		if (FishGameManager.checkFishConfig()) {
            FishGameManager.initFishManager(uiCore.ZipManager.ZIP_CONFIG.projectConfig);
        }
		var JoinDeskContract = {
			DeskID:1, 
			SeatNo:0,
			JoinMode:0
		};
        DeskController.onJoinDesk(JoinDeskContract);
		uiCore.SoundByteManager.playMusic("BG0_3");
	}
	public initEvent() {
		this.btnDeskNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskNextClick, this);
		this.btnDeskLast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskLastClick, this);
		this.buttonGameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGameStartClick, this);
    }

	public removeEvent() {
		this.btnDeskNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskNextClick, this);
		this.btnDeskLast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDeskLastClick, this);
		this.scroller.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.deskStartThouchEvent,this);
		this.scroller.removeEventListener(egret.TouchEvent.TOUCH_END,this.deskEndThouchEvent,this);
		this.buttonGameStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGameStartClick, this);
		egret.Tween.removeTweens(this.scroller.viewport);
    }

    public onDestroy() {
		egret.Tween.removeTweens(this.fingerImage);
        this.removeEvent();
		super.onDestroy();
    }

	public someoneJoinSeat(deskID, contract) {
		// console.log("Some one join Desk, ID: " + deskID + ", Seat: " 
		// + contract.SeatNo + ", Player: " + contract.userName); 

		var curDesk = this.deskListUI[deskID];
		if (curDesk == null) {
			console.log("The desk is null, DeskID: " + deskID);
			return;
		}

		curDesk.onPlayerSeatStatus(contract.SeatNo, true, contract);
	}

	public someoneLeaveSeat(deskID, contract) {
		// console.log("Some one Leave Desk, ID: " + deskID + ", Seat: " 
		// + contract.SeatNo + ", Player: " + contract.userName); 

		var curDesk = this.deskListUI[deskID];

		curDesk.onPlayerSeatStatus(contract.SeatNo, false, contract);
	}

	public createDesk(contractes) {
		var group = new eui.Group();
		contractes.forEach(element => {
			var desk = new SingleDesk(element.DeskID);
			desk.top = 0;
			desk.x = (element.DeskID - 1) * desk.width;
			group.addChild(desk);
			this.deskListUI[element.DeskID] = desk;
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
	}
	//右边按钮
	private onBtnDeskNextClick(): void {
		if (!this.isRolling) {
			this.isRolling = true;
			var tween = egret.Tween.get(this.scroller.viewport).to(
				{ scrollH: this.scroller.viewport.scrollH + this.kDesShowDeskMaxWidth, ease: egret.Ease.quadOut }, 
				500)
				.call(() => {
					if (this.scroller.viewport.scrollH + this.kDesShowDeskMaxWidth >= this.scroller.viewport.contentWidth) {
						this.btnDeskNext.alpha = 0;
						this.btnDeskNext.enabled = false;
					}
					this.btnDeskLast.alpha = 1;
					this.btnDeskLast.enabled = true;
					this.isRolling = false;
					egret.Tween.removeTweens(tween);
				});
		}
		
	}
	//左边按钮
	private onBtnDeskLastClick(): void {
		if (!this.isRolling) {
			this.isRolling = true;
			var tween = egret.Tween.get(this.scroller.viewport).to(
				{ scrollH: this.scroller.viewport.scrollH - this.kDesShowDeskMaxWidth, ease: egret.Ease.quadOut }, 
				500)
				.call(() => {
					if (this.scroller.viewport.scrollH - this.kDesShowDeskMaxWidth < 0) {
						this.btnDeskLast.alpha = 0;
						this.btnDeskLast.enabled = false;
					}
					this.btnDeskNext.alpha = 1;
					this.btnDeskNext.enabled = true;
					this.isRolling = false;
					egret.Tween.removeTweens(tween);
				});
		}
	}
}