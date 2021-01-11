namespace core
{
    export class DisplayUtil
    {
        public static removeDisplay(dis:egret.DisplayObject, parent:egret.DisplayObjectContainer=null):void
        {
            if(!dis) 
            {
                return;
            }
            if(!parent)
            {
                parent = dis.parent;
            }
            if(!parent)
            {
                return;
            } 
            parent.removeChild(dis);
        }

        public static removeAllChild(con:egret.DisplayObjectContainer):void
        {
            let childCon:egret.DisplayObject;

            while (con.numChildren > 0)
            {
                childCon = con.getChildAt(0);
                if (childCon instanceof egret.DisplayObjectContainer)
                {
                    DisplayUtil.removeAllChild(childCon);
                }

                core.DisplayUtil.removeDisplay(childCon);
            }
        }

        private static currentShowTipsGroup:egret.DisplayObject;
        public static showTips(tipsGroup:egret.DisplayObject, evt:egret.Event, isBlock:boolean = true):boolean
        {
            let tipsIndex:number = (tipsGroup["TipsIndex"] || 0) + 1;// = ++DisplayUtil.tipsIndex;
            tipsGroup["TipsIndex"] = tipsIndex;

            DisplayUtil.currentShowTipsGroup = tipsGroup;

            let thisObj:any = this;

            let isBlockTap:boolean = false;
            function onBlockTap(evt:egret.TouchEvent):void
            {
                isBlockTap = true;
            }

            function onHideTips(evt:egret.TouchEvent):void
            {
                egret.callLater(()=>
                {
                    if (isBlockTap == false)
                    {
                        hideTips();
                    }
                    isBlockTap = false;
                }, this);
            }

            function hideTips():void
            {
                tipsGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onBlockTap, thisObj);
                
                tipsGroup.removeEventListener(egret.Event.ADDED_TO_STAGE, onHideTips, thisObj);
                uiCore.Application.currentScene.stage.removeEventListener(egret.TouchEvent.TOUCH_END, onHideTips, thisObj);
                // CoreConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onHideTips, thisObj);

                if (tipsGroup["TipsIndex"] == tipsIndex)
                {
                    tipsGroup.visible = false;
                }
            }

            if (tipsGroup.visible == false)
            {
                tipsGroup.visible = true;
                evt.stopPropagation();

                if (isBlock)
                {
                    tipsGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onBlockTap, thisObj);
                }
                uiCore.Application.currentScene.stage.addEventListener(egret.TouchEvent.TOUCH_END, onHideTips, thisObj);
                // CoreConfig.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onHideTips, thisObj);
                tipsGroup.addEventListener(egret.Event.ADDED_TO_STAGE, onHideTips, thisObj);
                
                return true;
            }
            else
            {
                hideTips();
            }
            return false;
        }

        public static setImgUrl(img:eui.Image, url:string):void
        {
            img.source = null;
            img.source = url;
        }
    }
}