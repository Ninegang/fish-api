var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KVDicKEnum;
(function (KVDicKEnum) {
    KVDicKEnum[KVDicKEnum["kIcon"] = 0] = "kIcon";
    KVDicKEnum[KVDicKEnum["kName"] = 1] = "kName";
    KVDicKEnum[KVDicKEnum["kRechServi"] = 2] = "kRechServi";
    KVDicKEnum[KVDicKEnum["kExchServi"] = 3] = "kExchServi";
    KVDicKEnum[KVDicKEnum["kCusServi"] = 4] = "kCusServi";
    KVDicKEnum[KVDicKEnum["kLinkCusServi"] = 5] = "kLinkCusServi";
    KVDicKEnum[KVDicKEnum["kCantShopMsg"] = 6] = "kCantShopMsg";
    KVDicKEnum[KVDicKEnum["kFristRech"] = 7] = "kFristRech";
    KVDicKEnum[KVDicKEnum["kQQCusServiQR"] = 8] = "kQQCusServiQR";
    KVDicKEnum[KVDicKEnum["kWxCusServiQr"] = 9] = "kWxCusServiQr";
    KVDicKEnum[KVDicKEnum["kVitalNotif"] = 10] = "kVitalNotif";
    KVDicKEnum[KVDicKEnum["kBankCardInfoMsg"] = 11] = "kBankCardInfoMsg";
})(KVDicKEnum || (KVDicKEnum = {}));
var GameData = (function () {
    function GameData() {
        this._userData = {};
        this._KVDic = [];
    }
    GameData.getInstance = function () {
        if (!GameData.instance) {
            GameData.instance = new GameData();
            GameData.instance.requestKVDicData();
        }
        return GameData.instance;
    };
    GameData.prototype.userData = function (key) {
        if (this._userData[key] != "undefined") {
            return this._userData[key];
        }
        return null;
    };
    GameData.prototype.setUserData = function (key, val) {
        this._userData[key] = val;
    };
    GameData.prototype.clearUserData = function () {
        this._userData = {};
    };
    GameData.prototype.requestLoggedInData = function () {
        this.requestServiceCustomerData();
    };
    GameData.prototype.requestKVDicData = function () {
        var json = {};
        var timeD = new Date().getTime() + "";
        var sign = uiCore.Utils.md5(HttpContractType.GetKeyConfig.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.GetKeyConfig, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_port + LibCore.GameConfig.http_login_url, params, egret.URLRequestMethod.POST, function (data) {
            var response = JSON.parse(data.Data);
            if (response.Code == 1) {
                this._KVDic = response.List;
            }
            else {
                GameData.instance.requestKVDicData();
            }
        }, function () {
            egret.setTimeout(function () {
                GameData.instance.requestKVDicData();
            }, this, 1000);
        }, this);
    };
    GameData.prototype.requestExchange = function () {
    };
    GameData.prototype.requestServiceCustomerData = function () {
        var accountName = GameData.getInstance().userData("username");
        var password = GameData.getInstance().userData("passward");
        var json = { AccountName: accountName, Password: password };
        var timeD = new Date().getTime() + "";
        var sign = uiCore.Utils.md5(HttpContractType.GetServiceCustomer.toString() + JSON.stringify(json) + LibCore.GameConfig.http_sign_key + timeD).toUpperCase();
        var params = { Protocol: HttpContractType.GetServiceCustomer, Data: JSON.stringify(json), Sign: sign, Timestamp: timeD };
        uiCore.HttpManager.getInstance().send(LibCore.GameConfig.http_base_url + LibCore.GameConfig.http_port + LibCore.GameConfig.http_login_url, params, egret.URLRequestMethod.POST, function (data) {
            var response = JSON.parse(data.Data);
            if (response.Code == 1) {
                this._ServiceCustomer = response.ServiceWay.split(",", 2);
            }
            else {
                GameData.instance.requestServiceCustomerData();
            }
        }, function () {
            egret.setTimeout(function () {
                GameData.instance.requestServiceCustomerData();
            }, this, 1000);
        }, this);
    };
    GameData.prototype.GetGameConfig = function (kEnum) {
        var value = "";
        this._KVDic.forEach(function (element) {
            if (element.ConfigKey == KVDicKEnum[kEnum]) {
                value = element.ConfigValue;
            }
        });
        return value;
    };
    GameData.prototype.GetServiceCustomer = function () {
        return this._ServiceCustomer;
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map