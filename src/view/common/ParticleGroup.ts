class ParticleGroup extends eui.Group{

	public source:string="";
	private particleSystem:particle.ParticleSystem;
	public particleScaleX:number=1;
	public particleScaleY:number=1;

	public constructor() {
		super();
	}

	public get getParticleSystem():particle.ParticleSystem{
		return this.particleSystem;
	}

	protected createChildren():void {
    	super.createChildren();
		this.setParticleSystem();
    }

	private setParticleSystem():void{
		this.particleSystem=uiCore.ParticleManager.getParticleSystem(this.source);
		if(this.particleSystem){
			this.addParticleSystem();
		}else if(uiCore.ZipManager.getParticleJsonMap(this.source)){
			this.particleImageLoading();
		}
	}
	private particleImageLoading():void{
		if(RES.hasRes(this.source)){
			var data=RES.getRes(this.source);
			if(data){
				uiCore.ParticleManager.setParticleMap(this.source,data);
				this.setParticleSystem();
			}else{
				RES.getResAsync(this.source, this.particleImageLoading, this);
			}
		}
	}

	private addParticleSystem():void{
		this.addChild(this.particleSystem);
		this.particleSystem.scaleX=this.particleScaleX;
		this.particleSystem.scaleY=this.particleScaleY;
	}
}