namespace core
{
    export class RGQueueInfo
    {
        public rgId:number;

        public rInfos:RQueueInfo[] = [];

        public overFn:(rgId?:number, value?: any, key?: string)=>void;

        public overThis:any;

        public removeResInfo(resInfo:RQueueInfo):void
        {
            let rInfo:RQueueInfo
            for (let i:number = this.rInfos.length - 1; i >= 0; i--)
            {
                rInfo = this.rInfos[i];
                if (rInfo == resInfo)
                {
                    this.rInfos.splice(i, 1);
                }
            }

            if (this.rInfos.length == 0)
            {
                if (this.overFn && this.overThis)
                {
                    this.overFn.call(this.overThis, this.rgId, resInfo.value, resInfo.key);
                }

                this.rInfos = null;
                this.overFn = this.overThis = null;
            }
        }

        public cancel():void
        {
            for (let rInfo of this.rInfos)
            {
                rInfo.removeRGInfo(this);
            }

            this.rInfos = null;
            this.overFn = this.overThis = null;
        }
    }
}