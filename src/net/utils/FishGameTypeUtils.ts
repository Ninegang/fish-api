namespace Net
{
	export class FishGameTypeUtils {
		public constructor() {
		}
		public static getFishGameTypeStr(type:number,isRequest:boolean):string{
			let endStr:string="request";
			if(!isRequest){
				endStr="response";
			}
			let startStr:string=null;
			if(type==HallSocketType.LOGIN){
				startStr="login";
			}else if(type==HallSocketType.KICK_OUT){
				startStr="kickout";
			}else if(type==HallSocketType.OutForServer){
				startStr="outLinkForServer";
			}else if(type==HallSocketType.LoginHall){
				startStr="LoginHall";
			}else if(type==HallSocketType.UserInfo){
				startStr="UserInfo";
			}else if(type==HallSocketType.LoginGame){
				startStr="LoginGame";
			}else if(type==HallSocketType.ExitGame){
				startStr="ExitGame";
			}else if(type==HallSocketType.UpdateSystemMsg){
				startStr="UpdateSystemMsg";
			}else if(type==HallSocketType.UpdateDataCMD){
				startStr="UpdateDataCMD";
			}else if(type==HallSocketType.UpDownGoldState){
				startStr="UpDownGoldState";
			}else if(type==HallSocketType.UpDownGold){
				startStr="UpDownGold";
			}else if(type==HallSocketType.GameBank){
				startStr="GameBank";
			}else if(type==HallSocketType.UpDownGoldCancel){
				startStr="UpDownGoldCancel";
			}else if(type==HallSocketType.InMailMessage){
				startStr="InMailMessage";
			}else if(type==HallSocketType.InFormMessage){
				startStr="InFormMessage";
			}else if(type==HallSocketType.InMailTrueMessage){
				startStr="InMailTrueMessage";
			}else if(type==HallSocketType.MissionMessage){
				startStr="MissionMessage";
			}else if(type==HallSocketType.LimitMessage){
				startStr="LimitMessage";
			}else if(type==HallSocketType.TipsMessage){
				startStr="TipsMessage";
			}else if(type==HallSocketType.FishActivityMessage){
				startStr="FishActivityMessage";
			}else if(type==HallSocketType.HEARDBEAT){
				startStr="heardbeat";
			}else if(type==FishGameContractType.DESK_LIST){
				startStr="DeskRpc";
			}else if(type==FishGameContractType.LOGIJOIN_DESKN){
				startStr="JoinDeskRpc";
			}else if(type==FishGameContractType.QUIT_DESK){
				startStr="QuitDeskRpc";
			}else if(type==FishGameContractType.LOAD_COMPLETE){
				startStr="ClientLoadCompleteRpc";
			}else if(type==FishGameContractType.ROBOT_AGENT){
				startStr="RobotRpc";
			}else if(type==FishGameContractType.CREATE_BULLET){
				startStr="CreateBulletRpc";
			}else if(type==FishGameContractType.FISH_GAME_SETTING){
				startStr="FishGameSettingRpc";
			}else if(type==FishGameContractType.CANNON){
				startStr="CannonRpc";
			}else if(type==FishGameContractType.LOCK_FISH){
				startStr="LockFishRpc";
			}else if(type==FishGameContractType.BOMB_FISH){
				startStr="BombFishRpc";
			}else if(type==FishGameContractType.CREATE_FISH){
				startStr="CreateFishRpc";
			}else if(type==FishGameContractType.BOSS_EAT_FISH){
				startStr="EatFishRpc";
			}else if(type==FishGameContractType.CATCH_FISH){
				startStr="CatchFishRpc";
			}else if(type==FishGameContractType.CATCH_FISH_RECORD){
				startStr="GetFishCatchRecordRpc";
			}else if(type==FishGameContractType.CREATED_FISH){
				startStr="GetCreatedFishRpc";
			}else if(type==FishGameContractType.CREATE_FISH_ARRAY){
				startStr="CreateFishArrayRpc";
			}
			if(startStr!=null){
				startStr=startStr+"."+endStr;
			}
			return startStr;
		}
	}
}
