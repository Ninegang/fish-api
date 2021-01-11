class FlyCoinPool{
    private static FlyCoinList:Array<FlyCoin>=[];
    public constructor(){
       
    }
    public static getFlyCoinObject(flyCoinType:number,isSelf:boolean):FlyCoin{
        if(this.FlyCoinList.length>0){
            for(var key in this.FlyCoinList){
                if(!this.FlyCoinList[key].getRunning&&this.FlyCoinList[key].getFlyCoinType==flyCoinType&&this.FlyCoinList[key].getIsGold==isSelf){
                    if(this.FlyCoinList[key].checkFlyCoinMc()){
                        return this.FlyCoinList[key];
                    }else{
                        this.FlyCoinList.splice(Number(key),1);
                    } 
                }
            }
        }
        let result:FlyCoin = new FlyCoin(flyCoinType,isSelf);
        this.FlyCoinList.push(result);
        return result;
    }
    public static Dispose():void{
        if(this.FlyCoinList.length>0){
            for(var key in this.FlyCoinList){
                this.FlyCoinList[key].cleanFlyCoin();
            }
        }
        this.FlyCoinList=[];
	}
}