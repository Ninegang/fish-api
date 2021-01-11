var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishPath = (function () {
    function FishPath(fish) {
        this._elapsed = 0;
        this.delay = 0;
        this._activated = false;
        this._forward = true;
        this._index = 0;
        this._hidden = false;
        this._freeGroup = false;
        this._inScreen = false;
        this.learp = 0;
        this.pont_done = -1;
        this.IsCanDown = true;
        this.isStatic = false;
        this.IsShake = false;
        this.fish = fish;
        this._nextOffset = new egret.Point();
        this.offest = new egret.Point();
        this._tween = new FishStat_Tween();
        this.last_pos = new egret.Point();
        this.fishStatPoint = new egret.Point();
        this.fangxiang = new egret.Point();
        this.fishStartInitPoint = new egret.Point();
    }
    FishPath.prototype.setGroupPath = function (pathName, lifeTime, roat, speed, UpSideDown) {
        if (lifeTime === void 0) { lifeTime = 0; }
        if (roat === void 0) { roat = 0; }
        if (speed === void 0) { speed = 0; }
        if (UpSideDown === void 0) { UpSideDown = false; }
        var fspd = FishGameManager.groupPathDic[pathName];
        if (fspd) {
            this._points = fspd.paths.points;
            this._ratio = fspd.config.fps * speed / fspd.config.speed;
            this._elapsed = lifeTime;
            this.isActive = this._elapsed > 0;
            if (UpSideDown) {
                this._mat = new Matrix32(-fspd.paths.pos.x / 100, -fspd.paths.pos.y / 100, 0);
            }
            else {
                this._mat = new Matrix32(fspd.paths.pos.x / 100, fspd.paths.pos.y / 100, 0);
            }
            this._forward = true;
            this._mat.roated(roat);
            this.fishStat_init();
        }
        else {
            this.removeFish();
            if (FishGameController.getGameView()) {
                FishGameController.getGameView().isInFishArray = false;
            }
        }
    };
    FishPath.prototype.setPath = function (pathName, lifeTime, freeGroup, roat, speed) {
        if (lifeTime === void 0) { lifeTime = 0; }
        if (freeGroup === void 0) { freeGroup = false; }
        if (roat === void 0) { roat = 0; }
        if (speed === void 0) { speed = 0; }
        var fspd = FishGameManager.pathDic[pathName];
        if (fspd) {
            this._points = fspd.paths;
            this._ratio = fspd.config.fps * speed / fspd.config.speed;
            this._elapsed = lifeTime;
            this.isActive = this._elapsed > 0;
            this._mat = new Matrix32(0, 0, 0);
            this._forward = true;
            this._freeGroup = freeGroup;
            this._inScreen = false;
            if (this._freeGroup) {
                this.offest.x = uiCore.Utils.getRandom(-40, 40);
                this.offest.y = uiCore.Utils.getRandom(-40, 40);
                this._nextOffset.x = uiCore.Utils.getRandom(-40, 40);
                this._nextOffset.y = uiCore.Utils.getRandom(-40, 40);
            }
            this._mat.roated(roat);
            this.fishStat_init();
        }
        else {
            this.removeFish();
            if (FishGameController.getGameView()) {
                FishGameController.getGameView().isInFishArray = true;
            }
        }
    };
    FishPath.prototype.fishStat_init = function () {
        //设置初始位置 / 方向
        var posStat = this.fishStat_get_point_pos(0);
        this.fishStartInitPoint.x = posStat.x;
        this.fishStartInitPoint.y = posStat.y;
        this.fish.x = this.fishStartInitPoint.x;
        this.fish.y = this.fishStartInitPoint.y;
        // 朝向的点
        var faceto = this.fishStat_get_point_pos(1);
        this.lastIndex = 1;
        var rot = Math.atan2(this.fishStartInitPoint.y - faceto.y, this.fishStartInitPoint.x - faceto.x);
        var rot_anlengle = (rot * (180 / Math.PI));
        if (this.fishStartInitPoint.x - faceto.x >= 0 && this.fishStartInitPoint.y - faceto.y >= 0) {
            rot_anlengle = rot_anlengle - 180;
        }
        else if (this.fishStartInitPoint.x - faceto.x <= 0 && this.fishStartInitPoint.y - faceto.y >= 0) {
            rot_anlengle = rot_anlengle - 180;
        }
        else {
            rot_anlengle = 180 + rot_anlengle;
        }
        this.fish.rotation = rot_anlengle;
    };
    FishPath.prototype.fishStat_get_point_pos = function (p_index) {
        return this._mat.xform(this.stat_get_point_pos(p_index));
    };
    FishPath.prototype.stat_get_point_pos = function (index) {
        this.fishStatPoint.x = this._points[index * 2] * 0.01 * uiCore.Application.fishPathXmultiple;
        this.fishStatPoint.y = this._points[index * 2 + 1] * 0.01 * uiCore.Application.fishPathYmultiple;
        return this.fishStatPoint;
    };
    FishPath.prototype.addTween = function (fps_, frames_, weight_, eases_, trans_) {
        if (this.tweens == null) {
            this.tweens = new Array();
        }
        var Tween = { fps: fps_, frames: frames_, weight: weight_, eases: eases_, trans: trans_ };
        this.tweens.push(Tween);
    };
    FishPath.prototype.setTween = function () {
        if (this.tweens == null)
            return;
        this._tween.phases = [];
        var total_delta = 0;
        var total_weight = 0;
        var fps = this.tweens[0].fps;
        for (var i = 0; i < this.tweens.length; i++) {
            var info = this.tweens[i];
            var delta = 1.0 * info.frames / fps;
            total_delta += delta;
            total_weight += info.weight;
            var tmp = new FishStat_Phase();
            tmp.delta = delta;
            tmp.weight = info.weight;
            tmp.trans = info.trans;
            tmp.eases = info.eases;
            this._tween.phases.push(tmp);
        }
        this._tween.delta = total_delta;
        this._tween.weight = total_weight;
        this.tweens = null;
    };
    FishPath.prototype.update = function () {
        // console.log("FishId:"+this.fish.FishId+"  X:"+this.fish.x+"    Y:"+this.fish.y+"    角度："+this.fish.rotation+"   比例："+this.fish.scaleX+" "+this.fish.scaleY);
        // if(this.tweens&&this.tweens.length>100){
        // 	console.log("tweens:"+this.tweens.length);
        // }
        // if(this._tween&&this._tween.phases&&this._tween.phases.length>100){
        // 	console.log("phases:"+this._tween.phases.length);
        // }
        if (this._points == null) {
            return;
        }
        this.fishUpdate();
    };
    //更新鱼位置 鱼游动
    FishPath.prototype.fishUpdate = function () {
        if (this.fixedScreen > 0) {
            this.fixedScreen -= FishGameManager.deltaTime / 1000;
            return;
        }
        var index = this.fishStat_get_index();
        var isRotation = true;
        if (index > 1 && index == this.lastIndex) {
            isRotation = false;
        }
        this.lastIndex = index;
        if (index >= this._points.length / 2) {
            this.removeFish();
            return;
        }
        this.last_pos.x = this.fish.x;
        this.last_pos.y = this.fish.y;
        var pos = this.fishStat_get_point_pos(index);
        if (this._freeGroup) {
            pos.x += this.offest.x + (this._nextOffset.x - this.offest.x) * this.Lerp(0, 1, this.learp / 120);
            pos.y += this.offest.y + (this._nextOffset.y - this.offest.y) * this.Lerp(0, 1, this.learp / 120);
        }
        if (this.last_pos.equals(pos)) {
            return;
        }
        this.learp++;
        if (this._freeGroup && this.learp > 120) {
            this.offest.x = this._nextOffset.x;
            this.offest.y = this._nextOffset.y;
            this._nextOffset.x = uiCore.Utils.getRandom(-40, 40);
            this._nextOffset.y = uiCore.Utils.getRandom(-40, 40);
            this.learp = 0;
        }
        this.fish.x = pos.x;
        this.fish.y = pos.y;
        var inScreen = pos.x > 0 && pos.x < uiCore.Application.app.stage.stageWidth && pos.y > 0 && pos.y < uiCore.Application.app.stage.stageHeight;
        if (this.fish && this._inScreen != inScreen) {
            this.fish.onInScreen(inScreen);
            this._inScreen = inScreen;
        }
        //旋转
        if (isRotation) {
            this.fangxiang.x = this.last_pos.x - pos.x;
            this.fangxiang.y = this.last_pos.y - pos.y;
            this.getFishData();
        }
    };
    // <summary>
    // 获取方向和速度
    // </summary>
    FishPath.prototype.getFishData = function (learp) {
        if (learp === void 0) { learp = true; }
        if (this.fangxiang.x != 0 || this.fangxiang.y != 0) {
            this.fishangle_ = Math.atan2(this.fangxiang.y, this.fangxiang.x);
            this.fishangle = (this.fishangle_ * (180 / Math.PI));
            if (this.fangxiang.x >= 0 && this.fangxiang.y >= 0) {
                this.fishangle = this.fishangle - 180;
            }
            else if (this.fangxiang.x <= 0 && this.fangxiang.y >= 0) {
                this.fishangle = this.fishangle - 180;
            }
            else {
                this.fishangle = 180 + this.fishangle;
            }
            var isUpFish = void 0;
            var fishRotation = this.fish.rotation;
            var duilidian = 180;
            var rotationDushu = 0;
            if (fishRotation > 0) {
                duilidian = fishRotation - 180;
                if (this.fishangle < fishRotation && this.fishangle > duilidian) {
                    isUpFish = false;
                    rotationDushu = fishRotation - this.fishangle;
                }
                else if (this.fishangle > fishRotation || this.fishangle < duilidian) {
                    isUpFish = true;
                    if (this.fishangle > 0) {
                        rotationDushu = this.fishangle - fishRotation;
                    }
                    else {
                        rotationDushu = 360 + this.fishangle - fishRotation;
                    }
                }
            }
            else if (fishRotation < 0) {
                duilidian = 180 + fishRotation;
                if (this.fishangle > fishRotation && this.fishangle < duilidian) {
                    isUpFish = true;
                    rotationDushu = this.fishangle - fishRotation;
                }
                else if (this.fishangle < fishRotation || this.fishangle > duilidian) {
                    isUpFish = false;
                    if (this.fishangle > 0) {
                        rotationDushu = 360 + fishRotation - this.fishangle;
                    }
                    else {
                        rotationDushu = fishRotation - this.fishangle;
                    }
                }
            }
            else if (this.fishangle > 0) {
                isUpFish = true;
                rotationDushu = this.fishangle - fishRotation;
            }
            else if (this.fishangle < 0) {
                isUpFish = false;
                rotationDushu = fishRotation - this.fishangle;
            }
            rotationDushu = rotationDushu / 60;
            if (isUpFish) {
                this.fishangle = fishRotation + rotationDushu;
            }
            else {
                this.fishangle = fishRotation - rotationDushu;
            }
            if (this.fishangle > 10 || this.fishangle < -10) {
                if (this.IsCanDown) {
                    this.fish.scaleX = 1;
                    this.fish.scaleY = -1;
                }
                else {
                    this.fish.scaleX = 1;
                    this.fish.scaleY = 1;
                }
            }
            this.fish.rotation = this.fishangle;
        }
        this.NotCanDown();
    };
    //判断宝箱之类的 不旋转
    FishPath.prototype.NotCanDown = function () {
        if (!this.IsCanDown) {
            // let angle_s:number = Math.atan2(this.fish.x,this.fish.y);
            // let angle_es:number = (this.fishangle_ * (180 / Math.PI));
            if (this.fish.rotation < 90 && this.fish.rotation > -90 && !this.isStatic) {
                this.fish.scaleX = -1;
                this.fish.scaleY = 1;
            }
            else {
                this.fish.scaleX = 1;
                this.fish.scaleY = 1;
                //子节点
            }
            this.fish.rotation = 0;
        }
    };
    FishPath.prototype.removeFish = function () {
        if (this.fish) {
            this.fish.recovery();
        }
    };
    FishPath.prototype.fishStat_get_index = function () {
        var index = this.stat_get_index();
        if (index == 0 || this._tween == null || this._tween.delta == 0) {
            return index;
        }
        var elapsed_time = this._elapsed - this.delay;
        var t = elapsed_time % this._tween.delta;
        var b = Math.floor(elapsed_time / this._tween.delta) * this._tween.delta;
        for (var i = 0; i < this._tween.phases.length; i++) {
            var phase = this._tween.phases[i];
            if (t > phase.delta) {
                t -= phase.delta;
                t += phase.delta;
                continue;
            }
            var d = phase.delta;
            var c = d;
            elapsed_time = uiCore.TweenManager.Call(phase.trans, phase.eases, t, b, c, d);
            break;
        }
        t = elapsed_time % this._tween.delta;
        for (var i = 0; i < this._tween.phases.length; i++) {
            var phase = this._tween.phases[i];
            if (t <= 0)
                break;
            var weight = phase.weight / this._tween.weight;
            var dweight = this._tween.delta * weight;
            var rate = dweight / phase.delta;
            if (t >= phase.delta) {
                elapsed_time += (phase.delta * (rate - 1));
            }
            else {
                elapsed_time += (t * (rate - 1));
            }
            t -= phase.delta;
        }
        return Math.floor(elapsed_time * this._ratio);
    };
    FishPath.prototype.stat_get_index = function () {
        this._elapsed += FishGameManager.deltaTime / 1000;
        return Math.max(Math.floor(this._elapsed * this._ratio), 0);
    };
    //计算插值
    FishPath.prototype.Clamp01 = function (value) {
        var result;
        if (value < 0) {
            result = 0;
        }
        else if (value > 1) {
            result = 1;
        }
        else {
            result = value;
        }
        return result;
    };
    FishPath.prototype.Lerp = function (a, b, t) {
        return a + (b - a) * this.Clamp01(t);
    };
    return FishPath;
}());
__reflect(FishPath.prototype, "FishPath");
var Matrix32 = (function () {
    function Matrix32(x, y, p_rot) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (p_rot === void 0) { p_rot = 0; }
        this.elements = new Array(3);
        this.tmp = new egret.Point();
        for (var i = 0; i < 3; i++) {
            this.elements[i] = [];
        }
        var cr = Math.cos(p_rot);
        var sr = Math.sin(p_rot);
        this.elements[0][0] = cr;
        this.elements[1][1] = cr;
        this.elements[0][1] = -sr;
        this.elements[1][0] = sr;
        this.elements[2][0] = x;
        this.elements[2][1] = y;
    }
    Matrix32.prototype.tdotx = function (tx, ty) {
        return this.elements[0][0] * tx + this.elements[1][0] * ty;
    };
    Matrix32.prototype.tdoty = function (tx, ty) {
        return this.elements[0][1] * tx + this.elements[1][1] * ty;
    };
    Matrix32.prototype.roated = function (rot) {
        var p_transform = new Matrix32(uiCore.Application.app.stage.stageWidth / 2, uiCore.Application.app.stage.stageHeight / 2, rot);
        this.elements[2][0] += this.tdotx(p_transform.elements[2][0], p_transform.elements[2][1]);
        this.elements[2][1] += this.tdoty(p_transform.elements[2][0], p_transform.elements[2][1]);
        var x0 = this.tdotx(p_transform.elements[0][0], p_transform.elements[0][1]);
        var x1 = this.tdoty(p_transform.elements[0][0], p_transform.elements[0][1]);
        var y0 = this.tdotx(p_transform.elements[1][0], p_transform.elements[1][1]);
        var y1 = this.tdoty(p_transform.elements[1][0], p_transform.elements[1][1]);
        this.elements[0][0] = x0;
        this.elements[0][1] = x1;
        this.elements[1][0] = y0;
        this.elements[1][1] = y1;
    };
    Matrix32.prototype.xform = function (pos) {
        this.tmp.x = this.tdotx(pos.x, pos.y) + this.elements[2][0];
        // tmp.y=this.tdoty(pos.x,pos.y)+this.elements[2][1];
        this.tmp.y = this.elements[2][1] - this.tdoty(pos.x, pos.y);
        return this.tmp;
    };
    return Matrix32;
}());
__reflect(Matrix32.prototype, "Matrix32");
var FishStat_Tween = (function () {
    function FishStat_Tween() {
        this.phases = new Array();
    }
    return FishStat_Tween;
}());
__reflect(FishStat_Tween.prototype, "FishStat_Tween");
var FishStat_Phase = (function () {
    function FishStat_Phase() {
    }
    return FishStat_Phase;
}());
__reflect(FishStat_Phase.prototype, "FishStat_Phase");
var fishDataTween = (function () {
    function fishDataTween() {
    }
    return fishDataTween;
}());
__reflect(fishDataTween.prototype, "fishDataTween");
//# sourceMappingURL=FishPath.js.map