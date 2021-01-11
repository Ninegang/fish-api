class CustomerChatView extends uiCore.Window {
	private btnCloseWindow: uiCore.Button;
	private copyWeChatGroup: eui.Group;
	private copyQQGroup: eui.Group;
	private lblCustomerDesc: eui.Label;
	private lblCustomerQQ: eui.Label;
	private lblCustomerWeChat: eui.Label;
	public constructor() {
		super();
		this.skinName = "CustomerChatSkin";
	}
	public start(): void {
		this.initEvent();
		var customerDesc = GameData.getInstance().GetGameConfig(KVDicKEnum.kCusServi);
		var customerArr = GameData.getInstance().GetServiceCustomer();
		this.lblCustomerDesc.text = customerDesc;
		this.lblCustomerQQ.text = customerArr != null && customerArr.length > 0 ? customerArr[0] : "";
		this.lblCustomerWeChat.text = customerArr != null && customerArr.length > 1 ? customerArr[1] : "";
	}
	public onDestroy() { 
        this.removeEvent();
		super.onDestroy();
    }
	public initEvent() {
		this.copyWeChatGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyWeChat, this);
		this.copyQQGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyQQ, this);
		this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
    }
	public removeEvent(){
		this.copyWeChatGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyWeChat, this);
		this.copyQQGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopyQQ, this);
		this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
	}
	public onBtnCloseWindow(){
		uiCore.Application.closeWindow(this);
	}
	private onBtnCopyWeChat() {
		this.copy(this.lblCustomerWeChat.text);
	}
	private onBtnCopyQQ() {
		this.copy(this.lblCustomerQQ.text);		
	}
	private copy(mes) {
		var input = document.createElement("input");
		input.value = mes;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length),
		document.execCommand('Copy');
		document.body.removeChild(input);

		uiCore.Alert.show(uiCore.LangUtils.getMsgById(4));
	}
}