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
var ParticleGroup = (function (_super) {
    __extends(ParticleGroup, _super);
    function ParticleGroup() {
        var _this = _super.call(this) || this;
        _this.source = "";
        _this.particleScaleX = 1;
        _this.particleScaleY = 1;
        return _this;
    }
    Object.defineProperty(ParticleGroup.prototype, "getParticleSystem", {
        get: function () {
            return this.particleSystem;
        },
        enumerable: true,
        configurable: true
    });
    ParticleGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.setParticleSystem();
    };
    ParticleGroup.prototype.setParticleSystem = function () {
        this.particleSystem = uiCore.ParticleManager.getParticleSystem(this.source);
        if (this.particleSystem) {
            this.addParticleSystem();
        }
        else if (uiCore.ZipManager.getParticleJsonMap(this.source)) {
            this.particleImageLoading();
        }
    };
    ParticleGroup.prototype.particleImageLoading = function () {
        if (RES.hasRes(this.source)) {
            var data = RES.getRes(this.source);
            if (data) {
                uiCore.ParticleManager.setParticleMap(this.source, data);
                this.setParticleSystem();
            }
            else {
                RES.getResAsync(this.source, this.particleImageLoading, this);
            }
        }
    };
    ParticleGroup.prototype.addParticleSystem = function () {
        this.addChild(this.particleSystem);
        this.particleSystem.scaleX = this.particleScaleX;
        this.particleSystem.scaleY = this.particleScaleY;
    };
    return ParticleGroup;
}(eui.Group));
__reflect(ParticleGroup.prototype, "ParticleGroup");
//# sourceMappingURL=ParticleGroup.js.map