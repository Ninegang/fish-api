var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var LangUtils = (function () {
        function LangUtils() {
        }
        LangUtils.setLangType = function (lang) {
            if (lang) {
                egret.localStorage.setItem(this.LANG_KEY, lang);
            }
            else {
                var localLang = egret.localStorage.getItem(this.LANG_KEY);
                if (localLang) {
                    this.LangType = localLang;
                }
                else {
                    var urlLang = uiCore.Utils.getQueryString("Lang");
                    if (urlLang) {
                        this.LangType = urlLang;
                    }
                    else {
                        var egretLocalLang = egret.Capabilities.language;
                        if (egretLocalLang) {
                            egretLocalLang = egretLocalLang.substr(0, 2);
                            if (this.TH_TH == egretLocalLang) {
                                this.LangType = this.TH_TH;
                            }
                            else if (this.EN_US == egretLocalLang) {
                                this.LangType = this.EN_US;
                            }
                            else if (this.VI_VI == egretLocalLang) {
                                this.LangType = this.VI_VI;
                            }
                            else if (this.ID_ID == egretLocalLang) {
                                this.LangType = this.ID_ID;
                            }
                            else {
                                this.LangType = this.ZH_CN;
                            }
                        }
                    }
                }
            }
        };
        LangUtils.getLangType = function () {
            if (!this.LangType) {
                this.LangType = this.ZH_CN;
            }
            return this.LangType;
        };
        LangUtils.getMsgById = function (value, array) {
            if (!array) {
                array = Data["MsgData"];
            }
            var msgObj = uiCore.Utils.getItem(array, "id", value);
            if (msgObj) {
                return msgObj["msg"];
            }
            return "";
        };
        LangUtils.LANG_KEY = "langKey";
        LangUtils.ZH_CN = "zh"; //中文
        LangUtils.EN_US = "en"; //英文
        LangUtils.TH_TH = "th"; //泰文
        LangUtils.VI_VI = "vi"; //越文
        LangUtils.ID_ID = "id"; //印尼文
        return LangUtils;
    }());
    uiCore.LangUtils = LangUtils;
    __reflect(LangUtils.prototype, "uiCore.LangUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=LangUtils.js.map