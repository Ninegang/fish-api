var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var LoaderManager = (function () {
        function LoaderManager() {
            var _this = this;
            this.queueCount = 0;
            this.maxQueue = 4;
            // 自定义加载
            this.resInfosDirty = true;
            this.resInfos = [];
            this.resIdMap = {};
            //----------------------------------------------------------------------------------------------------
            this.loadGroupCount = 0;
            this.queueInfoObj = {};
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            egret.setInterval(function () {
                if (_this.queueCount > 0) {
                    _this.queueCount--;
                }
            }, this, 3000);
        }
        Object.defineProperty(LoaderManager, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new LoaderManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        LoaderManager.prototype.sortResInfos = function () {
            if (this.resInfosDirty) {
                this.resInfosDirty = false;
                this.resInfos.sort(function (infoA, infoB) {
                    return infoB.priority - infoA.priority;
                });
            }
        };
        LoaderManager.prototype.createR = function (resId, pri) {
            var rQueueInfo = new core.RQueueInfo();
            rQueueInfo.resId = resId;
            rQueueInfo.priority = pri;
            return rQueueInfo;
        };
        LoaderManager.prototype.createRG = function (rgId, overFn, overThis) {
            var rgInfo = new core.RGQueueInfo();
            rgInfo.rgId = rgId;
            rgInfo.overFn = overFn;
            rgInfo.overThis = overThis;
            return rgInfo;
        };
        LoaderManager.prototype.loadOneRes = function (resId, overFn, overThis, pri) {
            if (pri === void 0) { pri = 0; }
            if (!RES.getRes(resId)) {
                var rgInfo = this.createRG(LoaderManager.rgId++, overFn, overThis);
                var rInfo = this.resIdMap[resId];
                if (!rInfo) {
                    this.resIdMap[resId] = rInfo = this.createR(resId, pri);
                }
                else {
                    rInfo.priority = Math.max(pri, rInfo.priority);
                }
                rInfo.rgInfos.push(rgInfo);
                rgInfo.rInfos.push(rInfo);
                this.resInfos.push(rInfo);
                this.resInfosDirty = true;
                egret.callLater(this.checkResLoad, this);
                return rgInfo.rgId;
            }
            if (overFn && overThis) {
                overFn.call(overThis);
            }
            return 0;
        };
        LoaderManager.prototype.backLoadGroup = function (groupN, pri) {
            var resItems = RES.getGroupByName(groupN);
            var resIds = [];
            for (var _i = 0, resItems_1 = resItems; _i < resItems_1.length; _i++) {
                var resItem = resItems_1[_i];
                resIds.push(resItem.name);
            }
            this.loadResList(resIds, null, null, pri || LoaderManager.ONE_RES_BACK_PRI);
        };
        LoaderManager.prototype.loadResList = function (resL, overFn, overThis, pri) {
            if (pri === void 0) { pri = 0; }
            var rl = [];
            for (var i = 0; i < resL.length; i++) {
                if (!RES.hasRes(resL[i])) {
                    console.error("资源配置文件中无法找到特定的资源：" + resL[i]);
                    return;
                }
                if (!RES.getRes(resL[i])) {
                    rl.push(resL[i]);
                }
            }
            if (rl.length) {
                var rgInfo = this.createRG(LoaderManager.rgId++, overFn, overThis);
                this.resInfosDirty = true;
                for (var i = 0; i < rl.length; i++) {
                    var rInfo = this.resIdMap[rl[i]];
                    if (!rInfo) {
                        this.resIdMap[rl[i]] = rInfo = this.createR(rl[i], pri);
                    }
                    else {
                        rInfo.priority = Math.max(pri, rInfo.priority);
                    }
                    rInfo.rgInfos.push(rgInfo);
                    rgInfo.rInfos.push(rInfo);
                    this.resInfos.push(rInfo);
                }
                egret.callLater(this.checkResLoad, this);
                return rgInfo;
            }
            if (overFn && overThis) {
                overFn.call(overThis);
            }
            return null;
        };
        LoaderManager.prototype.checkResLoad = function () {
            var _this = this;
            if (this.resInfos.length && this.queueCount < this.maxQueue) {
                this.sortResInfos();
                var resInfo_1 = this.resInfos.shift();
                while (this.resInfos.length && (!resInfo_1 || !resInfo_1.rgInfos || !resInfo_1.rgInfos.length)) {
                    resInfo_1 = this.resInfos.shift();
                }
                if (resInfo_1) {
                    this.queueCount++;
                    RES.getResAsync(resInfo_1.resId, function (value, key) {
                        _this.loadResOver(resInfo_1, value, key);
                    }, this);
                }
            }
        };
        LoaderManager.prototype.loadResOver = function (resInfo, value, key) {
            this.queueCount--;
            delete this.resIdMap[resInfo.resId];
            resInfo.loadOk(value, key);
            this.checkResLoad();
        };
        //----------------------------------------------------------------------------------------------------
        LoaderManager.prototype.loadGroupByList = function (groupNames, backFun, errFn, thisObj, params, pri) {
            if (backFun === void 0) { backFun = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (params === void 0) { params = null; }
            if (pri === void 0) { pri = 0; }
            var loadGNs = [];
            for (var _i = 0, groupNames_1 = groupNames; _i < groupNames_1.length; _i++) {
                var groupName = groupNames_1[_i];
                if (!RES.isGroupLoaded(groupName)) {
                    loadGNs.push(groupName);
                }
            }
            if (loadGNs.length) {
                var tempGroup = void 0;
                if (loadGNs.length == 1) {
                    tempGroup = loadGNs[0];
                }
                else {
                    tempGroup = groupNames.join("_");
                    RES.createGroup(tempGroup, loadGNs);
                }
                return LoaderManager.instance.loadGroup(tempGroup, backFun, errFn, thisObj, params, pri);
            }
            backFun.apply(thisObj, params);
            return null;
        };
        LoaderManager.prototype.loadGroup = function (groupName, backFun, errFn, fnThis, params, pri) {
            if (params === void 0) { params = null; }
            if (pri === void 0) { pri = 0; }
            if (!groupName || RES.isGroupLoaded(groupName)) {
                if (backFun && fnThis) {
                    backFun.apply(fnThis, params);
                }
                return null;
            }
            var info = this.queueInfoObj[groupName];
            if (!info) {
                this.queueInfoObj[groupName] = info = new GroupQueueInfo();
            }
            if (!info.check(backFun, errFn, fnThis, params)) {
                info.addBack(backFun, errFn, fnThis, params);
            }
            if (!info.loading) {
                this.loadGroupCount++;
                info.loading = true;
                // console.log("---------------------->开始加载组：", groupName, this.loadGroupCount);
                info.pri = pri;
                RES.loadGroup(groupName, pri);
            }
            return groupName;
        };
        LoaderManager.prototype.onGroupComplete = function (evt) {
            var groupName = evt.groupName;
            this.execGroupOverFn(groupName);
        };
        LoaderManager.prototype.execGroupOverFn = function (groupName, isFail) {
            if (isFail === void 0) { isFail = false; }
            var queueInfo = this.queueInfoObj[groupName];
            if (!!queueInfo) {
                this.loadGroupCount--;
                if (isFail) {
                    queueInfo.execFail();
                }
                else {
                    queueInfo.execOk();
                }
                delete this.queueInfoObj[groupName];
            }
            // console.log("---------------------->加载组完成：", groupName, this.loadGroupCount);
        };
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        LoaderManager.prototype.onGroupLoadError = function (evt) {
            var groupName = evt.groupName;
            console.warn("\u52A0\u8F7D\u8D44\u6E90\u62A5\u9519\uFF1AGroupName:" + groupName);
            this.execGroupOverFn(groupName, true);
        };
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        LoaderManager.prototype.onGroupProgress = function (event) {
            // console.log(event.resItem);
            // event.itemsLoaded / event.itemsTotal
            // if (this.loadUI)
            // {
            //    this.loadUI.setProgress(event.itemsLoaded, event.itemsTotal);
            // }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        LoaderManager.prototype.onItemLoadError = function (evt) {
            console.warn("\u52A0\u8F7D\u8D44\u6E90\u62A5\u9519\uFF1AFileName-->" + evt.resItem.url);
        };
        //--------------------------------------------------------------------------------------------------
        LoaderManager.GAME_BACK_RES = -50000;
        LoaderManager.GAME_RES = -20000;
        LoaderManager.UI_EFFECT_PRI = -10000;
        LoaderManager.SCENE_PRI = 30000;
        LoaderManager.UI_PRI = 50000;
        //--------------------------------------------------------------------------------------------------
        LoaderManager.pri_idx = 0;
        //----------------------------------------------------------------------------------------------------
        /** 后台加载 */
        LoaderManager.ONE_RES_BACK_PRI = -500000;
        LoaderManager.ONE_RES_MAIN_EFFECT_PRI = -400000;
        /** 特效加载 */
        LoaderManager.ONE_RES_SOUND_PRI = -300000;
        LoaderManager.ONE_RES_EFFECT_PRI = -100000;
        /** 默认加载（皮肤中使用的） */
        LoaderManager.ONE_RES_DEF_PRI = 0;
        LoaderManager.rgId = 1;
        return LoaderManager;
    }());
    core.LoaderManager = LoaderManager;
    __reflect(LoaderManager.prototype, "core.LoaderManager");
    /**  */
    var GroupQueueInfo = (function () {
        function GroupQueueInfo() {
            this.backFuns = [];
            this.errFuns = [];
            this.fnThiss = [];
            this.args = [];
            this.loading = false;
            this.pri = -999999999;
        }
        GroupQueueInfo.prototype.addBack = function (backFn, errFn, fnThis, param) {
            this.backFuns.push(backFn);
            this.errFuns.push(errFn);
            this.fnThiss.push(fnThis);
            this.args.push(param);
        };
        GroupQueueInfo.prototype.check = function (backFn, errFn, fnThis, param) {
            var len = this.backFuns.length;
            for (var i = 0; i < len; i++) {
                if (this.backFuns[i] == backFn && this.errFuns[i] == errFn && this.fnThiss[i] == fnThis && this.args[i] == param) {
                    return true;
                }
            }
            return false;
        };
        GroupQueueInfo.prototype.execOk = function () {
            var len = this.backFuns.length;
            for (var i = 0; i < len; i++) {
                if (this.backFuns[i]) {
                    this.backFuns[i].apply(this.fnThiss[i], this.args[i]);
                }
            }
            this.backFuns.length = this.errFuns.length = this.fnThiss.length = this.args.length = 0;
        };
        GroupQueueInfo.prototype.execFail = function () {
            var len = this.errFuns.length;
            for (var i = 0; i < len; i++) {
                if (this.errFuns[i]) {
                    this.errFuns[i].apply(this.fnThiss[i]);
                }
            }
            this.backFuns.length = this.errFuns.length = this.fnThiss.length = this.args.length = 0;
        };
        return GroupQueueInfo;
    }());
    __reflect(GroupQueueInfo.prototype, "GroupQueueInfo");
})(core || (core = {}));
//# sourceMappingURL=LoaderManager.js.map