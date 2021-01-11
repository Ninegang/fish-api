var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var DisplayUtil = (function () {
        function DisplayUtil() {
        }
        DisplayUtil.removeDisplay = function (dis, parent) {
            if (parent === void 0) { parent = null; }
            if (!dis) {
                return;
            }
            if (!parent) {
                parent = dis.parent;
            }
            if (!parent) {
                return;
            }
            parent.removeChild(dis);
        };
        DisplayUtil.removeAllChild = function (con) {
            var childCon;
            while (con.numChildren > 0) {
                childCon = con.getChildAt(0);
                if (childCon instanceof egret.DisplayObjectContainer) {
                    DisplayUtil.removeAllChild(childCon);
                }
                core.DisplayUtil.removeDisplay(childCon);
            }
        };
        DisplayUtil.showTips = function (tipsGroup, evt, isBlock) {
            if (isBlock === void 0) { isBlock = true; }
            var tipsIndex = (tipsGroup["TipsIndex"] || 0) + 1; // = ++DisplayUtil.tipsIndex;
            tipsGroup["TipsIndex"] = tipsIndex;
            DisplayUtil.currentShowTipsGroup = tipsGroup;
            var thisObj = this;
            var isBlockTap = false;
            function onBlockTap(evt) {
                isBlockTap = true;
            }
            function onHideTips(evt) {
                egret.callLater(function () {
                    if (isBlockTap == false) {
                        hideTips();
                    }
                    isBlockTap = false;
                }, this);
            }
            function hideTips() {
                tipsGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onBlockTap, thisObj);
                tipsGroup.removeEventListener(egret.Event.ADDED_TO_STAGE, onHideTips, thisObj);
                uiCore.Application.currentScene.stage.removeEventListener(egret.TouchEvent.TOUCH_END, onHideTips, thisObj);
                // CoreConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onHideTips, thisObj);
                if (tipsGroup["TipsIndex"] == tipsIndex) {
                    tipsGroup.visible = false;
                }
            }
            if (tipsGroup.visible == false) {
                tipsGroup.visible = true;
                evt.stopPropagation();
                if (isBlock) {
                    tipsGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onBlockTap, thisObj);
                }
                uiCore.Application.currentScene.stage.addEventListener(egret.TouchEvent.TOUCH_END, onHideTips, thisObj);
                // CoreConfig.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onHideTips, thisObj);
                tipsGroup.addEventListener(egret.Event.ADDED_TO_STAGE, onHideTips, thisObj);
                return true;
            }
            else {
                hideTips();
            }
            return false;
        };
        DisplayUtil.setImgUrl = function (img, url) {
            img.source = null;
            img.source = url;
        };
        return DisplayUtil;
    }());
    core.DisplayUtil = DisplayUtil;
    __reflect(DisplayUtil.prototype, "core.DisplayUtil");
})(core || (core = {}));
//# sourceMappingURL=DisplayUtil.js.map