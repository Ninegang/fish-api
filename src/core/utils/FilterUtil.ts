namespace core
{
    export class FilterUtil 
    {
        /** 灰度滤镜 */
        public static greyFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.0820, 0, 0,
                                                                                        0.3086, 0.6094, 0.0820, 0, 0,
                                                                                        0.3086, 0.6094, 0.0820, 0, 0,
                                                                                        0     , 0     , 0     , 1, 0]);


        public static testFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([1,0,0,0,0,
                                                                                        0,0,0,0,0,
                                                                                        0,0,0,0,0,
                                                                                        0,0,0,1,0]);
    }
}