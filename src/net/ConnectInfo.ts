module Net
{
	export class ConnectInfo extends egret.HashObject
	{
		private _port:number = 0;
		
		constructor( host:string=null, port:any=0 )
		{
			super();
			if (host)					this.host = host;
			if (port instanceof Array)	this.ports = port;
			else if (port)				this.port = port;
		}
		
		/** 服务端地址 */
		public host:string	= "127.0.0.1";
		
		/** 可选端口列表 */
		public ports:number[] = null;
		
		/**
		 * 实际选用端口（0表示从可选端口列表中随机选择一个）
		 */
		public get port():number
		{
			if (!this._port && this.ports && this.ports.length > 0)
			{
				this._port = this.ports[Math.floor(Math.random() * this.ports.length)];
			}
			return this._port;
		}
		public set port( val:number )
		{
			this._port = val;
		}

		public toString():string
		{
			return "host=" + this.host + ",port=" + this.port;
		}
	}
}
