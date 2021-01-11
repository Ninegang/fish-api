class FishGameRateView extends uiCore.Window {
	public closebtn :uiCore.Button;
	//获取服务端下发的游戏ID，
	public gameid:number ;
	public constructor(gameid:number) {
		super()
		this.skinName = "FishGameRateSkin";
		this.gameid=gameid
	}
	 public childrenCreated(): void { 
		let icon:eui.Image=new eui.Image();
		//图片命名与ID重合
		icon.source=this.gameid+"rate_png"; 
		this.addChild(icon); 
		icon.width=900;
		icon.height=500;
		icon.horizontalCenter=0.5; 
		icon.verticalCenter=-16;
     	this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);
    }
	public onClosebtn(){
		uiCore.Application.closeWindow(this);
	}
	public removeEvent(){
		this.closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this);   
	}
	public onDestroy() { 
        this.removeEvent();
		super.onDestroy();
    }
}