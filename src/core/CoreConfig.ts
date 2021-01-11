namespace core 
{
    export class CoreConfig 
    {
        public static STAGE_W:number = 1280;
        public static STAGE_H:number = 720;

        public static stage:egret.Stage;

        public static frameRate:number = 60;

        public static ONE_FRAME_TIME:number = 1000 / 60;
        
		/** 是否支持Webp */
		public static isWebp:boolean = false;
        public static IMG_EXT:string = "png";

        /** 是否在后台运行 */
        public static backRun:boolean = false;
        
		/**当前的语言版本 
		 * "zh_cn" 中文版本
		 * "en_us" 英文版本
		*/
		public static languageType: string = "zh_cn";

        public static AUTO_START_GAME_TYPE:string = "auto_start_game_check";
    }
}