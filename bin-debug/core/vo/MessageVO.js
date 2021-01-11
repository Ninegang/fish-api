var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var MessageVO = (function () {
        function MessageVO() {
            this.msg = '';
            this.color = 0xfff2ab;
            this.duration = 500;
        }
        return MessageVO;
    }());
    core.MessageVO = MessageVO;
    __reflect(MessageVO.prototype, "core.MessageVO");
})(core || (core = {}));
//# sourceMappingURL=MessageVO.js.map