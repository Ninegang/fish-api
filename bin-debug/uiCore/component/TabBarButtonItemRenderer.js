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
    * 带图标的选项卡的项渲染器
    * 通过设置数据的icon属性的值来设置图标资源，icon值的例子：{icon:"未选中,选中"}
    * @author none
    *
    */
    var TabBarButtonItemRenderer = (function (_super) {
        __extends(TabBarButtonItemRenderer, _super);
        function TabBarButtonItemRenderer() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.ENTER_FRAME, _this.onEnterFrame, _this);
            return _this;
        }
        TabBarButtonItemRenderer.prototype.updateIcon = function () {
            var icon = this.data ? this.data.icon : null;
            if (icon && this.iconDisplay) {
                this.iconDisplay.source = !this.selected ? icon.split(",")[0] : icon.split(",")[1];
            }
        };
        TabBarButtonItemRenderer.prototype.onEnterFrame = function (event) {
            this.updateIcon();
        };
        TabBarButtonItemRenderer.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        return TabBarButtonItemRenderer;
    }(eui.ItemRenderer));
    uiCore.TabBarButtonItemRenderer = TabBarButtonItemRenderer;
    __reflect(TabBarButtonItemRenderer.prototype, "uiCore.TabBarButtonItemRenderer");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=TabBarButtonItemRenderer.js.map