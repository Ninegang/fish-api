/**
 * 心跳
 */
class Heardbeat {
	/**
	 * 发送消息的时间
	 */
	private lastTime: number = 0;
	/**
	 * 延迟时间
	 */
	private ping: number = 0;
	/**
	 * 0.第一次连接
	 * 1.正常
	 * 2.心跳包未回应
	 */
	private status: number = 0;
	/**
	 * 心跳定时器
	 */
	private _timer: egret.Timer;
	/**
	 * 内置信号定时器
	 */
	private _insideTimer: egret.Timer;
	/**
	 * 心跳包间隔(毫秒)
	 */
	private static HEART_BEAT_INTERVAL: number = 10000;
	/**
	 * 定时器间隔(毫秒)
	 */
	private static HEART_BEAT_TIMER: number = 1000;
	
	private static instance: Heardbeat;
	private constructor() {} 
	public static getInstance(): Heardbeat {
		if (!Heardbeat.instance) {
			Heardbeat.instance = new Heardbeat();
			Heardbeat.instance._timer = new egret.Timer(Heardbeat.HEART_BEAT_INTERVAL);
        	Heardbeat.instance._timer.addEventListener(egret.TimerEvent.TIMER, Heardbeat.instance.onTimer_heartBeat, Heardbeat.instance);
			Heardbeat.instance._insideTimer = new egret.Timer(Heardbeat.HEART_BEAT_TIMER);
        	Heardbeat.instance._insideTimer.addEventListener(egret.TimerEvent.TIMER, Heardbeat.instance.onInsideTimer_heartBeat, Heardbeat.instance);
		}
		return Heardbeat.instance;
	}

	public begin() {
		if (!this._timer.running) {
			if (this.status == 0){
				this.lastTime = egret.getTimer();
			}
			this._timer.start();
		}
	}

	private onTimer_heartBeat(e: egret.TimerEvent): void {
		/**
		 * 内置定时器同时判断
		 */
		// let startTime:number=egret.getTimer();
		if (this.ping >= Heardbeat.HEART_BEAT_INTERVAL) {
			/**
			 * 如果延迟大于每次发送心跳包的间隔, 就当做这个心跳包已经收到了
			 */
			Heardbeat.ws_onHeartbeat();
		}

        if (this.status == 2){
            return;
        }

        this.lastTime = egret.getTimer();
        this.status = 2;
		this.ping = 0;
        this._insideTimer.start();
		Net.GameService.send(HallSocketType.HEARDBEAT, {}, 0);
		// var diffTime:number=egret.getTimer()-startTime;
		// if(diffTime>10){
		// 	console.log("Heardbeat:"+diffTime);
		// }
    }

	private onInsideTimer_heartBeat(e: egret.TimerEvent): void {
		this.ping += Heardbeat.HEART_BEAT_TIMER;
		// console.log("onInsideTimer_heartBeat");
	}

	public static ws_onHeartbeat() {
		if(this.instance.status != 2) {
			return;
		}
		this.instance._insideTimer.reset();
		this.instance.status = 1;
		this.instance.ping = egret.getTimer() - this.instance.lastTime;
		if (this.instance.ping > 0) {
			if (uiCore.Application.currentScene == null) { return }

			// 判断是否包含分布视图属性
			if (uiCore.Application.currentScene.hasOwnProperty("sharedHeader")) {
				if (uiCore.Application.currentScene.sharedHeader.hasOwnProperty("pingView")) {
					uiCore.Application.currentScene.sharedHeader.pingView.PingChange(this.instance.ping);
					return;
				}
			}


			if (uiCore.Application.currentScene.hasOwnProperty("pingView")) {
				uiCore.Application.currentScene.pingView.PingChange(this.instance.ping);
				return;
			}
		}
	}
}