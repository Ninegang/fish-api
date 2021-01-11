namespace core
{
    export class BezierSpline 
    {
        private static valLL:number[][] = [];
        private static getVal(len:number, index:number):number
        {
            let valL = BezierSpline.valLL[len];
            if (!valL)
            {
                BezierSpline.valLL[len] = valL = [];
            }
            let val = valL[index];
            if (!val)
            {
                let val1:number = 1;
                let val2:number = 1;
                while (index > 0)
                {
                    val1 *= len;
                    val2 *= index;

                    len--;
                    index--;
                }
                val = val1 / val2;
            }
            return val;
        }
        //---------------------------------------------------------------------------------------------------

        private pLen:number;
        private pL:egret.Point[];

        private tmpPoint:egret.Point;

        constructor()
        {
            this.tmpPoint = egret.Point.create(0, 0);
            this.pL = [];
        }

        private recyclePointL():void
        {
            if (this.pL && this.pL.length > 0)
            {
                for (let point of this.pL)
                {
                    egret.Point.release(point);
                }
                this.pL.length = 0;
            }
        }

        public setPoints(pL:egret.Point[]):void
        {
            this.recyclePointL();
            for (let point of pL)
            {
                this.pL.push(egret.Point.create(point.x, point.y));
            }
            
            this._length = -1;
            this.pLen = pL.length;
        }

        private _length:number = -1;
        public getLength(seg:number = 1000):number
        {
            if (this._length == -1)
            {
                this._length = 0;

                let prevPoint:egret.Point = egret.Point.create(this.pL[0].x ,this.pL[0].y);
                let nextPoint:egret.Point;
                for (let i:number = 1; i < seg; i++)
                {
                    nextPoint = this.getPointByT(i / seg);

                    this._length += egret.Point.distance(prevPoint, nextPoint);

                    prevPoint.setTo(nextPoint.x, nextPoint.y);
                }

                egret.Point.release(prevPoint);
            }
            return this._length;
        }

        public getPointByT(t:number):egret.Point
        {
            let diffVal:number = 1 - t;
            let tempP = this.tmpPoint;
            let tempPL = this.pL;
            tempP.x = tempP.y = 0;

            let tempLen:number = this.pLen - 1;
            let tempP1:egret.Point;
            let tempVal:number;
            for (let i:number = 0; i <= tempLen; i++)
            {
                tempP1 = tempPL[i];
                tempVal = Math.pow(diffVal, tempLen - i) * Math.pow(t, i) * BezierSpline.getVal(tempLen, i);
                tempP.x += tempP1.x * tempVal;
                tempP.y += tempP1.y * tempVal;
            }

            return this.tmpPoint;
        }

        public destroy():void
        {
            egret.Point.release(this.tmpPoint);

            this.recyclePointL();
            this.pL = null;
        }
    }
}