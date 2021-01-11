namespace uiCore {
	export class LangUtils {
		private static LangType:string;
		private static readonly LANG_KEY:string="langKey";
		public static readonly ZH_CN: string = "zh";//中文
    	public static readonly EN_US: string = "en"; //英文
		public static readonly TH_TH: string = "th"; //泰文
		public static readonly VI_VI: string = "vi"; //越文
		public static readonly ID_ID: string = "id"; //印尼文
		public constructor() {

		}
		public static setLangType(lang?:string){
			if(lang){
				egret.localStorage.setItem(this.LANG_KEY, lang);
			}else{
				var localLang:string=egret.localStorage.getItem(this.LANG_KEY);
				if(localLang){
					this.LangType=localLang;
				}else{
					var urlLang:string=uiCore.Utils.getQueryString("Lang");
					if(urlLang){
						this.LangType = urlLang;
					}else{
						var egretLocalLang:string=egret.Capabilities.language;
						if(egretLocalLang){
							egretLocalLang=egretLocalLang.substr(0,2);
							if(this.TH_TH==egretLocalLang){
								this.LangType=this.TH_TH;
							}else if(this.EN_US==egretLocalLang){
								this.LangType=this.EN_US;
							}else if(this.VI_VI==egretLocalLang){
								this.LangType=this.VI_VI;
							}else if(this.ID_ID==egretLocalLang){
								this.LangType=this.ID_ID;
							}else{
								this.LangType=this.ZH_CN;
							}
						}
					}
				}
			}
		}
		public static getLangType():string{
			if(!this.LangType){
				this.LangType=this.ZH_CN;
			}
			return this.LangType;
		}
		public static getMsgById(value:any,array?:Array<any>):string{
			if(!array){
				array=Data["MsgData"];
			}
			var msgObj:any=uiCore.Utils.getItem(array,"id",value);
			if(msgObj){
				return msgObj["msg"];
			}
			return "";
		}
	}
}