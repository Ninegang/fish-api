class GoldPillar extends eui.Group{
    private pillarText:egret.BitmapText;
    private mcGoldRotate:egret.MovieClip;
    private pillar:eui.Image;
    private pillarCopy:eui.Image;
    private bgc1:eui.Image;
    private bgc2:eui.Image;
    public Running:boolean;
    public constructor() {
        super();
        this.Running=false;
        this.visible=false;
        this.bottom=0;
        this.alpha=0;
        this.pillarCopy=new eui.Image();
        this.pillarCopy.source="stack_s";
        this.pillarCopy.bottom=0;
        this.pillarCopy.visible=false;
        this.pillarCopy.horizontalCenter=0;
        this.pillar=new eui.Image();
        this.pillar.source="stack_s";
        this.pillar.bottom=0;
        this.pillar.horizontalCenter=0;
        this.pillar.mask=this.pillarCopy;
        this.addChild(this.pillar);
        this.addChild(this.pillarCopy);
        this.bgc1=new eui.Image();
        this.bgc1.source="bgc1";
		this.bgc1.scaleX=0.4;
        this.bgc1.horizontalCenter=0;
        this.bgc2=new eui.Image();
        this.bgc2.source="bgc2";
		this.bgc2.scaleX=0.4;
        this.bgc2.horizontalCenter=0;
        this.addChild(this.bgc1);
        this.addChild(this.bgc2);
        this.mcGoldRotate = uiCore.MovieClipManager.getGenerateMovieClipData("jbzGoldRotate");
        if(this.mcGoldRotate){
            this.addChild(this.mcGoldRotate);
            this.mcGoldRotate.scaleX=0.36;
			this.mcGoldRotate.scaleY=0.36;
        }
        this.pillarText = new egret.BitmapText();
		this.pillarText.font = uiCore.ZipManager.getFontImageMap("fishAndPillarFont_fnt");
        this.pillarText.textAlign = "center";
		this.pillarText.scaleX=0.2;
		this.pillarText.scaleY=0.2;
        this.addChild(this.pillarText);
    }
    private goldPillarReset():void{
        this.alpha=1;
        this.pillarCopy.scaleY=0;
        this.bgc2.bottom=0;
        this.bgc1.bottom=0.3;
        this.mcGoldRotate.visible=true;
        this.mcGoldRotate.x=(this.width-this.mcGoldRotate.width*0.36)/2;
        this.mcGoldRotate.y=this.height-this.mcGoldRotate.height*0.36+this.mcGoldRotate.height*0.36/6;
        this.mcGoldRotate.gotoAndPlay("start",-1);
        this.pillarText.visible=false;
        this.pillarText.x=-((this.pillarText.width*0.2-this.width)/2);
    }
    public get getRunning():boolean{
        return this.Running;
    }
    public init(money:any,fishId:number,startPoint:number,startX:number):void{
        this.Running = true;
        this.visible=true;
        if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
            money = (money/SceneManager.exchangeValue).toFixed(2);
        }
        this.pillarText.text = money;
        this.x=startX;
        this.goldPillarPlay(fishId,startPoint,startX);
    }
    private goldPillarPlay(fishId:number,startPoint:number,startX:number):void{
        this.goldPillarReset();
        let lengthValue:number=Math.min(fishId,19.5)/64;
        let lengthTime:number=Math.min(Number(fishId),30)*30;
        egret.Tween.get(this.pillarCopy).to({scaleY:lengthValue},lengthTime);
        egret.Tween.get(this.bgc1).to({bottom:this.pillar.height*lengthValue+0.3},lengthTime);
        egret.Tween.get(this.bgc2).to({bottom:this.pillar.height*lengthValue},lengthTime);
        egret.Tween.get(this.mcGoldRotate).to({y:this.height-this.pillar.height*lengthValue-this.mcGoldRotate.height*0.36},lengthTime).call(function(){
            this.mcGoldRotate.visible=false;
            this.mcGoldRotate.stop();
            this.pillarText.y=this.mcGoldRotate.y+this.pillarText.height*0.2;
            this.pillarText.visible=true;
            if(startX!=startPoint){
                egret.Tween.get(this).to({x:startPoint},FishGameManager.deltaTime*35);
            }
            egret.Tween.get(this).to({alpha:0},1000).call(this.recovery,this);
        },this);
    }
    public recovery():void{
        this.removeTween();
        this.Running = false;
        this.visible=false;
    }

    private removeTween():void{
        if(this.pillarCopy&&this.bgc1&&this.bgc2&&this.mcGoldRotate&&this){
            egret.Tween.removeTweens(this.pillarCopy);
            egret.Tween.removeTweens(this.bgc1);
            egret.Tween.removeTweens(this.bgc2);
            egret.Tween.removeTweens(this.mcGoldRotate);
            egret.Tween.removeTweens(this);
        }
    }

    public clearGoldPillar():void{
        this.removeTween();
    }

}