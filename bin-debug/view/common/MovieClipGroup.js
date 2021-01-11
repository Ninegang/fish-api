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
var MovieClipGroup = (function (_super) {
    __extends(MovieClipGroup, _super);
    function MovieClipGroup() {
        var _this = _super.call(this) || this;
        _this.source = "";
        _this.rameLabel = "";
        _this.sourceName = "";
        return _this;
    }
    MovieClipGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadingConfig();
    };
    MovieClipGroup.prototype.loadingConfig = function () {
        var mc = uiCore.MovieClipManager.getGenerateMovieClipData(this.sourceName);
        if (mc) {
            mc.gotoAndPlay(this.rameLabel, -1);
            this.addChild(mc);
        }
        else if (uiCore.ZipManager.getMovieClipJsonMap(this.source)) {
            this.mcLoading();
        }
    };
    MovieClipGroup.prototype.mcLoading = function () {
        var data = RES.getRes(this.source + "_png");
        if (data) {
            uiCore.MovieClipManager.setMovieClipMap(this.source, new egret.MovieClipDataFactory(uiCore.ZipManager.getMovieClipJsonMap(this.source), data));
            this.loadingConfig();
        }
        else {
            RES.getResAsync(this.source + "_png", this.mcLoading, this);
        }
    };
    return MovieClipGroup;
}(eui.Group));
__reflect(MovieClipGroup.prototype, "MovieClipGroup");
//# sourceMappingURL=MovieClipGroup.js.map