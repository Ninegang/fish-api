class FlyCoin{
    //1:one 2:five 3:ten
    private flyCoinType:number;
    private Running:boolean;
    private flyCoinMc:egret.MovieClip;
    private playStr:string;
    private isGold:boolean;
    
    public constructor(flyCoinType:number,isSelf:boolean) {
        this.isGold=isSelf;
        this.Running=false;
        this.flyCoinType=flyCoinType;
        let flyCoinTypeStr:string="one";
        this.playStr="playjinbi";
        if(this.isGold){
            flyCoinTypeStr="goldOneCoin";
            this.playStr="run";
            if(flyCoinType==5){
                flyCoinTypeStr="jbzGoldRotate";
                this.playStr="start";
            }else if(flyCoinType==10){
                flyCoinTypeStr="ten";
                this.playStr="play";
            }
        }else{  
             if(flyCoinType==5){
                flyCoinTypeStr="silverFive";
                this.playStr="run";
            }else if(flyCoinType==10){
                flyCoinTypeStr="silverTen";
                this.playStr="run";
            }
        }
        if (FishGameController.getGameView()) {
            this.flyCoinMc=uiCore.MovieClipManager.getGenerateMovieClipData(flyCoinTypeStr);
            if(this.flyCoinMc){
                FishGameController.getGameView().addChild(this.flyCoinMc);
                this.flyCoinMc.frameRate=15;
                this.flyCoinMc.x=-500;
                this.flyCoinMc.y=-500;
                this.flyCoinMc.visible=false;
            }
        }
    }
    public checkFlyCoinMc():boolean{
        if(this.flyCoinMc){
            return true;
        }
        return false;
    }

    public get getRunning():boolean{
        return this.Running;
    }

    public get getIsGold():boolean{
        return this.isGold;
    }

    public get getFlyCoinType():number{
        return this.flyCoinType;
    }

    public Init(startPoint:egret.Point,endPoint:egret.Point,indexCoin:number,coinNum:number): void {
        if(this.flyCoinMc){
            this.Running = true;
            this.flyCoinMc.visible=true;
            let currIndex:number=0;
            if(endPoint.x>startPoint.x){
                currIndex=coinNum-indexCoin;
            }else{
                currIndex=indexCoin+1;
            }
            startPoint.x+=(this.flyCoinMc.width+20)*indexCoin;
            let fx:egret.Point = startPoint.subtract(endPoint);
            let coinDistance:number=Math.abs(Math.sqrt(fx.x*fx.x+fx.y*fx.y));
            let flyTime:number=coinDistance+currIndex*100+500;
            this.flyCoinMc.gotoAndPlay(this.playStr,-1); 
            this.flyCoinMc.x = startPoint.x;
            this.flyCoinMc.y = startPoint.y;
            egret.Tween.get(this.flyCoinMc).wait(500).to({x:endPoint.x,y:endPoint.y},flyTime).call(function(){
                this.recovery();
            },this);
        }
    }
    public recovery():void{
        this.Running = false;
        this.flyCoinMc.visible=false;
        this.flyCoinMc.x=-500;
        this.flyCoinMc.y=-500;
        this.flyCoinMc.stop();
        this.cleanFlyCoin();
    }
    public cleanFlyCoin(){
        if(this.flyCoinMc){
            egret.Tween.removeTweens(this.flyCoinMc);
        }
    }
}