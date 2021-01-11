namespace uiCore {
	import Map = egret.MapLike;
	export class ZipManager {
		public static readonly ZIP_CONFIG={
			projectConfig:"config_zip",//包括鱼线、Protobuf协议
			particleEffect:"publicParticle_zip",//粒子特效json文件集合
			movieClipEffect:"publicMovieClip_zip",//序列帧json文件集合
			dragonBoneEffect:"publicDragonBone_zip",//龙骨动画文件集合
			sounds:"FishAudio_zip",//音效
			sheetImage:"publicSheet_zip,fishGameSheet_zip",//图集Json文件集合
			fontImage:"fishGameFnt_zip"//字体Json文件集合
		};
		private static ParticleJsonMap:Map<any>={};
		private static MovieClipJsonMap:Map<any>={};
		private static DragonBoneJsonMap:Map<any>={};
		private static SoundsMap:Map<any>={};
		private static SheetImageMap:Map<any>={};
		private static SubkeyImageMap:Map<any>={};
		private static FontImageJsonMap:Map<any>={};
		private static FontImageMap:Map<any>={};
		public constructor() {
			
		}
		public static zipResourceProgress(zipName:string):void{
			if(this.ZIP_CONFIG.projectConfig==zipName){
				uiCore.ProtobufManager.init(zipName);
				FishGameManager.initFishManager(zipName);
			}else if(this.ZIP_CONFIG.particleEffect.indexOf(zipName)>=0){
				this.zipParticleLoading(zipName);
			}else if(this.ZIP_CONFIG.movieClipEffect.indexOf(zipName)>=0){
				this.zipMovieClipLoading(zipName);
			}else if(this.ZIP_CONFIG.sounds.indexOf(zipName)>=0){
				this.zipSoundsLoading(zipName);
			}else if(this.ZIP_CONFIG.dragonBoneEffect.indexOf(zipName)>=0){
				this.dragonBoneLoading(zipName);
			}else if(this.ZIP_CONFIG.sheetImage.indexOf(zipName)>=0){
				this.sheetImageLoading(zipName);
			}else if(this.ZIP_CONFIG.fontImage.indexOf(zipName)>=0){
				this.fontImageLoading(zipName);
			}
		}
		public static fontImageLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						let keyName:string=relativePath.substr(0,relativePath.lastIndexOf("."));
						file.async('text').then(content => {
							uiCore.ZipManager.FontImageJsonMap[keyName]=JSON.parse(content);
						});
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkFontImage,this);
			}
		}

		private static checkFontImage(data:any,key:string){
			this.fontImageLoading(key);
		}

		public static initFont(fontNames:Array<string>):void{
			if(fontNames.length>0){
				for(var name in fontNames){
					this.fontLoading(fontNames[name]);
				}
			}
		}

		private static fontLoading(imageName:string):void{
			if(!this.FontImageMap[imageName+"_fnt"]){
				if(RES.hasRes(imageName)){
					var imageData=RES.getRes(imageName);
					if(imageData){
						if(this.FontImageJsonMap[imageName]){
							this.FontImageMap[imageName+"_fnt"]=new egret.BitmapFont(imageData, this.FontImageJsonMap[imageName]);
						}
					}else{
						RES.getResAsync(imageName,this.checkFont,this);
					}
				}else if(this.SubkeyImageMap[imageName]&&this.FontImageJsonMap[imageName]){
					this.FontImageMap[imageName+"_fnt"]=new egret.BitmapFont(this.SubkeyImageMap[imageName], this.FontImageJsonMap[imageName]);
				}
			}
		}

		public static getFontImageMap(key:string):egret.BitmapFont{
			if(this.FontImageMap[key]){
				return this.FontImageMap[key];
			}
			return null;
		}

		private static checkFont(data:any,key:string):void{
			this.fontLoading(key);
		}
		public static sheetImageLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						file.async('string').then(content => {
							let dataJson:any=JSON.parse(content);
							uiCore.ZipManager.saveTexture(dataJson);
						});
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkSheetImage,this);
			}
		}
		private static checkSheetImage(data:any,key:string){
			this.sheetImageLoading(key);
		}
		private static saveTexture(data:any):void{
			let imageName:string=data.file;
			imageName=imageName.replace(".","_");
			this.SheetImageMap[imageName]=data;
			this.textureLoading(imageName);
		}
		private static textureLoading(imageName:string):void{
			var imageData=RES.getRes(imageName);
			if(imageData){
				if(this.SheetImageMap[imageName]){
					var frames = this.SheetImageMap[imageName].frames;
                    var spriteSheet = new egret.SpriteSheet(imageData);
					for (var subkey in frames) {
						var config = frames[subkey];
						var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
						if (config["scale9grid"]) {
							var str = config["scale9grid"];
							var list = str.split(",");
							texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
						}
						this.SubkeyImageMap[subkey]=texture;
					}
					delete this.SheetImageMap[imageName];
				}
			}else{
				RES.getResAsync(imageName,this.checkTexture,this);
			}
		}

		private static checkTexture(data:any,key:string):void{
			this.textureLoading(key);
		}

		public static getSubkeyImageMap(key:string):egret.Texture{
			if(this.SubkeyImageMap[key]){
				return this.SubkeyImageMap[key];
			}
			return null;
		}

		public static setSubkeyImageMap(key:string,value:egret.Texture):void{
			if(key&&value){
				this.SubkeyImageMap[key]=value;
			}
		}

		public static dragonBoneLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						let dragonBoneName:string=relativePath.substr(0,relativePath.lastIndexOf("."));
						if(!ZipManager.DragonBoneJsonMap[dragonBoneName]){
							file.async('text').then(content => {
								ZipManager.DragonBoneJsonMap[dragonBoneName]=JSON.parse(content);
							});
						}
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkDragonBoneJsonMap,this);
			}
		}

		private static checkDragonBoneJsonMap(data:any,key:string){
			this.dragonBoneLoading(key);
		}

		public static zipSoundsLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						let soundsName:string=relativePath.substr(0,relativePath.lastIndexOf("."));
						if(!ZipManager.SoundsMap[soundsName]){
							file.async('base64').then(base64 => {
								ZipManager.SoundsMap[soundsName]="data:audio/mp3;base64,"+base64;
							});
						}
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkSoundsMap,this);
			}
		}

		private static checkSoundsMap(data:any,key:string){
			this.zipSoundsLoading(key);
		}

		public static zipMovieClipLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						if(!file.dir){
						let movieClipName:string=relativePath.substr(0,relativePath.lastIndexOf("."));
						if(!ZipManager.MovieClipJsonMap[movieClipName]){
							file.async('text').then(content => {
								ZipManager.MovieClipJsonMap[movieClipName]=JSON.parse(content);
							});
						}
						}
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkMovieClipJsonMap,this);
			}
		}

		private static checkMovieClipJsonMap(data:any,key:string){
			this.zipMovieClipLoading(key);
		}
		public static zipParticleLoading(zipName:string):void{
			var data=RES.getRes(zipName);
			if(data){
				JSZip.loadAsync(data).then((zipdata) => {
					zipdata.forEach(function (relativePath:string, file) {
						let particleName:string=relativePath.substr(0,relativePath.lastIndexOf("."));
						if(!ZipManager.ParticleJsonMap[particleName]){
							file.async('text').then(content => {
								ZipManager.ParticleJsonMap[particleName]=JSON.parse(content);
							});
						}
					});
				});
			}else{
				RES.getResAsync(zipName,this.checkParticleJsonMap,this);
			}
		}

		private static checkParticleJsonMap(data:any,key:string){
			this.zipParticleLoading(key);
		}

		public static getParticleJsonMap(particleName:string):any{
			if(this.ParticleJsonMap[particleName]){
				return this.ParticleJsonMap[particleName];
			}
			return null;
		}
		public static getMovieClipJsonMap(movieClipName:string):any{
			if(this.MovieClipJsonMap[movieClipName]){
				return this.MovieClipJsonMap[movieClipName];
			}
			return null;
		}
		public static getSoundsMap(soundsName:string):string{
			if(this.SoundsMap[soundsName]){
				return this.SoundsMap[soundsName];
			}else{
				var soundData=RES.getRes(soundsName);
				if(soundData){
					return "data:audio/mp3;base64,"+egret.Base64Util.encode(soundData);
					// return "data:audio/wav;base64,"+egret.Base64Util.encode(soundData);
				}else{
					RES.getResAsync(soundsName);
				}
			}
			return null;
		}
		public static getDragonBoneJsonMap(dragonBoneName:string):any{
			if(this.DragonBoneJsonMap[dragonBoneName]){
				return this.DragonBoneJsonMap[dragonBoneName];
			}
			return null;
		}
	}
}