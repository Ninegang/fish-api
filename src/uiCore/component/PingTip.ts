     /**
	 * 延迟提示组件
	 */
class PingTip extends uiCore.ItemView {
    public static ping: number = 0;
    public pingImage: eui.Image;
    public pingLable: eui.Label;
    private localTime=0;
    private colors: Array<any> = ['0xa6aaaf', '0xf00000', '0xc46a39', '0xc6c05e', '0x30ca4f', '0x28fb47']
    public constructor() {
        super();
        this.skinName = "PingTipSkin";
    }
    public start(): void {
        this.PingChange(PingTip.ping);
        this.pingImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPingtBtn, this);
        this.localTime=egret.getTimer();
        this.pingLable.text=uiCore.LangUtils.getMsgById(20)+" 3500ms"
    }
    public dataChanged(): void {
    }
    public setSelect(selected: boolean): void {
    }
    public PingChange(nowPing: number) {
        if (nowPing < 0) {
            this.pingImage.source = "lv0";
            this.pingLable.text=uiCore.LangUtils.getMsgById(19);
            this.pingLable.textColor=this.colors[0];
        } else {
            if (nowPing < 100) {
                this.pingImage.source = "lv5";
                this.pingLable.textColor=this.colors[5];
            } else if (nowPing < 200) {
                this.pingImage.source = "lv4";
                this.pingLable.textColor=this.colors[4];
            } else if (nowPing < 500) {
                this.pingImage.source = "lv3";
                this.pingLable.textColor=this.colors[3];
            } else if (nowPing < 1000) {
                this.pingImage.source = "lv2";
                this.pingLable.textColor=this.colors[2];
            } else if (nowPing < 3000) {
                this.pingImage.source = "lv1";
                this.pingLable.textColor=this.colors[1];
            } else {
                this.pingImage.source = "lv1";
                this.pingLable.textColor=this.colors[1];
            }
            this.pingLable.text=uiCore.LangUtils.getMsgById(20)+" "+nowPing+"ms";
        }

        PingTip.ping = nowPing;

    }
    public onPingtBtn(){
        // if(egret.getTimer()-this.localTime<=500){
        //     return;
        // }else{
        //     this.localTime=egret.getTimer();
        // }
        // this.PingChange(uiCore.Utils.getRandom(-100,5000));
    }
}