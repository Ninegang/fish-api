var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * http请求管理器
     * 相同的请求同时只会存在1个，但是得到请求反馈的回调方法都会执行
     * HttpManager是没有类似WebSocketManager的事件的，因为请求的发送和接受是绑定关系，无需事件
     * @author none
     *
     */
    var HttpManager = (function () {
        /**
         * http请求管理器
         */
        function HttpManager() {
            this.loadList = {};
        }
        /**
         * http请求管理器单例
         */
        HttpManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new HttpManager();
            }
            return this._instance;
        };
        /**
         * 发送http请求
         * @param url http请求的地址
         * @param data 请求所携带的数据
         * @param method 请求的类型，默认为egret.URLRequestMethod.GET
         * @param sucessFunc 请求成功的回调方法
         * @param errorFunc 请求失败的回调方法
         * @param thisObject 回调方法的上下文
         */
        HttpManager.prototype.send = function (url, data, method, sucessFunc, errorFunc, thisObject, isJson) {
            if (isJson === void 0) { isJson = true; }
            data = data || {};
            method = method || egret.URLRequestMethod.GET;
            var dataStr = this.dataToString(data);
            var newURL = url + "?" + this.dataToString(data);
            if (!this.loadList[newURL]) {
                var urlLoader = new egret.URLLoader();
                urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                var urlRequest = new egret.URLRequest(url);
                urlRequest.method = method;
                var urlVars = new egret.URLVariables(dataStr);
                urlVars.variables = data;
                urlRequest.data = urlVars;
                urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
                urlLoader.addEventListener(egret.HTTPStatusEvent.HTTP_STATUS, this.onHTTPStatus, this);
                urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                var loadData = { urlLoader: urlLoader, sucessFunc: sucessFunc, errorFunc: errorFunc, thisObject: thisObject, isJson: isJson };
                this.loadList[newURL] = loadData;
                urlLoader.load(urlRequest);
                //trace("发送http请求：" + newURL);
            }
        };
        /**
         * 撤销http请求
         * 在onDestroy中记得调用，防止页面关闭了，请求还在执行导致产生一系列错误和内存泄漏（需要详细测试，可能并不需要如此）
         * @param url {string} http请求的地址
         * @param data {any} 请求所携带的数据
         */
        HttpManager.prototype.cancel = function (url, data) {
            data = data || {};
            var newURL = url + this.dataToString(data);
            if (this.loadList[newURL]) {
                var urlLoader = this.loadList[newURL].urlLoader;
                delete this.loadList[newURL];
            }
        };
        /**
         * 删除对象中存在的请求
         * @param thisObject {any} 对象
         */
        HttpManager.prototype.cancelThis = function (thisObject) {
            for (var key in thisObject) {
                var cancelKey = this.getKeyByCallBack(thisObject[key]);
                if (uiCore.Utils.isFunction(thisObject[key]) && cancelKey) {
                    delete this.loadList[cancelKey];
                }
            }
        };
        HttpManager.prototype.getKeyByCallBack = function (callBack) {
            for (var key in this.loadList) {
                var data = this.loadList[key];
                if (data.sucessFunc == callBack || data.errorFunc == callBack) {
                    return key;
                }
            }
            return null;
        };
        /**
         * 撤销所有http请求
         */
        HttpManager.prototype.cancelAll = function () {
            this.loadList = {};
        };
        HttpManager.prototype.onComplete = function (event) {
            var urlLoader = event.currentTarget;
            for (var key in this.loadList) {
                if (this.loadList[key].urlLoader == urlLoader) {
                    var sucessFunc = this.loadList[key].sucessFunc;
                    //trace("收到http数据：" + urlLoader.data);
                    sucessFunc.call(this.loadList[key].thisObject, this.loadList[key].isJson ? JSON.parse(urlLoader.data) : urlLoader.data);
                    delete this.loadList[key];
                }
            }
        };
        HttpManager.prototype.onIOError = function (event) {
            this.loadError(event.currentTarget, event);
        };
        HttpManager.prototype.onHTTPStatus = function (event) {
            if (event.status != 200) {
                this.loadError(event.currentTarget, event.status);
            }
        };
        HttpManager.prototype.loadError = function (urlLoader, data) {
            for (var key in this.loadList) {
                if (this.loadList[key].urlLoader == urlLoader) {
                    var errorFunc = this.loadList[key].errorFunc;
                    if (errorFunc) {
                        errorFunc.call(this.loadList[key].thisObject, data);
                    }
                    delete this.loadList[key];
                }
            }
        };
        HttpManager.prototype.dataToString = function (data) {
            var result = "";
            for (var key in data) {
                result += encodeURI(key) + "=" + encodeURI(data[key]) + "&";
            }
            return result;
        };
        return HttpManager;
    }());
    uiCore.HttpManager = HttpManager;
    __reflect(HttpManager.prototype, "uiCore.HttpManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=HttpManager.js.map