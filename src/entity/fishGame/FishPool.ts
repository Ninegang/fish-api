/*
[[
	通用鱼池
	使用要求
	1、对象必须要有 IsRunning() 及 Dispose()
	2、必须提供对象实例化函数createObjFunc()
	id、鱼的类型
]]
*/
class FishPool {
	public fishPoolArray: Array<Fish>;
	public fishPoolSiwimmingMap: Array<number>;
	private createObjFunc: (id: number) => Fish;
	private fishPoint:egret.Point;
	private resultFish: Array<Fish>;
	private fishcatchContractArray: Array<Fishcatch_Contract>;
	public constructor(createObjFunc: (id: number) => Fish) {
		this.fishPoolArray = [];
		this.fishPoolSiwimmingMap = [];
		this.createObjFunc = createObjFunc;
		this.fishPoint = new egret.Point();
		this.resultFish = new Array<Fish>();
		this.fishcatchContractArray = new Array<Fishcatch_Contract>();
	}

	public getObject(id: number):Fish{
		if(this.fishPoolArray.length>0){
			for(var i=0;i<this.fishPoolArray.length;i++){
				if(this.fishPoolArray[i].FishId==id&&!this.fishPoolArray[i].isRunning){
					if(!this.fishPoolArray[i].hasEventListener(egret.Event.ENTER_FRAME)){
						this.fishPoolArray[i].addEventListener(egret.Event.ENTER_FRAME,this.fishPoolArray[i].update,this.fishPoolArray[i]);
					}
					return this.fishPoolArray[i];
				}
			}
		}
		let fish: Fish = this.createObjFunc(id);
		if(fish){
			fish.FishId = id;
			this.fishPoolArray.push(fish);
			FishGameController.getGameView().downGroup.addChild(fish);
			this.setFishAnchorOff(fish);
		}
		return fish;
	}

