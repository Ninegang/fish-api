namespace uiCore {
	export class CircleUtils {
		private static resultPoint:egret.Point=new egret.Point();
		public constructor() {
			
		}
		public static getCirclePoint(centerPoint:egret.Point,radius:number,angle:number):egret.Point{
			this.resultPoint.x=centerPoint.x + radius * Math.cos(angle * Math.PI / 180);
			this.resultPoint.y=centerPoint.y + radius * Math.sin(angle * Math.PI / 180);
			return this.resultPoint;
		}
	}
}