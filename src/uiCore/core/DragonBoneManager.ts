module uiCore {
	import Map = egret.MapLike;
	export class DragonBoneManager {

		private static DragonBoneFactoryMap:Map<dragonBones.EgretFactory>={};

		public constructor() {

		}

		public static setDragonBoneMap(key:string,content:dragonBones.EgretFactory):void{
			this.DragonBoneFactoryMap[key]=content;
		}
		public static init(res:string[]):void{
			if(res){
				for(var i=0;i<res.length;i++){
					this.setDbFactory(res[i]);
				}
			}
		}

		private static setDbFactory(res:string){
			if(uiCore.ZipManager.getDragonBoneJsonMap(res+"_ske")&&uiCore.ZipManager.getDragonBoneJsonMap(res+"_tex")){
				if(!this.DragonBoneFactoryMap[res]){
					this.dragonBoneLoading(res);
				}
			}
		}

		private static dragonBoneLoading(dbName:string):void{
			var data=RES.getRes(dbName+"_tex_png");
			if(data){
				let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
				egretFactory.parseDragonBonesData(uiCore.ZipManager.getDragonBoneJsonMap(dbName+"_ske"));  
				egretFactory.parseTextureAtlasData(uiCore.ZipManager.getDragonBoneJsonMap(dbName+"_tex"), data);
				this.DragonBoneFactoryMap[dbName]=egretFactory;
			}else{
				RES.getResAsync(dbName+"_tex_png", this.checkDragonBoneMap, this);
			}
		}

		private static checkDragonBoneMap(data:any,key:string){
			key=key.substr(0,key.lastIndexOf("_")).substr(0,key.lastIndexOf("_"));
			this.dragonBoneLoading(key);
		}

		
		public static getGenerateDragonBoneData(runName:string):dragonBones.EgretArmatureDisplay{
			for(var key in this.DragonBoneFactoryMap){
				var armatureDisplay:dragonBones.EgretArmatureDisplay=this.DragonBoneFactoryMap[key].buildArmatureDisplay(runName);
				if(armatureDisplay){
					this.DragonBoneObjectManager(armatureDisplay);
					return armatureDisplay;
				}
			}
			return null;
		}

		private static DragonBoneObjectManager(db:dragonBones.EgretArmatureDisplay){
			db.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private static onRemoved(event: egret.Event){
			var db:dragonBones.EgretArmatureDisplay=event.currentTarget;
			db.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
			if(db.animation.isPlaying){
				db.animation.stop();
			}
		}
	}
}