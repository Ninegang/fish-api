/** 分解 */
class DisassembleAlgorithm
{
    /** 贪心算法（分解） */
    public static greed(value:number, divisors:number[]):number[]
    {
        let retList:number[] = [];

        let tempDivisors:number[] = divisors.concat();
        tempDivisors.sort((v1:number, v2:number)=>
        {
            return v2 - v1;
        });

        while(tempDivisors.length)
        {
            if (value > tempDivisors[0])
            {
                value -= tempDivisors[0];

                retList.push(tempDivisors[0]);
            }
            else
            {
                tempDivisors.shift();
            }
        }
        return retList;
    }

    //--------------------------------------------------------------------------------------------
    
    public static dp(money:number, divisors:number[]):number[]
    {
        if (!divisors || divisors.length <= 0)
        {
            return [];
        }
        
        let tempDivisors:number[] = divisors.concat();
        tempDivisors.sort((v1:number, v2:number)=>
        {
            return v2 - v1;
        });

        if (tempDivisors[0] * 10 > money)
        {

            // DisassembleAlgorithm.tc = 0;

            let retCounts:number[] = [];
            let isSucc:boolean = DisassembleAlgorithm.parseMoney(money, tempDivisors, 0, retCounts, 0);

            // console.log('--------------------------------------------->', DisassembleAlgorithm.tc);

            if (isSucc)
            {
                let retVals:number[] = [];
                let tempC:number;
                for (let i:number = 0; i < retCounts.length; i++)
                {
                    tempC = retCounts[i];

                    for (let j:number = 0; j < tempC; j++)
                    {
                        retVals.push(tempDivisors[i]);
                    }
                }
                return retVals;
            }
        }

        return DisassembleAlgorithm.greed(money, tempDivisors);
    }

    // private static tc:number = 0;

    /**  */
    private static parseMoney(money:number, divisors:number[], poIdx:number, respL:number[], count:number):boolean
    {
        // DisassembleAlgorithm.tc ++;

        if (poIdx >= 0 && poIdx < divisors.length)
        {
            let chipVal:number = divisors[poIdx];
            let tmpNum:number = Math.floor(money / chipVal);

            let childOk:boolean = false;
            let tmpMoney:number;
            for (let i:number = tmpNum; i >= 0; i--)
            {
                tmpMoney = money - chipVal * i;
                if (tmpMoney === 0)
                {
                    // 成功
                    respL[poIdx] = i;

                    return true;
                }

                if (count + i > 10)
                {
                    childOk = false;
                }
                else
                {
                    childOk = this.parseMoney(tmpMoney, divisors, poIdx + 1, respL, count + i);
                }

                if (childOk)
                {
                    // 成功
                    respL[poIdx] = i;

                    return true;
                }
            }
        }

        return false;
    }

    //-------------------------------------------------------------------------------------------------------------------
    public getChipsByNumber2( k:number,chiplist:Array<number>):Array<number>
    {
            let a = [],list=[],resultList:Array<number>=[];
            a[0] = 0;
            for (let x = 1; x < k + 1; x++)
            { //要求a[k],先求a[1]~a[k-1]
                if (x >= chiplist[0])
                {  //给a[x]附初值
                    a[x] = a[x - chiplist[0]] + 1;
                    resultList[x] = chiplist[0];
                }
                else
                {   
                    //分解不了
                    a[x] = 100000000 - k;
                }
                for (let i = 1; i < chiplist.length; i++)
                {
                    if (x >= chiplist[i] && (a[x] > a[x - chiplist[i]] + 1))
                    {
                        //x-chiplist[i]表示当前值减去coins[]中值，即可由前面那些子问题+1一次得来
                        a[x] = a[x - chiplist[i]] + 1;
                        resultList[x] = chiplist[i];
                    }
                }
            }
        for(let i=k;i>0;){
            list.push(resultList[i]);
            i=i-resultList[i];
        }
        return list;
    }
}