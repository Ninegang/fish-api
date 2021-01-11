class MainSceneView extends uiCore.Scene{
	public goRoom: uiCore.Button;
	public goDSRoom: uiCore.Button;
	public sharedHeader: SharedSceneView;
	public btnLanguage: uiCore.Button;
	public constructor() {
		super();
		this.skinName = "MainSceneSkin";
	}

	public start(): void {
		this.initEvent();
		this.UserDataChange();
	}
	public UserDataChange():void{
		this.sharedHeader.UserDataChange();
	}


	public initEvent() {
        this.goRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoRoomClick, this);
		this.goDSRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoDSRoomClick, this);
		this.btnLanguage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLanguageClick, this);
    }

	public onGoRoomClick(){

		if (SceneManager.getGameInfo(uiCore.Application.currGameId) == null) {
			uiCore.Alert.show(uiCore.LangUtils.getMsgById(16));
			return;
		}

		SceneManager.changeSceneView(RoomSceneView);
		//this.sharedHeader.validateProperties();//     validateNow..sys.Validator.validateClient();
		GameData.getInstance().setUserData("GameID",uiCore.Application.currGameId);
	}

	public onGoDSRoomClick(){
		uiCore.Application.currGameId=30300101;
		if (SceneManager.getGameInfo(uiCore.Application.currGameId) == null) {
			uiCore.Alert.show(uiCore.LangUtils.getMsgById(16));
			return;
		}
		
		SceneManager.changeSceneView(RoomSceneView);
		//this.sharedHeader.validateProperties();//     validateNow..sys.Validator.validateClient();
		GameData.getInstance().setUserData("GameID",uiCore.Application.currGameId);
	}

	public onLanguageClick(): void {
        if (uiCore.LangUtils.getLangType() == uiCore.LangUtils.EN_US) {
            uiCore.Dialog.show("Make sure to switch to Chinese version ?", () => {
                uiCore.LangUtils.setLangType(uiCore.LangUtils.ZH_CN);
				location.reload();
            }, null, this);
        } else {
            uiCore.Dialog.show("确定切换到英文版本 ?", () => {
               uiCore.LangUtils.setLangType(uiCore.LangUtils.EN_US);
			   location.reload();
            }, null, this);
        }
    }

	public removeEvent() {
        this.goRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoRoomClick, this);
		this.btnLanguage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLanguageClick, this);
    }

    public onDestroy() {
        this.removeEvent();
		super.onDestroy();
    }
}