/**
 * BaseGroup
 */
class BaseGroup extends eui.Group{
    public constructor(){
        super();
    }
    /*************************************************动画 定时器 管理*********************************************/
    private effectList: Array<string> = []; // tween 动画
    private timeList: Array<string> = [];  // clearTimeout
    private intervalList: Array<string> = []; // clearInterval
    private animationList: Array<string> = []; // stop uiCore.Animation  
    public pushAnimation(name: string) {
        this.deleteAnimation(name);
        if (this.animationList.indexOf(name) < 0) {
            this.animationList.push(name);
        }
    }
    public deleteAnimation(name: string) {
        var index = this.animationList.indexOf(name);
        if (index > -1) {
            this[name].stop();
            this[name].visible = false;
            this[name].source = "";
            this.animationList.splice(index, 1);
        }
    }
    public removeAllAnimation() {
        for (var i = 0, list = this.animationList, len = list.length; i < len; i++) {
            this[list[i]].stop();
            this[list[i]].visible = false;
        }
        this.animationList = [];
    }
    public pushTimeList(name: string) {
        this.deleteTimeList(name);
        if (this.timeList.indexOf(name) < 0) {
            this.timeList.push(name);
        }
    }
    public deleteTimeList(name: string) {
        var index = this.timeList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearTimeout(this[name]);
                this[name] = -1;
            }
            this.timeList.splice(index, 1);
        }
    }
    public removeAllTimeList() {
        for (var i = 0, list = this.timeList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearTimeout(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.timeList = [];
    }
    public pushIntervalList(name: string) {
        this.deleteIntervalList(name);
        if (this.intervalList.indexOf(name) < 0) {
            this.intervalList.push(name);
        }
    }
    public deleteIntervalList(name: string) {
        var index = this.intervalList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.clearInterval(this[name]);
                this[name] = -1;
            }
            this.intervalList.splice(index, 1);
        }
    }
    public removeAllIntervalList() {
        for (var i = 0, list = this.intervalList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.clearInterval(this[list[i]]);
                this[list[i]] = -1;
            }
        }
        this.intervalList = [];
    }
    public pushEffectList(name: string) {
        this.deleteEffectList(name);
        if (this.effectList.indexOf(name) < 0) {
            this.effectList.push(name);
        }
    }
    public deleteEffectList(name: string) {
        var index = this.effectList.indexOf(name);
        if (index > -1) {
            if (this[name] != -1) {
                egret.Tween.removeTweens(this[name]);
            }
            this.effectList.splice(index, 1);
        }
    }
    /*public removeAllEffectList() {
        for (var i = 0, list = this.effectList, len = list.length; i < len; i++) {
            if (this[list[i]] != -1) {
                egret.Tween.removeTweens(this[list[i]]);
            }
        }
        this.effectList = [];
    }*/
/*******后台切换***** */
    public onApplicationFocus(){
        this.removeAllAnimation();
        // this.removeAllEffectList();
        this.removeAllTimeList();
        this.removeAllIntervalList();
    }
}