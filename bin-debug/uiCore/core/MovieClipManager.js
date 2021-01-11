var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var MovieClipManager = (function () {
        function MovieClipManager() {
        }
        MovieClipManager.setMovieClipMap = function (key, content) {
            this.MovieClipFactoryMap[key] = content;
        };
        MovieClipManager.init = function (res) {
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    this.setMcFactory(res[i]);
                }
            }
        };
        MovieClipManager.setMcFactory = function (res) {
            if (uiCore.ZipManager.getMovieClipJsonMap(res)) {
                if (!this.MovieClipFactoryMap[res]) {
                    this.movieClipLoading(res);
                }
            }
        };
        MovieClipManager.movieClipLoading = function (mcName) {
            var data = RES.getRes(mcName + "_png");
            if (data) {
                this.MovieClipFactoryMap[mcName] = new egret.MovieClipDataFactory(uiCore.ZipManager.getMovieClipJsonMap(mcName), data);
            }
            else {
                RES.getResAsync(mcName + "_png", this.checkMovieClipMap, this);
            }
        };
        MovieClipManager.checkMovieClipMap = function (data, key) {
            key = key.substr(0, key.lastIndexOf("_"));
            this.movieClipLoading(key);
        };
        MovieClipManager.getGenerateMovieClipData = function (runName) {
            for (var key in this.MovieClipFactoryMap) {
                var data = this.MovieClipFactoryMap[key].generateMovieClipData(runName);
                if (data && data.mcData) {
                    var mc = new egret.MovieClip(data);
                    this.MovieClipObjectManager(mc);
                    return mc;
                }
            }
            return null;
        };
        MovieClipManager.MovieClipObjectManager = function (mc) {
            mc.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        };
        MovieClipManager.onRemoved = function (event) {
            var mc = event.currentTarget;
            mc.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (mc.isPlaying) {
                mc.stop();
            }
        };
        MovieClipManager.MovieClipFactoryMap = {};
        return MovieClipManager;
    }());
    uiCore.MovieClipManager = MovieClipManager;
    __reflect(MovieClipManager.prototype, "uiCore.MovieClipManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=MovieClipManager.js.map