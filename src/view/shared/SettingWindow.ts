class SettingWindow extends uiCore.Window {
	private btnCloseWindow: uiCore.Button;
	private groupBGMSwitch: eui.Group;
	private lblBGMSwitchDesc: eui.Image;
	private _bgmIsMute: boolean;
	private kSwitchXChange = 80;
	private kSettingOpenBGMImg = "setting_chinese_open";
	private kSettingCloseBGMImg = "setting_chinese_close";
	public constructor() {
		super();
		this.skinName = "SettingWindowSkin2";
	}
	public start(): void {
		this.initEvent();

		// 读取本地存储的状态
		this._bgmIsMute = uiCore.SoundByteManager.musicValue == 0;

		if (this._bgmIsMute) {
			this.groupBGMSwitch.x -= this.kSwitchXChange;
			this.lblBGMSwitchDesc.source = this.kSettingCloseBGMImg;
		}
	}
	public onDestroy() { 
        this.removeEvent();
		super.onDestroy();
    }
	public initEvent() {
		this.btnCloseWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
		this.groupBGMSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeStatus, this);
    }
	public removeEvent(){
		this.btnCloseWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCloseWindow, this);
		this.groupBGMSwitch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeStatus, this);
	}
	public onBtnCloseWindow(){
		uiCore.Application.closeWindow(this);
	}
	public onBtnChangeStatus(){
		if (this._bgmIsMute) {
			this.groupBGMSwitch.x = 549;
			this.lblBGMSwitchDesc.source = this.kSettingOpenBGMImg;
		}else {
			this.groupBGMSwitch.x -= this.kSwitchXChange;
			this.lblBGMSwitchDesc.source = this.kSettingCloseBGMImg;
		}
		this._bgmIsMute = !this._bgmIsMute;
		egret.localStorage.setItem(uiCore.SoundByteManager.FISH_MUSIC_VALUE, this._bgmIsMute ? "0":"0.5");
		egret.localStorage.setItem(uiCore.SoundByteManager.FISH_SOUND_VALUE, this._bgmIsMute ? "0":"0.8");
		uiCore.SoundByteManager.musicValue=this._bgmIsMute ? 0:0.5;
        uiCore.SoundByteManager.soundValue=this._bgmIsMute ? 0:0.8;
		uiCore.SoundByteManager.setVolumes();
	}
}