enum KVDicKEnum {
	kIcon,				// logo
	kName,				// 游戏名称
	kRechServi,			// 充值提示
	kExchServi,			// 兑换提示
	kCusServi,			// 客服提示
	kLinkCusServi,		// 客服Url
	kCantShopMsg,		// 商城统一引导标识
	kFristRech,			// 首充图片
	kQQCusServiQR,		// QQ客服图片
	kWxCusServiQr,		// 微信客服图片
	kVitalNotif,		// 重要公告
	kBankCardInfoMsg,	// 银行卡提示
}

class GameData{ 
    private static instance: GameData;
    /**
	 * 键值对数据
	 */
	private _KVDic: Array<any>;
	/**
	 * 客服联系方式, 0.QQ 1.微信
	 */
	private _ServiceCustomer: Array<string>;

	private constructor() {
		this._KVDic = [];
	} 
	public static getInstance(): GameData {
		if (!GameData.instance) {
			GameData.instance = new GameData();
			GameData.instance.requestKVDicData();
		}
		return GameData.instance;
	}

     private _userData:Map<any> = {};   
     public userData(key): any {
         if (this._userData[key] != "undefined"){
            return this._userData[key];
         }
         return null;
     }
     public setUserData(key: string, val: any) {
         this._userData[key] = val;
     }
     public clearUserData() {
         this._userData = {};
     }

     public requestLoggedInData() {
		this.requestServiceCustomerData();
	}

     private requestKVDicData() {
		var json={};
        var timeD:string=new Date().getTime()+"";
        var sign:string = uiCore.Utils.md5(HttpContractType.GetKeyConfig.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params={Protocol:HttpContractType.GetKeyConfig,Data:JSON.stringify(json),Sign:sign,Timestamp:timeD};
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url+LibCore.GameConfig.http_port+LibCore.GameConfig.http_login_url,params,egret.URLRequestMethod.POST, function (data: any) {
            var response=JSON.parse(data.Data);  
			if (response.Code == 1) {
				this._KVDic = response.List;
			}else{
				GameData.instance.requestKVDicData();
			}
        }, function () {
			egret.setTimeout(function(){
				GameData.instance.requestKVDicData();
			}, this, 1000);
        }, this);
	}

	private requestExchange(){
		
	}

    private requestServiceCustomerData() {
		var accountName = GameData.getInstance().userData("username");
		var password = GameData.getInstance().userData("passward");
		var json={AccountName:accountName, Password: password}; 
        var timeD:string=new Date().getTime()+"";
        var sign:string = uiCore.Utils.md5(HttpContractType.GetServiceCustomer.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params={Protocol:HttpContractType.GetServiceCustomer,Data:JSON.stringify(json),Sign:sign,Timestamp:timeD};
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url+LibCore.GameConfig.http_port+LibCore.GameConfig.http_login_url,params,egret.URLRequestMethod.POST, function (data: any) {
            var response=JSON.parse(data.Data);  
			if (response.Code == 1) {
				this._ServiceCustomer = response.ServiceWay.split(",", 2);
			}else{
				GameData.instance.requestServiceCustomerData();
			}
        }, function () {
			egret.setTimeout(function(){
				GameData.instance.requestServiceCustomerData();
			}, this, 1000);
        }, this);
	}

    public GetGameConfig(kEnum: KVDicKEnum): string {
		var value = "";
		this._KVDic.forEach(element => {
			if (element.ConfigKey == KVDicKEnum[kEnum])  {
				value = element.ConfigValue;
			}
		});
		return value;
	}

    public GetServiceCustomer(): Array<string> {
		return this._ServiceCustomer;
	}
}