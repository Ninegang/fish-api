var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var CoinAnimUtil = (function () {
        function CoinAnimUtil() {
        }
        CoinAnimUtil.to = function (txt, val, duration) {
            if (duration === void 0) { duration = 1000; }
            var sVal = parseFloat(txt.text);
            var txtObj = { value: sVal };
            CoinAnimUtil.addRunTxt(txt, txtObj);
            egret.Tween.get(txtObj, { onChange: function () {
                    txt.text = txtObj.value.toFixed(2);
                }, onChangeObj: this }).to({ value: val }, duration, egret.Ease.sineOut).call(function () {
                CoinAnimUtil.removeRunTxt(txt);
            }, this);
        };
        CoinAnimUtil.addRunTxt = function (txt, txtObj) {
            CoinAnimUtil.removeRunTxt(txt);
            CoinAnimUtil.runTxts.push(txt);
            CoinAnimUtil.runTxtObjs.push(txtObj);
        };
        CoinAnimUtil.removeRunTxt = function (txt) {
            var txtIndex = CoinAnimUtil.runTxts.indexOf(txt);
            if (txtIndex != -1) {
                CoinAnimUtil.runTxts.splice(txtIndex, 1);
                egret.Tween.removeTweens(CoinAnimUtil.runTxtObjs[txtIndex]);
                CoinAnimUtil.runTxtObjs.splice(txtIndex, 1);
            }
        };
        CoinAnimUtil.runTxts = [];
        CoinAnimUtil.runTxtObjs = [];
        return CoinAnimUtil;
    }());
    app.CoinAnimUtil = CoinAnimUtil;
    __reflect(CoinAnimUtil.prototype, "app.CoinAnimUtil");
})(app || (app = {}));
//# sourceMappingURL=CoinAnimUtil.js.map