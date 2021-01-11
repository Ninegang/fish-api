module Net {
	export class GameService extends egret.HashObject{
		public static instance:GameService = new GameService();
		private _connInfo:ConnectInfo;
		private _socketSvc:SocketService;
		public constructor() {
			super();
		}

		public get socketSvc():SocketService
		{
			if(!this._socketSvc){
				this._socketSvc = SocketService.instance;
			}
			return this._socketSvc;
		}
		public static connect():void{
			if (!GameService.instance._connInfo){
				GameService.instance._connInfo = new ConnectInfo(LibCore.GameConfig.SVR_HOST, LibCore.GameConfig.SVR_PORT);
			}
			GameService.instance.socketSvc.connect(GameService.instance._connInfo);
		}
		public static send(type:number,content:any={},serverId:number){
			// console.log("发送："+type);
			var packet: Net.Packet = Net.SocketInterface.createRecvPacket() as Net.Packet;			 
			//let serverId:number = GameData.getInstance().userData("serverId")
			packet.write(serverId,GameData.getInstance().userData("username"),type,content);
			Net.SocketService.instance.sendPacket(packet);
		}
	}
}