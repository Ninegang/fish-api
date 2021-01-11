class Fish extends eui.Group{
	public isRunning: boolean;
	public canLock: boolean;
	public isFishArray: boolean;
	public isFishFont: boolean;
	public FishTag: number;
	public FishId: number;
	public fishInfo: any;
	public fishtype: number;
	public isMutiFish: boolean;
	public fishSet: any;
	public lifeTime: number;
	public speed: number;
	public isFreeGroup: boolean;
	public fishPath: FishPath;

	public constructor(fishSet:any,isInitialization:boolean=true) {
		super();
		if(isInitialization){
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFish, this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedFish, this);
			this.fishPath = new FishPath(this);
			this.isRunning = true;
			this.canLock = true; 
			this.fishSet=fishSet;
		}
		// this.childObjs = new Array<Fish>();
		// this.childActs = new Array<Fish>();
	}
	private onRemovedFish(event: egret.Event){
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFish, this);
		if(this.hasEventListener(egret.Event.ENTER_FRAME)){
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		this.removeChildren();
	}
	private onAddedFish(event: egret.Event){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedFish, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}

	public update():void{
		// let startTime:number=egret.getTimer();
		this.fishPath.update();
		// var diffTime:number=egret.getTimer()-startTime;
		// if(diffTime>10){
		// 	console.log("Fish:"+this.FishTag+":"+diffTime);
		// }
	}

	public OnPress(){	 
		if (Number(this.fishInfo.FishId)<=uiCore.Application.lockminfish){
			if(FishGameController.getGameView().thisFishGen.lockFish){
				FishGameController.getGameView().thisFishGen.setLockFish(null);
			}
		}else if(Number(this.fishInfo.FishId)>uiCore.Application.lockminfish){
			FishGameController.getGameView().thisFishGen.setLockFish(this);
		}
		FishGameController.getGameView().onPress();	 
	}
	//isPlay是ture开   false关
	public playOrStopMC(isPlay:boolean):void{
		if(this.numChildren>0){
			for(var i=0;i<this.numChildren;i++){
				let mc:egret.MovieClip=<egret.MovieClip>this.getChildAt(i);
				if(isPlay){
					mc.gotoAndPlay("swimming", -1);
				}else{
					if(mc.isPlaying){
						mc.stop();
					}
				}
			}
		}
	}
	public initInfo(fishInfo: any): void {
		this.canLock = true;
		this.isRunning = true;
		this.playOrStopMC(true);
		this.isFishArray = fishInfo.isFishArray;
		this.isFishFont = fishInfo.isFishFont;
		this.FishTag = fishInfo.FishTag;
		this.fishInfo = fishInfo;
		this.fishtype = this.fishSet.type;
		this.isMutiFish = this.fishSet.isMutiFish;
		this.alpha=1;
		this.visible=true;
		this.scaleX=1;
		this.scaleY=1;
		// if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish) {//组合鱼进来

		// }
		// if (this.fishtype == 3 || this.isMutiFish) {//组合鱼进来
		// 	this.isBoss = true;
		// } else {
		// 	this.isBoss = false;
		// }
		this.lifeTime = fishInfo.lifeTime;
		if (!this.isFishFont) {
			if (this.isFishArray) {
				this.setGroupPath(fishInfo);
			} else {
				this.setPath(fishInfo);
			}
			this.fishPath.fixedScreen = fishInfo.FixedScreen || 0;
		}
		this.fishPath.IsCanDown = this.fishSet.isCanDown;		 
	}
	private setGroupPath(fishInfo: any): void {
		this.speed = fishInfo.Speed;
		this.lifeTime = 0;
		if (fishInfo.LifeTime != undefined && fishInfo.LifeTime != null) {
			this.lifeTime = fishInfo.LifeTime * 0.001;
		}
		if (fishInfo.FishDelay != undefined && fishInfo.FishDelay != null) {
			this.lifeTime = this.lifeTime - fishInfo.FishDelay * 0.001;
		}
		let roat: number = fishInfo.Roat != undefined && fishInfo.Roat != null && fishInfo.Roat / 180 * Math.PI || 0;
		if (FishGameController.getGameView().isUpSideDown) {
			roat = roat + Math.PI;
		}
		this.fishPath.setGroupPath(fishInfo.FishWay, this.lifeTime, roat, this.speed, FishGameController.getGameView().isUpSideDown);
	}
	private setPath(fishInfo: any): void {
		this.speed = this.fishSet.move_speed * 2;
		this.lifeTime = 0;
		if (fishInfo.LifeTime != undefined && fishInfo.LifeTime != null) {
			this.lifeTime = fishInfo.LifeTime * 0.001;
		}
		let roat: number = fishInfo.Roat / 180 * Math.PI || 0;
		if (FishGameController.getGameView().isUpSideDown) {
			roat = roat + Math.PI;
		}
		this.isFreeGroup = false;
		if (fishInfo.FishDelay != undefined && fishInfo.FishDelay != null) {
			this.lifeTime = this.lifeTime - fishInfo.FishDelay * 0.001;
			if (fishInfo.FishId == 1 && fishInfo.FishDelay == 0) {
				this.isFreeGroup = true;
			}
		}
		this.fishPath.setPath(fishInfo.FishWay, this.lifeTime, this.isFreeGroup, roat, this.speed);
		if (this.fishSet.tweens) {
			let tweens: Array<any> = this.fishSet.tweens;
			if (tweens.length > 0) {
				for (var i = 0; i < tweens.length; i++) {
					this.fishPath.addTween(tweens[i].fps, tweens[i].frames, tweens[i].weight, tweens[i].eases, tweens[i].trans);
				}
			}
			this.fishPath.setTween();
		}
	}
	public FixedScreen(fixedTimes: number) {
		this.fishPath.fixedScreen = fixedTimes;
		this.playOrStopMC(false);
		// if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish == true) {
		// 	for (var i = 0; i < this.childActs.length; i++) {
		// 		this.childActs[i].gameObject.stop();
		// 	}
		// }
	}
	public FixedScreenEnd() {
		this.fishPath.fixedScreen = 0;
		this.playOrStopMC(true);
		// if (this.fishtype == 3 || this.fishtype == 4 || this.isMutiFish == true) {
		// 	for (var i = 0; i < this.childActs.length; i++) {
		// 		this.childActs[i].gameObject.play();
		// 	}
		// }
	}
	public checkInScreen(position: egret.Point): boolean {
		return position.x < uiCore.Application.app.stage.stageWidth && position.x >0 && position.y < uiCore.Application.app.stage.stageHeight && position.y > 0;
	}
	public onInScreen(bool: boolean): void {
		this.canLock = bool;
	}
	public die():void {
		this.isRunning = false;
		if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		let mcNumber:number=this.numChildren;
		if(mcNumber>0){
			var index:number=0;
			if(mcNumber>1){
				index=mcNumber-1;
			}
			for(var i=0;i<mcNumber;i++){
				let dieNum:number=3;
				if(this.fishInfo.FishId==4){
					dieNum=1;
				}else if(this.fishInfo.FishId==6){
					dieNum=1;
				}else if(this.fishInfo.FishId==8){
					dieNum=2;
				}
				let mc:egret.MovieClip=<egret.MovieClip>this.getChildAt(i);
				mc.gotoAndPlay("death", dieNum);
				if(i==index){
					mc.addEventListener(egret.Event.COMPLETE, this.fishDieDonghua, this);
				}
			}
		}
	}
	//吃鱼
	public eatFish(odds: number): void {
		this.fishInfo.Odds = odds;
		//self.label.text = odds
	}

	public fishDieDonghua(event: egret.Event):void{
		var mc:egret.MovieClip=event.currentTarget;
		mc.removeEventListener(egret.Event.COMPLETE,this.fishDieDonghua,this);
		this.x = -10000;
		this.y = 10000;
		this.visible=false;
	}
	public recovery():void {
		this.isRunning = false;
		this.playOrStopMC(false);
		if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		// if (this.fishtype == 3 || this.fishtype == 4){
		// 	this.childActs = [];		 
		// 	for(var i = 0;i < this.childObjs.length;i++){
		// 		let fishObj = this.childObjs.shift(); //删除并返回数组的第一个元素。
		// 		//先放着

		// 	}
		// 	this.childObjs = [];
		// }
		this.x = -10000; //移动到外面
		this.y = 10000;
		this.visible=false;
	}
	public Dispose(): void {
		FishGameController.getGameView().downGroup.removeChild(this);
		// this.childActs = null
		this.fishSet = null;
		this.fishInfo = null;
	}
}