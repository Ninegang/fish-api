/**
 * 游戏初始的载入界面
 */
class LoadingUI extends eui.Group {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }
    private onStageResize(event: egret.Event): void {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    }
    private onRemovedFromStage(event: egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
        this.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
    }
    private labelProgress: uiCore.Label;
    private progress: eui.Image;
    private tipText:uiCore.Label;
    public tipTextSetInterval:number;
    private tipTextIndex:number=1;
    private createView(): void {
        this.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.createView, this);
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        let bg :eui.Image =new eui.Image();
        bg.source ="gamehall_loadingBg_png";
        bg.left = bg.right = bg.top = bg.bottom=0;
        this.addChild(bg);
        document.getElementsByTagName("body")[0].style.backgroundImage="none";
        if(LibCore.GameConfig.tipTextArray&&LibCore.GameConfig.tipTextArray.length>0&&uiCore.LangUtils.getLangType() == uiCore.LangUtils.ZH_CN){
            this.tipText = new uiCore.Label();
            this.tipText.bottom = 150;
            this.tipText.horizontalCenter = 0;
            this.tipText.fontFamily = "微软雅黑";
            this.tipText.size = 23;
            this.tipText.textAlign = "center";
            this.tipText.bold=true;
            this.tipText.textColor=0xfec66f;
            this.tipText.text = LibCore.GameConfig.tipTextArray[0];
            this.addChild(this.tipText);
            this.tipTextSetInterval=egret.setInterval(this.changeTipText,this,4000);
        }
        let progressBackgroud =new eui.Image();
        progressBackgroud.source = "gamehall_loadingBarBg";
        progressBackgroud.horizontalCenter = 0;
        progressBackgroud.bottom= 115;
        progressBackgroud.height = 31;
        progressBackgroud.width = 600;
        this.addChild(progressBackgroud);

        this.progress = new eui.Image();
        this.progress.source = "gamehall_loadingBar";
        this.progress.bottom= 115;
        this.progress.horizontalCenter = 0;
        this.progress.height = 31;
        this.progress.width =0;
        this.addChild(this.progress);

       
        this.labelProgress = new uiCore.Label();
        this.labelProgress.bottom=80;
        this.labelProgress.horizontalCenter = 0;
        this.labelProgress.fontFamily = "微软雅黑";
        this.labelProgress.size = 16;
        this.labelProgress.textAlign = "center";
        this.addChild(this.labelProgress);

        this.dispatchEventWith(egret.Event.COMPLETE);//告诉HowMain，加载界面初始化完成
    }

    private changeTipText(){
        this.tipText.text = LibCore.GameConfig.tipTextArray[this.tipTextIndex%LibCore.GameConfig.tipTextArray.length];
        this.tipTextIndex++;
    }

    public setProgress(percent: number, current: number = 0, total: number = 0): void {
        if(this.progress){     
            var width = this.progress.width = 6 * percent;
            this.progress.horizontalCenter = (width - 600)/2.07 ; 
            let progressMsg =uiCore.StringUtils.format(uiCore.LangUtils.getMsgById(3)+"{0}%，{1}/{2}",percent,current,total);
            this.setText(progressMsg);
        }
    }
    public setText(text: string): void {
        if (this.labelProgress) {
            this.labelProgress.text = text;
        }
    }
}