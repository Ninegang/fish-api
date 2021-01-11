class GamePiPeiView extends core.BaseView
{
    public pipeiGroup:eui.Group;
public closeBtn:eui.Button;
public msgLabel:eui.Label;

    //----------------------------------------------------------------------------------------------
    /** 匹配提示动画循环 */
    protected pipeiTimeId: number = -1;
    private closeTimeId:number = -1;

    private tipIndex:number = 0;

    private cancelFn:()=>void;
    private cancelThis:any;
    
    constructor()
    {
        super();
    }

    protected initExmlOk():void
    {
        this.addEvt(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.onHidePiPei, this);
        this.msgLabel.text = "";

        this.visible = false;
    }

    private onHidePiPei(evt:egret.TouchEvent):void
    {
        if (this.cancelFn)
        {
            this.cancelFn.call(this.cancelThis);

            this.cancelFn = this.cancelThis = null;
        }

        this.hidePiPei();
    }

    public hidePiPei():void
    {
        egret.clearInterval(this.pipeiTimeId);
        this.cancelFn = this.cancelThis = null;

        this.touchChildren = false;
        egret.Tween.removeTweens(this.pipeiGroup);
        egret.Tween.get(this.pipeiGroup).to({ scaleY: 0.9, scaleX: 0.9, alpha: 0.8 }, 100).call(() => 
        {
            this.touchChildren = true;

            this.pipeiGroup.scaleX = this.pipeiGroup.scaleY = 1;
            
            this.visible = false;
        }, this);
    }

    public showPiPei(cancelFn?:()=>void, cancelThis?:any):void
    {
        this.cancelFn = cancelFn;
        this.cancelThis = cancelThis;

        this.visible = true;
        this.pipeiGroup.scaleX = this.pipeiGroup.scaleY = this.pipeiGroup.alpha = 1;
        this.tipIndex = 0;
        if (this.pipeiTimeId) 
        {
            egret.clearInterval(this.pipeiTimeId);
            this.pipeiTimeId = -1;
        }

        this.updatePiPeiTxt();
        this.pipeiTimeId = egret.setInterval(this.updatePiPeiTxt, this, 300);

        // if (Player.instance && !Player.instance["debugFlag"])
        // {
        //     this.closeBtn.visible = false;

        //     egret.clearTimeout(this.closeTimeId);
        //     this.closeTimeId = egret.setTimeout(()=>
        //     {
        //         this.closeBtn.visible = true;
        //     }, this, 8000);
        // }
    }

    private updatePiPeiTxt():void
    {
        if (this.tipIndex == 4) 
        {
            this.tipIndex = 0;
        }
        var text = "正在为您匹配牌桌\n游戏即将开始，请耐心等待";
        for (var i = 0; i < this.tipIndex; i++) 
        {
            text += ".";
        }
        this.msgLabel.text = text;

        this.tipIndex++;
    }

    protected onDestroy():void
    {
        egret.Tween.removeTweens(this.pipeiGroup);
        
        egret.clearTimeout(this.closeTimeId);
        egret.clearInterval(this.pipeiTimeId);
        this.pipeiTimeId = -1;

        super.onDestroy();
    }

}