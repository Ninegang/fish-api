var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 显示对象工具类
     * @author none
     *
     */
    var DisplayUtils = (function () {
        function DisplayUtils() {
        }
        /**
         * 获取扇形
         */
        DisplayUtils.getSector = function (r, startFrom, angle, color) {
            if (r === void 0) { r = 100; }
            if (startFrom === void 0) { startFrom = 0; }
            if (angle === void 0) { angle = 360; }
            if (color === void 0) { color = 0xff0000; }
            var shape = new egret.Shape();
            var x = 0;
            var y = 0;
            shape.graphics.beginFill(color);
            startFrom = startFrom * Math.PI / 180;
            var isClockwise = true; //是否顺时针
            if (angle < 0) {
                isClockwise = false;
            }
            shape.graphics.drawArc(x, y, r, startFrom, startFrom + angle * Math.PI / 180, !isClockwise);
            shape.graphics.lineTo(x, y);
            shape.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            shape.graphics.endFill();
            return shape;
        };
        /**
         * 获取矩形
         */
        DisplayUtils.getRect = function (width, height, alpha, color) {
            if (alpha === void 0) { alpha = 1; }
            if (color === void 0) { color = 0xff0000; }
            var shape = new egret.Shape();
            shape.graphics.beginFill(color, alpha);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
            return shape;
        };
        /*
         * 获取池对象
         * */
        DisplayUtils.getPoolDisplayObject = function (displayClass) {
            var displayObj = null;
            var arr = [];
            var className = egret.getQualifiedClassName(displayClass);
            if (this._poolDisplay[className]) {
                arr = this._poolDisplay[className];
            }
            if (arr.length > 0) {
                displayObj = arr.pop();
            }
            else {
                displayObj = new displayClass();
            }
            return displayObj;
        };
        /*
         * 回收池对象
         * */
        DisplayUtils.recyclePoolDisplayObject = function (displayObj) {
            //重置显示对象基本参数
            if (displayObj.parent) {
                displayObj.parent.removeChild(displayObj);
            }
            displayObj.alpha = 1;
            displayObj.visible = true;
            displayObj.scaleX = displayObj.scaleY = 1;
            displayObj.mask = null;
            displayObj.x = displayObj.y = 0;
            var arr = [];
            var className = egret.getQualifiedClassName(displayObj);
            if (this._poolDisplay[className]) {
                arr = this._poolDisplay[className];
            }
            else {
                this._poolDisplay[className] = arr;
            }
            arr.push(displayObj);
        };
        //清除回收池对象
        DisplayUtils.clearAllPoolDisplayObject = function () {
            for (var key in this._poolDisplay) {
                var arr = this._poolDisplay[key];
                while (arr.length > 0) {
                    var tmp = arr.pop();
                    tmp = null;
                }
            }
            this._poolDisplay = {};
        };
        //恢复灰化图片
        DisplayUtils.restoreEuiImage = function (argImage) {
            if (this._darkGroup && this._darkGroup[argImage.hashCode]) {
                this.clearDarkImage(this._darkGroup[argImage.hashCode]);
            }
        };
        //图片灰化
        DisplayUtils.darkEuiImage = function (argImage) {
            if (!this._darkGroup) {
                this._darkGroup = {};
            }
            var group;
            var img;
            if (!this._darkGroup[argImage.hashCode]) {
                group = new eui.Group();
                this._darkGroup[argImage.hashCode] = group;
                img = new eui.Image();
                img.source = argImage.source;
                var rect = new eui.Rect();
                rect.top = 0;
                rect.bottom = 0;
                rect.right = 0;
                rect.left = 0;
                rect.fillColor = 0x0;
                rect.fillAlpha = 0.3;
                group.addChild(img);
                group.addChild(rect);
                group.mask = img;
                if (!argImage.parent.contains(group)) {
                    argImage.parent.addChild(group);
                    group.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveGroup, this);
                }
            }
            else {
                group = this._darkGroup[argImage.hashCode];
                img = group.getChildAt(0);
                img.source = argImage.source;
            }
        };
        DisplayUtils.onRemoveGroup = function (event) {
            var group = event.currentTarget;
            this.clearDarkImage(group);
        };
        DisplayUtils.clearDarkImage = function (group) {
            for (var key in this._darkGroup) {
                if (this._darkGroup[key] == group) {
                    this._darkGroup[key] = null;
                    delete this._darkGroup[key];
                    break;
                }
            }
            group.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveGroup, this);
            if (group.parent) {
                group.parent.removeChild(group);
                group.mask = null;
            }
        };
        DisplayUtils._poolDisplay = {};
        return DisplayUtils;
    }());
    uiCore.DisplayUtils = DisplayUtils;
    __reflect(DisplayUtils.prototype, "uiCore.DisplayUtils");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=DisplayUtils.js.map