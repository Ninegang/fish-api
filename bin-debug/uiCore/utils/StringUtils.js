var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 字符串工具类
     * @author none
     *
     */
    var StringUtils = (function () {
        function StringUtils() {
        }
        /**
         * 类似C#中的格式化字符串函数
         * 例：format("Hello {0}",world)
         * @param str {string} 要格式化的字符串
         * @param args {Array<any>} 参数列表
         * @returns {string} 格式化之后的字符串
         */
        StringUtils.format = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = str;
            for (var i = 0; i < args.length; i++) {
                result = result.replace("{" + i + "}", args[i].toString());
            }
            return result;
        };
        /**
         * 判断是否是空字符串，null、undefined和""都会返回true
         * @returns {boolean} 是否是空字符串
         */
        StringUtils.isEmpty = function (value) {
            return value == null || value == undefined || value.length == 0;
        };
        /**
         * 去左右两端空格
         */
        StringUtils.trim = function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        };
        /**
          * 白鹭专用字符串转富文本
          * 要求格式：
          * @parma str {string} 传入的字符串
          *
          * '没有任何格式初始文本，' +
          * '<font color="#0000ff" size="30" fontFamily="Verdana">Verdana blue large</font>' +
          * '<font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font>' +
          *  '<i>斜体</i>'
          */
        StringUtils.textToRichText = function (str) {
            var reStr = [];
            if (str == null) {
                return;
            }
            return (new egret.HtmlTextParser).parser(str);
            // if (str.indexOf("[") != -1) {
            //     reStr = eval(str);
            // }
            // else {
            //     reStr.push({ text: str, style: {} });
            // }
            // return reStr;
        };
        StringUtils.textIndexOf = function (str, key) {
            if (str.indexOf(key) != -1) {
                return true;
            }
            return false;
        };
        return StringUtils;
    }());
    uiCore.StringUtils = StringUtils;
    __reflect(StringUtils.prototype, "uiCore.StringUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=StringUtils.js.map