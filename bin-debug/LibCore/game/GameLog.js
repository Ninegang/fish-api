var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LibCore;
(function (LibCore) {
    /**
     * 游戏日志记录
     * @author
     * @version	2017/7/11
     */
    var GameLog = (function () {
        function GameLog() {
        }
        /**
         * 记录日志
         * @param prefix	日志前缀
         * @param fields	日志字段列表
         */
        GameLog._log = function (prefix, fields) {
            // console.log(prefix + fields.join(" "));
        };
        /**
         * 记录日志
         * @param prefix	日志前缀
         * @param fields	日志字段列表
         */
        GameLog.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.enabled && this._log("[LOG] ", args);
        };
        /**
         * 错误日志
         */
        GameLog.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.enabled && this._log("[**ERROR**] ", args);
        };
        /**
         * 警告日志
         */
        GameLog.warning = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.enabled && this.outputWarning && this._log("[!WARNING!] ", args);
        };
        /**
         * 信息日志
         */
        GameLog.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.enabled && this._log("[INFO] ", args);
        };
        /**
         * 调试日志
         */
        GameLog.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.enabled && this.outputDebug && this._log("[DEBUG] ", args);
        };
        /** 是否启用 */
        GameLog.enabled = LibCore.GameConfig.useConsoleLog;
        /** 是否输出警告日志 */
        GameLog.outputWarning = LibCore.GameConfig.useConsoleLog;
        /** 是否输出调试日志 */
        GameLog.outputDebug = false;
        return GameLog;
    }());
    LibCore.GameLog = GameLog;
    __reflect(GameLog.prototype, "LibCore.GameLog");
})(LibCore || (LibCore = {}));
//# sourceMappingURL=GameLog.js.map