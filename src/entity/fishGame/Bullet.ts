class HitFish_Contract{
    public FishTag:number;
    public FishId:number;
    public BulletId:number;
    public SeatNo:number;
    public BulletOdds:number;
    public TotalOdds:number;
}
class Bullet{
    public gameObject:eui.Image;   
    public Running:boolean;
    public lockFish:any;
    public BindFish:Fish;
    public fishGen:FishGen;
    // public isFist:boolean;
    public bulletNum:number;
    public bulletInfo:any;
    public BulletId:number;
    public BulletOdds:number;
    public bullets:Map<string[]>;
    public isCannon:boolean;
    public PaoTai:any;
    // public PaoTaiBulletVector:any
    public startPoint:egret.Point;
    private endPoint:egret.Point;
    private fxPoint:egret.Point;
    private distNumber:number;
    private nextRotation:number;
    //1:上 2：右 3：下 4：左
    private bulletfangxiang:number;
    private bulletshenwei:boolean;
    // private isBoxTure:boolean;
    private pengzhuangIndx:number = 5;
    private pzIndx:number = 2;
    private fishGenPoint:egret.Point=new egret.Point();
    public constructor(obj:eui.Image){
        this.gameObject = obj;
        this.bullets = {};
        this.isCannon = false;
        this.Running = false;
        // this.isFist = true
        this.bullets[0]=["xbullet11_01","xbullet12_01","xbullet13_01","xbullet14_01","xbullet15_01","xbullet16_01","xbullet17_01"];
        this.bullets[1]=["xbullet1_01","xbullet2_01","xbullet3_01","xbullet4_01","xbullet5_01","xbullet6_01","xbullet7_02"];
        this.bullets[2]=["xbullet31_01","xbullet32_01","xbullet33_01","xbullet34_01","xbullet35_01","xbullet36_01","xbullet37_02"];
        this.bullets[3]=["xbullet41_01","xbullet42_01","xbullet43_01","xbullet44_01","xbullet45_01","xbullet46_01","xbullet47_01"];
        this.gameObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddBullet, this);
        this.startPoint = new egret.Point(-9999,-9999);
        this.endPoint = new egret.Point(-9999,-9999);
        this.fxPoint = new egret.Point();
     }
     private onAddBullet():void{
         this.gameObject.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddBullet, this);
         this.gameObject.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
     }
    public initInfo(bulletInfo, bulletNum:number, isCannon,BulletOdds,SeatNo,fish){
        if (bulletNum>3){
            bulletNum = 3;
        }
        this.Running = true;
        this.gameObject.visible = true;
        // if (this.isFist) {
        //     this.isFist = false;
		//     this.gameObject.visible=true;
        // }
        this.bulletNum = bulletNum;
        this.bulletInfo = bulletInfo;
        this.BulletId = bulletInfo.BulletId;
        this.BulletOdds = BulletOdds;      
        if (isCannon){ //切换炮台图片
            this.gameObject.source = this.bullets[bulletNum-1][6];
        }else{
            this.gameObject.source = this.bullets[bulletNum-1][SeatNo];
        }      
        this.startPoint.x=-9999;
        this.startPoint.y=-9999;
        this.endPoint.x=-9999;
        this.endPoint.y=-9999;
        this.nextRotation=null;
        this.bulletfangxiang=null;
        this.gameObject.anchorOffsetX = this.gameObject.width/2;
        this.gameObject.anchorOffsetY = this.gameObject.height/2;
        this.fishGenPoint.x=fish.fishGen.x;
        this.fishGenPoint.y=fish.fishGen.y;
        let ResultPoint:egret.Point=uiCore.CircleUtils.getCirclePoint(this.fishGenPoint,60,fish.fishGen.rotation-90);
        fish.localToGlobal(ResultPoint.x,ResultPoint.y,this.fishGenPoint);
        this.gameObject.x = this.fishGenPoint.x;
        this.gameObject.y = this.fishGenPoint.y;
        if(SeatNo<3){
            this.gameObject.scaleX = -1;
            this.gameObject.scaleY = 1; 
        }else{
            this.gameObject.scaleY = -1;
            this.gameObject.scaleX = 1;
        }
        this.isCannon = isCannon
    }
    public setLockFish(fish:Fish){        
        this.lockFish = fish;
        if (fish!=null){
            this.BindFish = fish;
        }else{
            this.BindFish = null;
        }
    }
    public setFishGen(fishgen:FishGen):void{        
        this.fishGen = fishgen;
        this.PaoTai = fishgen.fishGen;
    }
    public returnObjectPool():void{
        this.Running = false;
        // if(this.gameObject.hasEventListener(egret.Event.ENTER_FRAME)){
        //     this.gameObject.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);  
        // }
        this.gameObject.x = -100;
        this.gameObject.y = -100;
        if (this.lockFish){
            this.setLockFish(null);
        }
        this.gameObject.visible=false;
    }     
    public setDirection(rotation){      
        this.gameObject.rotation = rotation 
    }
    public FishInBombRange( hitFish, targetFish , bombRange):boolean{
        let x:number = Math.floor(hitFish.x - targetFish.x)
        let y:number = Math.floor(hitFish.y - targetFish.y)
        let dist:number = Math.sqrt(x*x + y*y)
        return dist < bombRange
    } 
    public IsRunning():boolean{
        return this.Running;	
    }
    //碰撞的处理
    public onBoxTrigger(fishobj){
        if (this.fishGen == FishGameController.getGameView().thisFishGen || this.fishGen.isRobot) {
            if(fishobj.fishInfo){
                let HitFishContract = new HitFish_Contract();
                HitFishContract.FishTag = fishobj.fishInfo.FishTag;
                HitFishContract.FishId = fishobj.fishInfo.FishId;
                HitFishContract.BulletId = this.bulletInfo.BulletId;
                HitFishContract.SeatNo = this.bulletInfo.SeatNo;
                HitFishContract.BulletOdds = this.BulletOdds;
                var totalOdds:number = 0;
                if (fishobj.fishSet != null && fishobj.fishSet.bombRange != 0) {
                    let allFishes: Array<Fish> = FishGameController.getGameView().getAllFishes();
                    for (var i = 0; i < allFishes.length; i++) {
                        if (allFishes[i] && this.FishInBombRange(fishobj, allFishes[i], fishobj.fishSet.bombRange) || fishobj.fishSet.bombRange < 0) {
                            if(allFishes[i].fishInfo){
                                totalOdds = totalOdds + allFishes[i].fishInfo.Odds;
                            }
                        }
                    }
                } else {
                    totalOdds = fishobj.fishInfo.Odds;
                }
                HitFishContract.TotalOdds = totalOdds;
                FishGameController.sendCatchFish(HitFishContract);
                // if (this.fishGen.isRobot) {
                //     FishGameController.GetRobotHitFishOdds(HitFishContract.TotalOdds, HitFishContract.SeatNo);
                // } 
            }
        }
        this.gameObject.x = this.gameObject.x + ((fishobj.x - this.gameObject.x) / 3)*2;
        this.gameObject.y = this.gameObject.y + ((fishobj.y - this.gameObject.y) / 3)*2;
        this.fishGen.removeBullet(this);
    } 
    public Dispose(){
        this.lockFish = null;
        if(this.gameObject.hasEventListener(egret.Event.ENTER_FRAME)){
             this.gameObject.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        }
        //删除自身
        //CS.UnityEngine.GameObject.Destroy(self.gameObject)
    }
    // private testZhenPin:number=0;
    public Update():void{
        // var currZhenPin=egret.getTimer();
        // uiCore.Application.currentScene.pingView.PingChange(currZhenPin-this.testZhenPin);
        // this.testZhenPin=currZhenPin;
        // let startTime: number = egret.getTimer();
        // if (this.Running) {
        //     if (this.BindFish != null) {
        //         this.UpdateRoPoint();
        //     }else{
        //         this.bulletUpdate();
        //     }
        // }
        if (this.Running) {
            this.pzIndx--;
            if(this.BindFish&&this.BindFish.isRunning&&this.fishGen.checkLockFishInScreen(this.BindFish)){
                this.pengzhuangIndx--;
                if(this.pzIndx<=0){
                    this.pzIndx=2;
                    this.UpdateRoPoint();
                }else if(this.pengzhuangIndx<=0){
                    this.pengzhuangIndx=5;
                    if(uiCore.ImpactCheckUtils.impactCheck(this.BindFish,this.gameObject.x, this.gameObject.y)){
                        this.onBoxTrigger(this.BindFish);
                    }
                    // if(this.BindFish.hitTestPoint(this.gameObject.x, this.gameObject.y, false)){
                    //     this.onBoxTrigger(this.BindFish);
                    // }
                }
            } else {
                if(this.pzIndx<=0){
                    this.pzIndx=2;
                    this.bulletUpdate();
                }else{
                    if (FishGameController.getGameView()) {
                        var allfish = FishGameController.getGameView().getAllFishes();
                        if (allfish.length > 0) {
                            for (var key in allfish) {
                                if (allfish[key].x > -25 && allfish[key].x < uiCore.Application.app.stage.stageWidth+25 && allfish[key].y > -25 && allfish[key].y < uiCore.Application.app.stage.stageHeight+25) {
                                    if(uiCore.ImpactCheckUtils.impactCheck(allfish[key],this.gameObject.x, this.gameObject.y)){
                                        this.onBoxTrigger(allfish[key]);
                                        break;
                                    }
                                    // if (allfish[key].hitTestPoint(this.gameObject.x, this.gameObject.y, false)) {
                                    //     this.onBoxTrigger(allfish[key]);
                                    //     break;
                                    // }
                                }
                            }
                        }
                    }
                }
            }
            // if(this.gameObject.x<-50||this.gameObject.y<-50||this.gameObject.x>uiCore.Application.app.stage.stageWidth+50||this.gameObject.y>uiCore.Application.app.stage.stageHeight+50){
            //     console.log(this.BulletId+"    X:"+this.gameObject.x+"   Y:"+this.gameObject.y);
            // }
        }
        // var diffTime: number = egret.getTimer() - startTime;
        // if (diffTime > 10) {
        //     console.log("Bullet:" + this.BulletId + ":" + diffTime);
        // }
    }
    //旋转角
    private UpdateRotation():void{
        if (Math.abs(this.gameObject.x) -  uiCore.Application.app.stage.stageWidth / 2 >= 0 || Math.abs(this.gameObject.y) - uiCore.Application.app.stage.stageHeight / 2 >= 0)
        {
            let roJ_x:number = 0;
            let roJ_y:number = 0;
            if (Math.abs(this.gameObject.y) - uiCore.Application.app.stage.stageHeight / 2 >= 0)
            {
                this.gameObject.rotation = 180-this.gameObject.rotation;
                if (this.gameObject.y < -uiCore.Application.app.stage.stageHeight / 2)
                {
                    this.gameObject.x = this.gameObject.x;
                    this.gameObject.y = -uiCore.Application.app.stage.stageHeight / 2; 
                    this.gameObject.rotation = this.gameObject.rotation;
                }
                else if ( this.gameObject.y > uiCore.Application.app.stage.stageHeight / 2)
                {
                    this.gameObject.x = this.gameObject.x;
                    this.gameObject.y = uiCore.Application.app.stage.stageHeight / 2;
                    this.gameObject.rotation = this.gameObject.rotation;
                }
            }
            if (Math.abs(this.gameObject.x) - uiCore.Application.app.stage.stageWidth / 2 > 0)
            {
                 this.gameObject.rotation = -this.gameObject.rotation; 
                if (this.gameObject.x < - uiCore.Application.app.stage.stageWidth / 2)
                {
                    this.gameObject.x = -uiCore.Application.app.stage.stageWidth / 2;
                    this.gameObject.y =  this.gameObject.y;
                    this.gameObject.rotation = this.gameObject.rotation;
                }
                else if (this.gameObject.x > uiCore.Application.app.stage.stageWidth / 2)
                {
                    this.gameObject.x = uiCore.Application.app.stage.stageWidth / 2;
                    this.gameObject.y =  this.gameObject.y;
                    this.gameObject.rotation = this.gameObject.rotation;
                }                
            }
        }
    }
    public bulletUpdate():void{
        // console.log("X:"+this.gameObject.x);
        // console.log("Y:"+this.gameObject.y);
        // console.log("scaleX:"+this.gameObject.scaleX);
        // console.log("scaleY:"+this.gameObject.scaleY);
        // console.log("rotation:"+this.gameObject.rotation);
       
        if (this.endPoint.x == -9999 && this.endPoint.y == -9999) {
            this.bulletInitChange();
            return;
        } else if (this.gameObject.y < 0 || this.gameObject.x > uiCore.Application.app.stage.stageWidth || this.gameObject.y > uiCore.Application.app.stage.stageHeight || this.gameObject.x < 0) {
            this.bulletInitChange();
            return;
        }
        this.bulletMove();
	}
    public bulletInitChange():void{
        if(this.startPoint.x==-9999&&this.startPoint.y==-9999){
            this.startPoint.x=this.gameObject.x;
            this.startPoint.y=this.gameObject.y;
        }else{
            this.gameObject.x=this.startPoint.x;
            this.gameObject.y=this.startPoint.y;
        } 
        if(this.nextRotation!=null){
            if(this.bulletshenwei){
                this.gameObject.scaleX=1;
                this.gameObject.scaleY=-1;
            }else{
                this.gameObject.scaleX=-1;
                this.gameObject.scaleY=1;
            }
            this.gameObject.rotation=this.nextRotation;
        }
        let currRotation:number=this.gameObject.rotation;
        if(this.bulletfangxiang==null){
            //上炮台
            if(this.gameObject.scaleX==1&&this.gameObject.scaleY==-1){
                this.bulletfangxiang=1;
            }else{
                this.bulletfangxiang=3;
            }
        }
        if(this.bulletfangxiang==1){
            if(currRotation>0){
                if(currRotation>90){
                    let heightY:number=this.gameObject.y-Math.tan((currRotation-90)*Math.PI/180)*this.gameObject.x;
                    if(heightY<=0){
                        this.endPoint.x=0;
                        this.endPoint.y=0;
                        this.bulletshenwei=true;
                        this.bulletfangxiang=1;
                        this.nextRotation=-45;
                    }else{
                        this.endPoint.x=0;
                        this.endPoint.y=heightY;
                        this.bulletshenwei=false;
                        this.bulletfangxiang=4;
                        this.nextRotation=90-(currRotation-90);
                    }
                }else if(currRotation==90){
                    this.bulletshenwei=false;
                    this.endPoint.x=0;
                    this.endPoint.y=this.gameObject.y;
                    this.bulletfangxiang=4;
                    this.nextRotation=90;
                }else{
                    let widthX:number=this.gameObject.x-Math.tan(currRotation*Math.PI/180)*(uiCore.Application.app.stage.stageHeight-this.gameObject.y);
                    this.bulletshenwei=false;
                    if(widthX<0){
                        this.endPoint.x=0;
                        this.endPoint.y=this.gameObject.y+Math.tan((90-currRotation)*Math.PI/180)*this.gameObject.x;
                        this.bulletfangxiang=4;
                        this.nextRotation=180-currRotation;
                    }else if(widthX==0){
                        this.endPoint.x=0;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletfangxiang=3;
                        this.nextRotation=45;
                    }else{
                        this.endPoint.x=widthX;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletfangxiang=3;
                        this.nextRotation=(90-currRotation)-90;
                    }
                }
            }else if(currRotation<0){
                if(currRotation>-90){
                    let widthX:number=this.gameObject.x+Math.tan(Math.abs(currRotation)*Math.PI/180)*(uiCore.Application.app.stage.stageHeight-this.gameObject.y);
                    if(widthX>uiCore.Application.app.stage.stageWidth){
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=this.gameObject.y+Math.tan((currRotation+90)*Math.PI/180)*(uiCore.Application.app.stage.stageWidth-this.gameObject.x);
                        this.bulletshenwei=true;
                        this.bulletfangxiang=2;
                        this.nextRotation=90-(currRotation+90);
                    }else if(widthX==uiCore.Application.app.stage.stageWidth){
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletshenwei=false;
                        this.bulletfangxiang=3;
                        this.nextRotation=-45;
                    }else{
                        this.endPoint.x=widthX;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletshenwei=false;
                        this.bulletfangxiang=3;
                        this.nextRotation=90-(90-Math.abs(currRotation));
                    }
                }else if(currRotation==-90){
                    this.bulletshenwei=true;
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=this.gameObject.y;
                    this.bulletfangxiang=2;
                    this.nextRotation=90;
                }else{
                    let heightY:number=this.gameObject.y-Math.tan((Math.abs(currRotation)-90)*Math.PI/180)*(uiCore.Application.app.stage.stageWidth-this.gameObject.x);
                    this.bulletshenwei=true;
                    if(heightY<=0){
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=0;
                        this.bulletfangxiang=1;
                        this.nextRotation=45;
                    }else{
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=heightY;
                        this.bulletfangxiang=2;
                        this.nextRotation=180-(90-(Math.abs(currRotation)-90));
                    }
                }
            }else{
                this.endPoint.x=this.gameObject.x;
                this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                this.bulletshenwei=false;
                this.bulletfangxiang=3;
                this.nextRotation=0;
            }
        }else if(this.bulletfangxiang==2){
            if(currRotation>90){
                let heightY:number=this.gameObject.y-Math.tan((currRotation-90)*Math.PI/180)*uiCore.Application.app.stage.stageWidth;
                if(heightY>0){
                    this.endPoint.x=0;
                    this.endPoint.y=heightY;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=4;
                    this.nextRotation=90-(currRotation-90);
                }else if(heightY<0){
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth-Math.tan((180-currRotation)*Math.PI/180)*this.gameObject.y;
                    this.endPoint.y=0;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=1;
                    this.nextRotation=90-(90-(180-currRotation));
                }else{
                    this.endPoint.x=0;
                    this.endPoint.y=0;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=1;
                    this.nextRotation=-45;
                }
            }else if(currRotation<90){
                let widthX:number=uiCore.Application.app.stage.stageWidth-Math.tan(currRotation*Math.PI/180)*(uiCore.Application.app.stage.stageHeight-this.gameObject.y);
                if(widthX>0){
                    this.endPoint.x=widthX;
                    this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=3;
                    this.nextRotation=90-currRotation-90;
                }else if(widthX<0){
                    this.endPoint.x=0;
                    this.endPoint.y=this.gameObject.y+Math.tan((90-currRotation)*Math.PI/180)*uiCore.Application.app.stage.stageWidth;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=4;
                    this.nextRotation=180-(90-(90-currRotation));
                }else{
                    this.endPoint.x=0;
                    this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=3;
                    this.nextRotation=45;
                }
            }else{
                this.endPoint.x=0;
                this.endPoint.y=this.gameObject.y;
                this.bulletshenwei=false;
                this.bulletfangxiang=4;
                this.nextRotation=90;
            }
        }else if(this.bulletfangxiang==3){
            if(currRotation>0){
                if(currRotation>90){
                    let heightY:number=this.gameObject.y+Math.tan((currRotation-90)*Math.PI/180)*(uiCore.Application.app.stage.stageWidth-this.gameObject.x);
                    if(heightY>=uiCore.Application.app.stage.stageHeight){
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletshenwei=false;
                        this.bulletfangxiang=3;
                        this.nextRotation=-45;
                    }else{
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=heightY;
                        this.bulletshenwei=true;
                        this.bulletfangxiang=2;
                        this.nextRotation=90-(currRotation-90);
                    }
                }else if(currRotation==90){
                    this.bulletshenwei=true;
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=this.gameObject.y;
                    this.bulletfangxiang=2;
                    this.nextRotation=90;
                }else{
                    let widthX:number=this.gameObject.x+Math.tan(currRotation*Math.PI/180)*this.gameObject.y;
                    this.bulletshenwei=true;
                    if(widthX<uiCore.Application.app.stage.stageWidth){
                        this.endPoint.x=widthX;
                        this.endPoint.y=0;
                        this.bulletfangxiang=1;
                        this.nextRotation=(90-currRotation)-90;
                    }else if(widthX==uiCore.Application.app.stage.stageWidth){
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=0;
                        this.bulletfangxiang=1;
                        this.nextRotation=45;
                    }else{
                        this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                        this.endPoint.y=this.gameObject.y-Math.tan((90-currRotation)*Math.PI/180)*(uiCore.Application.app.stage.stageWidth-this.gameObject.x);
                        this.bulletfangxiang=2;
                        this.nextRotation=180-(90-(90-currRotation));
                    }
                }
            }else if(currRotation<0){
                if(currRotation>-90){
                    let widthX:number=this.gameObject.x-Math.tan(Math.abs(currRotation)*Math.PI/180)*this.gameObject.y;
                    if(widthX>0){
                        this.endPoint.x=widthX;
                        this.endPoint.y=0;
                        this.bulletshenwei=true;
                        this.bulletfangxiang=1;
                        this.nextRotation=90-(90-Math.abs(currRotation));
                    }else if(widthX==0){
                        this.endPoint.x=0;
                        this.endPoint.y=0;
                        this.bulletshenwei=true;
                        this.bulletfangxiang=1;
                        this.nextRotation=-45;
                    }else{
                        this.endPoint.x=0;
                        this.endPoint.y=this.gameObject.y-Math.tan((currRotation+90)*Math.PI/180)*this.gameObject.x;
                        this.bulletshenwei=false;
                        this.bulletfangxiang=4;
                        this.nextRotation=90-(currRotation+90);
                    }
                }else if(currRotation==-90){
                    this.bulletshenwei=false;
                    this.endPoint.x=0;
                    this.endPoint.y=this.gameObject.y;
                    this.bulletfangxiang=4;
                    this.nextRotation=90;
                }else{
                    let heightY:number=this.gameObject.y+Math.tan((Math.abs(currRotation)-90)*Math.PI/180)*this.gameObject.x;
                    this.bulletshenwei=false;
                    if(heightY>=uiCore.Application.app.stage.stageHeight){
                        this.endPoint.x=0;
                        this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                        this.bulletfangxiang=3;
                        this.nextRotation=45;
                    }else{
                        this.endPoint.x=0;
                        this.endPoint.y=heightY;
                        this.bulletfangxiang=4;
                        this.nextRotation=180-(90-(Math.abs(currRotation)-90));
                    }
                }
            }else{
                this.endPoint.x=this.gameObject.x;
                this.endPoint.y=0;
                this.bulletshenwei=true;
                this.bulletfangxiang=1;
                this.nextRotation=0;
            }
        }else if(this.bulletfangxiang==4){
            if(currRotation>90){
                let heightY:number=this.gameObject.y+Math.tan((currRotation-90)*Math.PI/180)*uiCore.Application.app.stage.stageWidth;
                if(heightY>uiCore.Application.app.stage.stageHeight){
                    this.endPoint.x=Math.tan((180-currRotation)*Math.PI/180)*(uiCore.Application.app.stage.stageHeight-this.gameObject.y);
                    this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=3;
                    this.nextRotation=90-(90-(180-currRotation));
                }else if(heightY<uiCore.Application.app.stage.stageHeight){
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=heightY;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=2;
                    this.nextRotation=90-(currRotation-90);
                }else{
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=uiCore.Application.app.stage.stageHeight;
                    this.bulletshenwei=false;
                    this.bulletfangxiang=3;
                    this.nextRotation=-45;
                }
            }else if(currRotation<90){
                let widthX:number=Math.tan(currRotation*Math.PI/180)*this.gameObject.y;
                if(widthX>uiCore.Application.app.stage.stageWidth){
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=this.gameObject.y-Math.tan((90-currRotation)*Math.PI/180)*uiCore.Application.app.stage.stageWidth;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=2;
                    this.nextRotation=180-(90-(90-currRotation));
                }else if(widthX<uiCore.Application.app.stage.stageWidth){
                    this.endPoint.x=widthX;
                    this.endPoint.y=0;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=1;
                    this.nextRotation=(90-currRotation)-90;
                }else{
                    this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                    this.endPoint.y=0;
                    this.bulletshenwei=true;
                    this.bulletfangxiang=1;
                    this.nextRotation=45;
                }
            }else{
                this.endPoint.x=uiCore.Application.app.stage.stageWidth;
                this.endPoint.y=this.gameObject.y;
                this.bulletshenwei=true;
                this.bulletfangxiang=2;
                this.nextRotation=90;
            }
        }
        this.fxPoint.x=this.endPoint.x-this.startPoint.x;
        this.fxPoint.y=this.endPoint.y-this.startPoint.y;
        this.startPoint.x=this.endPoint.x;
        this.startPoint.y=this.endPoint.y;
        this.distNumber=Math.sqrt(this.fxPoint.x*this.fxPoint.x+this.fxPoint.y*this.fxPoint.y); 
        this.bulletMove();
    }
    public bulletMove():void{
        this.gameObject.x+=(this.fxPoint.x/this.distNumber)*uiCore.Application.bulletSuDu;
        this.gameObject.y+=(this.fxPoint.y/this.distNumber)*uiCore.Application.bulletSuDu;
	}
    public UpdateRoPoint():void{
        this.gameObject.rotation = this.fishGen.fishGen.rotation;
        this.fxPoint.x=this.BindFish.x-this.gameObject.x;
        this.fxPoint.y=this.BindFish.y-this.gameObject.y;
        this.distNumber=Math.sqrt(this.fxPoint.x*this.fxPoint.x+this.fxPoint.y*this.fxPoint.y);
        this.bulletMove();
        if(this.gameObject.x<0||this.gameObject.x>uiCore.Application.app.stage.stageWidth||this.gameObject.y<0||this.gameObject.y>uiCore.Application.app.stage.stageHeight){
            // this.fishGen.removeBulletNotNet(this);
            this.fishGen.setLockFish(null);
        }
    }
}
