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
// 项视图
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        var _this = _super.call(this) || this;
        /*************************************************动画 定时器 管理*********************************************/
        _this.effectList = []; // tween 动画
        _this.timeList = []; // clearTimeout
        _this.intervalList = []; // clearInterval
        _this.animationList = []; // stop uiCore.Animation  
        return _this;
    }
    BaseItem.prototype.pushAnimation = function (name) {
        this.deleteAnimation(name);
        if (this.animationList.indexOf(name) < 0) {
            this.animationList.push(name);
        }
    };
    BaseItem.prototype.deleteAnimation = function (name) {
        var index = this.animationList.indexOf(name);
        if (index > -1) {
            this[name].stop();
            this[name].visible = false;
            this[name].source = "";
            this.animationList.splice(index, 1);
        }
    };
    BaseItem.prototype.removeAllAnimation = function () {
        for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
            this[list[i]].stop();
            this[list[i]].visible = false;
        }
        this.animationList = [];
    };
    BaseItem.prototype.pushTimeList = function (name) {
        this.deleteTimeList(name);
        if (this.timeList.indexOf(name) < 0) {
            this.timeList.push(name);
        }
    };
    BaseItem.prototype.deleteTimeList = function (name) {
        var index = this.timeList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearTimeout(this[name]);
                this[name] = -1;
            }
            this.timeList.splice(index, 1);
        }
    };
    BaseItem.prototype.removeAllTimeList = function () {
        for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearTimeout(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.timeList = [];
    };
    BaseItem.prototype.pushIntervalList = function (name) {
        this.deleteIntervalList(name);
        if (this.intervalList.indexOf(name) < 0) {
            this.intervalList.push(name);
        }
    };
    BaseItem.prototype.deleteIntervalList = function (name) {
        var index = this.intervalList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearInterval(this[name]);
                this[name] = -1;
            }
            this.intervalList.splice(index, 1);
        }
    };
    BaseItem.prototype.removeAllIntervalList = function () {
        for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearInterval(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.intervalList = [];
    };
    BaseItem.prototype.pushEffectList = function (name) {
        this.deleteEffectList(name);
        if (this.effectList.indexOf(name) < 0) {
            this.effectList.push(name);
        }
    };
    BaseItem.prototype.deleteEffectList = function (name) {
        var index = this.effectList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.Tween.removeTweens(this[name]);
            }
            this.effectList.splice(index, 1);
        }
    };
    BaseItem.prototype.removeAllEffectList = function () {
        for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.Tween.removeTweens(this[list[i]]);
            }
        }
        this.effectList = [];
    };
    /*******后台切换***** */
    BaseItem.prototype.onApplicationFocus = function () {
        this.removeAllAnimation();
        this.removeAllEffectList();
        this.removeAllTimeList();
        this.removeAllIntervalList();
    };
    return BaseItem;
}(uiCore.ItemView));
__reflect(BaseItem.prototype, "BaseItem");
//# sourceMappingURL=BaseItem.js.map