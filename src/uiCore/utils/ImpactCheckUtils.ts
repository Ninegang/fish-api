namespace uiCore {
	export class ImpactCheckUtils {
		private static fishCheckInfo:any={amount:1,radius:0};
		private static cententPoint:egret.Point=new egret.Point();
		public constructor() {
			
		}
		public static impactCheck(obj:any,checkX:number,checkY:number):boolean{
			if(!obj){
				return false;
			}
			this.setFishSize(obj.FishId);
			this.cententPoint.x = obj.x;
			this.cententPoint.y = obj.y;
			for(var i=0;i<this.fishCheckInfo.amount;i++){
				if(i!=0){
					this.cententPoint=uiCore.CircleUtils.getCirclePoint(this.cententPoint,this.fishCheckInfo.radius*(i*2),obj.rotation+180);
				}
				if(this.realCheck(this.cententPoint.x,this.cententPoint.y,checkX,checkY)){
					return true;
				}
			}
			return false;
		}

		private static realCheck(paramX:number,paramY:number,checkX:number,checkY:number):boolean{
			if(checkX>=paramX-this.fishCheckInfo.radius&&checkX<=paramX+this.fishCheckInfo.radius&&checkY>=paramY-this.fishCheckInfo.radius&&checkY<=paramY+this.fishCheckInfo.radius){
				return true;
			}
			return false;
		}

		private static setFishSize(fishId:any):void{
			if(fishId==1){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=20;
			}else if(fishId==2||fishId==3){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=25;
			}else if(fishId==4){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=30;
			}else if(fishId==5||fishId==8){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=40;
			}else if(fishId==6||fishId==7){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=25;
			}else if(fishId==9){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=30;
			}else if(fishId==10){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=55;
			}else if(fishId==11){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=50;
			}else if(fishId==12){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=60;
			}else if(fishId==13){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=50;
			}else if(fishId==14){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=70;
			}else if(fishId==15||fishId==16){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=80;
			}else if(fishId==17){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=80;
			}else if(fishId==18){
				this.fishCheckInfo.amount=2;
				this.fishCheckInfo.radius=80;
			}else if(fishId==19){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=85;
			}else if(fishId==20){
				this.fishCheckInfo.amount=4;
				this.fishCheckInfo.radius=50;
			}else if(fishId==21){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=80;
			}else if(fishId==22){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=80;
			}
			else if(fishId==23){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=80;
			}
			else if(fishId==24){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=85;
			}
			else if(fishId==25){
				this.fishCheckInfo.amount=1;
				this.fishCheckInfo.radius=85;
			}
		}
	}
}