var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * 类似C#中的格式化字符串函数
         * 例：format("Hello {0}",world)
         * @param str {string} 要格式化的字符串
         * @param args {Array<any>} 参数列表
         * @returns {string} 格式化之后的字符串
         */
        StringUtil.format = function (str) {
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
        StringUtil.isEmpty = function (value) {
            return value == null || value == undefined || value.length == 0;
        };
        /**
         * 去左右两端空格
         */
        StringUtil.trim = function (str) {
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
        StringUtil.textToRichText = function (str) {
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
        StringUtil.repeat = function (msg, args) {
            if (args === void 0) { args = null; }
            if (args) {
                var argLen = args.length;
                for (var i = 0; i < argLen; i++) {
                    msg = msg.replace(StringUtil.regex[i], args[i]);
                }
            }
            // var heroM:RoleModel = User.roleModel;
            // msg = msg.replace(/\{nickName\}/g, heroM.roleInfo.nickname);
            return msg;
        };
        StringUtil.formatLength = function (msg, minLen, preSuff, isLeft) {
            if (preSuff === void 0) { preSuff = '0'; }
            if (isLeft === void 0) { isLeft = true; }
            var tLen = minLen - msg.length;
            var retMsg = msg;
            for (var i = 0; i < tLen; i++) {
                retMsg = isLeft ? preSuff + retMsg : retMsg + preSuff;
            }
            return retMsg;
        };
        /** 超出万的货币换算,非人民币为K  */
        StringUtil.resetMoney = function (money) {
            var newBalance;
            if (money >= 1000000) {
                var sendResult;
                var resultNum = (money / 100) + "";
                newBalance = parseInt(resultNum) / 10 + "k";
            }
            else {
                money = parseInt(money * 100 + "") / 100;
                newBalance = money + "";
                if (newBalance.indexOf(".") == -1) {
                    newBalance = newBalance;
                }
                else {
                    newBalance = (money + "").substr(0, (money + "").indexOf("."));
                }
            }
            return newBalance;
        };
        StringUtil.formatMoney = function (money) {
            // money = 99999.95922999;
            money = isNaN(money) ? 0 : Math.floor(money * 100) * 0.01;
            var tmpM = money.toString().split('.');
            var val1 = parseInt(tmpM[0]);
            var val2;
            var val3;
            var tmpStr = '';
            var retStr = '';
            var xiaoshu = tmpM[1]; //Math.floor((money - val1) * 100);
            while (val1 > 1000) {
                val2 = Math.floor(val1 / 1000);
                val3 = val1 - val2 * 1000;
                val1 = val2;
                tmpStr = val3.toString();
                if (tmpStr.length == 1) {
                    tmpStr = '00' + tmpStr;
                }
                else if (tmpStr.length == 2) {
                    tmpStr = '0' + tmpStr;
                }
                retStr = ',' + tmpStr + retStr;
            }
            retStr = val1 + retStr;
            if (xiaoshu) {
                if (xiaoshu.length == 1) {
                    xiaoshu += '0';
                }
                else if (xiaoshu.length > 2) {
                    xiaoshu = xiaoshu.substring(0, 2);
                }
                retStr += '.' + xiaoshu;
            }
            else {
                retStr += '.00';
            }
            return retStr;
        };
        StringUtil.fillLen = function (msg, len) {
            var retMsg = "";
            for (var i = 0; i < len; i++) {
                retMsg += msg;
            }
            return retMsg;
        };
        StringUtil.regex = [/\{0\}/g, /\{1\}/g, /\{2\}/g, /\{3\}/g, /\{4\}/g, /\{5\}/g, /\{6\}/g, /\{7\}/g];
        return StringUtil;
    }());
    core.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "core.StringUtil");
})(core || (core = {}));
//# sourceMappingURL=StringUtil.js.map