namespace core
{
    export class EventControl
    {
        private evtList:RegEventVO[];

        constructor()
        {
            this.evtList = [];
        }

        public addEvtListener(tarObj:egret.EventDispatcher, type:string, listener:(evt:egret.Event)=>void, thisObj:any):void
        {
            if (!this.hasEvt(tarObj, type, listener, thisObj))
            {
                var regEvtVo:RegEventVO = new RegEventVO();
                regEvtVo.target = tarObj;
                regEvtVo.type = type;
                regEvtVo.backFn = listener;
                regEvtVo.backThis = thisObj;
                
                this.evtList.push(regEvtVo);

                tarObj.addEventListener(type, listener, thisObj);
            }
        }

        private hasEvt(tarObj:egret.EventDispatcher, type:string, listener:(evt:egret.Event)=>void, thisObj:any):boolean
        {
            for (let evtVo of this.evtList)
            {
                if (evtVo.target == tarObj && evtVo.type == type && evtVo.backFn == listener && evtVo.backThis == thisObj)
                {
                    return true;
                }
            }
            return false;
        }

        public removeEvtListener(tarObj:egret.EventDispatcher, type:string = null, listener:(evt:egret.Event)=>void = null, thisObj:any = null):void
        {
            for (var regEvtVo of this.evtList)
            {
                if (regEvtVo.target == tarObj)
                {
                    if (type)
                    {
                        if (type == regEvtVo.type)
                        {
                            if (listener)
                            {
                                if (listener == regEvtVo.backFn)
                                {
                                    if (thisObj)
                                    {
                                        if (thisObj == regEvtVo.backThis)
                                        {
                                            this.removeRegEvtVo(regEvtVo);
                                        }
                                    }
                                    else
                                    {
                                        this.removeRegEvtVo(regEvtVo);
                                    }
                                }
                            }
                            else
                            {
                                this.removeRegEvtVo(regEvtVo);
                            }
                        }
                    }
                    else
                    {
                        this.removeRegEvtVo(regEvtVo);
                    }
                }
            }
        }

        private removeRegEvtVo(regEvtVo:RegEventVO):void
        {
            regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            
            ArrayUtil.removeObj(this.evtList, regEvtVo);
        }

        public awake():void
        {
            for (var regEvtVo of this.evtList)
            {
                regEvtVo.target.addEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
        }

        public sleep():void
        {
            for (var regEvtVo of this.evtList)
            {
                regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
        }

        public removeAll():void
        {
            for (var regEvtVo of this.evtList)
            {
                regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
            this.evtList.length = 0;
        }
    }
}