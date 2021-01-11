var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*[[
    通用对象池
    使用要求
    1、对象必须要有 IsRunning() 及 Dispose()
    2、必须提供对象实例化函数createObjFunc()
]]
*/
var BulletPool = (function () {
    function BulletPool(createObjFunc) {
        this.objList = [];
        this.createObjFunc = createObjFunc;
    }
    BulletPool.prototype.Init = function (capacity) {
        if (this.objList.length == 0) {
            for (var i = 0; i < capacity; i++) {
                var obj = this.createObjFunc();
                this.objList.push(obj);
            }
        }
    };
    BulletPool.prototype.activeNum = function () {
        var indx = 0;
        for (var i = 0; i < this.objList.length; i++) {
            if (this.objList[i].Running) {
                indx++;
            }
        }
        return indx;
    };
    BulletPool.prototype.setLockFish = function () {
        for (var i = 0; i < this.objList.length; i++) {
            if (this.objList[i].Running) {
                this.objList[i].setLockFish(null);
            }
        }
    };
    BulletPool.prototype.GetObject = function () {
        for (var i = 0; i < this.objList.length; i++) {
            if (!this.objList[i].Running) {
                return this.objList[i];
            }
        }
        var result = this.createObjFunc();
        this.objList.push(result);
        return result;
    };
    // public Dispose():void{
    //     let num:number = this.objList.length;
    //     if (num>0){
    //         for(var i=num;i>0;i--){
    //             let item:Bullet = this.objList.shift();
    //             item.Dispose();
    //             item = null;    
    //         }
    //     } 
    // }
    BulletPool.prototype.Dispose = function () {
        var num = this.objList.length;
        if (num > 0) {
            for (var i = num; i > 0; i--) {
                var item = this.objList.pop();
                item.Dispose();
            }
        }
        this.objList = [];
    };
    return BulletPool;
}());
__reflect(BulletPool.prototype, "BulletPool");
//# sourceMappingURL=BulletPool.js.map