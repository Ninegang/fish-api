class CircleImage extends eui.Image{
    private startX:number;
    private startY:number;
    private centerPoint:egret.Point;
	public constructor() {
		super();
        this.centerPoint=new egret.Point();
	}

    protected createChildren():void {
    	super.createChildren();
		this.startX=this.x;
        this.startY=this.y;
    }

	public get factor():number {
        return 0;
    }

    public set factor(value:number) {
        this.centerPoint.x=this.startX-30;
        this.centerPoint.y=this.startY;
        let resultPoint:egret.Point=uiCore.CircleUtils.getCirclePoint(this.centerPoint,30,value);
        this.x = resultPoint.x;
        this.y = resultPoint.y;
    }
}