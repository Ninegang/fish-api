var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * BaseComponent
 */
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        /**
         * 匿名函数事件监听
         */
        _this.anonymousFnc = [];
        /*************************************************动画 定时器 管理*********************************************/
        _this.effectList = []; // tween 动画
        _this.timeList = []; // clearTimeout
        _this.intervalList = []; // clearInterval
        _this.animationList = []; // stop uiCore.Animation  
        return _this;
    }
    BaseComponent.prototype.removeAnonymousLis = function () {
        var lisArr = this.anonymousFnc;
        var len = lisArr.length;
        var listenObj = {
            obj: null,
            event: null,
            fnc: null,
            thisObj: null
        };
        for (var i = 0; i < len; i++) {
            listenObj = lisArr[i];
            listenObj.obj.removeEventListener(listenObj.event, listenObj.fnc, listenObj.thisObj);
        }
        this.anonymousFnc = [];
    };
    BaseComponent.prototype.pushAnimation = function (name) {
        this.deleteAnimation(name);
        if (this.animationList.indexOf(name) < 0) {
            this.animationList.push(name);
        }
    };
    BaseComponent.prototype.pushAnimationNotStop = function (name) {
        var index = this.animationList.indexOf(name);
        if (index > -1) {
            return;
        }
        else {
            this.animationList.push(name);
        }
    };
    BaseComponent.prototype.deleteAnimation = function (name) {
        var index = this.animationList.indexOf(name);
        if (index > -1) {
            this[name].stop();
            this[name].visible = false;
            this[name].source = "";
            this.animationList.splice(index, 1);
        }
    };
    BaseComponent.prototype.removeAllAnimation = function () {
        for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
            this[list[i]].stop();
            this[list[i]].visible = false;
        }
        this.animationList = [];
    };
    BaseComponent.prototype.pushTimeList = function (name) {
        this.deleteTimeList(name);
        if (this.timeList.indexOf(name) < 0) {
            this.timeList.push(name);
        }
    };
    BaseComponent.prototype.deleteTimeList = function (name) {
        var index = this.timeList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearTimeout(this[name]);
                this[name] = -1;
            }
            this.timeList.splice(index, 1);
        }
    };
    BaseComponent.prototype.removeAllTimeList = function () {
        for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearTimeout(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.timeList = [];
    };
    BaseComponent.prototype.pushIntervalList = function (name) {
        this.deleteIntervalList(name);
        if (this.intervalList.indexOf(name) < 0) {
            this.intervalList.push(name);
        }
    };
    BaseComponent.prototype.deleteIntervalList = function (name) {
        var index = this.intervalList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearInterval(this[name]);
                this[name] = -1;
            }
            this.intervalList.splice(index, 1);
        }
    };
    BaseComponent.prototype.removeAllIntervalList = function () {
        for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearInterval(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.intervalList = [];
    };
    BaseComponent.prototype.pushEffectList = function (name) {
        this.deleteEffectList(name);
        if (this.effectList.indexOf(name) < 0) {
            this.effectList.push(name);
        }
    };
    BaseComponent.prototype.deleteEffectList = function (name) {
        var index = this.effectList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.Tween.removeTweens(this[name]);
            }
            this.effectList.splice(index, 1);
        }
    };
    BaseComponent.prototype.removeAllEffectList = function () {
        for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.Tween.removeTweens(this[list[i]]);
            }
        }
        this.effectList = [];
    };
    /*******后台切换***** */
    BaseComponent.prototype.onApplicationFocus = function () {
        this.removeAllAnimation();
        // this.removeAllEffectList();
        this.removeAllTimeList();
        this.removeAllIntervalList();
        this.removeAnonymousLis();
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map