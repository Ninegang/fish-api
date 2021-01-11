class Lunzi{
    public lunzigold:eui.Image;
    public lunziMoney:eui.BitmapLabel;
    private Running:boolean;
    public constructor() {
        this.Running=false;
        if (FishGameController.getGameView()) {
            this.lunzigold=new eui.Image();
            this.lunzigold.source="fishlunzi";
            this.lunziMoney = new eui.BitmapLabel();
            this.lunziMoney.font = uiCore.ZipManager.getFontImageMap("powerFont_fnt");
            this.lunziMoney.textAlign = "center";
            FishGameController.getGameView().addChild(this.lunzigold);
            FishGameController.getGameView().addChild(this.lunziMoney);
            this.lunzigold.visible=false;
            this.lunziMoney.visible=false;
            this.lunzigold.x=-500;
            this.lunzigold.y=-500;
            this.lunzigold.anchorOffsetX=this.lunzigold.width/2;
            this.lunzigold.anchorOffsetY=this.lunzigold.height/2;
            this.lunziMoney.x=-500;
            this.lunziMoney.y=-500;
            egret.Tween.get(this.lunzigold, { loop: true }).to({ rotation: 180 }, 500).to({ rotation: -60 }, 500);
            egret.Tween.pauseTweens(this.lunzigold);
        }
    }

    public get getRunning():boolean{
        return this.Running;
    }

    public checkLunzigold():boolean{
        if(this.lunzigold){
            return true;
        }
        return false;
    }

    public Init(pointX:number,pointY:number,money:any): void {
        this.Running = true;
        this.lunzigold.visible=true;
        this.lunziMoney.visible=true;
        egret.Tween.resumeTweens(this.lunzigold);
        if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
            money = (money/SceneManager.exchangeValue).toFixed(2);
        }
        this.lunziMoney.text=money;
        if(pointY>300){
            pointX=pointX+40;
            pointY=pointY-this.lunzigold.height/2-30;
        }else{
            pointX=pointX-40;
            pointY=pointY+this.lunzigold.height/2+30
        }
        this.lunzigold.x=pointX;
        this.lunzigold.y=pointY;
        pointX=pointX-this.lunziMoney.width/2;
        pointY=pointY-this.lunziMoney.height/2;
        this.lunziMoney.x=pointX;
        this.lunziMoney.y=pointY;
        egret.setTimeout(function () {
           this.recovery();
        }, this, 1500); 
    }
    public recovery():void{
        this.Running = false;
        this.lunzigold.visible=false;
        this.lunziMoney.visible=false;
        this.lunzigold.x=-500;
        this.lunzigold.y=-500;
        this.lunziMoney.x=-500;
        this.lunziMoney.y=-500;
        egret.Tween.pauseTweens(this.lunzigold);
    }
    public cleanLunzi(){
        if(this.lunzigold){
            egret.Tween.removeTweens(this.lunzigold);
        }
    }
}