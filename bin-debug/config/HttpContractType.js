var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpContractType = (function () {
    function HttpContractType() {
    }
    HttpContractType.FAST_LOGIN = 1004; //快速登录
    HttpContractType.OpenControl = 1101; //游戏开放控制
    // public static GameServerInfo:number = 1102;    //请求游戏列表
    HttpContractType.ModifyPassword = 1112; //修改密码
    HttpContractType.GetKeyConfig = 1134; // 获取键值对配置
    HttpContractType.GetServiceCustomer = 1121; // 获取客服联系方式
    HttpContractType.RequireGoodsList = 1103; //充值，获取支付类型渠道
    return HttpContractType;
}());
__reflect(HttpContractType.prototype, "HttpContractType");
//# sourceMappingURL=HttpContractType.js.map