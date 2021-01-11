class FishnetPool{
    private static fishNetList:Array<Fishnet>=[];
    public constructor(){
       
    }
    public static getFishnetObject():Fishnet{
        if(this.fishNetList.length>0){
            // if(this.fishNetList.length>200){
            //     console.log("fishNetList:"+this.fishNetList.length);
            // }
            for(var key in this.fishNetList){
                if(!this.fishNetList[key].getRunning){
                    return this.fishNetList[key];
                }
            }
        }
        let result:Fishnet = new Fishnet();
        this.fishNetList.push(result);
        return result;
    }
    public static Dispose():void{
        if(this.fishNetList.length>0&&FishGameController.getGameView()){
            for(var key in this.fishNetList){
                FishGameController.getGameView().bulletGroup.removeChild(this.fishNetList[key]);
            }
        }
        this.fishNetList=[];
	}
}