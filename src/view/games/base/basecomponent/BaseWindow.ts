/**
 * BaseWindow
 */
class BaseWindow extends uiCore.Window{
    public constructor() {
            super();
            this.stretch();
        }
    public  closeBTN:uiCore.Button;
    public  bgRect:eui.Rect;
    public  start(){
        this.closeBTN &&　this.closeBTN.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
        this.bgRect && this.bgRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }
    public onDestroy(){
        this.closeBTN &&　this.closeBTN.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
        this.bgRect &&　this.bgRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }
}