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
var DragonBoneGroup = (function (_super) {
    __extends(DragonBoneGroup, _super);
    function DragonBoneGroup() {
        var _this = _super.call(this) || this;
        _this.source = "";
        _this.sourceName = "";
        _this.dragonBonesEgretScaleX = 1;
        _this.dragonBonesEgretScaleY = 1;
        return _this;
    }
    Object.defineProperty(DragonBoneGroup.prototype, "getDragonBonesEgret", {
        get: function () {
            return this.dragonBonesEgret;
        },
        enumerable: true,
        configurable: true
    });
    DragonBoneGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.setDragonBonesEgret();
    };
    DragonBoneGroup.prototype.setDragonBonesEgret = function () {
        this.dragonBonesEgret = uiCore.DragonBoneManager.getGenerateDragonBoneData(this.sourceName);
        if (this.dragonBonesEgret) {
            this.addDragonBonesEgret();
        }
        else if (uiCore.ZipManager.getDragonBoneJsonMap(this.source + "_ske") && uiCore.ZipManager.getDragonBoneJsonMap(this.source + "_tex")) {
            this.dragonBonesImageLoading();
        }
    };
    DragonBoneGroup.prototype.dragonBonesImageLoading = function () {
        var data = RES.getRes(this.source + "_tex_png");
        if (data) {
            var egretFactory = dragonBones.EgretFactory.factory;
            egretFactory.parseDragonBonesData(uiCore.ZipManager.getDragonBoneJsonMap(this.source + "_ske"));
            egretFactory.parseTextureAtlasData(uiCore.ZipManager.getDragonBoneJsonMap(this.source + "_tex"), data);
            uiCore.DragonBoneManager.setDragonBoneMap(this.source, egretFactory);
            this.setDragonBonesEgret();
        }
        else {
            RES.getResAsync(this.source + "_tex_png", this.dragonBonesImageLoading, this);
        }
    };
    DragonBoneGroup.prototype.addDragonBonesEgret = function () {
        this.addChild(this.dragonBonesEgret);
        this.dragonBonesEgret.scaleX = uiCore.Application.app.stage.stageWidth / (this.dragonBonesEgret.width - 600);
        this.dragonBonesEgret.scaleY = uiCore.Application.app.stage.stageHeight / this.dragonBonesEgret.height;
    };
    return DragonBoneGroup;
}(eui.Group));
__reflect(DragonBoneGroup.prototype, "DragonBoneGroup");
//# sourceMappingURL=DragonBoneGroup.js.map