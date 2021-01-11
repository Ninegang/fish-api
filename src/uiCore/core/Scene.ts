namespace uiCore {
	/**
	 * 所有场景的基类
	 * @author none
	 *
	 */
    export class Scene extends View implements IBehaviour {
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
        public constructor() {
            super();
            this.left = this.right = this.top = this.bottom = 0;
        }
        /**
         * 销毁所用资源，由resourceList指定-只有切换场景才做销毁操作
         */
        public destroyResources(): void {
            // if (uiCore.Utils.isIOSNative() || egret.Capabilities.isMobile && this.resourceList) {
            //     var resourceList: Array<string> = this.resourceList;
            //     for (var i: number = 0; i < resourceList.length; i++) {
            //         RES.destroyRes(resourceList[i], false);
            //     }
            // }
        }
        /****************************************公告*************************************/
        //是否需要默认公告皮肤
        // public setNoticeFlag(flag: boolean) {
        //     //检查是否定义了公告皮肤
        //     if (this.noticeItemGroup && this.noticeLabel && this.noticeScroller) {
        //         this.noticeList = [];
        //         this.messageList = [];
        //         this.checkNoticeList(["测试"]);
        //         this.isNoticeFlag = flag;
        //         this.runNotice();
        //     }
        // }
        // public checkNoticeList(list: Array<any>) {
        //     for (var i = 0, len = list.length; i < len; i++) {
        //         var gameType = list[i].gameType;
        //         if (this.gameType == gameType || gameType == "all") {
        //             this.onAddNoticeMsg(list[i]);
        //         }
        //     }
        // }
        // //增加公告
        // public onAddNoticeMsg(notice: any) {
        //     var time = new Date().getTime() / 1000;
        //     if (notice.startTime <= time && notice.endTime >= time) {
        //         var gameType = notice.gameType;
        //         if (this.gameType == gameType || gameType == "all") {
        //             notice.intervalNumber = egret.setInterval(this.addInterval, this, notice.interval, notice);
        //             this.noticeList.push(notice);
        //             this.addInterval(notice);
        //         }
        //     }
        // }
        // public addInterval(info: any) {
        //     for (var i = 0; i < this.messageList.length; i++) {
        //         if (this.messageList[i].type == info.sn) {
        //             return;
        //         }
        //     }
        //     this.messageList.push({
        //         type: info.sn,
        //         msg: info.msg
        //     });
        //     this.runNotice();
        // }
        // //删除公告
        // public onDelNoticeMsg(msgSN) {
        //     //删除定时器
        //     var noticeList = this.noticeList;
        //     for (var i = 0, len = noticeList.length; i < len; i++) {
        //         if (noticeList[i].sn == msgSN) {
        //             var interval = noticeList[i].intervalNumber;
        //             if (interval != 0) {
        //                 egret.clearInterval(noticeList[i].intervalNumber);
        //             }
        //             noticeList.splice(i, 1);
        //             i--;
        //             len--;
        //         }
        //     }
        //     //删除正在播放列表数据
        //     var messageList = this.messageList;
        //     for (var j = 0; j < messageList.length; j++) {
        //         if (messageList[j].type == msgSN) {
        //             messageList.splice(j, 1);
        //             j--;
        //         }
        //     }
        // }
        // //增加消息
        // public onRecvMsg(msgType, srcname, msg, info) {
        //     this.messageList.push({
        //         type: 0,
        //         msg: msg
        //     });
        //     this.runNotice();
        // }

        // public runNotice() {
        //     if (this.timeout != -1) {
        //         egret.clearTimeout(this.timeout);
        //         this.timeout = -1;
        //     }
        //     if(!this.isNoticeFlag) return;
        //     if (this.isShow) return;
        //     if (this.messageList.length > 0) {
        //         this.noticeItemGroup.visible = true;
        //         //计算时间
        //         this.noticeLabel.textFlow = uiCore.StringUtils.textToRichText(this.messageList[0].msg);
        //         var runTime = (this.noticeLabel.width + this.noticeLabel.width) / this.noticeSpeen;
        //         this.noticeLabel.x = this.noticeScroller.width;
        //         egret.Tween.get(this.noticeLabel).to({ x: -this.noticeLabel.width }, runTime).call(this.runOver, this);
        //         this.messageList.shift();
        //         this.isShow = true;
        //     } else {
        //         this.noticeItemGroup.visible = false;
        //     }
        // }
        // public runOver() {
        //     this.isShow = false;
        //     if (this.timeout != -1) {
        //         egret.clearTimeout(this.timeout);
        //         this.timeout = -1;
        //     }
        //     this.timeout = egret.setTimeout(this.runNotice, this, this.spaceTime);
        // }

        // public clearNoticeList() {
        //     if (!this.noticeItemGroup) return;
        //     for (var i = 0, len = this.noticeList.length; i < len; i++) {
        //         if (this.noticeList[i].intervalNumber != -1) {
        //             egret.clearInterval(this.noticeList[i].intervalNumber);
        //         }
        //     }
        //     this.noticeList = [];
        // }
        // public clearShow() {
        //     this.noticeItemGroup && egret.Tween.removeTweens(this.noticeLabel);
        // }
    }
}
