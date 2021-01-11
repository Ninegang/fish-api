namespace uiCore {
	/**
	 * 载入中
	 * @author none
	 *
	 */
    export class Looper extends uiCore.View {
        public constructor() {
            super();
        }
        private timeoutId:number = -1;
        private looperGroup:eui.Group;
        private tick:number = 0;
        public autoPlay:boolean = false;

        private totalTick:number;
        public timeGap:number = 300;
         
        public start(){
            this.totalTick = this.looperGroup.numChildren + 1;
            if(this.autoPlay) this.play();
        }
        public play(){
            this.visible = true;
            var displayObj ;
            (this.timeoutId != -1) && clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(()=>{
                clearTimeout(this.timeoutId);
                this.timeoutId = -1;
                if(this.tick === 0){
                    this.stop();
                    this.tick++;
                    this.play();
                }else if(this.tick === this.totalTick){
                    this.tick = 0;
                    this.play();
                }else{
                    displayObj = this.looperGroup.getChildAt(this.tick - 1);
                    displayObj.visible = true;
                    this.tick++;
                    this.play();
                }
            },this.timeGap);
        }
        public stop(){
            this.visible = false;
            clearTimeout(this.timeoutId);
            this.timeoutId = -1;
            for(var i = 0;i<this.totalTick -1;i++){
                this.looperGroup.getChildAt(i).visible = false;
            }
        }

        public onDestroy(){
            clearTimeout(this.timeoutId);
        }

    }
}