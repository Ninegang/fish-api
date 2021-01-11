namespace core
{
    export class RQueueInfo
    {
        public resId:string;

        public rgInfos:RGQueueInfo[] = [];

        /** 优化权限（大的优化加载 */
        public priority:number = -99999999;

        public value:any;
        public key:string;

        public loadOk(value:any, key:string):void
        {
            this.value = value;
            this.key = key;

            for (let rgInfo of this.rgInfos)
            {
                rgInfo.removeResInfo(this);
            }

            this.rgInfos.length = null;
        }

        public removeRGInfo(rgInfo:RGQueueInfo):void
        {
            let trgInfo:RGQueueInfo
            for (let i:number = this.rgInfos.length - 1; i >= 0; i--)
            {
                if (this.rgInfos[i] == rgInfo)
                {
                    this.rgInfos.splice(i, 1);
                    break;
                }
            }
        }
    }
}