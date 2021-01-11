module uiCore {
	import Map = egret.MapLike;
	export class MovieClipManager {

		private static MovieClipFactoryMap:Map<egret.MovieClipDataFactory>={};

		public constructor() {

		}

		public static setMovieClipMap(key:string,content:egret.MovieClipDataFactory):void{
			this.MovieClipFactoryMap[key]=content;
		}
		public static init(res:string[]):void{
			if(res){
				for(var i=0;i<res.length;i++){
					this.setMcFactory(res[i]);
				}
			}
		}

		private static setMcFactory(res:string){
			if(uiCore.ZipManager.getMovieClipJsonMap(res)){
				if(!this.MovieClipFactoryMap[res]){
					this.movieClipLoading(res);
				}
			}
		}

		private static movieClipLoading(mcName:string):void{
			var data=RES.getRes(mcName+"_png");
			if(data){
				this.MovieClipFactoryMap[mcName]=new egret.MovieClipDataFactory(uiCore.ZipManager.getMovieClipJsonMap(mcName),data);
			}else{
				RES.getResAsync(mcName+"_png", this.checkMovieClipMap, this);
			}
		}

		private static checkMovieClipMap(data:any,key:string){
			key=key.substr(0,key.lastIndexOf("_"));
			this.movieClipLoading(key);
		}

		
		public static getGenerateMovieClipData(runName:string):egret.MovieClip{
			for(var key in this.MovieClipFactoryMap){
				var data:egret.MovieClipData=this.MovieClipFactoryMap[key].generateMovieClipData(runName);
				if(data&&data.mcData){
					var mc:egret.MovieClip=new egret.MovieClip(data);
					this.MovieClipObjectManager(mc);
					return mc;
				}
			}
			return null;
		}

		private static MovieClipObjectManager(mc:egret.MovieClip){
			mc.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private static onRemoved(event: egret.Event){
			var mc:egret.MovieClip=event.currentTarget;
			mc.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
			if(mc.isPlaying){
				mc.stop();
			}
		}

		// public static clearMovieClip(){
		// 	for(var key in this.MovieClipFactoryMap){
		// 		this.MovieClipFactoryMap[key].clearCache();
		// 	}
		// }
	}
}