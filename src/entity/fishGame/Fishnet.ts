class Fishnet extends eui.Component{
    private bowens:Array<particle.ParticleSystem>;
    public showTime:number;
    public Running:boolean;
    public constructor() {
        super();
        this.Running = false;
        this.visible=false;
        if (FishGameController.getGameView()) {
            this.bowens = new Array<particle.ParticleSystem>();
            this.showTime = 500;
            this.createFishnet();
            FishGameController.getGameView().bulletGroup.addChild(this);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x=-200;
            this.y=-200;
        }
    }

    public get getRunning():boolean{
        return this.Running;
    }
    private createFishnet():void{
        for(var i=0;i<3;i++){
            let bowen:particle.ParticleSystem = uiCore.ParticleManager.getParticleSystem("bowen");
            let cobweb: eui.Image = new eui.Image();
            cobweb.source = "cobweb";
            cobweb.scaleX = 0.3;
            cobweb.scaleY = 0.3;
            if(i>0){
                cobweb.x = 360*0.2;
            }
            if(i==2){
                cobweb.y = -360*0.2;
            }
            if(bowen){
                this.addChild(bowen);
                bowen.scaleX = 1.3;
                bowen.scaleY = 1.3;
                bowen.x = (360 * 0.3) / 2;
                bowen.y = (360 * 0.3) / 2;
                if (i > 0) {
                    bowen.x = bowen.x+360 * 0.2;
                }
                if (i == 2) {
                    bowen.y = bowen.y-360 * 0.2;
                }
                this.bowens.push(bowen);
            }
            this.addChild(cobweb);
        }
    }
    public Init(bullet): void {
        this.Running = true;
        this.visible=true;
        if (Number(bullet.BulletOdds) > 100) {
            this.getChildAt(this.numChildren - 1).visible = true;
            this.getChildAt(this.numChildren - 2).visible = true;
        } else {
            this.getChildAt(this.numChildren - 1).visible = false;
            this.getChildAt(this.numChildren - 2).visible = false;
        }
        this.x = bullet.gameObject.x;
        this.y = bullet.gameObject.y; 
        if(this.bowens&&this.bowens.length>0){
            for(var key in this.bowens){
                this.bowens[key].start(400);
            }
        }
        egret.setTimeout(function () {
           this.recovery();
        }, this, this.showTime); 
    }
    public recovery():void{
        this.Running = false;
        this.visible=false;
        this.x=-200;
        this.y=-200;
        if(this.bowens&&this.bowens.length>0){
            for(var key in this.bowens){
                this.bowens[key].stop(false);
            }
        }
    }
}