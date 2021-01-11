// TypeScript file
class FishGamegetNumView  extends uiCore.Window {
	public closebtn :uiCore.Button; 
	public Continuebtn:uiCore.Button;
	public Exitbtn:uiCore.Button;
    public downtime:eui.Label; 
	public goldnum :eui.BitmapLabel; 
	public totalgold :eui.BitmapLabel; 
	public count:any=30;
	public tipstim: egret.Timer;
	//获取服务端下发的游戏ID，
	public gameid:number ;

	private killfish01:eui.Image;
	private killfish02:eui.Image;
	private killfish03:eui.Image;
	private killfish04:eui.Image;
	private killfish05:eui.Image;
	private killfish06:eui.Image;
	private killfish07:eui.Image;
	private killfish08:eui.Image;
	private killfish09:eui.Image;
	private killfish10:eui.Image;
	private killfish11:eui.Image;
	private killfish12:eui.Image;
	private killfish13:eui.Image;
	private killfish14:eui.Image;
	private killfish15:eui.Image;
	private killfish16:eui.Image;
	private killfish17:eui.Image;
	private killfish18:eui.Image;
	private killfish19:eui.Image;
	private killfish20:eui.Image;
	private killfish21:eui.Image;
	private killfish22:eui.Image;
	private killfish23:eui.Image;
	private killfish24:eui.Image;
	private killfish25:eui.Image;
	private killfish26:eui.Image;
	private killfish27:eui.Image;

	private killfish01Label:eui.Label;
	private killfish02Label:eui.Label;
	private killfish03Label:eui.Label;
	private killfish04Label:eui.Label;
	private killfish05Label:eui.Label;
	private killfish06Label:eui.Label;
	private killfish07Label:eui.Label;
	private killfish08Label:eui.Label;
	private killfish09Label:eui.Label;
	private killfish10Label:eui.Label;
	private killfish11Label:eui.Label;
	private killfish12Label:eui.Label;
	private killfish13Label:eui.Label;
	private killfish14Label:eui.Label;
	private killfish15Label:eui.Label;
	private killfish16Label:eui.Label;
	private killfish17Label:eui.Label;
	private killfish18Label:eui.Label;
	private killfish19Label:eui.Label;
	private killfish20Label:eui.Label;
	private killfish21Label:eui.Label;
	private killfish22Label:eui.Label;
	private killfish23Label:eui.Label;
	private killfish24Label:eui.Label;
	private killfish25Label:eui.Label;
	private killfish26Label:eui.Label;
	private killfish27Label:eui.Label;

	public constructor(gameid:number) {
		super()
		this.skinName = "FishGameNumfish";
		this.gameid=gameid   
	} 
	 public start(){
		this.initEvent();  
	 }
	public initEvent(){
		this.downtime.text="30"; 
		var goldNum:any=GameData.getInstance().userData("gold_num");
		if(goldNum>=0){
			if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
				goldNum = (goldNum/SceneManager.exchangeValue).toFixed(2);
			}
			this.goldnum.text = goldNum;
		}
		this.tipstim  = new egret.Timer(1000,30);		
		this.tipstim.addEventListener(egret.TimerEvent.TIMER,this.FishtipsLable ,this); 
		this.tipstim.start();   
		this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this); 
		this.Continuebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuebtn, this); 
		this.Exitbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitgamebtn, this); 
	} 
	public getCathFishNum(fishnum) {  
		for (var i = 1; i < (fishnum.FishCatchRecord.length); i++) { 
			var indexStr:string=i<10?"0"+i:i+"";
			this["killfish"+indexStr+"Label"].text=fishnum.FishCatchRecord[i - 1];
			if(this["killfish"+indexStr+"Label"].text!="0"){
				this["killfish"+indexStr].source="killfish_"+indexStr;
			}
		}
		if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
			fishnum.TotalCatchMoney = (fishnum.TotalCatchMoney/SceneManager.exchangeValue).toFixed(2);
		}
		this.totalgold.text = fishnum.TotalCatchMoney;
	}
	public FishtipsLable():void{ 
		this.downtime.text=""+ this.count--; 
		if (this.count==0){
			uiCore.Application.closeWindow(this);  
		}
	}
	public onClosebtn(){
		uiCore.Application.closeWindow(this);
	}
	public onExitgamebtn(){
		uiCore.Application.closeWindow(this);
		uiCore.Application.closeGameSetTime();
		FishGameController.sendQuitDesk();	 
		uiCore.SoundByteManager.playMusic("BgMusic");
	}
	public onContinuebtn(){
		 uiCore.Application.closeWindow(this);
		 this.count=30;
	}
	public removeEvent(){
		if(this.tipstim){
			this.tipstim.stop();         
			this.tipstim.removeEventListener(egret.TimerEvent.TIMER, this.FishtipsLable, this);
		}    
		this.closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosebtn, this); 
		this.Continuebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuebtn, this); 
		this.Exitbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitgamebtn, this);   	
}
	public onDestroy() { 
        this.removeEvent();
		super.onDestroy();
    }
}