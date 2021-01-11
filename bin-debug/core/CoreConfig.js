var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var CoreConfig = (function () {
        function CoreConfig() {
        }
        CoreConfig.STAGE_W = 1280;
        CoreConfig.STAGE_H = 720;
        CoreConfig.frameRate = 60;
        CoreConfig.ONE_FRAME_TIME = 1000 / 60;
        /** 是否支持Webp */
        CoreConfig.isWebp = false;
        CoreConfig.IMG_EXT = "png";
        /** 是否在后台运行 */
        CoreConfig.backRun = false;
        /**当前的语言版本
         * "zh_cn" 中文版本
         * "en_us" 英文版本
        */
        CoreConfig.languageType = "zh_cn";
        CoreConfig.AUTO_START_GAME_TYPE = "auto_start_game_check";
        return CoreConfig;
    }());
    core.CoreConfig = CoreConfig;
    __reflect(CoreConfig.prototype, "core.CoreConfig");
})(core || (core = {}));
//# sourceMappingURL=CoreConfig.js.map