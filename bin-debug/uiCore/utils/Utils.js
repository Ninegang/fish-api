var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 游戏工具箱
     */
    var Utils = (function () {
        function Utils() {
        }
        /**
        * 判断是否是整型
        */
        Utils.isInteger = function (x) {
            return x % 1 === 0;
        };
        /**
        * 判断是否是整型
        */
        Utils.isFunction = function (func) {
            return typeof func == 'function';
        };
        /**
        * 判断是否是数组
        * */
        Utils.isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
        /**
        *判断是否是对象。
       */
        Utils.isObject = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Object]";
        };
        /**
         * 判断是否是空对象
         */
        Utils.isEmptyObject = function (obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        };
        //清空对象
        Utils.clearObject = function (obj) {
            for (var key in obj) {
                delete obj[key];
            }
        };
        /**
        * 根据元素的属性和值获取数组中的元素
        */
        Utils.getItem = function (array, property, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][property] == value) {
                    return array[i];
                }
            }
            return null;
        };
        /**
        * 删除数组中的某项元素
        * */
        Utils.remove = function (array, item) {
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        };
        /**
        * 日期格式化
        */
        Utils.formatDate = function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        /**
         * 判断对象有多少键值
         * @param obj 对象
         */
        Utils.getObjKeysNum = function (obj) {
            if (!uiCore.Utils.isObject(obj))
                return null;
            var num = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    num++;
                }
            }
            return num;
        };
        /**
        * 查找数组元素的索引
        */
        Utils.indexOf = function (array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 拷贝数据到另一个对象中
         */
        Utils.copy = function (source, target, override) {
            if (override === void 0) { override = false; }
            if (source && target) {
                for (var key in source) {
                    if (target.hasOwnProperty(key) && override) {
                        target[key] = source[key];
                    }
                }
            }
        };
        Utils.checkRealVisible = function (display) {
            var parent = display;
            while (parent && !egret.is(parent, "egret.Stage")) {
                if (!parent.visible) {
                    return false;
                }
                parent = parent.parent;
            }
            return true;
        };
        /**
         * 移除指定类型的子控件
         * @param parent 父容器
         * @param type 类型
         * @param reverse 反转，只有指定类型的不会被移除
         */
        Utils.removeChildrenNotByType = function (parent, types, reverse) {
            var otherChildren = [];
            for (var i = 0; i < parent.numChildren; i++) {
                var children = parent.getChildAt(i);
                var canRemove = true;
                for (var i = 0; i < types.length; i++) {
                    canRemove = canRemove && egret.is(children, types[i]) != reverse;
                }
                if (canRemove) {
                    otherChildren.push(children);
                }
            }
            while (otherChildren.length) {
                parent.removeChild(otherChildren.shift());
            }
        };
        /**
         * 是否是IOS的native
         */
        Utils.isIOSNative = function () {
            return window.navigator && navigator.userAgent == "ios_miq";
        };
        Utils.getLocalStorageItem = function (key, type) {
            var localStorageItem = egret.localStorage.getItem(key);
            switch (type) {
                case "Array":
                    if (!localStorageItem) {
                        return [];
                    }
                    else {
                        return JSON.parse(localStorageItem);
                    }
                case "Object":
                    if (!localStorageItem) {
                        return {};
                    }
                    else {
                        return JSON.parse(localStorageItem);
                    }
                case "String":
                    if (!localStorageItem) {
                        return "";
                    }
                    else {
                        return localStorageItem;
                    }
                case "Number":
                    if (!localStorageItem) {
                        return NaN;
                    }
                    else {
                        return parseFloat(localStorageItem);
                    }
                case "Boolean":
                    if (!localStorageItem) {
                        return false;
                    }
                    else {
                        return localStorageItem == "true";
                    }
            }
        };
        /**
        * 将数值保留2位小数后格式化成金额形式
        * @param num 数值(Number或者String)
        * @param accurate 是否显示后面为.00的小数
        * @type {String}
        */
        Utils.formatCurrency = function (num, accurate) {
            if (accurate === void 0) { accurate = false; }
            num = Math.floor(num);
            num = parseFloat(num) / 100;
            if (num < 1 && num > -1) {
                return num.toString();
            }
            num = (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            if (accurate) {
                return num;
            }
            else {
                var decimal = num.substring(num.length - 2, num.length);
                if (parseInt(decimal) == 0) {
                    decimal = '';
                }
                else if (parseInt(decimal.substring(1, decimal.length)) == 0) {
                    decimal = '.' + decimal.substring(0, 1);
                }
                else {
                    decimal = "." + decimal;
                }
                var result = num.substring(0, num.length - 3);
                return result + decimal;
            }
            // var result;
            // if (num < 10000) {
            //     result = this.toFixed(num, 2);
            // }
            // else if (num < 100000000) {
            //     var n = num / 10000;
            //     result = this.isInteger(n) ? n.toString() + "万" : this.toFixed(n, 2) + "万";
            // }
            // else if (num < 1000000000000) {
            //     var n = num / 100000000;
            //     result = this.isInteger(n) ? n.toString() + "亿" : this.toFixed(n, 2) + "亿";
            // }
            // else {
            //     var n = num / 1000000000000;
            //     result = this.isInteger(n) ? n.toString() + "兆" : this.toFixed(n, 2) + "兆";
            // }
            // return result;
        };
        /**
        * 格式化账号或者昵称，超过长度以...代替
        * @param nickName 昵称
        * @param length 要显示的长度
        * @type {String}
        */
        Utils.formatNickName = function (nickName, length) {
            if (nickName.length <= length) {
                return nickName;
            }
            else {
                return nickName.substring(0, length) + "...";
            }
        };
        /**
         * 格式化账号或者昵称，超过长度以...代替
         * @param nickName 昵称
         * @param length 要显示的字节长度
         * @type {String}
         */
        Utils.formatNickName1 = function (nickName, length) {
            var dbleg = 0;
            var sgleg = 0;
            var isDBstr;
            var newstring = '';
            for (var i = 0; i < nickName.length; i++) {
                isDBstr = nickName.charCodeAt(i).toString(16).length === 4;
                isDBstr ? dbleg++ : sgleg++;
                if (dbleg * 2 + sgleg <= length)
                    newstring += nickName[i];
            }
            if (dbleg * 2 + sgleg > length)
                newstring += '...';
            return newstring;
        };
        /**
        * md5方式加密字符串
        */
        Utils.md5 = function (str) {
            this.md5Object = this.md5Object || new md5();
            return this.md5Object.hex_md5(str);
        };
        /**
        * 获取设备唯一号，暂时只支持安卓平台，别的平台用当前时间的md5代替
        * @returns 设备唯一号
        */
        Utils.getIMEI = function () {
            var result = egret.localStorage.getItem("fish_imei_windows");
            if (!result) {
                result = uiCore.Utils.md5(uiCore.Utils.formatDate(new Date(), "qqddMMhhmmS") + Math.random());
                egret.localStorage.setItem("fish_imei_windows", result);
            }
            return result;
        };
        /**
         * 获取网页地址参数内容
         * @param argID 参数ID
         */
        Utils.getQueryString = function (argID) {
            var reg = new RegExp("(^|&)" + argID + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        };
        Utils.getQueryUrl = function (argID) {
            var reg = new RegExp("(^|&)" + argID + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        };
        /**
         * 获取网页地址完整参数内容
         * @param argID url路径
         */
        Utils.getUrlCodeString = function (windowUrl) {
            if (windowUrl.indexOf('?') > -1) {
                var dataStr = windowUrl.substring(windowUrl.indexOf('?') + 1, windowUrl.length);
                if (dataStr != "" && dataStr.indexOf('&') > -1) {
                    var op_1 = {};
                    dataStr.split("&").forEach(function (element) {
                        if (element.indexOf('=') > -1) {
                            var pair = element.split('=');
                            op_1[pair[0]] = pair[1];
                        }
                    });
                    return op_1;
                }
            }
            return null;
        };
        /**
         * 获取Map中键是否存在值
         * @param map 键值对
         * @param key 键
         */
        Utils.isExistKey = function (map, key) {
            var isexist = false;
            if (map[key]) {
                isexist = true;
            }
            return isexist;
        };
        Utils.getNewObject = function (obj) {
            var nobj = {};
            for (var k in obj) {
                if (k != "_id_") {
                    nobj[k] = obj[k];
                }
            }
            return nobj;
        };
        //获取浏览器信息
        Utils.getBrowserInfo = function () {
            var agent = navigator.userAgent.toLowerCase();
            var regStr_ie = /msie [\d.]+;/gi;
            var regStr_ff = /firefox\/[\d.]+/gi;
            var regStr_chrome = /chrome\/[\d.]+/gi;
            var regStr_saf = /safari\/[\d.]+/gi;
            //IE  
            if (agent.indexOf("msie") > 0) {
                return agent.match(regStr_ie).toString();
            }
            //firefox  
            if (agent.indexOf("firefox") > 0) {
                return agent.match(regStr_ff).toString();
            }
            //Chrome  
            if (agent.indexOf("chrome") > 0) {
                return agent.match(regStr_chrome).toString();
            }
            //Safari  
            if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                return agent.match(regStr_saf).toString();
            }
            return "other";
        };
        //获取系统信息
        Utils.getOSInfo = function () {
            var sUserAgent = navigator.userAgent;
            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            // // iPhone X、iPhone XS
            // var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
            // // iPhone XS Max
            // var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
            // // iPhone XR
            // var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
            // if (isMac) return "Mac";
            // if (isIPhoneX) return "isIPhoneX";
            // if (isIPhoneXSMax) return "isIPhoneXSMax";
            // if (isIPhoneXR) return "isIPhoneXR";
            if (sUserAgent.toString().indexOf("iPhone OS") != -1 || sUserAgent.toString().indexOf("iPad") != -1) {
                return "IOS";
            }
            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
            if (isUnix)
                return "Unix";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            var bIsAndroid = (String(sUserAgent).indexOf("Android") > -1);
            if (isLinux) {
                if (bIsAndroid)
                    return "Android";
                else
                    return "Linux";
            }
            if (isWin) {
                var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K)
                    return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP)
                    return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003)
                    return "Win2003";
                var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista)
                    return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7)
                    return "Win7";
                var isWin8 = sUserAgent.indexOf("windows nt6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                if (isWin8)
                    return "Win8";
                var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1;
                if (isWin10)
                    return "Win10";
            }
            return "other";
        };
        //获取当前其他时区的时间
        Utils.getLocalTime = function (i) {
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== 'number')
                return;
            var d = new Date();
            //得到1970年一月一日到现在的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            return new Date(utcTime + 3600000 * i);
        };
        //根据北京时间转换为其他时区的时间
        Utils.getLocalTimeByCST = function (timeString, i) {
            i = isNaN(i) ? 8 : i;
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== 'number')
                return;
            timeString = timeString.replace(/\-/g, "/");
            var d = new Date(timeString);
            //得到北京时间的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            return new Date(utcTime + 3600000 * i);
        };
        /**
         * 时间毫秒转成小时
         * @param sec
         * @returns {number}
         * @constructor
         */
        Utils.S2H = function (times, symbol, isH) {
            if (symbol === void 0) { symbol = ":"; }
            if (isH === void 0) { isH = true; }
            if (times < 0)
                return;
            var h = Math.floor(times / 1000 / 60 / 60).toString();
            var m = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
            var s = Math.floor((times % (1000 * 60)) / 1000).toString();
            if (Number(h) < 10) {
                h = "0" + h;
            }
            if (Number(m) < 10) {
                m = "0" + m;
            }
            if (Number(s) < 10) {
                s = "0" + s;
            }
            if (isH) {
                var restult = h + symbol + m + symbol + s;
            }
            else {
                var restult = m + symbol + s;
            }
            return restult;
        };
        Utils.conversionTime = function (times) {
            if (times <= 0)
                return "";
            if (times >= 60 * 60 * 24) {
                var day = Math.floor(times / (60 * 60 * 24));
                return day + "天";
            }
            else if (times >= 60 * 60) {
                var h = Math.floor(times / (60 * 60));
                return h + "小时";
            }
            else {
                return Utils.S2H(times * 1000);
            }
        };
        /** 获取小时 */
        Utils.getHours = function (times) {
            if (times < 0)
                return;
            return Math.floor(times / 1000 / 60 / 60);
        };
        //判断浏览器是否支持webp    LibCore.GameConfig["iswebp"]发布工具中增加的配置
        Utils.isWbeP = function () {
            var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
            return isSupportWebp && LibCore.GameConfig["iswebp"];
        };
        //判断对象是否为空
        Utils.checkNullObj = function (obj) {
            return Object.keys(obj).length === 0;
        };
        Utils.checkAttributesObj = function (obj, objKey) {
            if (obj) {
                return obj.hasOwnProperty(objKey);
            }
            return false;
        };
        Utils.getOnlySign = function () {
            var currSign = new Date().getTime() + "";
            if (uiCore.Utils.nextSign == "0") {
                uiCore.Utils.nextSign = currSign;
                return currSign;
            }
            if (uiCore.Utils.nextSign === currSign) {
                return uiCore.Utils.getOnlySign();
            }
            uiCore.Utils.nextSign = currSign;
            return currSign;
        };
        Utils.reloadPage = function () {
            if (top.location != location) {
                top.location.href = uiCore.Utils.getQueryString("returnUrl");
            }
            else {
                location.reload();
            }
            // var LinkUrl = GameData.getInstance().userData("LinkUrl");
            // if (LinkUrl) {
            // 	top.location.href = LinkUrl;
            // } else {
            // 	location.reload();
            // }
        };
        /** 最新token保存 */
        Utils.token = "";
        //服務端主動斷開則不需要斷線重連
        Utils.needConnect = true;
        /**
        * 获取utf8字符串长度
        */
        Utils.getUtf8Length = function (str) {
            var cnt = 0;
            for (var i = 0; i < str.length; i++) {
                var value = str.charCodeAt(i);
                if (value < 0x080) {
                    cnt += 1;
                }
                else if (value < 0x0800) {
                    cnt += 2;
                }
                else {
                    cnt += 3;
                }
            }
            return cnt;
        };
        /**
        * 获取指定范围的随机整数
        * 包含n到m
         */
        Utils.getRandom = function (n, m) {
            var c = m - n + 1;
            return Math.floor(Math.random() * c + n);
        };
        Utils.nextSign = "0";
        return Utils;
    }());
    uiCore.Utils = Utils;
    __reflect(Utils.prototype, "uiCore.Utils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Utils.js.map