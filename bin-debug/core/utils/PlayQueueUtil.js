var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var PlayQueueUtil = (function () {
        function PlayQueueUtil(playFn, playThis, maxQueue) {
            if (maxQueue === void 0) { maxQueue = 1; }
            this.maxQueue = maxQueue;
            this.queue = [];
            this.playCount = 0;
            this.playFn = playFn;
            this.playThis = playThis;
        }
        PlayQueueUtil.prototype.remove = function (data) {
            var index = this.queue.indexOf(data);
            if (index != -1) {
                this.queue.splice(index, 1);
                this.checkState();
            }
        };
        PlayQueueUtil.prototype.push = function (data) {
            this.queue.push(data);
            this.checkState();
        };
        PlayQueueUtil.prototype.checkState = function () {
            if (this.playCount < this.maxQueue && this.queue.length > 0) {
                this.play();
            }
        };
        PlayQueueUtil.prototype.over = function () {
            this.playCount--;
            this.checkState();
        };
        PlayQueueUtil.prototype.play = function () {
            this.playCount++;
            var data = this.queue.shift();
            this.playFn.call(this.playThis, data);
        };
        Object.defineProperty(PlayQueueUtil.prototype, "isEmpty", {
            get: function () {
                return this.queue.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        PlayQueueUtil.prototype.clear = function () {
            this.queue.length = 0;
            this.playCount = 0;
        };
        return PlayQueueUtil;
    }());
    core.PlayQueueUtil = PlayQueueUtil;
    __reflect(PlayQueueUtil.prototype, "core.PlayQueueUtil");
})(core || (core = {}));
//# sourceMappingURL=PlayQueueUtil.js.map