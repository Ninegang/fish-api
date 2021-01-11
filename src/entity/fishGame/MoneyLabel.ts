class MoneyLabel{
    public moneyBit:eui.BitmapLabel;
    private Running:boolean;
    public constructor() {
        this.Running=false;
        if (FishGameController.getGameView()) {
            this.moneyBit = new eui.BitmapLabel();
            this.moneyBit.textAlign = "center";
            FishGameController.getGameView().addChild(this.moneyBit);
            this.moneyBit.x=-500;
            this.moneyBit.y=-500;
            this.moneyBit.visible=false;
        }
    }

    public get getRunning():boolean{
        return this.Running;
    }

    public checkMoneyBit():boolean{
        if(this.moneyBit){
            return true;
        }
        return false;
    }

    public Init(isGreen:boolean,fish:Fish,money:any): void {
        if(fish&&money!="undefined"){
            this.Running = true;
            this.moneyBit.visible=true;
            if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
                money = (money/SceneManager.exchangeValue).toFixed(2);
            }
            this.moneyBit.text=money;
            this.moneyBit.x=fish.x;
            this.moneyBit.y=fish.y;
            if(isGreen){
		        this.moneyBit.font = uiCore.ZipManager.getFontImageMap("powerFont_fnt");
            }else{
                this.moneyBit.font = uiCore.ZipManager.getFontImageMap("silverFont_fnt");
            }
            egret.Tween.get( this.moneyBit).to({ y:this.moneyBit.y+20},100).to({ y:this.moneyBit.y-80},100).to({ y:this.moneyBit.y},800).call(function(){
                this.recovery();
            },this); 
        }
    }
    public recovery():void{
        this.Running = false;
        this.moneyBit.visible=false;
        this.moneyBit.x=-500;
        this.moneyBit.y=-500;
        this.cleanMoneyLabel();
    }
    public cleanMoneyLabel(){
        if(this.moneyBit){
            egret.Tween.removeTweens(this.moneyBit);
        }
    }
}