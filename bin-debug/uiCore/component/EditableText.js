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
     * 可编辑文本
     * @author none
     */
    var EditableText = (function (_super) {
        __extends(EditableText, _super);
        function EditableText() {
            return _super.call(this) || this;
        }
        EditableText.prototype.childrenCreated = function () {
            this.fontFamily = "微软雅黑";
        };
        return EditableText;
    }(eui.EditableText));
    uiCore.EditableText = EditableText;
    __reflect(EditableText.prototype, "uiCore.EditableText");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=EditableText.js.map