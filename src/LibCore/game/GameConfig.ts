namespace LibCore {
	/**
	 * 游戏系统设置
	 */
	export class GameConfig {
		/**
		 * 是否开启日志
		 */
		public static useConsoleLog: boolean = true;
		/**
		* 游戏版本默认1.0.0
		* */
		public static version: string = "1.1.14";
		/**
		* 代理ID
		* */
		// public static agentid: number = 0;

		//198的代理号
		// public static agentid: number = 22;

		//测试服务器代理号
		// public static agentid: number = 31;

		//线上
		public static agentid: number = 1001;

		/** URL附带参数集 */
		public static PARAMS: Object = {};

		/** 画面最小宽度（0表示不限） */
		public static MIN_W: number = 600;

		/** 画面最小高度（0表示不限） */
		public static MIN_H: number = 400;

		/** 画面最大宽度（0表示不限） */
		public static MAX_W: number = 0;

		/** 画面最大高度（0表示不限） */
		public static MAX_H: number = 0;
		
		/** 资源根路径 */
		public static RES: string = "resource/";

		/** 资源重定向表路径（空表示无），每行定义一个，格式为：原路径+任意空白+新路径 */
		public static REDIRECT: string = null;

		/** 服务器ID */
		public static SVR_ID: number = 1;

		/** 服务端地址 */
		public static SVR_HOST: string = "test.jjby88.com";
		/** 服务端端口（可为整数或列表） */
		public static SVR_PORT: any = 39998;

		/** 数据包是否用Ctx算法加密 */
		public static CTX_PACKET: boolean = false;

		/** http根url */
		public static http_base_url:string = "http://test.jjby88.com:";
		/** http端口 */
		public static http_port:any = 8081;

		public static http_pay_port:any=8082;
		/** http登录地址 */
		public static http_login_url: string = "/api/WebApiService/ProcessBusiness";
		
		public static http_visterlogin_url : string = "http://test.jjby88.com:18000/GameApi/Visitorlogin"
		public static http_sign_key: string = "$!sad@dsf4g6r78";
		public static http_pay_key: string = "$^%fdasf@dsf3";
		//是否开启真实货币（带小数点） true开启  false关闭
		public static IsPayExchange:boolean = true;
		//是否开启快速登录按钮true开启  false关闭
		public static IsLoginOpen:boolean = true;
		//在非中文的状态下是否开启公告 true开启  false关闭
		public static IsMessageOpen:boolean = false;
		public static tipTextArray:Array<string>=["切忌心浮气躁，按照自己的原则脚踏实地的捕鱼，争取做一个好渔夫！","唯一比对手更可怕的，是你没有开出下发改变命运的子弹！","爱拼才会赢，敢下就会红！想要富！下重注~!","现在的一切美好事物，无一不是拼搏的结果！","打鱼靠技术，心态不能急躁，手不能抖！","针对不同的对手，要有不同的打法！","只要思想不滑坡，办法总比困难多！","哪家小孩天天哭？哪个牌友天天输？","需要两个实力相当的凑在一起，才能够达到神乎其技！","小输十把没关系，大赢一把就OK!!","尊重对手，就是尊重自己的钱包！","人生只有走出来的精彩，哪有等出来的辉煌！？","钱包比对手大，你就已经赢了一半了~！","胜者才有资格进入更高级的圈子！","虽然保守不是最好的策略，但冲动一定不是正确的选择！","晚一步不如早一步，心动不如行动！","游戏好似人生，该出手时就出手，不因为错过而留下遗憾！"];
	}
}
