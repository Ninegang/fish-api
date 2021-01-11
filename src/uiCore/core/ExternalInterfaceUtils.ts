namespace uiCore {
	
    export class ExternalInterfaceUtils {
        public static inGame:boolean=true;
        public static init() {
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        ExternalInterfaceUtils.onPause();
                    }else{
                        ExternalInterfaceUtils.onResume();
                    }
                });
            }else if(egret.Capabilities.isMobile){
                egret.lifecycle.onPause = () => {
                    ExternalInterfaceUtils.onPause();
                }
                egret.lifecycle.onResume = () => {
                    ExternalInterfaceUtils.onResume();
                }
            }
        }

        private static onResume():void{//程序获得焦点
            this.inGame=true;
            uiCore.EventManager["getInstance"]().dispatchEvent(Application.APPEVENT_RESUME);
        }
        private static onPause(): void {//程序失去焦点
            this.inGame=false;
            uiCore.EventManager["getInstance"]().dispatchEvent(Application.APPEVENT_PAUSE);
        }
    }
}