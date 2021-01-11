namespace uiCore {
	/**
	 * how组件工具类
	 */
    export class ComponentUtils {
        /**
         * how组件工具类，提供批量初始化组件功能
         */
        public constructor() {
            
        }
        /**
         * 初始化how组件
         */
        public static init(alertSkin: string, dialogSkin: string, bannerSkin: string, loaddingSkin: string,callBack?: () => void, thisObject: any = null): void {
            Alert.init(alertSkin);
            Dialog.init(dialogSkin);
            Banner.init(bannerSkin);
            Loadding.init(loaddingSkin);
            if (callBack)
                callBack.apply(thisObject);
        }
    }
}
