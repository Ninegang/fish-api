class SystemMsg {
	private static instance: SystemMsg;
	private static preloadList:Array<any>=[];
	private _timer: egret.Timer;
	/**
	 * 定时器间隔(毫秒)
	 */
	private _TIMER_INTERVAL: number = 1000;
	public gamelist: Array<any> = [];        //消息队列
	public speed: number = 0.2;
	public group: eui.Group;
	public scroller: eui.Scroller;
	public label: eui.Label;
	public isRunning: boolean = false;
	private _curX: number;
	private _isFirstTime: boolean = false;
	public systemList:Array<any> = [];
	private constructor() {}
	public static getInstance(): SystemMsg {
		if (!SystemMsg.instance) {
			SystemMsg.instance = new SystemMsg();
			SystemMsg.instance._timer = new egret.Timer(SystemMsg.instance._TIMER_INTERVAL);
        	SystemMsg.instance._timer.addEventListener(egret.TimerEvent.TIMER, SystemMsg.instance.on_timer_run, SystemMsg.instance);
		}
		return SystemMsg.instance;
	}

	public static ws_onSystemMsg(msg) {
		msg.forEach(element => {
			if(SystemMsg.instance){
				SystemMsg.instance.push(element);
			}else{
				this.preloadList.push(element);
			}
		});
	}

	public skin(group, lable, scroller) {
		if (group && lable && scroller) {
			if (this.group && this.group.visible) {
				this._curX = this.label.x;
				this._isFirstTime = true;
			}else {
				this._isFirstTime = false;
			}
			this.group = group;
			this.label = lable;
			this.scroller = scroller;
			this.isRunning = false;
			this.check();
		}
	}

	public check() {
		if (SystemMsg.preloadList.length > 0) {
			for (var i = 0; i < SystemMsg.preloadList.length; i++) {
				this.push(SystemMsg.preloadList.shift());
			}
		}
		if (!this._timer.running) this._timer.start();	
	}

	public push(msg) {
		if(msg.ID > 0){
			var flag = true;
			for(var i=0;i<this.systemList.length;i++){
				if(msg.ID==this.systemList[i].ID){
					flag=false;
					break;
				}
			}
			if(flag){
				this.systemList.push(msg);
			}
		}else if(this.group&&this.label&&this.scroller){
			this.gamelist.push(msg);
		}
	}

	private checkRemoveSystemMsg():any{
		for(var i=0;i<this.systemList.length;i++){
			if(this.checkRemoveList(this.systemList[i])){
				this.systemList.splice(i,1);
				break;
			}
		}
	}

	private checkRemoveList(obj:any):boolean{
		var flag:boolean=false;
		if(Date.parse(new Date().toString())>obj.EndTime){
			flag=true;
		}else if(obj.PlayCount==0){
			flag=true;
		}
		return flag;
	}

	private getMsgContent():any{
		let resultContent:any = null;
		let currTime:number=Date.parse(new Date().toString());
		for(var i=0;i<this.systemList.length;i++){
			if(currTime>=this.systemList[i].BeginTime&&currTime<=this.systemList[i].EndTime&&this.systemList[i].PlayCount!=0){
				if(resultContent){
					if(resultContent.Level<this.systemList[i].Level){
						resultContent=this.systemList[i];
					}
				}else{
					resultContent=this.systemList[i];
				}
			}
		}
		if(!resultContent){
			if(this.gamelist.length>0){
				resultContent=this.gamelist.shift();
			}
		}
		return resultContent;
	}

	public on_timer_run() {
		this.checkRemoveSystemMsg();
		if (this.isRunning) return;
		let contentObj:any=this.getMsgContent();
		var content:string=null;
		if(contentObj){
			this.group.visible = true;
			if(contentObj.ID!=0){
				if(contentObj.PlayCount!=-1){
					contentObj.PlayCount-=1;
				}
				var begTime:number=Date.parse(new Date().toString())+contentObj.TimeInterval*60*1000;
				if(begTime>=contentObj.EndTime){
					begTime=contentObj.EndTime;
				}
				contentObj.BeginTime=begTime;
				content=contentObj.Content;
			}else{
				content="<font size='20' fontFamily='微软雅黑'>恭喜！<font color='0x0dff00'>"+contentObj.UserName+"</font>在<font color='0xead372'>"+contentObj.ServerName+"</font>打死了一条<font color='0xead372'>"+contentObj.FishName+"</font>！获得<font color='0xfee60a'>"+contentObj.WinGold+"</font>金币！！！</font>";
			}
			console.log("ID:"+contentObj.ID+"  BeginTime:"+contentObj.BeginTime/60/1000+"   PlayCount:"+contentObj.PlayCount+"    "+contentObj.Content);
			this.label.textFlow = uiCore.StringUtils.textToRichText(content);
			var runTime:number;
			if (this._isFirstTime) {
				this.label.x = this._curX;
				this._isFirstTime = false;
				runTime =  (this.label.x + this.label.width) / this.speed;
			}else {
				this.label.x = this.label.width;
				runTime = (this.label.width + this.label.width) / this.speed;
			}
			egret.Tween.get(this.label).to({ x: -this.label.width }, runTime).call(this.over, this, [this.label]);
			this.isRunning = true;
		}else{
			this.group.visible = false;
		}
	}

	public over(obj) {
		if (obj != this.label) return;
		this.isRunning = false;
		egret.Tween.removeTweens(this.label);
	}
}