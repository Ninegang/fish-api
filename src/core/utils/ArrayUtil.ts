namespace core
{
    export class ArrayUtil
    {
        public static removeObj(list:any[], obj:any):any
        {
            var idx:number = list.indexOf(obj);
            if (idx != -1)
            {
                return ArrayUtil.removeIdx(list, idx);
            }
            return null;
        }

        public static removeIdx(list:any[], idx:number):any
        {
            var tmpObj:any = list[idx];

            list[idx] = list[list.length - 1];
            list.pop();

            return tmpObj;
        }
    }
}