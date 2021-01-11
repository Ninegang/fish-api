var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 心跳
 */
var Heardbeat = (function () {
    function Heardbeat() {
        /**
         * 发送消息的时间
         */
        this.lastTime = 0;
        /**
         * 延迟时间
         */
        this.ping = 0;
        /**
         * 0.第一次连接
         * 1.正常
         * 2.心跳包未回应
         */
        this.status = 0;
    }
    Heardbeat.getInstance = function () {
        if (!Heardbeat.instance) {
            Heardbeat.instance = new Heardbeat();
            Heardbeat.instance._timer = new egret.Timer(Heardbeat.HEART_BEAT_INTERVAL);
            Heardbeat.instance._timer.addEventListener(egret.TimerEvent.TIMER, Heardbeat.instance.onTimer_heartBeat, Heardbeat.instance);
            Heardbeat.instance._insideTimer = new egret.Timer(Heardbeat.HEART_BEAT_TIMER);
            Heardbeat.instance._insideTimer.addEventListener(egret.TimerEvent.TIMER, Heardbeat.instance.onInsideTimer_heartBeat, Heardbeat.instance);
        }
        return Heardbeat.instance;
    };
    Heardbeat.prototype.begin = function () {
        if (!this._timer.running) {
            if (this.status == 0) {
                this.lastTime = egret.getTimer();
            }
            this._timer.start();
        }
    };
    Heardbeat.prototype.onTimer_heartBeat = function (e) {
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
        if (this.status == 2) {
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
    };
    Heardbeat.prototype.onInsideTimer_heartBeat = function (e) {
        this.ping += Heardbeat.HEART_BEAT_TIMER;
        // console.log("onInsideTimer_heartBeat");
    };
    Heardbeat.ws_onHeartbeat = function () {
        if (this.instance.status != 2) {
            return;
        }
        this.instance._insideTimer.reset();
        this.instance.status = 1;
        this.instance.ping = egret.getTimer() - this.instance.lastTime;
        if (this.instance.ping > 0) {
            if (uiCore.Application.currentScene == null) {
                return;
            }
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
    };
    /**
     * 心跳包间隔(毫秒)
     */
    Heardbeat.HEART_BEAT_INTERVAL = 10000;
    /**
     * 定时器间隔(毫秒)
     */
    Heardbeat.HEART_BEAT_TIMER = 1000;
    return Heardbeat;
}());
__reflect(Heardbeat.prototype, "Heardbeat");
//# sourceMappingURL=Heardbeat.js.map