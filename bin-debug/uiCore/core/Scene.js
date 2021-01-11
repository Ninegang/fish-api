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
     * 所有场景的基类
     * @author none
     *
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        /**
         * 场景界面
         */
        //公告
        // public isNoticeFlag: boolean = false;       //是否需要使用默认公告行为
        // public noticeList: Array<any> = [];         //公告消息，公告消息优于游戏消息
        // public messageList: Array<any> = [];        //正在播放的消息
        // public noticeSpeen: number = 0.2;            //行走速度
        // public timeout: number = -1;                //每条消息的间隔定时器
        // public spaceTime: number = 1000;            //每条消息的间隔
        // public isShow: boolean = false;              //是否在跑
        // //公告皮肤
        // public noticeItemGroup: eui.Group;
        // public noticeScroller: eui.Scroller;
        // public noticeLabel: eui.Label;
        // //游戏类型
        // public gameType: string = "";
        function Scene() {
            var _this = _super.call(this) || this;
            _this.left = _this.right = _this.top = _this.bottom = 0;
            return _this;
        }
        /**
         * 销毁所用资源，由resourceList指定-只有切换场景才做销毁操作
         */
        Scene.prototype.destroyResources = function () {
            // if (uiCore.Utils.isIOSNative() || egret.Capabilities.isMobile && this.resourceList) {
            //     var resourceList: Array<string> = this.resourceList;
            //     for (var i: number = 0; i < resourceList.length; i++) {
            //         RES.destroyRes(resourceList[i], false);
            //     }
            // }
        };
        return Scene;
    }(uiCore.View));
    uiCore.Scene = Scene;
    __reflect(Scene.prototype, "uiCore.Scene");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=Scene.js.map