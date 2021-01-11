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
     * 文本
     * @author none
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            return _super.call(this) || this;
        }
        Label.prototype.childrenCreated = function () {
            this.fontFamily = "微软雅黑";
        };
        return Label;
    }(eui.Label));
    uiCore.Label = Label;
    __reflect(Label.prototype, "uiCore.Label");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Label.js.map