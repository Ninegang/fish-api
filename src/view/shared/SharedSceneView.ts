class SharedSceneView extends uiCore.Scene{

	private btnSetting: uiCore.Button;
	private btnGoback: uiCore.Button;
	private btnUserInfo: uiCore.Button;
	private backScene: uiCore.Scene;
	private btnCustomer: uiCore.Button;
	private nickname:eui.Label;
	private userID :eui.Label;
	private goldnum :eui.Label;
	private pingView : PingTip;
	// private btnTopCustomer: uiCore.Button;
	private btnTopSetting: uiCore.Button;
	private callback: () => void;

	public noticeItemGroup: eui.Group;
	public noticeScroller: eui.Scroller;
	public noticeLabel: eui.Label;
	private kStaticUserIcon = "player_icon_";
	public constructor() {
		super();
		this.skinName = "SharedSceneSkin";  
	}

	public start(): void {
		this.initEvent();
		var flag:boolean=true;
		if(uiCore.LangUtils.getLangType()!=uiCore.LangUtils.ZH_CN&&!LibCore.GameConfig.IsMessageOpen){
			flag=false;
		}
		this.noticeItemGroup.visible=flag;
		if(flag){
			SystemMsg.getInstance().skin(this.noticeItemGroup, this.noticeLabel, this.noticeScroller);
		}
		if(GameData.getInstance().userData("playerHeadId")){
			this.btnUserInfo.iconDisplay.source = GameData.getInstance().userData("playerHeadId");
		}else{
			this.btnUserInfo.iconDisplay.source = this.kStaticUserIcon + GameData.getInstance().userData("iconid");
		}
	}
	// private playerHeadImageIndex:number=0;
	// private playerHeadImageTime:number;
	// private setPlayerHeadImage():void{
	// 	if(uiCore.ZipManager.getSubkeyImageMap("playerHeadImage")){
	// 		this.btnUserInfo.iconDisplay.source = uiCore.ZipManager.getSubkeyImageMap("playerHeadImage");
	// 		this.playerHeadImageIndex=0;
	// 		this.playerHeadImageTime=null;
	// 	}else{
	// 		this.playerHeadImageIndex++;
	// 		if(this.playerHeadImageIndex<10){
	// 			this.playerHeadImageTime=egret.setTimeout(function () {
	// 				this.setPlayerHeadImage();
	// 				this.playerHeadImageTime=null;
	// 			}, this, 1000); 
	// 		}else{
	// 			this.btnUserInfo.iconDisplay.source = this.kStaticUserIcon + GameData.getInstance().userData("iconid");
	// 			this.playerHeadImageIndex=0;
	// 			this.playerHeadImageTime=null;
	// 		}
	// 	}
	// }
	
	public UserDataChange():void{
		this.userID.text ="ID:"+GameData.getInstance().userData("userId");
		this.nickname.text = GameData.getInstance().userData("nickname");
		var goldNum:any=GameData.getInstance().userData("gold_num");
		if(goldNum>=0){
			if(LibCore.GameConfig.IsPayExchange&&SceneManager.exchangeValue){
				goldNum = (goldNum/SceneManager.exchangeValue).toFixed(2);
			}
			this.goldnum.text = goldNum;
		}
	}

	public initEvent() {
		this.btnTopSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSettingClick, this);
		this.btnGoback.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBackClick, this);
		// this.btnTopCustomer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCustomerClick, this);
    }

	public removeEvent() { 
		this.btnTopSetting.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSettingClick, this);
		this.btnGoback.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBackClick, this);
		// this.btnTopCustomer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCustomerClick, this);
    }

    public onDestroy() {
		// if(this.playerHeadImageTime!=null){
		// 	egret.clearTimeout(this.playerHeadImageTime);
		// 	this.playerHeadImageTime=null;
		// }
        this.removeEvent();
		super.onDestroy();
    }

	public onBtnSettingClick():void{ 
		uiCore.Application.addWindow(new SettingWindow());
	}

	private onBtnCustomerClick() {
		uiCore.Application.addWindow(new CustomerChatView());
	}

	public onBtnBackClick():void {
		if(this.backScene){
			SceneManager.changeSceneView(this.backScene);
		}else{
			location.reload();
		}
		
		if (this.callback) this.callback();
	}

	public setBackScene(scene: any, callback: () => void): void {
		this.backScene = scene;
		this.callback = callback;
	}

	public setBtnGobackState(isEnabled:boolean):void{
		this.btnGoback.visible=isEnabled;
	}
}