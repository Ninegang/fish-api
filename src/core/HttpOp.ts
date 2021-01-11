namespace core
{
    export class HttpOp 
    {
        public static reqHttp(addr:string, param: string, method:string, okFn?: (resp: any) => void, okThis?: any, errFn:() => void = null, errThis:any = null):HttpOp
        {
            var httpOp:HttpOp = new HttpOp();
            var url:string;
            
            if (method == egret.HttpMethod.POST)
            {
                httpOp.retPost(addr, param, okFn, okThis, errFn, errThis);
            }
            else
            {
                if (param) 
                {
                    url = `${addr}?${param}`;
                }
                else 
                {
                    url = addr;
                }
                httpOp.reqGet(url, okFn, okThis, errFn, errThis);
            }

            return httpOp;
        }

        //-------------------------------------------------------------------------------------------------------------------
        private okFn:(resp:string)=>void;
        private okThis:any;
        private errFn:()=>void;
        private errThis:any;

        private httpReq:egret.HttpRequest;

        public constructor()
        {

        }

        private initParam(okFn:(resp:string)=>void, okThis:any, errFn:()=>void, errThis:any):void
        {
            this.okFn = okFn;
            this.okThis = okThis;
            this.errFn = errFn;
            this.errThis = errThis;
        }

        public retPost(url:string, param:string, okFn:(resp:string)=>void, okThis:any, errFn:()=>void, errThis:any):void
        {
            this.initParam(okFn, okThis, errFn, errThis);

            this.httpReq = new egret.HttpRequest;
            this.httpReq.responseType = egret.HttpResponseType.TEXT;
            this.httpReq.open(url, egret.HttpMethod.POST);
            this.httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);

            this.httpReq.send(param);
        }

        public reqGet(url:string, okFn:(resp:string)=>void, okThis:any, errFn:()=>void, errThis:any):void
        {
            this.initParam(okFn, okThis, errFn, errThis);

            this.httpReq = new egret.HttpRequest;
            this.httpReq.responseType = egret.HttpResponseType.TEXT;
            this.httpReq.open(url, egret.HttpMethod.GET);
            this.httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);

            this.httpReq.send();
        }

        private onLoadComplete(evt:egret.Event):void
        {
            if (this.okFn)
            {
                this.okFn.call(this.okThis, this.httpReq.response);
            }
                
            this.clear();
        }

        private onLoadError(evt:egret.IOErrorEvent):void
        {
            if (this.errFn)
            {
                this.errFn.call(this.errThis);
            }

            this.clear();
            
            console.error(evt);
        }

        public clear():void
        {
            if (this.httpReq)
            {
                this.httpReq.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this.httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);

                this.httpReq = null;
            }
        }
    }
}