/*[[
	通用对象池
	使用要求
	1、对象必须要有 IsRunning() 及 Dispose()
	2、必须提供对象实例化函数createObjFunc()
]]
*/
class BulletPool{
	public objList:Array<Bullet>;
    private createObjFunc:()=>Bullet;
    public constructor(createObjFunc:()=>Bullet){
        this.objList=[];
		this.createObjFunc=createObjFunc;
    }
    public Init(capacity):void{
        if (this.objList.length==0){
            for(var i = 0;i<capacity;i++){ 
                let obj:Bullet = this.createObjFunc();        
                this.objList.push(obj);   
            }
        }
    }
    public activeNum():number{
        let indx:number = 0;
        for(var i = 0;i<this.objList.length;i++){
            if (this.objList[i].Running){
                 indx++;
            }
        }
        return indx;
    }
    public setLockFish():void{
        for(var i = 0;i<this.objList.length;i++){
            if (this.objList[i].Running){
                this.objList[i].setLockFish(null);
            }
        }
    }
    public GetObject():Bullet{
        for(var i = 0;i<this.objList.length;i++){
            if (!this.objList[i].Running){
                return this.objList[i];
            }
        }
        let result:Bullet = this.createObjFunc();
        this.objList.push(result);
        return result;
    }

    // public Dispose():void{
    //     let num:number = this.objList.length;
    //     if (num>0){
    //         for(var i=num;i>0;i--){
    //             let item:Bullet = this.objList.shift();
    //             item.Dispose();
    //             item = null;    
    //         }
    //     } 
	// }
    public Dispose(): void {
        var num = this.objList.length;
        if (num > 0) {
            for (var i = num; i > 0; i--) {
                var item = this.objList.pop();
                item.Dispose();
            }
        }
        this.objList = [];
	}
}