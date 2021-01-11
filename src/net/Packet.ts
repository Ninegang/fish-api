module Net {
	export class Packet extends egret.HashObject{
		private _content:egret.ByteArray;
		private _resultPackage:any;
		private _result:any;
		public constructor() {
			super();
			this._content = new ByteArrayLittle();
		}

		public get content():egret.ByteArray{
			return this._content;
		}

		public get resultPackage():any{
			return this._resultPackage;
		}

		public get result():any{
			return this._result;
		}

		public read(buffer:egret.ByteArray):void{
			var unpackBuffer=uiCore.ProtobufManager.spObject.unpack(buffer.bytes);
			this._resultPackage = uiCore.ProtobufManager.spObject.decode("package", unpackBuffer);
			var used_sz = uiCore.ProtobufManager.spObject.objlen("package", unpackBuffer);
            var leftbuffer = unpackBuffer.slice(used_sz, unpackBuffer.length);
			var key:string=FishGameTypeUtils.getFishGameTypeStr(this._resultPackage.type,false);
			if(key==null){
				// Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("NO read key: " + this);
				return;
			}
			this._result=uiCore.ProtobufManager.spObject.decode(key, leftbuffer);
			// if(buffer.length>2048){
			// 	console.log("超级长度："+buffer.length);
			// 	for(let key in this._result){
			// 		console.log(key + '---' + this._result[key])
			// 	} 
			// 	console.log("----------------------------------------");
			// }
		}

		public write(serverId:number,playerId:string,type:number,content:any={}):void{
			if(!uiCore.ProtobufManager.spObject){
				// Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("Write packet content error: " + this);
				return;
			}
			var header = {
				playerId : playerId,
				type : type,
				serverId : serverId
			};
			var header_buffer = uiCore.ProtobufManager.spObject.encode("package", header);
			var key:string=FishGameTypeUtils.getFishGameTypeStr(type,true);
			if(key==null){
				// Net.SocketInterface.errorLog && Net.SocketInterface.errorLog("NO write key: " + this);
				return;
			}
			var data_buffer = uiCore.ProtobufManager.spObject.encode(key,content);
			var pack_buffer = uiCore.ProtobufManager.spObject.pack(utils.arrayconcat(header_buffer,data_buffer));
			this._content=new egret.ByteArray(new Uint8Array(pack_buffer));
		}
	}
}