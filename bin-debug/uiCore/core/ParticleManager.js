var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var ParticleManager = (function () {
        function ParticleManager() {
        }
        ParticleManager.setParticleMap = function (key, content) {
            this.ParticleImageMap[key] = content;
        };
        ParticleManager.init = function (res) {
            if (res) {
                for (var key in res) {
                    this.setParticleImageMap(res[key]);
                }
            }
        };
        ParticleManager.setParticleImageMap = function (res) {
            if (uiCore.ZipManager.getParticleJsonMap(res)) {
                if (!this.ParticleImageMap[res]) {
                    this.particleImageLoading(res);
                }
            }
        };
        ParticleManager.particleImageLoading = function (particleName) {
            if (RES.hasRes(particleName)) {
                var data = RES.getRes(particleName);
                if (data) {
                    this.ParticleImageMap[particleName] = data;
                }
                else {
                    RES.getResAsync(particleName, this.checkParticleImageMap, this);
                }
            }
        };
        ParticleManager.checkParticleImageMap = function (data, key) {
            this.particleImageLoading(key);
        };
        ParticleManager.getParticleSystem = function (particleName) {
            var particleJson = uiCore.ZipManager.getParticleJsonMap(particleName);
            var particleImage = this.ParticleImageMap[particleName];
            if (!particleImage) {
                particleImage = uiCore.ZipManager.getSubkeyImageMap(particleName);
            }
            if (particleJson && particleImage) {
                var pa = new particle.GravityParticleSystem(particleImage, particleJson);
                this.ParticleSystemObjectManager(pa);
                return pa;
            }
            return null;
        };
        ParticleManager.ParticleSystemObjectManager = function (ps) {
            ps.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        };
        ParticleManager.onRemoved = function (event) {
            var ps = event.currentTarget;
            ps.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            ps.stop(true);
        };
        ParticleManager.ParticleImageMap = {};
        return ParticleManager;
    }());
    uiCore.ParticleManager = ParticleManager;
    __reflect(ParticleManager.prototype, "uiCore.ParticleManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ParticleManager.js.map