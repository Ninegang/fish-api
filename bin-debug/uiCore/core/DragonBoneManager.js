var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var DragonBoneManager = (function () {
        function DragonBoneManager() {
        }
        DragonBoneManager.setDragonBoneMap = function (key, content) {
            this.DragonBoneFactoryMap[key] = content;
        };
        DragonBoneManager.init = function (res) {
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    this.setDbFactory(res[i]);
                }
            }
        };
        DragonBoneManager.setDbFactory = function (res) {
            if (uiCore.ZipManager.getDragonBoneJsonMap(res + "_ske") && uiCore.ZipManager.getDragonBoneJsonMap(res + "_tex")) {
                if (!this.DragonBoneFactoryMap[res]) {
                    this.dragonBoneLoading(res);
                }
            }
        };
        DragonBoneManager.dragonBoneLoading = function (dbName) {
            var data = RES.getRes(dbName + "_tex_png");
            if (data) {
                var egretFactory = dragonBones.EgretFactory.factory;
                egretFactory.parseDragonBonesData(uiCore.ZipManager.getDragonBoneJsonMap(dbName + "_ske"));
                egretFactory.parseTextureAtlasData(uiCore.ZipManager.getDragonBoneJsonMap(dbName + "_tex"), data);
                this.DragonBoneFactoryMap[dbName] = egretFactory;
            }
            else {
                RES.getResAsync(dbName + "_tex_png", this.checkDragonBoneMap, this);
            }
        };
        DragonBoneManager.checkDragonBoneMap = function (data, key) {
            key = key.substr(0, key.lastIndexOf("_")).substr(0, key.lastIndexOf("_"));
            this.dragonBoneLoading(key);
        };
        DragonBoneManager.getGenerateDragonBoneData = function (runName) {
            for (var key in this.DragonBoneFactoryMap) {
                var armatureDisplay = this.DragonBoneFactoryMap[key].buildArmatureDisplay(runName);
                if (armatureDisplay) {
                    this.DragonBoneObjectManager(armatureDisplay);
                    return armatureDisplay;
                }
            }
            return null;
        };
        DragonBoneManager.DragonBoneObjectManager = function (db) {
            db.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        };
        DragonBoneManager.onRemoved = function (event) {
            var db = event.currentTarget;
            db.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (db.animation.isPlaying) {
                db.animation.stop();
            }
        };
        DragonBoneManager.DragonBoneFactoryMap = {};
        return DragonBoneManager;
    }());
    uiCore.DragonBoneManager = DragonBoneManager;
    __reflect(DragonBoneManager.prototype, "uiCore.DragonBoneManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=DragonBoneManager.js.map