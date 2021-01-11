/**
* 主类，游戏入口
*/
class Main extends uiCore.BaseMain {
    public constructor() {
        RES.setMaxLoadingThread(6);
        uiCore.LangUtils.setLangType();
        Object.defineProperty(Data, "MsgData", {
            get: function(){
                var data;
                if(uiCore.LangUtils.getLangType() == uiCore.LangUtils.ZH_CN) {
                    data = Data.ZhMsgData;
                }
                if(uiCore.LangUtils.getLangType() == uiCore.LangUtils.EN_US) {
                    data = Data.EnMsgData;
                }
                if(uiCore.LangUtils.getLangType() == uiCore.LangUtils.TH_TH) {
                    data = Data.ThMsgData;
                }
                if(uiCore.LangUtils.getLangType() == uiCore.LangUtils.VI_VI) {
                    data = Data.ViMsgData;
                }
                if(uiCore.LangUtils.getLangType() == uiCore.LangUtils.ID_ID) {
                    data = Data.IdMsgData;
                }
                return data;
            }
        });
        super(LoadingUI,"default_"+uiCore.LangUtils.getLangType()+".res.json" + "?v=" + LibCore.GameConfig.version, LibCore.GameConfig.RES,"default.thm.json" + "?v=" + LibCore.GameConfig.version, ["preload"],uiCore.Loadding);
    }
    public start(): void {
        // let count = egret.$hashCount;
        // egret.setInterval(function(){
        //     var newCount= egret.$hashCount;
        //     var diff=newCount-count;
        //     count=newCount;
        //     console.log(diff);
        // },this,1000);
        uiCore.ComponentUtils.init("public.AlertSkin", "public.DialogSkin", "public.BannerSkin", "public.LoaddingSkin",this.afterStart,this);//初始化通用组件
    }
    public afterStart(): void {
        this.stage.maxTouches = 1;//多点触摸禁止
        this.initLocalStorage();
    }
    /*初始化本地数据，音乐，音效，震动，自动登录等*/
    private initLocalStorage(): void {
        if (egret.localStorage.getItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE) == null) {
            egret.localStorage.setItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, "0.5");
        }
        if (egret.localStorage.getItem(uiCore.SoundByteManager.FISH_SOUND_VALUE) == null) {
            egret.localStorage.setItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, "0.8");
        }
        uiCore.SoundByteManager.musicValue=uiCore.Utils.getLocalStorageItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, "Number");
        uiCore.SoundByteManager.soundValue=uiCore.Utils.getLocalStorageItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, "Number");
        // 初始化游戏必备数据
        GameData.getInstance();
        SceneManager.init();
        uiCore.ZipManager.initFont(["ttlBlueFont","ttlGreenFont","ttlPurpleFont"]);
        var self = this;
        Net.SocketInterface.onConnect = function () {
            self.onConnect();
        };
        Net.SocketInterface.onDisconnect = function () {
            self.onDisconnect();
        };
         Net.SocketInterface.onError = function () {
            self.onError();
        };
         Net.SocketInterface.onConnectFail = function () {
            self.onConnectFail();
        };
        //读取url参数
        // let LinkUrl = top.location.href;
        // console.log(LinkUrl);
        let accountName = uiCore.Utils.getQueryString("AccountName");
        let token = uiCore.Utils.getQueryString("Token");
        let gid = (uiCore.Utils.getQueryString("GameID") == null ? uiCore.Application.currGameId : parseInt(uiCore.Utils.getQueryString("GameID")));
        let agent = uiCore.Utils.getQueryString("AgentID");
        let nickName = uiCore.Utils.getQueryString("NickName");
        let iconid = uiCore.Utils.getQueryString("SystemIconID");
        let passward = uiCore.Utils.getQueryString("Password");
        let viplever =uiCore.Utils.getQueryString("Viplevel");
        let ischange =0;
        let userID =uiCore.Utils.getQueryString("UserID");
        let userType = uiCore.Utils.getQueryString("UserType");
        let bankGoldNum =0;
        let money =uiCore.Utils.getQueryString("Money");
        let playerHeadId:string = uiCore.Utils.getQueryString("icon");
        // console.log(urlData);
        // console.log(uiCore.Utils.isExistKey(urlData,"Token"));
        if (accountName != null && token != null && agent != null ) {
            // if (accountName != null && token != null && agent != null && password != null && iconid != null) {
            GameData.getInstance().clearUserData();
            // GameData.getInstance().setUserData("LinkUrl", LinkUrl);
            GameData.getInstance().setUserData("userId",userID);
            GameData.getInstance().setUserData("signText", token);
            GameData.getInstance().setUserData("username", accountName);
            GameData.getInstance().setUserData("agentId", agent);
            GameData.getInstance().setUserData("useragentid", agent);
            GameData.getInstance().setUserData("nickname", nickName);
            GameData.getInstance().setUserData("GameID", gid);
            GameData.getInstance().setUserData("UserType",userType);
            GameData.getInstance().setUserData("iconid",iconid);
            GameData.getInstance().setUserData("viplevel",viplever);
            GameData.getInstance().setUserData("passward",passward);
            GameData.getInstance().setUserData("isnicknamechange",ischange);
            GameData.getInstance().setUserData("gold_num",money);
            GameData.getInstance().setUserData("bankgoldnum",bankGoldNum);
            if(playerHeadId){
                GameData.getInstance().setUserData("playerHeadId",playerHeadId);
            }
            SceneManager.getExchange();
            // 加载登录成功之后的数据
            GameData.getInstance().requestLoggedInData();
            uiCore.Application.addLoadding();
            Net.GameService.connect();
            gid == 0 ? self.ChangeMainSceneView() : self.ChangeRoomScaneView();
        } else {
            self.goLogin();
            GameData.getInstance().setUserData("agentId", LibCore.GameConfig.agentid);
        }
    }
    //连接成功
    private onConnect(): void {
        // alert("AccountName:"+GameData.getInstance().userData("username")+"  Sign:"+GameData.getInstance().userData("signText")+" LoginDeviceID:"+uiCore.Utils.getIMEI());
        var content = { LoginModel: 1, LoginType: 2, AccountName: GameData.getInstance().userData("username"), Sign: GameData.getInstance().userData("signText"), AgentID: GameData.getInstance().userData("agentId"), LoginDeviceID: uiCore.Utils.getIMEI() };
        // var content = { LoginModel: 1, LoginType: 2, AccountName: uiCore.Utils.getIMEI(), Sign: GameData.getInstance().userData("signText"), AgentID: GameData.getInstance().userData("agentId"), LoginDeviceID: uiCore.Utils.getIMEI() };
        Net.GameService.send(HallSocketType.LoginHall, content, 0);
    }
    //连接被断开事件
    private onDisconnect(): void {
        console.log("连接被断开事件");  
        if(!SceneManager.tryTimer.running){
            SceneManager.restConnect();
        }
    }
     //正在连接时发生错误
    private onError(): void {
		uiCore.Alert.show(uiCore.LangUtils.getMsgById(1));
    }
     //发生错误断开连接
    private onConnectFail(): void {
        console.log("发生错误断开连接");
        if(!SceneManager.tryTimer.running){
            SceneManager.restConnect();
        }
    }
   
  
    private goLogin(){
        uiCore.Application.changeScene(new LoginSceneView());
    }

    private ChangeMainSceneView(){
        SceneManager.changeSceneView(MainSceneView); 
    }
    private ChangeRoomScaneView(){
        SceneManager.changeSceneView(RoomSceneView);
    }

    /**
    * 子类继承获取加载进度
    */
    protected onLoaddingProgress(percent: number, current: number, total: number): void {
        var loadingUI: LoadingUI = <LoadingUI>this.loadingUI;
        loadingUI.setProgress(percent, current, total);
    }
    /**
     * 当所有资源组加载完成
     */
    protected onAllGroupComplete(): void {
        var loadingUI: LoadingUI = <LoadingUI>this.loadingUI;  
        loadingUI.setText(uiCore.LangUtils.getMsgById(2));
        if(loadingUI.tipTextSetInterval!=null){
            egret.clearInterval(loadingUI.tipTextSetInterval);
        }
    }
}