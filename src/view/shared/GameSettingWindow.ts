class GameSettingWindow extends uiCore.Window {
	private bgmSlider: eui.HSlider;
	private musicSlider: eui.HSlider;
	private btnCloseWindow: uiCore.Button;
	public constructor() {
		super();
		this.skinName = "GameSettingSkin";

		// 获取初始音量大小
		this.musicSlider.value = uiCore.SoundByteManager.soundValue;
		this.bgmSlider.value = uiCore.SoundByteManager.musicValue;
	}
	public start(): void {
		this.initEvent();
	}
	public onDestroy() { 
        this.removeEvent();
		super.onDestroy();
    }
	public initEvent() {
		this.bgmSlider.addEventListener(egret.Event.CHANGE,this.bgmChangeHandler,this);
		this.musicSlider.addEventListener(egret.Event.CHANGE,this.musicChangeHandler,this);
		this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnCloseWindow,this);
    }
	public removeEvent(){
		this.bgmSlider.removeEventListener(egret.Event.CHANGE,this.bgmChangeHandler,this);
		this.musicSlider.removeEventListener(egret.Event.CHANGE,this.musicChangeHandler,this);
		this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnCloseWindow,this);
	}
	public onBtnCloseWindow(){
		uiCore.Application.closeWindow(this);
	}
	private bgmChangeHandler(evt: egret.TouchEvent):void {
    	// console.log("调节游戏内音乐至:" + evt.target.value);
		egret.localStorage.setItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, evt.target.value);
		uiCore.SoundByteManager.musicValue=evt.target.value;
		uiCore.SoundByteManager.setVolumes(0);
	}
	private musicChangeHandler(evt: egret.TouchEvent):void {
    	// console.log("调节游戏内音效至:" + evt.target.value);
		egret.localStorage.setItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, evt.target.value);
		uiCore.SoundByteManager.soundValue=evt.target.value;
		uiCore.SoundByteManager.setVolumes(1);
	}
}