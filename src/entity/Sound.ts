class Sound {
	private soundType:number;//0音乐 1特效音乐
	public music:Howl;
	private soundName:string;
	public constructor(music:Howl,soundType:number,soundName:string) {
		this.music=music;
		this.soundType=soundType;
		this.soundName=soundName;
	}
	public get getSoundType():number{
		return this.soundType;
	}

	public get getSoundName():string{
		return this.soundName;
	}
}