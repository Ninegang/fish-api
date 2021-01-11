namespace uiCore
{
	export class ButtonEx extends eui.Button implements eui.UIComponent
	{
		public soundPath: string = "window_open_mp3";
		public data: StyleFrameData;
		private _styleFrame: string = "";
		private _styleBtnUp: string = "button_up";
		private _styleBtnDown: string = "button_down";

		private _suffName: string = "_png";

		public constructor()
		{
			super();
			this.data = new StyleFrameData();
			this.skinName = "ButtonExSkin";
		}

		protected createChildren(): void
		{
			super.createChildren();
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
		}

		private onTouchTab(ev:egret.TouchEvent): void
		{
			if (RES.hasRes(this.soundPath))
			{
				// uiCore.SoundManager.playEffect(this.soundPath);
			}
		}

		get styleFrame(): string
		{
			return this._styleFrame;
		}

		set styleFrame(value: string)
		{
			if (this._styleFrame != value)
			{
				this._styleFrame = value;
				this.data.upIcon = this.styleBtnUp + this._styleFrame + this._suffName;
				this.data.downIcon = this.styleBtnDown + this._styleFrame + this._suffName;
			}
		}

		get styleBtnUp(): string
		{
			return this._styleBtnUp;
		}

		set styleBtnUp(value: string)
		{
			this._styleBtnUp = value;
		}

		get styleBtnDown(): string
		{
			return this._styleBtnDown;
		}

		set styleBtnDown(value: string)
		{
			this._styleBtnDown = value;
		}
	}

	/**样式帧数据*/
	class StyleFrameData
	{
		private _downIcon: string;
		private _upIcon: string;

		get downIcon(): string
		{
			return this._downIcon;
		}

		set downIcon(value: string)
		{
			this._downIcon = value;
		}

		get upIcon(): string
		{
			return this._upIcon;
		}

		set upIcon(value: string)
		{
			this._upIcon = value;
		}
	}
}