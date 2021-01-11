class GoldPillarPool{
    private goldPillarList:Array<GoldPillar>;
    private fishGen:FishGen;
    public constructor(fishGen:FishGen){
       this.goldPillarList=[];
       this.fishGen=fishGen;
    }
    public initGoldPillarPool():void{
        if(this.goldPillarList&&this.goldPillarList.length>0){
            for(var key in this.goldPillarList){
                this.goldPillarList[key].Running=false;
                this.goldPillarList[key].alpha=0;
                this.goldPillarList[key].visible=false;
            }
        }
    }
    public getGoldPillarObject():GoldPillar{
        if(this.goldPillarList&&this.goldPillarList.length>0){
            // if(this.goldPillarList.length>100){
            //     console.log("goldPillarList:"+this.goldPillarList.length);
            // }
            for(var key in this.goldPillarList){
                if(!this.goldPillarList[key].getRunning){
                    return this.goldPillarList[key];
                }
            }
        }
        let result:GoldPillar = new GoldPillar();
        this.goldPillarList.push(result);
        this.fishGen.addChild(result);
        return result;
    }
    public getGoldPillarCount():number{
        let index:number=0;
        if(this.goldPillarList.length>0){
            for(var key in this.goldPillarList){
                if(this.goldPillarList[key].getRunning){
                    index++;
                }
            }
        }
        return index;
    }
    public Dispose():void{
        if(this.goldPillarList&&this.goldPillarList.length>0){
            for(var key in this.goldPillarList){
                this.goldPillarList[key].clearGoldPillar();
            }
        }
	}
}