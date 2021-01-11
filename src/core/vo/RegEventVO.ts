namespace core
{
    export class RegEventVO
    {
        public target:egret.EventDispatcher;

        public type:string;

        public backFn:(evt:egret.Event)=>void;

        public backThis:any;

        public static create(target:egret.EventDispatcher, type:string, backFn:(evt:egret.Event)=>void, backThis:any):RegEventVO
        {
            var evtVo:RegEventVO = new RegEventVO();
            evtVo.target = target;
            evtVo.type = type;
            evtVo.backFn = backFn;
            evtVo.backThis = this;

            return evtVo;
        }
    }
}