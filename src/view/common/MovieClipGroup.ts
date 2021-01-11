class MovieClipGroup extends eui.Group{

	public source:string="";
	public rameLabel:string="";
	public sourceName:string="";

	public constructor() {
		super();
	}

	protected createChildren():void {
    	super.createChildren();
		this.loadingConfig();
    }

	private loadingConfig():void{
		let mc:egret.MovieClip=uiCore.MovieClipManager.getGenerateMovieClipData(this.sourceName);
		if(mc){
			mc.gotoAndPlay(this.rameLabel,-1);
			this.addChild(mc);
		}else if(uiCore.ZipManager.getMovieClipJsonMap(this.source)){
			this.mcLoading();
		}
	}

	private mcLoading():void{
		var data=RES.getRes(this.source+"_png");
		if(data){
			uiCore.MovieClipManager.setMovieClipMap(this.source,new egret.MovieClipDataFactory(uiCore.ZipManager.getMovieClipJsonMap(this.source),data));
			this.loadingConfig();
		}else{
			RES.getResAsync(this.source+"_png", this.mcLoading, this);
		}
	}
}