var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CustomerChatView = (function (_super) {
    __extends(CustomerChatView, _super);
    function CustomerChatView() {
        var _this = _super.call(this) || this;
        _this.skinName = "CustomerChatSkin";
        return _this;
    }
    CustomerChatView.prototype.start = function () {
        this.initEvent();
        var customerDesc = GameData.getInstance().GetGameConfig(KVDicKEnum.kCusServi);
        var customerArr = GameData.getInstance().GetServiceCustomer();
        this.lblCustomerDesc.text = customerDesc;
        this.lblCustomerQQ.text = customerArr != null && customerArr.length > 0 ? customerArr[0] : "";
        this.lblCustomerWeChat.text = customerArr != null && customerArr.length > 1 ? customerArr[1] : "";
    };
    CustomerChatView.prototype.onDestroy = function () {
        this.removeEvent();
        _super.prototype.onDestroy.call(this);
    };
    CustomerChatView.prototype.initEvent = function () {
        this.copyWeChatGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyWeChat, this);
        this.copyQQGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyQQ, this);
        this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
    };
    CustomerChatView.prototype.removeEvent = function () {
        this.copyWeChatGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyWeChat, this);
        this.copyQQGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyQQ, this);
        this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
    };
    CustomerChatView.prototype.onBtnCloseWindow = function () {
        uiCore.Application.closeWindow(this);
    };
    CustomerChatView.prototype.onBtnCopyWeChat = function () {
        this.copy(this.lblCustomerWeChat.text);
    };
    CustomerChatView.prototype.onBtnCopyQQ = function () {
        this.copy(this.lblCustomerQQ.text);
    };
    CustomerChatView.prototype.copy = function (mes) {
        var input = document.createElement("input");
        input.value = mes;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        uiCore.Alert.show(uiCore.LangUtils.getMsgById(4));
    };
    return CustomerChatView;
}(uiCore.Window));
__reflect(CustomerChatView.prototype, "CustomerChatView");
//# sourceMappingURL=CustomerChatView.js.map