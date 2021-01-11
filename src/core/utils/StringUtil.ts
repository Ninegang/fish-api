namespace core
{
    export class StringUtil
    {
            /**
             * 类似C#中的格式化字符串函数
             * 例：format("Hello {0}",world)
             * @param str {string} 要格式化的字符串
             * @param args {Array<any>} 参数列表
             * @returns {string} 格式化之后的字符串
             */
            public static format(str: string, ...args: Array<any>): string {
                var result: string = str;
                for (var i: number = 0; i < args.length; i++) {
                    result = result.replace("{" + i + "}", args[i].toString());
                }
                return result;
            }
            /**
             * 判断是否是空字符串，null、undefined和""都会返回true
             * @returns {boolean} 是否是空字符串
             */
            public static isEmpty(value: string): boolean {
                return value == null || value == undefined || value.length == 0;
            }
            /**
             * 去左右两端空格
             */
            public static trim(str): string {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
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
            public static textToRichText(str: any): Array<egret.ITextElement> {
                var reStr = <Array<egret.ITextElement>>[];
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
            }
            
        private static regex:RegExp[] = [/\{0\}/g, /\{1\}/g, /\{2\}/g, /\{3\}/g, /\{4\}/g, /\{5\}/g, /\{6\}/g, /\{7\}/g];
        public static repeat(msg:string, args:any[] = null):string
        {
            if (args)
            { 
                var argLen:number = args.length;

                for (var i:number = 0; i < argLen; i++)
                {
                    msg = msg.replace(StringUtil.regex[i], args[i]);
                }
            }

            // var heroM:RoleModel = User.roleModel;
            // msg = msg.replace(/\{nickName\}/g, heroM.roleInfo.nickname);

            return msg;
        }

        public static formatLength(msg:string, minLen:number, preSuff:string = '0', isLeft:boolean = true):string
        {
            var tLen:number = minLen - msg.length;
            var retMsg:string = msg;
            for (var i:number = 0; i < tLen; i++)
            {
                retMsg = isLeft ? preSuff + retMsg : retMsg + preSuff;
            }
            return retMsg;
        }

        /** 超出万的货币换算,非人民币为K  */
        public static resetMoney(money: number): string
        {
            var newBalance:string;
            if (money >= 1000000) 
            {
                var sendResult;
                var resultNum = (money / 100) + "";
                newBalance = parseInt(resultNum) / 10 + "k";
            } 
            else 
            {
                money = parseInt(money * 100 + "") / 100;
                newBalance = money + "";
                if (newBalance.indexOf(".") == -1) 
                {
                    newBalance = newBalance;
                } 
                else 
                {
                    newBalance = (money + "").substr(0, (money + "").indexOf("."));
                }

            }
            return newBalance;
        }

        public static formatMoney(money:number):string
        {
            // money = 99999.95922999;
            money = isNaN(money) ? 0 : Math.floor(money * 100) * 0.01;
            let tmpM:string[] = money.toString().split('.');
            var val1:number = parseInt(tmpM[0]);
            var val2:number;
            var val3:number;
            var tmpStr:string = '';
            var retStr:string = '';
            var xiaoshu:string = tmpM[1];//Math.floor((money - val1) * 100);
            while (val1 > 1000)
            {
                val2 = Math.floor(val1 / 1000);
                val3 = val1 - val2 * 1000;
                val1 = val2;
                tmpStr = val3.toString();
                if (tmpStr.length == 1)
                {
                    tmpStr = '00' + tmpStr;
                }
                else if (tmpStr.length == 2)
                {
                    tmpStr = '0' + tmpStr;
                }
                retStr = ',' + tmpStr + retStr;
            }
            retStr = val1 + retStr;
            if (xiaoshu)
            {
                if (xiaoshu.length == 1)
                {
                    xiaoshu += '0';
                }
                else if (xiaoshu.length > 2)
                {
                    xiaoshu = xiaoshu.substring(0, 2);
                }
                retStr += '.' + xiaoshu;
            }
            else
            {
                retStr += '.00';
            }

            return retStr;
        }

        public static fillLen(msg:string, len:number):string
        {
            let retMsg:string = "";
            for (let i:number = 0; i < len; i++)
            {
                retMsg += msg;
            }
            return retMsg;
        }
    }
}