namespace uiCore {
	/**
	 * 游戏工具箱
	 */
    export class Utils {
        public constructor() {
        }
        /** 返回链接 */
        public static backUrl: string;
        /** 跳转类型 */
        public static jumpType: number;
        /** 最新token保存 */
        public static token: String = "";
        //服務端主動斷開則不需要斷線重連
        public static needConnect: boolean = true;
        /**
        * 判断是否是整型
        */
        public static isInteger(x: number): boolean {
            return x % 1 === 0;
        }
        /**
        * 判断是否是整型
        */
        public static isFunction(func: any): boolean {
            return typeof func == 'function';
        }
        /**
        * 判断是否是数组
        * */
        public static isArray(obj): boolean {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
         /** 
         *判断是否是对象。 
        */
       public static isObject(obj):boolean {
            return Object.prototype.toString.call(obj) === "[object Object]";
        }
        /**
         * 判断是否是空对象
         */
        public static isEmptyObject(obj):boolean{
            for (var key in obj){
        　　　　return false;
        　　}　　
        　　return true;
        }
        //清空对象
        public static clearObject(obj){
            for(let key in obj){
                delete obj[key]
            }
        }    
        /**
        * 根据元素的属性和值获取数组中的元素
        */
        public static getItem(array: Array<any>, property: string, value: any): any {
            for (var i: number = 0; i < array.length; i++) {
                if (array[i][property] == value) {
                    return array[i];
                }
            }
            return null;

        }
    
        /**
        * 删除数组中的某项元素
        * */
        public static remove(array: Array<any>, item: any): void {
            var index: number = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
        /**
        * 日期格式化
        */
        public static formatDate(date: Date, fmt: string) {
            var o = {
                "M+": date.getMonth() + 1,                 //月份   
                "d+": date.getDate(),                    //日   
                "h+": date.getHours(),                   //小时   
                "m+": date.getMinutes(),                 //分   
                "s+": date.getSeconds(),                 //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                "S": date.getMilliseconds()             //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        /**
         * 判断对象有多少键值
         * @param obj 对象
         */
        public static getObjKeysNum(obj) :number{
            if(!uiCore.Utils.isObject(obj)) return null;
            let num = 0;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    num++;
                }
            }
            return num;
        }

        /**
        * 查找数组元素的索引
        */
        public static indexOf(array: any, item: number): number {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    return i;
                }
            }
            return -1;
        }
        /**
        * 获取utf8字符串长度
        */
        public static getUtf8Length = function (str) {
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
        }
        /**
        * 获取指定范围的随机整数
        * 包含n到m
         */
        public static getRandom = function (n, m) {
            var c = m - n + 1;
            return Math.floor(Math.random() * c + n);
        }
        /**
         * 拷贝数据到另一个对象中
         */
        public static copy(source: any, target: any, override: boolean = false): void {
            if (source && target) {
                for (var key in source) {
                    if (target.hasOwnProperty(key) && override) {
                        target[key] = source[key];
                    }
                }
            }
        }
        public static checkRealVisible(display: egret.DisplayObject): boolean {
            var parent: egret.DisplayObject = display;
            while (parent && !egret.is(parent, "egret.Stage")) {
                if (!parent.visible) {
                    return false;
                }
                parent = parent.parent;
            }
            return true;
        }
        /**
         * 移除指定类型的子控件
         * @param parent 父容器
         * @param type 类型
         * @param reverse 反转，只有指定类型的不会被移除
         */
        public static removeChildrenNotByType(parent: egret.DisplayObjectContainer, types: string[], reverse: boolean): void {
            var otherChildren: egret.DisplayObject[] = [];
            for (var i = 0; i < parent.numChildren; i++) {
                var children: egret.DisplayObject = parent.getChildAt(i);
                var canRemove: boolean = true;
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
        }
        /**
         * 是否是IOS的native
         */
        public static isIOSNative(): boolean {
            return window.navigator && navigator.userAgent == "ios_miq";
        }
        public static getLocalStorageItem(key: string, type: string): any {
            var localStorageItem: string = egret.localStorage.getItem(key);
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
        }
        /** 
        * 将数值保留2位小数后格式化成金额形式 
        * @param num 数值(Number或者String)
        * @param accurate 是否显示后面为.00的小数
        * @type {String} 
        */
        public static formatCurrency(num: any, accurate: boolean = false): string {
            num = Math.floor(num);
            num = parseFloat(num) / 100;
            if (num < 1 && num > -1) {
                return num.toString();
            }
            num = (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            if (accurate) {
                return num;
            } else {
                var decimal = num.substring(num.length - 2, num.length);
                if (parseInt(decimal) == 0) {
                    decimal = '';
                } else if (parseInt(decimal.substring(1, decimal.length)) == 0) {
                    decimal = '.' + decimal.substring(0, 1);
                } else {
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
        }
        /** 
        * 格式化账号或者昵称，超过长度以...代替 
        * @param nickName 昵称
        * @param length 要显示的长度
        * @type {String} 
        */
        public static formatNickName(nickName: string, length: number): string {
            if (nickName.length <= length) {
                return nickName;
            } else {
                return nickName.substring(0, length) + "...";
            }
        }
        /**
         * 格式化账号或者昵称，超过长度以...代替
         * @param nickName 昵称
         * @param length 要显示的字节长度
         * @type {String}
         */
        public static formatNickName1(nickName: string, length: number): string {
            var dbleg: number = 0;
            var sgleg: number = 0;
            var isDBstr: boolean;
            var newstring: string = '';
            for (var i = 0; i < nickName.length; i++) {
                isDBstr = nickName.charCodeAt(i).toString(16).length === 4;
                isDBstr ? dbleg++ : sgleg++;
                if (dbleg * 2 + sgleg <= length)
                    newstring += nickName[i];
            }
            if (dbleg * 2 + sgleg > length) newstring += '...';
            return newstring;
        }
        private static md5Object: md5;
        /**
        * md5方式加密字符串
        */
        public static md5(str: string): string {
            this.md5Object = this.md5Object || new md5();
            return this.md5Object.hex_md5(str);
        }
        /**
        * 获取设备唯一号，暂时只支持安卓平台，别的平台用当前时间的md5代替
        * @returns 设备唯一号
        */
        public static getIMEI(): string {
            var result = egret.localStorage.getItem("fish_imei_windows");
            if (!result) {
                result = uiCore.Utils.md5(uiCore.Utils.formatDate(new Date(), "qqddMMhhmmS") + Math.random());
                egret.localStorage.setItem("fish_imei_windows", result);
            }
            return result;
        }
        /**
         * 获取网页地址参数内容
         * @param argID 参数ID
         */
        public static getQueryString(argID: string): string {
            var reg: RegExp = new RegExp("(^|&)" + argID + "=([^&]*)(&|$)");
            var r: RegExpMatchArray = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        }

        public static getQueryUrl(argID: string): string {
            var reg: RegExp = new RegExp("(^|&)" + argID + "=([^&]*)(&|$)");
            var r: RegExpMatchArray = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        }
        /**
         * 获取网页地址完整参数内容
         * @param argID url路径
         */
        public static getUrlCodeString(windowUrl: string): Map<any> {
            if(windowUrl.indexOf('?')>-1){
                var dataStr = windowUrl.substring(windowUrl.indexOf('?')+1,windowUrl.length);
                if(dataStr!="" && dataStr.indexOf('&')>-1)
                {
                    let op :Map<any> = {};
                    dataStr.split("&").forEach(element => {
                        if(element.indexOf('=')>-1)
                        {
                            let pair = element.split('=');
                            op[pair[0]]=pair[1];
                        }
                    });
                    return op;
                }
            }
            return null;
        }

        /**
         * 获取Map中键是否存在值
         * @param map 键值对
         * @param key 键
         */
        public static isExistKey(map:  Map<any>,key: string): boolean {
            let isexist:boolean = false;
            if(map[key]){
               isexist=true;
            }
            return isexist;
        }

        public static getNewObject(obj) {
            var nobj = {};
            for (var k in obj) {
                if (k != "_id_") {
                    nobj[k] = obj[k];
                }
            }
            return nobj;
        }
        //获取浏览器信息
        public static getBrowserInfo(): string {
            var agent = navigator.userAgent.toLowerCase();
            var regStr_ie = /msie [\d.]+;/gi;
            var regStr_ff = /firefox\/[\d.]+/gi
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
        }
        //获取系统信息
        public static getOSInfo(): string {
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
            if (isUnix) return "Unix";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            var bIsAndroid = (String(sUserAgent).indexOf("Android") > -1);
            if (isLinux) {
                if (bIsAndroid) return "Android";
                else return "Linux";
            }
            if (isWin) {
                var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K) return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
                sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP) return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003) return "Win2003";
                var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista) return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7) return "Win7";
                var isWin8 = sUserAgent.indexOf("windows nt6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                if (isWin8) return "Win8";
                var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1;
                if (isWin10) return "Win10";
            }
            return "other";
        }
        //获取当前其他时区的时间
        public static getLocalTime(i) {
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== 'number') return;
            var d = new Date();
            //得到1970年一月一日到现在的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            return new Date(utcTime + 3600000 * i);
        }
        //根据北京时间转换为其他时区的时间
        public static getLocalTimeByCST(timeString, i) {
            i = isNaN(i) ? 8 : i;
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== 'number') return;
            timeString = timeString.replace(/\-/g, "/");
            var d = new Date(timeString);
            //得到北京时间的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            return new Date(utcTime + 3600000 * i);
        }
        /**
         * 时间毫秒转成小时
         * @param sec
         * @returns {number}
         * @constructor
         */
        public static S2H(times: number, symbol: string = ":", isH: boolean = true): string {
            if (times < 0) return;
            let h: string = Math.floor(times / 1000 / 60 / 60).toString();
            let m: string = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
            let s: string = Math.floor((times % (1000 * 60)) / 1000).toString();
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
            } else {
                var restult = m + symbol + s;
            }

            return restult;
        }

        public static conversionTime(times: number) {
            if (times <= 0) return "";
            if (times >= 60 * 60 * 24) {
                let day: number = Math.floor(times / (60 * 60 * 24));
                return day + "天";
            } else if (times >= 60 * 60) {
                let h: number = Math.floor(times / (60 * 60));
                return h + "小时";
            } else {
                return Utils.S2H(times * 1000);
            }
        }
        
        /** 获取小时 */
        public static getHours(times: number): number {
            if (times < 0) return;
            return Math.floor(times / 1000 / 60 / 60);
        }


        //判断浏览器是否支持webp    LibCore.GameConfig["iswebp"]发布工具中增加的配置
        public static isWbeP() {
            var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
            return isSupportWebp && LibCore.GameConfig["iswebp"];
        }
        
        //判断对象是否为空
        public static checkNullObj (obj) {
            return Object.keys(obj).length === 0;
        }
        public static checkAttributesObj(obj: any, objKey: string): boolean {
            if (obj) {
                return obj.hasOwnProperty(objKey);
            }
            return false;
        }
        private static nextSign:string="0";
        public static getOnlySign():string{
            let currSign:string=new Date().getTime()+"";
            if(uiCore.Utils.nextSign=="0"){
                uiCore.Utils.nextSign=currSign;
                return currSign;
            }
            if(uiCore.Utils.nextSign===currSign){
                return uiCore.Utils.getOnlySign();
            }
            uiCore.Utils.nextSign=currSign;
            return currSign;
        }
        public static reloadPage():void{
            if (top.location != location) {
                top.location.href=uiCore.Utils.getQueryString("returnUrl");
            } else {
                location.reload();
            }
            // var LinkUrl = GameData.getInstance().userData("LinkUrl");
			// if (LinkUrl) {
			// 	top.location.href = LinkUrl;
			// } else {
			// 	location.reload();
			// }
        }
    }
}