	public setFishAnchorOff(fish:Fish):void{
		if(fish.FishId==1){
			fish.anchorOffsetX=60;
			fish.anchorOffsetY=11;
		}else if(fish.FishId==2){
			fish.anchorOffsetX=50;
			fish.anchorOffsetY=20;
		}else if(fish.FishId==3){
			fish.anchorOffsetX=50;
			fish.anchorOffsetY=20;
		}else if(fish.FishId==4){
			fish.anchorOffsetX=60;
			fish.anchorOffsetY=30;
		}else if(fish.FishId==5){
			fish.anchorOffsetX=90;
			fish.anchorOffsetY=25;
		}else if(fish.FishId==6){
			fish.anchorOffsetX=80;
			fish.anchorOffsetY=30;
		}else if(fish.FishId==7){
			fish.anchorOffsetX=80;
			fish.anchorOffsetY=23;
		}else if(fish.FishId==8){
			fish.anchorOffsetX=90;
			fish.anchorOffsetY=30;
		}else if(fish.FishId==9){
			fish.anchorOffsetX=80;
			fish.anchorOffsetY=30;
		}else if(fish.FishId==10){
			fish.anchorOffsetX=60.5;
			fish.anchorOffsetY=70;
		}else if(fish.FishId==11){
			fish.anchorOffsetX=118
			fish.anchorOffsetY=45;
		}else if(fish.FishId==12){
			fish.anchorOffsetX=100;
			fish.anchorOffsetY=80;
		}else if(fish.FishId==13){
			fish.anchorOffsetX=125;
			fish.anchorOffsetY=40;
		}else if(fish.FishId==14){
			fish.anchorOffsetX=150;
			fish.anchorOffsetY=50;
		}else if(fish.FishId==15){
			fish.anchorOffsetX=130;
			fish.anchorOffsetY=125;
		}else if(fish.FishId==16){
			fish.anchorOffsetX=200;
			fish.anchorOffsetY=60;
		}else if(fish.FishId==17){
			fish.anchorOffsetX=200;
			fish.anchorOffsetY=60;
		}else if(fish.FishId==18){
			fish.anchorOffsetX=300;//小 Y上
			fish.anchorOffsetY=40;//大 x左
		}else if(fish.FishId==19){
			fish.anchorOffsetX=100;
			fish.anchorOffsetY=150;
		}else if(fish.FishId==20){
			fish.anchorOffsetX=98;
			fish.anchorOffsetY=98;
		}else if(fish.FishId==21){//反
			fish.anchorOffsetX=200;
			fish.anchorOffsetY=230;
		}else if(fish.FishId==22){ //反
			fish.anchorOffsetX=30 //小 右
			fish.anchorOffsetY=180; 
		}else if(fish.FishId==23){
			fish.anchorOffsetX=230;
			fish.anchorOffsetY=100;
		}else if(fish.FishId==24){//反
			fish.anchorOffsetX=220;
			fish.anchorOffsetY=180;
		}else if(fish.FishId==25){
			fish.anchorOffsetX=75;
			fish.anchorOffsetY=75;
		}else if(fish.FishId==26){
			fish.anchorOffsetX=90;
			fish.anchorOffsetY=90;
		}else if(fish.FishId==27){
			fish.anchorOffsetX=120;
			fish.anchorOffsetY=80;
		}
		
	}
	public checkPoolNum(): void {
		if (this.fishPoolArray.length > 110) {
			var index:number=0;
			var fishTotal:number=this.fishPoolArray.length;
			for (var i = 0; i < fishTotal; i++) {
				if(this.fishPoolArray[i]&&!this.fishPoolArray[i].isRunning){
					let fishs:Array<Fish>=this.fishPoolArray.splice(i,1);
					fishs[0].Dispose();
					index++;
					if(index>fishTotal-110){
						break;
					}
				}
			}
		}
	}
	//删除字鱼
	// public clearFishByTag(fishTag: number): void {
	// 	for (var i = 0; i < this.fishPoolArray.length; i++) {
	// 		if (this.fishPoolArray[i].FishTag == fishTag) {
	// 			let fishs:Array<Fish>=this.fishPoolArray.splice(i,1);
	// 			fishs[0].Dispose();
	// 			break;
	// 		}
	// 	}
	// }
	public getFishByType(type: number): Fish {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].FishId == type && this.fishPoolArray[i].isRunning == true) {
				this.fishPoint.x=this.fishPoolArray[i].x;
				this.fishPoint.y=this.fishPoolArray[i].y;
				if (this.fishPoolArray[i].checkInScreen(this.fishPoint)) {
					return this.fishPoolArray[i];
				}
			}
		}
		return null;
	}
	public markFish(): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].isRunning){
				this.fishPoolSiwimmingMap.push(this.fishPoolArray[i].FishTag);
				// if (!this.fishPoolArray[i].checkInScreen(new egret.Point(this.fishPoolArray[i].gameObject.x, this.fishPoolArray[i].gameObject.y))) {
				//停掉鱼运动 停掉鱼线
				// }
			}
		}
	}
	//找出所有正在游的同类鱼
	public getAllTheTypeFish(type: number): Array<Fish> {
		let result: Array<Fish> = new Array<Fish>();
		for (var i = 0;i < this.fishPoolArray.length;i++) {
			if (this.fishPoolArray[i].FishId == type && this.fishPoolArray[i].isRunning == true) {
				result.push(this.fishPoolArray[i]);
			}
		}
		return result;
	}
	//找出爆炸范围内的鱼
	public getAllFishInBombRange(posX: number,posY: number, bombRange: number, catchFishContract): Array<Fishcatch_Contract> {
		this.fishcatchContractArray=[];
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].isRunning && this.fishPoolArray[i].canLock) {
				if (this.isInRange(posX,posY, this.fishPoolArray[i].x, this.fishPoolArray[i].y, bombRange)) {
					var info: Fishcatch_Contract = new Fishcatch_Contract();
					info.SeatNo = catchFishContract.SeatNo;
					info.FishTag = this.fishPoolArray[i].FishTag;
					info.FishId = this.fishPoolArray[i].FishId;
					info.BulletId = catchFishContract.BulletId;
					info.WinMoney = this.fishPoolArray[i].fishInfo.Odds * catchFishContract.BulletOdds;
					this.fishcatchContractArray.push(info);
				}
			}
		}
		return this.fishcatchContractArray;
	}
	public getAllActiveFish(): Array<Fish> {
		this.resultFish=[];
		for (var key in this.fishPoolArray) {
			if (this.fishPoolArray[key].isRunning) {
				this.resultFish.push(this.fishPoolArray[key]);
			} 
		}
		return this.resultFish;
	}
	public FixedScreen(fixedTimes: number): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].isRunning) {
				this.fishPoolArray[i].FixedScreen(fixedTimes)
			}
		}
	}
	public FixedScreenEnd(): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].isRunning) {
				this.fishPoolArray[i].FixedScreenEnd()
			}
		};
	}
	public getFish(fishTag: number): Fish {
		for (var key in this.fishPoolArray) {
			if (this.fishPoolArray[key].FishTag == fishTag && this.fishPoolArray[key].isRunning == true) {				
				return this.fishPoolArray[key];
			} 
		} 
		return null
	}
	public recovery(fishTag: number): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].FishTag == fishTag) {
				this.fishPoolArray[i].recovery();
				break;
			}
		}
	}
	public bossEatFish(id: number, Odds: number): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].FishTag == id) {
				this.fishPoolArray[i].eatFish(Odds);
				return;
			}
		}
	}
	public fishDie(fishTag: number): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			if (this.fishPoolArray[i].FishTag == fishTag) {
				this.fishPoolArray[i].die();
			}
		}
	}
	public recoveryAllMark(): void {
		for (var i = 0; i < this.fishPoolSiwimmingMap.length; i++) {
			for (var j = 0; j < this.fishPoolArray.length; j++) {
				if (this.fishPoolArray[j].FishTag == this.fishPoolSiwimmingMap[i]) {
					this.fishPoolArray[j].recovery();
					break;
				}
			}
		}
		this.fishPoolSiwimmingMap = [];
	}

	public getAllSiwimming(): Array<Fish> {
		let result: Array<Fish> = new Array<Fish>();
		for (var i = 0;i < this.fishPoolSiwimmingMap.length;i++) {
			for (var j = 0; j < this.fishPoolArray.length; j++) {
				if (this.fishPoolArray[j].FishTag == this.fishPoolSiwimmingMap[i]) {
					result.push(this.fishPoolArray[j]);
				}
			}
		}
		return result;
	}
	public recoveryAllFish(): void {
		for (var i = 0; i < this.fishPoolArray.length; i++) {
			this.fishPoolArray[i].recovery();
		}
	}
	public reconnectAllFish(): void {//重连或切换 暂停时清空渔场
		if (this.fishPoolArray.length > 0) {
			for (var i = this.fishPoolArray.length; i > 0; i--) {
				this.fishPoolArray.pop().Dispose();
			}
		}
		this.fishPoolArray = [];
	}
	public isInRange(originX:number,originY:number, targetX:number , targetY:number, range: number): boolean {
		if (range == -1) { return true }
		return (Math.sqrt(Math.floor(originX - targetX) * Math.floor(originX - targetX) + Math.floor(originY - targetY) * Math.floor(originY - targetY))) < range
	}
}
class Fishcatch_Contract {
	public SeatNo: number;
	public FishTag: number;
	public FishId: number;
	public BulletId: number;
	public WinMoney: number;
}