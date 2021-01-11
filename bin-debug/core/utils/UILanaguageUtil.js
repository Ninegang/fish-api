var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var UILanaguageUtil = (function () {
        function UILanaguageUtil() {
        }
        UILanaguageUtil.convert = function (ui) {
            var nameL = ui.name.split('_');
            if (nameL[0] == 'l') {
                var lang = nameL[1] + "语言包";
                if (ui instanceof eui.TextInput) {
                    ui.prompt = lang;
                }
                else if (ui instanceof egret.TextField) {
                    ui.text = lang;
                }
                else if (ui instanceof eui.Button) {
                    ui.label = lang;
                }
                else if (ui instanceof eui.RadioButton) {
                    ui.label = lang;
                }
                else if (ui instanceof eui.CheckBox) {
                    ui.label = lang;
                }
            }
            if (ui instanceof egret.DisplayObjectContainer) {
                var uiCon = ui;
                var len = uiCon.numChildren;
                var childUI;
                for (var i = 0; i < len; i++) {
                    childUI = uiCon.getChildAt(i);
                    UILanaguageUtil.convert(childUI);
                }
            }
        };
        return UILanaguageUtil;
    }());
    core.UILanaguageUtil = UILanaguageUtil;
    __reflect(UILanaguageUtil.prototype, "core.UILanaguageUtil");
})(core || (core = {}));
//# sourceMappingURL=UILanaguageUtil.js.map