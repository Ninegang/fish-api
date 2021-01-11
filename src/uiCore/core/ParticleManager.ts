module uiCore {
	import Map = egret.MapLike;
	export class ParticleManager {
		private static ParticleImageMap:Map<any>={};

		public constructor() {

		}

		public static setParticleMap(key:string,content:any):void{
			this.ParticleImageMap[key]=content;
		}

		public static init(res:string[]):void{
			if(res){
				for(var key in res){
					this.setParticleImageMap(res[key]);
				}
			}
		}

		private static setParticleImageMap(res:string):void{
			if(uiCore.ZipManager.getParticleJsonMap(res)){
				if(!this.ParticleImageMap[res]){
					this.particleImageLoading(res);
				}
			}
		}

		private static particleImageLoading(particleName:string):void{
			if(RES.hasRes(particleName)){
				var data=RES.getRes(particleName);
				if(data){
					this.ParticleImageMap[particleName]=data;
				}else{
					RES.getResAsync(particleName, this.checkParticleImageMap, this);
				}
			}
		}

		private static checkParticleImageMap(data:any,key:string){
			this.particleImageLoading(key);
		}

		public static getParticleSystem(particleName:string):particle.ParticleSystem{
			let particleJson:any=uiCore.ZipManager.getParticleJsonMap(particleName);
			let particleImage:any=this.ParticleImageMap[particleName];
			if(!particleImage){
				particleImage=uiCore.ZipManager.getSubkeyImageMap(particleName);
			}
			if(particleJson&&particleImage){
				let pa:particle.ParticleSystem = new particle.GravityParticleSystem(particleImage, particleJson);
				this.ParticleSystemObjectManager(pa);
				return pa;
			}
			return null;
		}
		private static ParticleSystemObjectManager(ps:particle.ParticleSystem){
			ps.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private static onRemoved(event: egret.Event){
			var ps:particle.ParticleSystem=event.currentTarget;
			ps.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
			ps.stop(true);
		}
	}
}