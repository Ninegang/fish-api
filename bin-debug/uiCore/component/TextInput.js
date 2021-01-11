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
     * 文本输入框
     * @author none
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            return _super.call(this) || this;
        }
        TextInput.prototype.childrenCreated = function () {
            //            this.textDisplay.textColor = 0xffffff;
            //            this.promptDisplay.textColor = 0xa9a9a9;
            //            this.textDisplay.displayAsPassword = this._displayAsPassword;
        };
        return TextInput;
    }(eui.TextInput));
    uiCore.TextInput = TextInput;
    __reflect(TextInput.prototype, "uiCore.TextInput");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=TextInput.js.map