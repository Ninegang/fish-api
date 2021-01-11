namespace core
{
    export class PoolUtil
    {
        //-----------------------------------------------------------------------------------------------------

        private static pool:{[type:string]:any[]} = {};

        //-----------------------------------------------------------------------------------------------------
        public static recycleObj(type:string, obj:IPool, maxSize:number = 100):void
        {
            var voArr:any[] = PoolUtil.pool[type];
            if (!voArr)
            {
                voArr = PoolUtil.pool[type] = [];
            }

            if (voArr.indexOf(obj) == -1)
            {
                if (voArr.length < maxSize)
                {
                    obj.poolClear();
                    voArr.push(obj);
                }
                else
                {
                    obj.clear();
                }
            }
            else
            {
                console.log(obj);
            }
        }

        public static getPoolObj(type:string, cls:any):any
        {
            var obj:IPool;
            var voArr:IPool[] = PoolUtil.pool[type];
            if (voArr && voArr.length > 0)
            {
                obj = voArr.pop();
            }
            else
            {
                obj = new cls();
            }
            obj.poolInit();
            return obj;
        }
    }
}