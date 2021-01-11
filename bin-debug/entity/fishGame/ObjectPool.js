var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*--[[
    通用对象池
    使用要求
    1、对象必须要有 IsRunning() 及 Dispose()
    2、必须提供对象实例化函数createObjFunc()
]]*/
var ObjectPool = (function () {
    function ObjectPool(createObjFunc) {
        this.objList = [];
        this.createObjFunc = createObjFunc;
    }
    ObjectPool.getInstance = function (createObjFunc) {
        if (!this._instance) {
            this._instance = new ObjectPool(createObjFunc);
        }
        return this._instance;
    };
    ObjectPool.prototype.Init = function (capacity) {
        if (this.objList.length == 0) {
            for (var i = 0; i < capacity; i++) {
                var obj = this.createObjFunc();
                this.objList.push(obj);
            }
        }
    };
    ObjectPool.prototype.GetObject = function () {
        for (var i = 0; i < this.objList.length; i++) {
            if (!this.objList[i].Running) {
                return this.objList[i];
            }
        }
        var result = this.createObjFunc();
        this.objList.push(result);
        return result;
    };
    ObjectPool.prototype.Dispose = function () {
        var num = this.objList.length;
        if (num > 0) {
            for (var i = num; i > 0; i--) {
                var item = this.objList.shift();
                item.Dispose();
                item = null;
            }
        }
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map