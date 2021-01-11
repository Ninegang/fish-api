class LoginSceneView extends uiCore.Scene{
	public QuickLogin : uiCore.Button;
	public constructor() {
		super();
		this.skinName = "LoginSceneSkin";
		this.QuickLogin.skinName="public.Button12Skin";
	}

	public start(): void {
		this.initEvent();
		this.QuickLogin.label=uiCore.LangUtils.getMsgById(23);
		this.QuickLogin.visible=LibCore.GameConfig.IsLoginOpen;
	}
	public initEvent() {
		this.QuickLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.QuickLoginFunc,this);
    }

	public removeEvent() {
		this.QuickLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.QuickLoginFunc, this)
    }

    public onDestroy() {
        this.removeEvent();
		super.onDestroy();
    }
	//快速登录
	public QuickLoginFunc(){
		uiCore.Application.addLoadding();
		var json ={openIMEI:uiCore.Utils.getIMEI(),agent:LibCore.GameConfig.agentid};
		// var json ={openIMEI:"67f1b473-ee45-4fc8-ae11-efc0e1e95dc7",agent:LibCore.GameConfig.agentid};
		uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_visterlogin_url,json,egret.URLRequestMethod.POST, function (data: any) {
			if(data.code==1){
				GameData.getInstance().clearUserData();
				GameData.getInstance().setUserData("signText",data.LoginSign);
				GameData.getInstance().setUserData("username",data.AccountName); 
				GameData.getInstance().setUserData("userId",data.UserID);
				GameData.getInstance().setUserData("passward",data.Password);
				GameData.getInstance().setUserData("bankgoldnum",data.BankMoney);
				GameData.getInstance().setUserData("gold_num",data.Money);
				GameData.getInstance().setUserData("iconid",data.SystemIconID);
				GameData.getInstance().setUserData("viplevel",data.Viplevel);
				GameData.getInstance().setUserData("isnicknamechange",data.IsNickNameChange);
				GameData.getInstance().setUserData("agentId",LibCore.GameConfig.agentid);
				GameData.getInstance().setUserData("nickname", data.nickName);
				GameData.getInstance().setUserData("useragentid", data.UserAgentID);
				SceneManager.getExchange();
				GameData.getInstance().requestLoggedInData();
				this.chageScene();
				Net.GameService.connect();
				// 加载登录成功之后的数据
			}else{
				uiCore.Application.removeLoadding();
				uiCore.Alert.show(uiCore.LangUtils.getMsgById(11));		
			}
        }, function () {
			uiCore.Application.removeLoadding();
          	uiCore.Alert.show(uiCore.LangUtils.getMsgById(11));
        }, this);
		uiCore.SoundByteManager.playMusic("BgMusic");
	}

	public chageScene(){
		SceneManager.changeSceneView(MainSceneView);
	}
}