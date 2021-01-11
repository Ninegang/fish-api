class SceneManager{
    public static gameOpenControl:Map<any>={};
    public static sceneView;
    public static tryTimer:egret.Timer;
    public static exchangeValue:number;
    public static reconnectIndex:number=0;
    public constructor() {

    }

    public static init(){
        this.tryTimer=new egret.Timer(5000, 0);
        this.tryTimer.addEventListener(egret.TimerEvent.TIMER,this.restConnect,this);
    }

    public static restConnect():void{
        this.reconnectIndex++;
        if(!this.tryTimer.running){
            uiCore.Application.addLoadding(true);
            this.tryTimer.start();
        }
        if(this.reconnectIndex>5){
            uiCore.Dialog.show(uiCore.LangUtils.getMsgById(25), () => {
			   location.reload();
            }, null, this);
            this.isNeetReconnect();
            return;
        }
        Net.GameService.connect();
    }
    public static isNeetReconnect(): void {
        this.reconnectIndex=0;
        if(this.tryTimer.running){
            this.tryTimer.stop();
            this.tryTimer.delay = 5000;
            uiCore.Application.removeLoadding();
        }
    }
    public static changeSceneView(scene, isCreate: boolean = true) {
        if (scene) {
            if (isCreate) {
                this.sceneView = new scene();
            } else {
                this.sceneView = scene;
            }
            uiCore.Application.changeScene(this.sceneView);
        }
    }
    public static UserDataChange() {
        if (this.sceneView) {
            this.sceneView.UserDataChange();
        }
    }
    public static OpenControl(): void {
        this.gameOpenControl = {};
        let agetid = GameData.getInstance().userData("agentId");
        var json = { AgentID: agetid };
        var timeD: string = new Date().getTime() + "";
        var sign: string = uiCore.Utils.md5(HttpContractType.OpenControl.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.OpenControl, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_port + LibCore.GameConfig.http_login_url, params, egret.URLRequestMethod.POST, function (data: any) {
            var response = JSON.parse(data.Data);
            if (response != null) {
                for (var i = 0; i < response.length; i++) {
                    this.gameOpenControl[response[i].GID] = response[i];
                }
                if(this.sceneView instanceof RoomSceneView){
                    this.sceneView.initRoom();
                    uiCore.Application.removeLoadding();
                }
            }else {
                SceneManager.OpenControl();
            }
        }, function () {
            egret.setTimeout(function(){
				SceneManager.OpenControl();
			}, this, 1000);
        }, this);
    }
    public static getExchange():void{
        var agetid = GameData.getInstance().userData("useragentid");
        var json = { AgentID: agetid, PayType: 0};
        var timeD: string = new Date().getTime() + "";
        var sign: string = uiCore.Utils.md5(HttpContractType.RequireGoodsList.toString() + JSON.stringify(json) + LibCore.GameConfig.http_pay_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.RequireGoodsList, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_pay_port + LibCore.GameConfig.http_login_url,params, egret.URLRequestMethod.POST, function (data: any) {
           if(data.Code==1){
               var response = JSON.parse(data.Data);
               this.exchangeValue=response.Exchange;
               SceneManager.UserDataChange();
           }else{
               SceneManager.getExchange();
           }
        }, function () {
            egret.setTimeout(function(){
				SceneManager.getExchange();
			}, this, 1000);
        }, this);
    }

    private loadDownImageIndex:number=0;

    public static loadDownImage(strUrl:string):void{
        egret.ImageLoader.crossOrigin = "anonymouse";
        var imgLoader=new egret.ImageLoader;
		imgLoader.load(strUrl);
		imgLoader.once(egret.Event.COMPLETE,function(evt:egret.Event){
			if(evt.currentTarget.data){
                this.loadDownImageIndex=0;
				let texture=new egret.Texture();
				texture.bitmapData=evt.currentTarget.data;
                uiCore.ZipManager.setSubkeyImageMap("playerHeadImage",texture);
			}else{
                this.loadDownImageIndex++;
                if(this.loadDownImageIndex<4){
                    SceneManager.loadDownImage(strUrl);
                }else{
                    this.loadDownImageIndex=0;
                }
            }
		},this);
    }
    public static getGameInfo(gameId: number): any {
        if(this.gameOpenControl[gameId]){
            let roominfo: Array<any> = this.gameOpenControl[gameId].Services;
            if (roominfo && roominfo.length >0) {
                return roominfo;
            }
        }
        return null;
    }
	 
}