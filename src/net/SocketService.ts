module Net {
	export class SocketService extends egret.HashObject{
		public static instance: SocketService = new SocketService();
		private _socket: egret.WebSocket;
		private _connInfo: ConnectInfo;
		private _readBuffer: ByteArrayLittle;
		private _writeBuffer: ByteArrayLittle;
		public constructor() {
			super();
		}
		/**
		 * 是否已连接
		 */
		public get connected(): boolean {
			return this._socket && this._socket.connected;
		}

		public connect(connInfo: ConnectInfo): void {
			this.disconnect();
			
			try {
				this._connInfo = connInfo;
				
				// SocketInterface.debugLog && SocketInterface.debugLog("Connect to socket: " + this._connInfo);
				
				this.initSocket();
				var protocol = "ws://";
				if (this._connInfo.port == 0) {
					this._socket.connectByUrl(protocol + this._connInfo.host);
				} else {
					this._socket.connectByUrl(protocol + this._connInfo.host + ":" + this._connInfo.port);
				}
			}
			catch (e) {
				// SocketInterface.errorLog && SocketInterface.errorLog("Connect to socket error: " + e);
				SocketInterface.service = this;
				SocketInterface.onConnectFail && SocketInterface.onConnectFail();
			}
		}

		public disconnect(): void {
			if (!this._socket) return;
			// SocketInterface.debugLog && SocketInterface.debugLog("Disconnect socket: " + this._connInfo);
			this.onDisconnect(null);
		}

		/**
		 * 连接成功事件
		 */
		protected onConnect(evt: egret.Event): void {
			// SocketInterface.debugLog && SocketInterface.debugLog("Socket connected with: " + this._connInfo);
			SocketInterface.service = this;
			SocketInterface.onConnect && SocketInterface.onConnect();
		}

		/**
		 * 连接被断开事件
		 */
		protected onDisconnect(evt: egret.Event): void {
			this.clearSocket();
			// SocketInterface.debugLog && SocketInterface.debugLog("Socket disconnected from: " + this._connInfo);
			SocketInterface.service = this;
			if(evt){
				SocketInterface.onDisconnect && SocketInterface.onDisconnect();
			}
		}

		/**
		 * 收到数据事件
		 */
		protected onData(evt: egret.Event): void {
			this._socket.readBytes(this._readBuffer, this._readBuffer.length);
			//SocketInterface.debugLog && SocketInterface.debugLog("Receiving socket data: " + this._readBuffer.length);
			SocketInterface.service = this;
			let readContent:egret.ByteArray=new egret.ByteArray();
			let readLeng:egret.ByteArray=new egret.ByteArray();
			this._readBuffer.readBytes(readLeng,0,4);
			this._readBuffer.readBytes(readContent);
			var packet: Packet = SocketInterface.createRecvPacket() as Packet;
			packet.read(readContent);
			this.readPacket(packet);
			if (this._readBuffer && ByteArrayUtils.readAvailable(this._readBuffer) == 0) {
				this._readBuffer.length = 0;
			}
		}

		/**
		 * 连接错误事件
		 */
		protected onError(evt: egret.Event): void {
			// SocketInterface.errorLog && SocketInterface.errorLog("Socket connection error: " + evt);
			SocketInterface.service = this;
			if (this.connected) {
				SocketInterface.onError && SocketInterface.onError();
			}else {
				SocketInterface.onConnectFail && SocketInterface.onConnectFail();
			}
		}

		/**
		 * 初始化连接对象
		 */
		protected initSocket(): void {
			if (this._socket) return;
			this._socket = new egret.WebSocket();
			this._socket.type = egret.WebSocket.TYPE_BINARY;
			this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
			this._socket.addEventListener(egret.Event.CLOSE, this.onDisconnect, this);
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this._readBuffer = new ByteArrayLittle();
			this._writeBuffer = new ByteArrayLittle();
		}


		/**
		 * 清除连接对象
		 */
		protected clearSocket(): void {
			if (!this._socket) return;
			this._socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this.onDisconnect, this);
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this._socket.connected && this._socket.close();
			this._socket = null;
			this._readBuffer.clear();
			this._readBuffer = null;
			this._writeBuffer.clear();
			this._writeBuffer = null;
		}

		protected readPacket(packet: Packet):void{
			if(!packet.resultPackage){
				// SocketInterface.errorLog && SocketInterface.errorLog("readPacket resultPackage is null");
				return;
			}
			if(!packet.result){
				// SocketInterface.errorLog && SocketInterface.errorLog("readPacket result is null");
				return;
			}
					// console.log("接收："+packet.resultPackage.type);
						
			let callFun:(result:any) => void=uiCore.ProtobufManager.getReturnCallFunMap(packet.resultPackage.type);
			if(callFun==null){
				// SocketInterface.errorLog && SocketInterface.errorLog("readPacket callFun is null");
				return;
			}
			callFun(packet.result);
		}

		public sendPacket(packet: Packet): void {
			if (!this.connected) {
				// SocketInterface.errorLog && SocketInterface.errorLog("Socket not connected for sending packet");
				return;
			}
			try {
				this._writeBuffer.length = packet.content.length+4;
				this._writeBuffer.position = 0;
				this._writeBuffer.writeUnsignedInt(packet.content.length);
				this._writeBuffer.writeBytes(packet.content);
				this._socket.writeBytes(this._writeBuffer);
				this._socket.flush();
			}
			catch (e) {
				// SocketInterface.errorLog && SocketInterface.errorLog("Sending packet error: ", e);
				SocketInterface.service = this;
				SocketInterface.onSendError && SocketInterface.onSendError(e, packet);
			}
		}

		/**
		 * 释放缓存（建议定时执行）
		 */
		public clearBuffer(): void {
			if (this._readBuffer && this._readBuffer.length == 0) {
				this._readBuffer.clear();
			}
			if (this._writeBuffer) {
				this._writeBuffer.clear();
			}
		}
	}
}