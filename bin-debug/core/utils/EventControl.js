var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var EventControl = (function () {
        function EventControl() {
            this.evtList = [];
        }
        EventControl.prototype.addEvtListener = function (tarObj, type, listener, thisObj) {
            if (!this.hasEvt(tarObj, type, listener, thisObj)) {
                var regEvtVo = new core.RegEventVO();
                regEvtVo.target = tarObj;
                regEvtVo.type = type;
                regEvtVo.backFn = listener;
                regEvtVo.backThis = thisObj;
                this.evtList.push(regEvtVo);
                tarObj.addEventListener(type, listener, thisObj);
            }
        };
        EventControl.prototype.hasEvt = function (tarObj, type, listener, thisObj) {
            for (var _i = 0, _a = this.evtList; _i < _a.length; _i++) {
                var evtVo = _a[_i];
                if (evtVo.target == tarObj && evtVo.type == type && evtVo.backFn == listener && evtVo.backThis == thisObj) {
                    return true;
                }
            }
            return false;
        };
        EventControl.prototype.removeEvtListener = function (tarObj, type, listener, thisObj) {
            if (type === void 0) { type = null; }
            if (listener === void 0) { listener = null; }
            if (thisObj === void 0) { thisObj = null; }
            for (var _i = 0, _a = this.evtList; _i < _a.length; _i++) {
                var regEvtVo = _a[_i];
                if (regEvtVo.target == tarObj) {
                    if (type) {
                        if (type == regEvtVo.type) {
                            if (listener) {
                                if (listener == regEvtVo.backFn) {
                                    if (thisObj) {
                                        if (thisObj == regEvtVo.backThis) {
                                            this.removeRegEvtVo(regEvtVo);
                                        }
                                    }
                                    else {
                                        this.removeRegEvtVo(regEvtVo);
                                    }
                                }
                            }
                            else {
                                this.removeRegEvtVo(regEvtVo);
                            }
                        }
                    }
                    else {
                        this.removeRegEvtVo(regEvtVo);
                    }
                }
            }
        };
        EventControl.prototype.removeRegEvtVo = function (regEvtVo) {
            regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            core.ArrayUtil.removeObj(this.evtList, regEvtVo);
        };
        EventControl.prototype.awake = function () {
            for (var _i = 0, _a = this.evtList; _i < _a.length; _i++) {
                var regEvtVo = _a[_i];
                regEvtVo.target.addEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
        };
        EventControl.prototype.sleep = function () {
            for (var _i = 0, _a = this.evtList; _i < _a.length; _i++) {
                var regEvtVo = _a[_i];
                regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
        };
        EventControl.prototype.removeAll = function () {
            for (var _i = 0, _a = this.evtList; _i < _a.length; _i++) {
                var regEvtVo = _a[_i];
                regEvtVo.target.removeEventListener(regEvtVo.type, regEvtVo.backFn, regEvtVo.backThis);
            }
            this.evtList.length = 0;
        };
        return EventControl;
    }());
    core.EventControl = EventControl;
    __reflect(EventControl.prototype, "core.EventControl");
})(core || (core = {}));
//# sourceMappingURL=EventControl.js.map