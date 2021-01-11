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
var uiCore;
(function (uiCore) {
    /**
     * 载入中
     * @author none
     *
     */
    var Loadding = (function (_super) {
        __extends(Loadding, _super);
        function Loadding(flag) {
            if (flag === void 0) { flag = false; }
            var _this = _super.call(this) || this;
            _this.skinName = Loadding.skinName;
            _this.restConnect.text = uiCore.LangUtils.getMsgById(24);
            _this.left = _this.right = _this.top = _this.bottom = 0;
            _this.progressTxt.text = "";
            if (flag) {
                _this.restConnect.visible = true;
            }
            else {
                _this.restConnect.visible = false;
            }
            return _this;
        }
        /**
         * 初始化弹窗，在游戏启动的时候调用
         * @param skinName {string} 弹窗皮肤
         */
        Loadding.init = function (skinName) {
            this.skinName = skinName;
        };
        /**
        * 子类继承获取加载进度
        */
        Loadding.prototype.onLoaddingProgress = function (percent) {
            this.progressTxt.text = percent + "%";
        };
        return Loadding;
    }(uiCore.Window));
    uiCore.Loadding = Loadding;
    __reflect(Loadding.prototype, "uiCore.Loadding");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Loadding.js.map