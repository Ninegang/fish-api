class FishGameManager {
	//初始化所有鱼对象,此对象可能加载失败为0个数组，用之前需判断
	public static fishObjects:Array<any>;
	public static groupPathDic:Map<string>;
	public static pathDic:Map<string>;
	public static fishDic:Map<string>;
	public static fishGameDic:Map<string>;
	private static fishPathNames:Array<string>;
	public static deltaTime:number=0;

	public constructor() {

	}

	public static initFishManager(res:string){
		var data=RES.getRes(res);
		if(data){
			this.fishObjects=[];
			this.fishGameDic={};
			this.groupPathDic={};
			this.pathDic={};
			this.fishDic={};
			this.fishPathNames=[];
			JSZip.loadAsync(data).then((zipdata) => {
				zipdata.forEach(function (relativePath, file) {
					FishGameManager.initConfig(relativePath, file);
				});
			});
		}else{
			RES.getResAsync(res, this.checkFishManager, this);
		}
	}
	private static checkFishManager(data:any,key:string){
		this.initFishManager(key);
	}
	private static initConfig(relativePath:string,file:any):void{
		if(!file.dir){
			if(relativePath.indexOf("fishs.json")>=0){
				file.async('string').then(content => {
					this.fishObjects = JSON.parse(content);
				});
			}else if(relativePath.indexOf("fishgames.json")>=0){
				file.async('string').then(content => {
					this.loadFishGame(JSON.parse(content));
				});
			}else if(relativePath.indexOf("fishPaths")>=0){
				relativePath=relativePath.substr(10,relativePath.length-15);
				this.fishPathNames.push(relativePath);
				file.async('string').then(content => {
					this.initFishPath(relativePath,JSON.parse(content));
				});
			}
		}
	}
	private static loadFishGame(games:Array<any>):void{
		for(var i=0;i<games.length;i++){
			this.fishGameDic[games[i].gameId]=games[i];
		}
	}
	private static initFishPath(name:string,result:any){
		if(uiCore.StringUtils.textIndexOf(name,"group_")){
			this.groupPathDic[name]=result;
		}else if(uiCore.StringUtils.textIndexOf(name,"groupfont_")){
			this.fishDic[name]=result;
		}else if(uiCore.StringUtils.textIndexOf(name,"grouproat_")){
			this.groupPathDic[name]=result;
		}else if(uiCore.StringUtils.textIndexOf(name,"large_")){
			this.pathDic[name]=result;
		}else if(uiCore.StringUtils.textIndexOf(name,"small_")){
			this.pathDic[name]=result;
		}
	}
	//判断初始化是否成功
	//true:初始化失败需要重新初始化 false:没问题
	public static checkFishConfig():boolean{
		if(this.fishPathNames==null||this.fishPathNames.length==0){
			return true;
		}
		if(this.fishObjects==null||this.fishObjects.length==0){
			return true;
		}
		if(this.groupPathDic==null||uiCore.Utils.checkNullObj(this.groupPathDic)){
			return true;
		}
		if(this.pathDic==null||uiCore.Utils.checkNullObj(this.pathDic)){
			return true;
		}
		if(this.fishDic==null||uiCore.Utils.checkNullObj(this.fishDic)){
			return true;
		}
		if(this.fishGameDic==null||uiCore.Utils.checkNullObj(this.fishGameDic)){
			return true;
		}
		let flag:boolean=false;
		for(let i=0;i<this.fishPathNames.length;i++){
			if(!this.groupPathDic[this.fishPathNames[i]]&&!this.pathDic[this.fishPathNames[i]]&&!this.fishDic[this.fishPathNames[i]]){
				flag=true;
				break;
			}
		}
		return flag;
	}
}