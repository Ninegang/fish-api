class HallSocketType{
	public static LOGIN:number=100; 				//登录
	public static KICK_OUT:number=101;  			//踢人
	public static OutForServer:number=102;  		//算法服务器状态
	public static LoginHall:number=103;				//登录大厅
	public static UserInfo:number=104; 				//玩家信息
	public static LoginGame:number=105; 			//登录具体游戏
	public static ExitGame:number=106; 				//退出具体游戏
	public static UpdateSystemMsg:number=107; 		//更新系统消息
	public static UpdateDataCMD:number=108; 		//更新数据命令
	public static UpDownGoldState:number=109; 		//上下分状态
	public static UpDownGold:number=110; 			//上下分
	public static GameBank:number=111; 				//银行
	public static UpDownGoldCancel:number=112;  	//上下分取消
	public static InMailMessage:number=113; 		//站内信
	public static InFormMessage:number=114; 		//系统公告
	public static InMailTrueMessage:number=115;		//是否阅读
	public static MissionMessage:number=116;		//任务
	public static LimitMessage:number=119;			//幸运报喜
	public static TipsMessage:number=120;			//提示消息
	public static FishActivityMessage:number=130;	//捕鱼福利
	public static HEARDBEAT:number=201;				//心跳
}
class FishGameContractType {
	public static DESK_LIST:number=1015;			//桌子返回
	public static LOGIJOIN_DESKN:number=1016;		//加入桌子
	public static QUIT_DESK:number=1017;			//退出桌子
	public static LOAD_COMPLETE:number=1019;		//客户端准备完成
	public static ROBOT_AGENT:number=1020;			//座位号
	public static CREATE_BULLET:number=1025;		//创建子弹
	public static FISH_GAME_SETTING:number=1027;	//第一次判断数据
	public static CANNON:number=1028;				//创建炮
	public static LOCK_FISH:number=1032;			//向服务器发送玩家锁定鱼的消息
	public static BOMB_FISH:number=1033;			//炸弹鱼
	public static CREATE_FISH:number=1034;			//接收创建鱼的消息
	public static BOSS_EAT_FISH:number=1035;		//创建boss鱼
	public static CATCH_FISH:number=1036;			//打中鱼的列表
	public static CATCH_FISH_RECORD:number=1037;	//请求捕鱼结算
	public static CREATED_FISH:number=1038;			//创建的鱼
	public static CREATE_FISH_ARRAY:number=1039;	//鱼阵 
}