var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * Created by Administrator on 2018/1/1 0001.
     */
    var ColorUtils = (function () {
        function ColorUtils() {
        }
        /**置灰*/
        ColorUtils.grayObj = function (obj, gray) {
            if (gray === void 0) { gray = true; }
            if ("enabled" in obj) {
                obj["enabled"] = !gray;
            }
            obj.filters = gray ? [core.FilterUtil.greyFilter] : null;
        };
        ColorUtils.spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        //16进制颜色滤镜
        ColorUtils.getColorMatrixFilter = function (color) {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var result = this.spliceColor(color);
            colorMatrix[0] = result.r / 255;
            colorMatrix[6] = result.g / 255;
            colorMatrix[12] = result.b / 255;
            return new egret.ColorMatrixFilter(colorMatrix);
        };
        return ColorUtils;
    }());
    core.ColorUtils = ColorUtils;
    __reflect(ColorUtils.prototype, "core.ColorUtils");
})(core || (core = {}));
//# sourceMappingURL=ColorUtils.js.map