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
 * BaseGroup
 */
var BaseGroup = (function (_super) {
    __extends(BaseGroup, _super);
    function BaseGroup() {
        var _this = _super.call(this) || this;
        /*************************************************动画 定时器 管理*********************************************/
        _this.effectList = []; // tween 动画
        _this.timeList = []; // clearTimeout
        _this.intervalList = []; // clearInterval
        _this.animationList = []; // stop uiCore.Animation  
        return _this;
    }
    BaseGroup.prototype.pushAnimation = function (name) {
        this.deleteAnimation(name);
        if (this.animationList.indexOf(name) < 0) {
            this.animationList.push(name);
        }
    };
    BaseGroup.prototype.deleteAnimation = function (name) {
        var index = this.animationList.indexOf(name);
        if (index > -1) {
            this[name].stop();
            this[name].visible = false;
            this[name].source = "";
            this.animationList.splice(index, 1);
        }
    };
    BaseGroup.prototype.removeAllAnimation = function () {
        for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
            this[list[i]].stop();
            this[list[i]].visible = false;
        }
        this.animationList = [];
    };
    BaseGroup.prototype.pushTimeList = function (name) {
        this.deleteTimeList(name);
        if (this.timeList.indexOf(name) < 0) {
            this.timeList.push(name);
        }
    };
    BaseGroup.prototype.deleteTimeList = function (name) {
        var index = this.timeList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearTimeout(this[name]);
                this[name] = -1;
            }
            this.timeList.splice(index, 1);
        }
    };
    BaseGroup.prototype.removeAllTimeList = function () {
        for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearTimeout(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.timeList = [];
    };
    BaseGroup.prototype.pushIntervalList = function (name) {
        this.deleteIntervalList(name);
        if (this.intervalList.indexOf(name) < 0) {
            this.intervalList.push(name);
        }
    };
    BaseGroup.prototype.deleteIntervalList = function (name) {
        var index = this.intervalList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearInterval(this[name]);
                this[name] = -1;
            }
            this.intervalList.splice(index, 1);
        }
    };
    BaseGroup.prototype.removeAllIntervalList = function () {
        for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearInterval(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.intervalList = [];
    };
    BaseGroup.prototype.pushEffectList = function (name) {
        this.deleteEffectList(name);
        if (this.effectList.indexOf(name) < 0) {
            this.effectList.push(name);
        }
    };
    BaseGroup.prototype.deleteEffectList = function (name) {
        var index = this.effectList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.Tween.removeTweens(this[name]);
            }
            this.effectList.splice(index, 1);
        }
    };
    /*public removeAllEffectList() {
        for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.Tween.removeTweens(this[list[i]]);
            }
        }
        this.effectList = [];
    }*/
    /*******后台切换***** */
    BaseGroup.prototype.onApplicationFocus = function () {
        this.removeAllAnimation();
        // this.removeAllEffectList();
        this.removeAllTimeList();
        this.removeAllIntervalList();
    };
    return BaseGroup;
}(eui.Group));
__reflect(BaseGroup.prototype, "BaseGroup");
//# sourceMappingURL=BaseGroup.js.map