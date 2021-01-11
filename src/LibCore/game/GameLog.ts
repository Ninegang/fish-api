namespace LibCore
{
	/**
	 * 游戏日志记录
	 * @author
	 * @version	2017/7/11
	 */	
	export class GameLog
	{
		/** 是否启用 */
		public static enabled:boolean = LibCore.GameConfig.useConsoleLog;
		
		/** 是否输出警告日志 */
		public static outputWarning:boolean = LibCore.GameConfig.useConsoleLog;
		
		/** 是否输出调试日志 */
		public static outputDebug:boolean = false;
		
		/**
		 * 记录日志
		 * @param prefix	日志前缀
		 * @param fields	日志字段列表
		 */		
		private static _log( prefix:string, fields:any[] ):void
		{
			// console.log(prefix + fields.join(" "));
		}

		/**
		 * 记录日志
		 * @param prefix	日志前缀
		 * @param fields	日志字段列表
		 */		
		public static log( ...args:any[] ):void
		{
			this.enabled && this._log("[LOG] ", args);
		}
		
		/**
		 * 错误日志
		 */
		public static error( ...args:any[] ):void 
		{
			this.enabled && this._log("[**ERROR**] ", args);
		}

		/**
		 * 警告日志
		 */
		public static warning( ...args:any[] ):void 
		{
			this.enabled && this.outputWarning && this._log("[!WARNING!] ", args);
		}

		/**
		 * 信息日志
		 */
		public static info( ...args:any[] ):void 
		{
			this.enabled && this._log("[INFO] ", args);
		}

		/**
		 * 调试日志
		 */
		public static debug( ...args:any[] ):void 
		{
			this.enabled && this.outputDebug && this._log("[DEBUG] ", args);
		}
	}
}