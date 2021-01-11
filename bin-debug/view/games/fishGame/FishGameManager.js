var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishGameManager = (function () {
    function FishGameManager() {
    }
    FishGameManager.initFishManager = function (res) {
        var data = RES.getRes(res);
        if (data) {
            this.fishObjects = [];
            this.fishGameDic = {};
            this.groupPathDic = {};
            this.pathDic = {};
            this.fishDic = {};
            this.fishPathNames = [];
            JSZip.loadAsync(data).then(function (zipdata) {
                zipdata.forEach(function (relativePath, file) {
                    FishGameManager.initConfig(relativePath, file);
                });
            });
        }
        else {
            RES.getResAsync(res, this.checkFishManager, this);
        }
    };
    FishGameManager.checkFishManager = function (data, key) {
        this.initFishManager(key);
    };
    FishGameManager.initConfig = function (relativePath, file) {
        var _this = this;
        if (!file.dir) {
            if (relativePath.indexOf("fishs.json") >= 0) {
                file.async('string').then(function (content) {
                    _this.fishObjects = JSON.parse(content);
                });
            }
            else if (relativePath.indexOf("fishgames.json") >= 0) {
                file.async('string').then(function (content) {
                    _this.loadFishGame(JSON.parse(content));
                });
            }
            else if (relativePath.indexOf("fishPaths") >= 0) {
                relativePath = relativePath.substr(10, relativePath.length - 15);
                this.fishPathNames.push(relativePath);
                file.async('string').then(function (content) {
                    _this.initFishPath(relativePath, JSON.parse(content));
                });
            }
        }
    };
    FishGameManager.loadFishGame = function (games) {
        for (var i = 0; i < games.length; i++) {
            this.fishGameDic[games[i].gameId] = games[i];
        }
    };
    FishGameManager.initFishPath = function (name, result) {
        if (uiCore.StringUtils.textIndexOf(name, "group_")) {
            this.groupPathDic[name] = result;
        }
        else if (uiCore.StringUtils.textIndexOf(name, "groupfont_")) {
            this.fishDic[name] = result;
        }
        else if (uiCore.StringUtils.textIndexOf(name, "grouproat_")) {
            this.groupPathDic[name] = result;
        }
        else if (uiCore.StringUtils.textIndexOf(name, "large_")) {
            this.pathDic[name] = result;
        }
        else if (uiCore.StringUtils.textIndexOf(name, "small_")) {
            this.pathDic[name] = result;
        }
    };
    //判断初始化是否成功
    //true:初始化失败需要重新初始化 false:没问题
    FishGameManager.checkFishConfig = function () {
        if (this.fishPathNames == null || this.fishPathNames.length == 0) {
            return true;
        }
        if (this.fishObjects == null || this.fishObjects.length == 0) {
            return true;
        }
        if (this.groupPathDic == null || uiCore.Utils.checkNullObj(this.groupPathDic)) {
            return true;
        }
        if (this.pathDic == null || uiCore.Utils.checkNullObj(this.pathDic)) {
            return true;
        }
        if (this.fishDic == null || uiCore.Utils.checkNullObj(this.fishDic)) {
            return true;
        }
        if (this.fishGameDic == null || uiCore.Utils.checkNullObj(this.fishGameDic)) {
            return true;
        }
        var flag = false;
        for (var i = 0; i < this.fishPathNames.length; i++) {
            if (!this.groupPathDic[this.fishPathNames[i]] && !this.pathDic[this.fishPathNames[i]] && !this.fishDic[this.fishPathNames[i]]) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    FishGameManager.deltaTime = 0;
    return FishGameManager;
}());
__reflect(FishGameManager.prototype, "FishGameManager");
//# sourceMappingURL=FishGameManager.js.map