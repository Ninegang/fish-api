namespace core
{
    export class Drag
    {
        private static _inst:Drag;
        public static get inst():Drag
        {
            if (!Drag._inst)
            {
                Drag._inst = new Drag();
            }
            return Drag._inst;
        }

        //---------------------------------------------------------------------------------------------------------------------------
        private stage:egret.Stage;

        private disObj:egret.DisplayObject;
        private startPointA:egret.Point;
        private startPointB:egret.Point = new egret.Point();
        private rect:egret.Rectangle;
        private moveFn:(disObj:egret.DisplayObject)=>void;
        private moveEnd:(disObj:egret.DisplayObject)=>void;

        private tmpPoint:egret.Point = new egret.Point();
        public setup(stage:egret.Stage):void
        {
            this.stage = stage;
        }

        public start(disObj:egret.DisplayObject, startPoint:egret.Point, rect:egret.Rectangle, moveEnd:(disObj:egret.DisplayObject)=>void, moveFn:(disObj:egret.DisplayObject)=>void = null):void
        {
            this.disObj = disObj;
            this.startPointA = startPoint.clone();
            this.rect = rect;
            this.moveFn = moveFn;
            this.moveEnd = moveEnd;

            this.startPointB.x = this.disObj.x;
            this.startPointB.y = this.disObj.y;
            
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMoveEnd, this);
        }

        private onMove(evt:egret.TouchEvent):void
        {
            this.tmpPoint.x = (evt.stageX - this.startPointA.x) + this.startPointB.x;
            this.tmpPoint.y = evt.stageY - this.startPointA.y + this.startPointB.y;


            if (this.tmpPoint.x < this.rect.x)
            {
                this.disObj.x = this.rect.x;
            }
            else if (this.tmpPoint.x > this.rect.right)
            {
                this.disObj.x = this.rect.right;
            }
            else 
            {
                this.disObj.x = this.tmpPoint.x;
            }
            
            if (this.tmpPoint.y < this.rect.y)
            {
                this.disObj.y = this.rect.y;
            }
            else if (this.tmpPoint.y > this.rect.bottom)
            {
                this.disObj.y = this.rect.bottom;
            }
            else 
            {
                this.disObj.y = this.tmpPoint.y;
            }

            if (this.moveFn)
            {
                this.moveFn(this.disObj);
            }
        }

        private onMoveEnd(evt:egret.Event):void
        {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMoveEnd, this);

            if (this.moveEnd)
            {
                this.moveEnd(this.disObj);
            }

            this.disObj = null;
            this.moveFn = null;
            this.moveEnd = null;
            this.rect = null;
        }
    }
}