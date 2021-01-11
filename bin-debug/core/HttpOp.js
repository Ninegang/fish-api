var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var HttpOp = (function () {
        function HttpOp() {
        }
        HttpOp.reqHttp = function (addr, param, method, okFn, okThis, errFn, errThis) {
            if (errFn === void 0) { errFn = null; }
            if (errThis === void 0) { errThis = null; }
            var httpOp = new HttpOp();
            var url;
            if (method == egret.HttpMethod.POST) {
                httpOp.retPost(addr, param, okFn, okThis, errFn, errThis);
            }
            else {
                if (param) {
                    url = addr + "?" + param;
                }
                else {
                    url = addr;
                }
                httpOp.reqGet(url, okFn, okThis, errFn, errThis);
            }
            return httpOp;
        };
        HttpOp.prototype.initParam = function (okFn, okThis, errFn, errThis) {
            this.okFn = okFn;
            this.okThis = okThis;
            this.errFn = errFn;
            this.errThis = errThis;
        };
        HttpOp.prototype.retPost = function (url, param, okFn, okThis, errFn, errThis) {
            this.initParam(okFn, okThis, errFn, errThis);
            this.httpReq = new egret.HttpRequest;
            this.httpReq.responseType = egret.HttpResponseType.TEXT;
            this.httpReq.open(url, egret.HttpMethod.POST);
            this.httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            this.httpReq.send(param);
        };
        HttpOp.prototype.reqGet = function (url, okFn, okThis, errFn, errThis) {
            this.initParam(okFn, okThis, errFn, errThis);
            this.httpReq = new egret.HttpRequest;
            this.httpReq.responseType = egret.HttpResponseType.TEXT;
            this.httpReq.open(url, egret.HttpMethod.GET);
            this.httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            this.httpReq.send();
        };
        HttpOp.prototype.onLoadComplete = function (evt) {
            if (this.okFn) {
                this.okFn.call(this.okThis, this.httpReq.response);
            }
            this.clear();
        };
        HttpOp.prototype.onLoadError = function (evt) {
            if (this.errFn) {
                this.errFn.call(this.errThis);
            }
            this.clear();
            console.error(evt);
        };
        HttpOp.prototype.clear = function () {
            if (this.httpReq) {
                this.httpReq.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this.httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                this.httpReq = null;
            }
        };
        return HttpOp;
    }());
    core.HttpOp = HttpOp;
    __reflect(HttpOp.prototype, "core.HttpOp");
})(core || (core = {}));
//# sourceMappingURL=HttpOp.js.map