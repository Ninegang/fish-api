class DragonBoneGroup extends eui.Group{

	public source:string="";
	public sourceName:string="";
	private dragonBonesEgret:dragonBones.EgretArmatureDisplay;
	public dragonBonesEgretScaleX:number=1;
	public dragonBonesEgretScaleY:number=1;

	public constructor() {
		super();
	}

	public get getDragonBonesEgret():dragonBones.EgretArmatureDisplay{
		return this.dragonBonesEgret;
	}

	protected createChildren():void {
    	super.createChildren();
		this.setDragonBonesEgret();
    }

	private setDragonBonesEgret():void{
		this.dragonBonesEgret=uiCore.DragonBoneManager.getGenerateDragonBoneData(this.sourceName);
		if(this.dragonBonesEgret){
			this.addDragonBonesEgret();
		}else if(uiCore.ZipManager.getDragonBoneJsonMap(this.source+"_ske")&&uiCore.ZipManager.getDragonBoneJsonMap(this.source+"_tex")){
			this.dragonBonesImageLoading();
		}
	}
	private dragonBonesImageLoading():void{
		var data=RES.getRes(this.source+"_tex_png");
		if(data){
			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			egretFactory.parseDragonBonesData(uiCore.ZipManager.getDragonBoneJsonMap(this.source+"_ske"));  
			egretFactory.parseTextureAtlasData(uiCore.ZipManager.getDragonBoneJsonMap(this.source+"_tex"), data);
			uiCore.DragonBoneManager.setDragonBoneMap(this.source,egretFactory);
			this.setDragonBonesEgret();
		}else{
			RES.getResAsync(this.source+"_tex_png", this.dragonBonesImageLoading, this);
		}
	}
	private addDragonBonesEgret():void{
		this.addChild(this.dragonBonesEgret);
		this.dragonBonesEgret.scaleX=uiCore.Application.app.stage.stageWidth/(this.dragonBonesEgret.width-600);
		this.dragonBonesEgret.scaleY=uiCore.Application.app.stage.stageHeight/this.dragonBonesEgret.height;
	}
}