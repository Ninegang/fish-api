namespace core 
{
    export class CircleMask extends egret.Shape
    {
        private size:number;
        constructor(size:number)
        {
            super();

            this.size = size;

            this.setRate(0);
        }

        public setRate(rate:number):void
        {
            var tmpAngle:number = Math.min(1, rate) * 2 * Math.PI;
            this.graphics.clear();
            this.graphics.beginFill(0xff0000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(0, -this.size);
            this.graphics.drawArc(0, 0, this.size, 0, tmpAngle, true);
            this.graphics.lineTo(0, 0);
            this.graphics.endFill();
        }
    }
}