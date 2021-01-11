module Net {

	export class SocketInterface {
		/**
		 * 当前Socket通讯服务对象（调用自定义接口前会先设置，errorLog和debugLog除外）
		 */
		public static service: SocketService;

		/**
		 * 连接成功处理，格式为：function():void
		 */
		public static onConnect: Function;

		/**
		 * 连接失败处理，格式为：function():void
		 */
		public static onConnectFail: Function;

		/**
		 * 连接被断开处理，格式为：function():void
		 */
		public static onDisconnect: Function;

		/**
		 * 连接错误处理，格式为：function():void
		 */
		public static onError: Function;

		/**
		 * 发送数据包错误处理，格式为：function( error:Error, packet:Packet ):void
		 */
		public static onSendError: Function;

		/**
		 * 接收数据包错误处理（必须），格式为：function( error:Error, packet:Packet, data:ByteArray ):void
		 */
		public static onRecvError: Function;

		/**
		 * 创建接收数据包（必须），格式为：function():Packet
		 */
		public static createRecvPacket: Function = function (): Packet {
			return new Packet;
		}

		/**
		 * 输出错误日志，格式为：function( msg:string ):void
		 */
		public static errorLog: Function = console.log;

		/**
		 * 输出调试日志，格式为：function( msg:string ):void
		 */
		public static debugLog: Function = console.log;
	}
}