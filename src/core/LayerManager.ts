namespace core
{
	export class LayerManager 
	{
		public static _instance:LayerManager;

		public static get instance():LayerManager
		{
			if(!this._instance)
			{
				this._instance = new LayerManager();
			}
			return this._instance;
		}

		//---------------------------------------------------------------------------------------------------

		public constructor() 
		{
			
		}

		/**
		 * 面板层
		 */
		public sceneLayer:eui.Component;

		public windowLayer:eui.Component;

		public uiEffLayer:eui.Component;

		/**
		 * 面板二层
		 *主界面固定最上层面板
		*/
		public alertLayer:eui.Component;

		/**
		 * 提示层
		 */
		public tipLayer:eui.Component;

		/** Debug层 */
		public debugLayer:eui.Component;

		public loadingLayer:eui.Component;

		public topUiLayer:eui.Component;

		public mainLayer:egret.DisplayObjectContainer;

		public initLayer(mainObj:egret.DisplayObjectContainer):void
		{
			this.mainLayer = mainObj;
			
			// mainObj.touchEnabled = false;

			this.sceneLayer = new eui.Component();
			this.sceneLayer.left = this.sceneLayer.right = this.sceneLayer.top = this.sceneLayer.bottom = 0;
			// this.sceneLayer.touchEnabled = false;
			mainObj.addChild(this.sceneLayer);

			this.windowLayer = new eui.Component();
			this.windowLayer.left = this.windowLayer.right = this.windowLayer.top = this.windowLayer.bottom = 0;
			this.windowLayer.touchEnabled = false;
			mainObj.addChild(this.windowLayer);

			this.uiEffLayer = new eui.Component();
			this.uiEffLayer.left = this.uiEffLayer.right = this.uiEffLayer.top = this.uiEffLayer.bottom = 0;
			this.uiEffLayer.touchEnabled = this.uiEffLayer.touchChildren = false;
			mainObj.addChild(this.uiEffLayer);
			
			this.loadingLayer = new eui.Component();
			this.loadingLayer.left = this.loadingLayer.right = this.loadingLayer.top = this.loadingLayer.bottom = 0;
			this.loadingLayer.touchChildren = this.loadingLayer.touchEnabled = false;
			mainObj.addChild(this.loadingLayer);
			
			this.alertLayer = new eui.Component();
			this.alertLayer.left = this.alertLayer.right = this.alertLayer.top = this.alertLayer.bottom = 0;
			this.alertLayer.touchEnabled = false;
			mainObj.addChild(this.alertLayer);

			this.tipLayer = new eui.Component();
			this.tipLayer.left = this.tipLayer.right = this.tipLayer.top = this.tipLayer.bottom = 0;
			this.tipLayer.touchChildren = this.tipLayer.touchEnabled = false;
			mainObj.addChild(this.tipLayer);

			this.topUiLayer = new eui.Component();
			this.topUiLayer.left = this.topUiLayer.right = this.topUiLayer.top = this.topUiLayer.bottom = 0;
			this.topUiLayer.touchEnabled = false;
			mainObj.addChild(this.topUiLayer);

			this.debugLayer = new eui.Component();
			this.debugLayer.touchChildren = this.debugLayer.touchEnabled = false;
			mainObj.addChild(this.debugLayer);
		}
	}
}