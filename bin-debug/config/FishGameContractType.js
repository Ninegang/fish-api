var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HallSocketType = (function () {
    function HallSocketType() {
    }
    HallSocketType.LOGIN = 100; //登录
    HallSocketType.KICK_OUT = 101; //踢人
    HallSocketType.OutForServer = 102; //算法服务器状态
    HallSocketType.LoginHall = 103; //登录大厅
    HallSocketType.UserInfo = 104; //玩家信息
    HallSocketType.LoginGame = 105; //登录具体游戏
    HallSocketType.ExitGame = 106; //退出具体游戏
    HallSocketType.UpdateSystemMsg = 107; //更新系统消息
    HallSocketType.UpdateDataCMD = 108; //更新数据命令
    HallSocketType.UpDownGoldState = 109; //上下分状态
    HallSocketType.UpDownGold = 110; //上下分
    HallSocketType.GameBank = 111; //银行
    HallSocketType.UpDownGoldCancel = 112; //上下分取消
    HallSocketType.InMailMessage = 113; //站内信
    HallSocketType.InFormMessage = 114; //系统公告
    HallSocketType.InMailTrueMessage = 115; //是否阅读
    HallSocketType.MissionMessage = 116; //任务
    HallSocketType.LimitMessage = 119; //幸运报喜
    HallSocketType.TipsMessage = 120; //提示消息
    HallSocketType.FishActivityMessage = 130; //捕鱼福利
    HallSocketType.HEARDBEAT = 201; //心跳
    return HallSocketType;
}());
__reflect(HallSocketType.prototype, "HallSocketType");
var FishGameContractType = (function () {
    function FishGameContractType() {
    }
    FishGameContractType.DESK_LIST = 1015; //桌子返回
    FishGameContractType.LOGIJOIN_DESKN = 1016; //加入桌子
    FishGameContractType.QUIT_DESK = 1017; //退出桌子
    FishGameContractType.LOAD_COMPLETE = 1019; //客户端准备完成
    FishGameContractType.ROBOT_AGENT = 1020; //座位号
    FishGameContractType.CREATE_BULLET = 1025; //创建子弹
    FishGameContractType.FISH_GAME_SETTING = 1027; //第一次判断数据
    FishGameContractType.CANNON = 1028; //创建炮
    FishGameContractType.LOCK_FISH = 1032; //向服务器发送玩家锁定鱼的消息
    FishGameContractType.BOMB_FISH = 1033; //炸弹鱼
    FishGameContractType.CREATE_FISH = 1034; //接收创建鱼的消息
    FishGameContractType.BOSS_EAT_FISH = 1035; //创建boss鱼
    FishGameContractType.CATCH_FISH = 1036; //打中鱼的列表
    FishGameContractType.CATCH_FISH_RECORD = 1037; //请求捕鱼结算
    FishGameContractType.CREATED_FISH = 1038; //创建的鱼
    FishGameContractType.CREATE_FISH_ARRAY = 1039; //鱼阵 
    return FishGameContractType;
}());
__reflect(FishGameContractType.prototype, "FishGameContractType");
//# sourceMappingURL=FishGameContractType.js.map