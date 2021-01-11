class MoneyLabelPool{
    private static MoneyLabelList:Array<MoneyLabel>=[];
    public constructor(){
       
    }
    public static getMoneyLabelObject():MoneyLabel{
        if(this.MoneyLabelList.length>0){
            // if(this.MoneyLabelList.length>200){
            //     console.log("MoneyLabelList:"+this.MoneyLabelList.length);
            // }
            for(var key in this.MoneyLabelList){
                if(!this.MoneyLabelList[key].getRunning){
                    if(this.MoneyLabelList[key].checkMoneyBit()){
                        return this.MoneyLabelList[key];
                    }else{
                        this.MoneyLabelList.splice(Number(key),1);
                    }
                }
            }
        }
        let result:MoneyLabel = new MoneyLabel();
        this.MoneyLabelList.push(result);
        return result;
    }
    public static Dispose():void{
        if(this.MoneyLabelList.length>0){
            for(var key in this.MoneyLabelList){
                this.MoneyLabelList[key].cleanMoneyLabel();
            }
        }
        this.MoneyLabelList=[];
	}
}