/**
 * 倒计时进度条
 * @author none
 */
class CommonProgressTimer extends eui.Image {
    public shape: egret.Shape;
    public shapeX: number = 0;
    public shapeY: number = 0;
    private _value: number = 0;
    public widthNum: number = 0.6
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        var isChanged: boolean = this._value != value;
        this._value = value;
        if (isChanged) {
            this.updateNow();
        }
    }
    public childrenCreated(): void {
        this.shapeX = this.x + this.width / 2;
        this.shapeY = this.y + this.height / 2;
    }
    /**
     * 实时更新进度显示
     */
    public updateNow(): void {
        this.visible = this.value != 0;
        if (this.shape) {
            this.parent.removeChild(this.shape);
        }
        var percent: number = this.value / 100 * 360;//从无到有
        this.shape = uiCore.DisplayUtils.getSector(this.width * this.widthNum, 0, percent);
        this.shape.rotation = -90;
        this.shape.x = this.shapeX;
        this.shape.y = this.shapeY;
        this.parent.addChild(this.shape);
        this.mask = this.shape;
    }

}
