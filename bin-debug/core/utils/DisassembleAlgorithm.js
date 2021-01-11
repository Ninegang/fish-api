var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 分解 */
var DisassembleAlgorithm = (function () {
    function DisassembleAlgorithm() {
    }
    /** 贪心算法（分解） */
    DisassembleAlgorithm.greed = function (value, divisors) {
        var retList = [];
        var tempDivisors = divisors.concat();
        tempDivisors.sort(function (v1, v2) {
            return v2 - v1;
        });
        while (tempDivisors.length) {
            if (value > tempDivisors[0]) {
                value -= tempDivisors[0];
                retList.push(tempDivisors[0]);
            }
            else {
                tempDivisors.shift();
            }
        }
        return retList;
    };
    //--------------------------------------------------------------------------------------------
    DisassembleAlgorithm.dp = function (money, divisors) {
        if (!divisors || divisors.length <= 0) {
            return [];
        }
        var tempDivisors = divisors.concat();
        tempDivisors.sort(function (v1, v2) {
            return v2 - v1;
        });
        if (tempDivisors[0] * 10 > money) {
            // DisassembleAlgorithm.tc = 0;
            var retCounts = [];
            var isSucc = DisassembleAlgorithm.parseMoney(money, tempDivisors, 0, retCounts, 0);
            // console.log('--------------------------------------------->', DisassembleAlgorithm.tc);
            if (isSucc) {
                var retVals = [];
                var tempC = void 0;
                for (var i = 0; i < retCounts.length; i++) {
                    tempC = retCounts[i];
                    for (var j = 0; j < tempC; j++) {
                        retVals.push(tempDivisors[i]);
                    }
                }
                return retVals;
            }
        }
        return DisassembleAlgorithm.greed(money, tempDivisors);
    };
    // private static tc:number = 0;
    /**  */
    DisassembleAlgorithm.parseMoney = function (money, divisors, poIdx, respL, count) {
        // DisassembleAlgorithm.tc ++;
        if (poIdx >= 0 && poIdx < divisors.length) {
            var chipVal = divisors[poIdx];
            var tmpNum = Math.floor(money / chipVal);
            var childOk = false;
            var tmpMoney = void 0;
            for (var i = tmpNum; i >= 0; i--) {
                tmpMoney = money - chipVal * i;
                if (tmpMoney === 0) {
                    // 成功
                    respL[poIdx] = i;
                    return true;
                }
                if (count + i > 10) {
                    childOk = false;
                }
                else {
                    childOk = this.parseMoney(tmpMoney, divisors, poIdx + 1, respL, count + i);
                }
                if (childOk) {
                    // 成功
                    respL[poIdx] = i;
                    return true;
                }
            }
        }
        return false;
    };
    //-------------------------------------------------------------------------------------------------------------------
    DisassembleAlgorithm.prototype.getChipsByNumber2 = function (k, chiplist) {
        var a = [], list = [], resultList = [];
        a[0] = 0;
        for (var x = 1; x < k + 1; x++) {
            if (x >= chiplist[0]) {
                a[x] = a[x - chiplist[0]] + 1;
                resultList[x] = chiplist[0];
            }
            else {
                //分解不了
                a[x] = 100000000 - k;
            }
            for (var i = 1; i < chiplist.length; i++) {
                if (x >= chiplist[i] && (a[x] > a[x - chiplist[i]] + 1)) {
                    //x-chiplist[i]表示当前值减去coins[]中值，即可由前面那些子问题+1一次得来
                    a[x] = a[x - chiplist[i]] + 1;
                    resultList[x] = chiplist[i];
                }
            }
        }
        for (var i = k; i > 0;) {
            list.push(resultList[i]);
            i = i - resultList[i];
        }
        return list;
    };
    return DisassembleAlgorithm;
}());
__reflect(DisassembleAlgorithm.prototype, "DisassembleAlgorithm");
//# sourceMappingURL=DisassembleAlgorithm.js.map