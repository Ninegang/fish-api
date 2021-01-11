namespace uiCore {
	/**
	 * 载入中
	 * @author none
	 *
	 */
    export class Loadding extends uiCore.Window {
        public progressTxt: eui.Label;
        public restConnect:eui.Label;
        public constructor(flag:boolean=false) {
            super();
            this.skinName = Loadding.skinName;
            this.restConnect.text=uiCore.LangUtils.getMsgById(24);
            this.left = this.right = this.top = this.bottom = 0;
            this.progressTxt.text = "";
            if(flag){
                this.restConnect.visible=true;
            }else{
                this.restConnect.visible=false;
            }
        }
        private static skinName: any;
        /**
         * 初始化弹窗，在游戏启动的时候调用
         * @param skinName {string} 弹窗皮肤
         */
        public static init(skinName: any): void {
            this.skinName = skinName;
        }

        /**
        * 子类继承获取加载进度
        */
        public onLoaddingProgress(percent: number): void {
            this.progressTxt.text = percent + "%";
        }
    }
}
