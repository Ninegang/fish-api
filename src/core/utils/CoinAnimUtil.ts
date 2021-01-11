namespace app
{
    export class CoinAnimUtil
    {
        private static runTxts:any[] = [];
        private static runTxtObjs:any[] = [];

        public static to(txt:egret.TextField | egret.BitmapText, val:number, duration:number = 1000):void
        {
            let sVal:number = parseFloat(txt.text);

            let txtObj:{value:number} = {value:sVal};

            CoinAnimUtil.addRunTxt(txt, txtObj);
            egret.Tween.get(txtObj, {onChange:()=>
                {
                    txt.text = txtObj.value.toFixed(2);
                }, onChangeObj:this}).to({value:val}, duration, egret.Ease.sineOut).call(()=>
                {
                    CoinAnimUtil.removeRunTxt(txt);
                }, this);
        }

        private static addRunTxt(txt:any, txtObj:any):void
        {
            CoinAnimUtil.removeRunTxt(txt);

            CoinAnimUtil.runTxts.push(txt);
            CoinAnimUtil.runTxtObjs.push(txtObj);
        }

        private static removeRunTxt(txt:any):void
        {
            let txtIndex = CoinAnimUtil.runTxts.indexOf(txt);
            if (txtIndex != -1)
            {
                CoinAnimUtil.runTxts.splice(txtIndex, 1);

                egret.Tween.removeTweens(CoinAnimUtil.runTxtObjs[txtIndex]);
                CoinAnimUtil.runTxtObjs.splice(txtIndex, 1);
            }
        }
    }
}