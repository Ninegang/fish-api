module net {
	export class RestConnect {
		public constructor() {
			
		}
		public static RestConnectHttp(){
			var json ={openIMEI:uiCore.Utils.getIMEI(),agent:LibCore.GameConfig.agentid};
			uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_visterlogin_url,json,egret.URLRequestMethod.POST, function (data: any) {
				if(data.code==1){
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
					GameData.getInstance().requestLoggedInData();
					Net.GameService.connect();
				}else{
					net.RestConnect.RestConnectHttp();
				}
			}, function () {
				egret.setTimeout(function(){
					net.RestConnect.RestConnectHttp();
				}, this, 1000);
			}, this);
		}
	}
}