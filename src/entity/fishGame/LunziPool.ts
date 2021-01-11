class LunziPool{
    private static LunziList:Array<Lunzi>=[];
    public constructor(){
       
    }
    public static getLunziObject():Lunzi{
        if(this.LunziList.length>0){
            // if(this.LunziList.length>30){
            //     console.log("LunziList:"+this.LunziList.length);
            // }
            for(var key in this.LunziList){
                if(!this.LunziList[key].getRunning){
                    if(this.LunziList[key].checkLunzigold()){
                        return this.LunziList[key];
                    }else{
                        this.LunziList.splice(Number(key),1);
                    }
                }
            }
        }
        let result:Lunzi = new Lunzi();
        this.LunziList.push(result);
        return result;
    }
    public static Dispose():void{
        if(this.LunziList.length>0){
            for(var key in this.LunziList){
                this.LunziList[key].cleanLunzi();
            }
        }
        this.LunziList=[];
	}
}